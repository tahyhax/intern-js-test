<template lang="pug">
.task
  app-modal(
      v-if="isActiveForm"
      :isActive="!!taskToShow"
      @onClose="handlerCloseForm"
    )
      template(#header)
        | {{ taskToShow.title }}
      template(#body)
        app-task-card-detail(:task="taskToShow" @onSubmit="handlerFormSubmit")
  header.task__header
    h3 Today
    .task__header-actions
      app-button.button--primary(@click="handlerOpenForm")
        | New task
  .task__body
    transition-group(class="task__list" tag="div" name="bounce")
      task-item(v-for="(task, key) in tasks"
        :ref="setItemRef"
        :task="task"
        :index="key"
        :key="`task-${task._id}`"
        @onCompleteTask="handlerTaskUpdateStatus"
        @onEditTask="handlerTaskPreview"
        @onDestroyTask="handlerTaskDelete"
      )

</template>
<script lang="ts">
import { defineComponent, onBeforeUpdate, onMounted } from 'vue'
import TaskItem from '@/components/Task/TaskItem.vue'
import AppButton from '@/components/ui/AppButton.vue'
import useTask from '@/composables/useTask.ts'
import useModal from '@/composables/useModal'
import AppModal from '@/components/ui/AppModal.vue'
import AppTaskCardDetail from '@/components/ui/AppTaskCardDetail.vue'
import { ITask } from '@/types/task'

export default defineComponent({
  name: 'Tasks',
  components: {
    AppTaskCardDetail,
    AppModal,
    TaskItem,
    AppButton
  },
  setup: function () {
    const { tasks, taskToShow, handlerTaskSave, handlerTaskDelete, handlerTaskUpdateStatus, handlerTaskDetail } = useTask()
    const { isActiveForm, handlerOpenForm, handlerCloseForm } = useModal()

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

    const handlerFormSubmit = (task:ITask) => {
      handlerTaskSave(task)
      handlerCloseForm()
    }

    const handlerTaskPreview = (id) => {
      handlerTaskDetail(id)
      handlerOpenForm()
    }

    return {
      isActiveForm,
      tasks,
      taskToShow,
      setItemRef,
      handlerFormSubmit,
      handlerTaskPreview,
      handlerTaskDelete,
      handlerTaskUpdateStatus,
      handlerOpenForm,
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
