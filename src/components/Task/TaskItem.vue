<template lang="pug">
.task-item
  .task-item__wrap
    .task-item__icon(:class="'task-item__icon--' + task.status")
      img(src="@/assets/Icon@3x.svg")
    .task-item__body
      .task-item__content
        .task-item__text
          p {{ task.text }}
    .task-item__time {{ task.date }}
  .task-item__actions
    app-button.task-item__button.button--success(v-if="isTodo(task.status)" @click="completeTask(task._id)") Complete
    app-button.task-item__button.button--primary(@click="editTask(task._id)") Edit
    app-button.task-item__button.button--danger(@click="destroyTask(task._id)") Delete

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ETaskStatus, ITask } from '@/types/task'
import AppButton from '@/components/ui/AppButton.vue'

export default defineComponent({
  name: 'TaskItem',
  components: {
    AppButton
  },
  props: {
    task: {
      required: true,
      type: Object as PropType<ITask>
    },
    index: {
      required: true,
      type: Number
    }
  },
  setup (props, { emit }) {
    const completeTask = (taskId: string): void => {
      emit('onCompleteTask', { taskId, newStatus: ETaskStatus.done })
    }

    const destroyTask = (taskId: string):void => {
      emit('onDestroyTask', taskId)
    }
    const editTask = (taskId: string):void => {
      emit('onEditTask', taskId)
    }

    const isTodo = (status: string): boolean => {
      return status !== ETaskStatus.done
    }

    return { completeTask, destroyTask, editTask, isTodo }
  }
})
</script>

<style lang="scss" scoped>

.task-item {
  margin-bottom: 10px;
  font-size: 14px;
  color: #131313;
  padding: 10px 0;
  &--answer {
    max-width: 550px;
    align-self: center;
    font-size: 15px;
    padding: 20px 30px;
    border-radius: 10px;
    background-color: #f7f6f3;
  }
  &__wrap {
    display: flex;
  }
  &__icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 567px) {
      display: none;
    }

    &--complete {
      background-color: #cef9c6;
    }

    &--message {
      background-color: #fff8dd;
    }

    &--attachment {
      background-color: #e3efff;
    }
  }

  &__body {
    display: flex;
    flex: 1;
    font-size: 16px;
    line-height: 20px;
    justify-content: space-between;
  }

  &__content {
    max-width: 460px;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  &__attachment {
    display: flex;
    flex-wrap: wrap;
    align-self: self-start;
    margin: 0 -5px;
    margin-top: 20px;
  }

  &__attachment-item {
    padding: 0 5px;
    margin-bottom: 10px;

    & > img {
      border-radius: 8px;
    }
  }

  &__time {
    font-size: 14px;
    opacity: 0.7;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
  }

  &__button {
    margin-right: 5px;
    max-width: 75px;
    color: #ffffff;
  }
}
</style>
