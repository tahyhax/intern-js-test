<template lang="pug">
section.kanban
  .kanban__container
    kanban-column(v-for="(column, key) in kanbanList"
    :column="column"
    :key="`kanban-${key}`"
    )
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import KanbanColumn from '@/components/Kanban/KanbanColumn.vue'
import { ETaskStatus } from '@/types/task'
import { IKanban } from '@/types/kanban'

export default defineComponent({
  name: 'kanban',
  components: { KanbanColumn },
  setup () {
    const kanbanList = reactive([
      {
        name: 'To Do',
        type: 'todo',
        tasks: [
          {
            title: 'task 1',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
            status: ETaskStatus.todo,
            date: '2021-12-09 14:23'
          },
          {
            title: 'task 2',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
            status: ETaskStatus.todo,
            date: '2021-12-09 14:24'
          },
          {
            title: 'task 3',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
            status: ETaskStatus.todo,
            date: '2021-12-09 14:26'
          }
        ]
      },
      {
        name: 'In progress',
        type: 'in-progress',
        tasks: [
          {
            title: 'task 1',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
            status: ETaskStatus.inprogresss,
            date: '2021-12-09 14:23'
          },
          {
            title: 'task 2',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
            status: ETaskStatus.inprogresss,
            date: '2021-12-09 14:24'
          },
          {
            title: 'task 3',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
            status: ETaskStatus.inprogresss,
            date: '2021-12-09 14:26'
          }
        ]
      },
      {
        name: 'Done',
        type: 'done',
        tasks: [
          {
            title: 'task 1',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
            status: ETaskStatus.done,
            date: '2021-12-09 14:23'
          },
          {
            title: 'task 2',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
            status: ETaskStatus.done,
            date: '2021-12-09 14:24'
          },
          {
            title: 'task 3',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
            status: ETaskStatus.done,
            date: '2021-12-09 14:26'
          }
        ]
      }
    ]) as Array<IKanban>
    return { kanbanList }
  }
})
</script>

<style lang="scss" itemscope>
.kanban {
  &__container {
    display: flex;
    align-items: flex-start;
    padding: 0 0.8rem 0.8rem;
  }
  &__column {
    display: flex;
    flex-direction: column;
    background-color: #e2e4e6;
    max-height: calc(100vh - 11.8rem);
    border-radius: 0.3rem;
    margin-right: 1rem;
    max-width: calc(100% / 3);
    &:last-of-type {
      margin-right: 0;
    }
  }
  &__title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #333;
    padding: 1rem;
  }
}
</style>
