<template lang="pug">
.task
  task-form(@onSubmit="handlerTaskCreate" @onCloseForm="handlerCloseForm" :isActiveForm="isActiveForm" )
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
        :key="`task-${task._id}`"
        @onCompleteTask="handlerTaskUpdateStatus"
        @onDestroyTask="handlerTaskDelete"
      )

</template>
<script lang="ts">
import { computed, defineComponent, onBeforeUpdate, onMounted, ref } from 'vue'
import TaskForm from '@/components/Task/TaskFrom.vue'
import TaskItem from '@/components/Task/TaskItem.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useStore } from 'vuex'
import useTask from '@/composables/useTask.ts'

export default defineComponent({
  name: 'Tasks',
  components: {
    TaskForm,
    TaskItem,
    AppButton
  },
  setup: function () {
    const store = useStore()
    const isActiveForm = ref(false)
    const tasks = computed(() => store.state.task.tasks)
    const { handlerCreate: handlerTaskCreate, handlerDelete: handlerTaskDelete, handlerUpdateStatus: handlerTaskUpdateStatus } = useTask()

    // поиидее должно вынетстить useModal
    const openForm = () => {
      isActiveForm.value = true
    }
    const handlerCloseForm = (): void => {
      isActiveForm.value = false
    }
    // ----------------

    let itemRefs: HTMLElement[] = []
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

    onMounted(() => {
      fontScale(itemRefs, 200, 'grow-animation')
    })
    onBeforeUpdate(() => {
      itemRefs = []
    })

    return {
      isActiveForm,
      setItemRef,
      tasks,
      handlerTaskCreate,
      handlerTaskDelete,
      handlerTaskUpdateStatus,
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
