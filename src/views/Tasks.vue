<template lang="pug">
.task
  app-modal(
      v-if="isTaskShow || isActiveForm.value"
      :isActive="isTaskShow"
      @onClose="handlerCloseForm"
    )
      template(#header)
        | {{ taskToShow.title }}
      template(#body)
        task-card-detail(:task="taskToShow" @onSubmit="handlerTaskSave")
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
        @onEditTask="handlerTaskDetail"
        @onDestroyTask="handlerTaskDelete"
      )

</template>
<script lang="ts">
import { defineComponent, onBeforeUpdate, onMounted, ref } from 'vue'
import TaskItem from '@/components/Task/TaskItem.vue'
import AppButton from '@/components/ui/AppButton.vue'
import useTask from '@/composables/useTask.ts'
import AppModal from '@/components/ui/AppModal.vue'
import TaskCardDetail from '@/components/Task/TaskCardDetail.vue'

export default defineComponent({
  name: 'Tasks',
  components: {
    TaskCardDetail,
    AppModal,
    TaskItem,
    AppButton
  },
  setup: function () {
    const isActiveForm = ref(false)
    const { tasks, taskToShow, isTaskShow, handlerTaskSave, handlerTaskDelete, handlerTaskUpdateStatus, handlerTaskDetail } = useTask()

    // поиидее должно вынетстить useModal
    const openForm = () => {
      isTaskShow.value = true
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
      tasks,
      taskToShow,
      isTaskShow,
      setItemRef,
      handlerTaskSave,
      handlerTaskDelete,
      handlerTaskUpdateStatus,
      handlerTaskDetail,
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
