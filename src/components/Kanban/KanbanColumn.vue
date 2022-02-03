<template lang="pug">
.kanban__column(
      @drop="onDrop($event, column.type)"
      @dragover.prevent
      @dragenter.prevent
    )
  h3.kanban__title
    | {{column.name}} {{getCountTitle(column.tasks)}}
  .kanban-column
    .kanban-column__container(v-if="column.tasks.length")
      kanban-column-task.kanban-column__item(
        v-for="task in column.tasks"
        :key="task._id"
        :task="task"
        draggable="true"
        @dblclick="onTaskDetail(task._id)"
        @dragstart="onDragStart($event, task)"
      )
    .kanban-column__container--empty(v-else) No Tasks

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IKanbanColumns } from '@/types/kanbanColumns'
import KanbanColumnTask from '@/components/Kanban/KanbanColumnTask.vue'
import { ETaskStatus, ITask } from '@/types/task'
export default defineComponent({
  name: 'KanbanColumn',
  components: { KanbanColumnTask },
  props: {
    column: {
      required: true,
      type: Object as PropType<IKanbanColumns>
    }
  },
  setup: function (props, { emit }) {
    const getCountTitle = (items: []): string => {
      return items.length ? `- ${items.length}` : ''
    }
    const onTaskDetail = (taskId: string) => {
      emit('onTaskDetail', taskId)
    }
    const onDrop = (event: DragEvent, newStatus: ETaskStatus) => {
      const { dataTransfer } = event
      if (dataTransfer) {
        const item = JSON.parse(dataTransfer.getData('payload'))
        emit('onDrugTask', { item, newStatus })
      }
    }

    const onDragStart = (event: DragEvent, item: ITask) => {
      const { dataTransfer } = event
      if (dataTransfer) {
        dataTransfer.dropEffect = 'move'
        dataTransfer.effectAllowed = 'move'
        dataTransfer.setData('payload', JSON.stringify(item))
      }
    }

    return {
      getCountTitle,
      onTaskDetail,
      onDrop,
      onDragStart
    }
  }
})
</script>

<style lang="scss" scoped>
.kanban-column {
  &__container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    padding: 0 0.6rem 0.5rem;
    &--empty {
      font: 1.2em bold;
      padding: 15px;
      text-align: center;
      background-color: #fff;
    }
  }

  &__item {
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.3;
    background-color: #fff;
    padding: 0.65rem 0.6rem;
    color: #4d4d4d;
    border-bottom: 0.1rem solid #ccc;
    border-radius: 0.2rem;
    margin-bottom: 0.6rem;
    word-wrap: break-word;
    cursor: pointer;

    &:last-of-type {
      margin-bottom: 0;
    }

    &:hover {
      background-color: #eee;
    }
  }
}
</style>
