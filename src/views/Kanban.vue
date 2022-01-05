<template lang="pug">
section.kanban
  app-modal(
    v-if="isTaskShow"
    :isActive="isTaskShow"
    @onClose="handlerOnCLose"
  )
    template(#header)
      | {{ taskToShow.title }}
    template(#body)
      kanban-card-detail(:card="taskToShow")
  .kanban__container
    kanban-column(v-for="(column, key) in kanbanList"
    :column="column"
    :key="`kanban-${key}`"
    @onTaskDetail="handleTaskDetail"
    )
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from 'vue'
import KanbanColumn from '@/components/Kanban/KanbanColumn.vue'
import AppModal from '@/components/ui/AppModal.vue'
import KanbanCardDetail from '@/components/Kanban/KanbanCardDetail.vue'
import { ETaskStatus, ITask } from '@/types/task'
import { IKanbanColumns } from '@/types/kanbanColumns'
import { uuid } from '@/utils'

export default defineComponent({
  name: 'kanban',
  components: { AppModal, KanbanCardDetail, KanbanColumn },
  setup: function () {
    const kanbanColumns = [
      {
        name: 'To Do',
        type: 'todo'
      },
      {
        name: 'In progress',
        type: 'in-progress'

      },
      {
        name: 'Done',
        type: 'done'
      }
    ] as IKanbanColumns[]
    const tasks = reactive([
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
      },
      {
        _id: uuid(),
        title: 'task 1',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: ETaskStatus.inprogresss,
        date: '2021-12-09 14:23'
      },
      {
        _id: uuid(),
        title: 'task 2',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: ETaskStatus.inprogresss,
        date: '2021-12-09 14:24'
      },
      {
        _id: uuid(),
        title: 'task 3',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: ETaskStatus.inprogresss,
        date: '2021-12-09 14:26'
      },
      {
        _id: uuid(),
        title: 'task 1',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: ETaskStatus.done,
        date: '2021-12-09 14:23'
      },
      {
        _id: uuid(),
        title: 'task 2',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: ETaskStatus.done,
        date: '2021-12-09 14:24'
      },
      {
        _id: uuid(),
        title: 'task 3',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: ETaskStatus.done,
        date: '2021-12-09 14:26'
      }
    ]) as Array<ITask>
    const kanbanList = computed(() => {
      return kanbanColumns.map(column => {
        // eslint-disable-next-line no-return-assign
        column.tasks = tasks.filter((task) => task.status === column.type)
        return column
      })
    })

    const taskToShow = ref({})
    const isTaskShow = ref(false)
    const handleTaskDetail = (task:any) => {
      taskToShow.value = task
      isTaskShow.value = true
    }
    const handlerOnCLose = () => {
      isTaskShow.value = false
    }
    return { isTaskShow, taskToShow, handleTaskDetail, handlerOnCLose, kanbanList }
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
