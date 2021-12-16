<template lang="pug">
.task
  header.task__header
    h3 Today
  .task__body
    task-form(@onSubmit="addTask")
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
import { defineComponent, onMounted, reactive } from 'vue'
import { ITasks } from '@/types/tasks'
import TaskForm from '@/components/Task/TaskFrom.vue'
import TaskItem from '@/components/Task/TaskItem.vue'
import { uuid } from '@/utils'

export default defineComponent({
  name: 'Tasks',
  components: {
    TaskForm,
    TaskItem
  },
  setup: function () {
    const tasks = reactive<Array<ITasks>>([
      {
        title: 'task 1',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: 'open',
        date: '2021-12-09 14:23'
      },
      {
        title: 'task 2',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: 'open',
        date: '2021-12-09 14:24'
      },
      {
        title: 'task 3',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: 'open',
        date: '2021-12-09 14:26'
      }
    ])
    const itemRefs: Array<HTMLElement> = []
    const setItemRef = (el: any) => {
      if (el) {
        itemRefs.push(el.$el)
      }
      return itemRefs
    }
    const addTask = (task: ITasks): void => {
      tasks.push(task)
    }
    const destroyTask = (index: number): void => {
      tasks.splice(index, 1)
    }

    const completeTask = (index: number): void => {
      tasks[index].status = 'complete'
    }
    // NOTE хотел сделать так но получил ошибку. Можешь сказать что я не так сделал ?
    // const fontScale = (list: [], delay: number, animationClass: string) => {
    //   list.every((el: HTMLElement, index) => {
    //     setTimeout(() => {
    //       el.classList.add(animationClass)
    //     }, index * delay)
    //   })
    // }

    onMounted(() => {
      itemRefs.forEach((el: HTMLElement, index) => {
        setTimeout(() => {
          el.classList.add('grow-animation')
        }, index * 150)
      })
      // NOTE TS2345: Argument of type 'HTMLElement[]' is not assignable to parameter of type '[]'. Target allows only 0 element(s) but source may have more.
      // fontScale(itemRefs, 100, 'grow-animation')
    })
    return { setItemRef, tasks, addTask, destroyTask, completeTask }
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
    text-transform: uppercase;
    opacity: 0.5;
    font-size: 14px;
    color: #131313;
    margin-bottom: 2px;
  }

  &__body {
    display: flex;
    flex-direction: column;
  }

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
    transform: scale(1.1, 1.1);
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
</style>
