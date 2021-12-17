<template lang="pug">
.kanban__column
  h3.kanban__title
    | {{column.name}}
  .kanban-task
    .kanban-task__list
      kanban-column-task(v-for="task in column.tasks" key="column.type" :task="task")
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { IKanbanColumns } from '@/types/kanbanColumns'
import KanbanColumnTask from '@/components/Kanban/KanbanColumnTask.vue'

export default defineComponent({
  name: 'KanbanColumn',
  components: { KanbanColumnTask },
  props: {
    column: {
      required: true,
      type: Object as PropType<IKanbanColumns>
    }
  }
})
</script>

<style lang="scss" scoped>
.kanban-task {
  &__list {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    padding: 0 0.6rem 0.5rem;
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

    &:last-of-type {
      margin-bottom: 0;
    }

    &:hover {
      background-color: #eee;
    }
  }
}
</style>
