<template lang="pug">
.task
  task-form(@onSubmit="handlerSubmit" @onCloseForm="handlerCloseForm" :isActiveForm="isActiveForm" )
  header.task__header
    h3 Today
    .task__header-actions
      app-button.button--primary(@click="openForm")
        | New task
  .task__body
    transition-group(class="task__list" tag="div" name="bounce")
      task-item(v-for="(task, key) in tasks"
        :ref="setItemRef"
        :task="task"
        :index="key"
        :key="`task-${key}`"
        @onCompleteTask="completeTask"
        @onDestroyTask="destroyTask(key)"
      )

</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { ETaskStatus, ITask } from '@/types/task'
import TaskForm from '@/components/Task/TaskFrom.vue'
import TaskItem from '@/components/Task/TaskItem.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { uuid } from '@/utils'

export default defineComponent({
  name: 'Tasks',
  components: {
    TaskForm,
    TaskItem,
    AppButton
  },
  setup: function () {
    const isActiveForm = ref(false)
    const tasks = reactive<ITask[]>([
      {
        _id: uuid(),
        title: 'task 1',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: ETaskStatus.todo,
        date: '2021-12-09 14:23'
      },
      {
        _id: uuid(),
        title: 'task 2',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: ETaskStatus.todo,
        date: '2021-12-09 14:24'
      },
      {
        _id: uuid(),
        title: 'task 3',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: ETaskStatus.todo,
        date: '2021-12-09 14:26'
      }
    ])
    const itemRefs: HTMLElement[] = []
    const setItemRef = (el: any) => {
      if (el) {
        itemRefs.push(el.$el)
      }
      return itemRefs
    }
    const fontScale = (list: HTMLElement[], delay: number, animationClass: string) => {
      list.forEach((el: HTMLElement, index) => {
        setTimeout(() => {
          el.classList.add(animationClass)
        }, index * delay)
      })
    }

    const handlerSubmit = (task: ITask): void => {
      tasks.push(task)
    }

    const destroyTask = (index: number): void => {
      tasks.splice(index, 1)
    }

    const completeTask = (index: number): void => {
      tasks[index].status = ETaskStatus.done
    }
    const openForm = () => {
      isActiveForm.value = true
    }
    const handlerCloseForm = (): void => {
      isActiveForm.value = false
    }

    onMounted(() => {
      fontScale(itemRefs, 200, 'grow-animation')
    })

    return {
      isActiveForm,
      setItemRef,
      tasks,
      handlerSubmit,
      destroyTask,
      completeTask,
      openForm,
      handlerCloseForm
    }
  }
})
</script>
<style lang="scss" itemscope>
.task {
  padding: 15px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  flex: 1;
  @media (min-width: 768px) {
    max-width: 730px;
    border-radius: 8px 8px 0 0;
    padding: 35px 30px 0 35px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
    opacity: 0.5;
    font-size: 14px;
    color: #131313;
    margin-bottom: 2px;

  }

  &__header-actions {
    display: flex;
    flex:1 0 auto;
    align-items: center;
    justify-content: flex-end;
    .button {
      width: 20%;
      font-weight: bold;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
  }

  //animation
  .bounce-enter-active {
    animation: bounce-in .4s ease-out both;
  }

  .bounce-leave-active {
    animation: bounce-in .4s reverse ease-in both;
  }

  .grow-animation {
    animation-name: grow;
    animation-duration: 2s;
  }

  //keyframes
  @keyframes grow {
    0% {
    }
    75% {
      transform: scale(1.05, 1.05);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0.3);
    }
    50% {
      transform: scale(0.6);
    }
    75% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }

  }

}
</style>
