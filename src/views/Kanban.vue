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
      kanban-card-detail(:card="taskToShow" @onSubmit="handlerSubmit")
  .kanban__container
    .kanban__filters.filters
      .filters__item
        input.filters__input.filters__input--search(v-model="searchString" placeholder="Search by title")
      .filters__item
        date-range(
          name="date"
          v-model="dateRange"
        )
    .kanban__board
      kanban-column(
        v-for="(column, key) in kanbanList"
        @onDrugTask="handlerDrugTask"
        :column="column"
        :key="`kanban-${key}`"
        @onTaskDetail="handleTaskDetail"
        )
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import KanbanColumn from '@/components/Kanban/KanbanColumn.vue'
import AppModal from '@/components/ui/AppModal.vue'
import KanbanCardDetail from '@/components/Kanban/KanbanCardDetail.vue'
import DateRange from '@/components/Form/fitlers/DateRange.vue'
import { ETaskStatus, ITask } from '@/types/task'
import { IKanbanColumns } from '@/types/kanbanColumns'
import { uuid } from '@/utils'

export default defineComponent({
  name: 'kanban',
  components: {
    AppModal,
    KanbanCardDetail,
    KanbanColumn,
    DateRange
  },
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
        date: '2022-01-08 14:23'
      },
      {
        _id: uuid(),
        title: 'task 2',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: ETaskStatus.todo,
        date: '2021-01-06 14:23'
      },
      {
        _id: uuid(),
        title: 'task 3',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: ETaskStatus.todo,
        date: '2022-01-20 14:23'
      },
      {
        _id: uuid(),
        title: 'task 1',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: ETaskStatus.inprogresss,
        date: '2022-01-20 14:23'
      },
      {
        _id: uuid(),
        title: 'task 2',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: ETaskStatus.inprogresss,
        date: '2022-01-20 14:23'
      },
      {
        _id: uuid(),
        title: 'task 3',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: ETaskStatus.inprogresss,
        date: '2022-01-20 14:23'
      },
      {
        _id: uuid(),
        title: 'task 1',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: ETaskStatus.done,
        date: '2022-01-20 14:23'
      },
      {
        _id: uuid(),
        title: 'task 2',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: ETaskStatus.done,
        date: '2022-01-20 14:23'
      },
      {
        _id: uuid(),
        title: 'task 3',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        status: ETaskStatus.done,
        date: '2022-01-20 14:23'
      }
    ]) as Array<ITask>

    const taskToShow = ref({})
    const isTaskShow = ref<boolean>(false)
    const searchString = ref<string>('')
    const dateRange = ref([])
    const kanbanList = computed(() => {
      return kanbanColumns.map(column => {
        return {
          ...column,
          tasks: tasks
            .filter((item: ITask) => {
              return !dateRange.value.length ||
                (+new Date(dateRange.value[0]) <= +new Date(item.date) && +new Date(dateRange.value[1]) >= +new Date(item.date))
            })
            .filter((item: ITask) => item.title.indexOf(searchString.value) !== -1)
            .filter((task) => task.status === column.type)
        }
      })
    })

    const handleTaskDetail = (task: ITask) => {
      taskToShow.value = task
      isTaskShow.value = true
    }
    const handlerOnCLose = () => {
      isTaskShow.value = false
      taskToShow.value = {}
    }
    const handlerSubmit = (task: ITask) => {
      // eslint-disable-next-line no-return-assign
      const taskIndex = tasks.findIndex(item => item._id === task._id)
      tasks.splice(taskIndex, 1, task)
      handlerOnCLose()
    }
    const handlerDrugTask = (druggableData: { item: ITask, newStatus: ETaskStatus }) => {
      // eslint-disable-next-line no-return-assign
      const {
        item: droppableTask,
        newStatus
      } = druggableData
      if (droppableTask.status === ETaskStatus.done && newStatus === ETaskStatus.todo) {
        alert('You cannot perform this action. If the status of the task is Done, you cannot change the status in Todo')
        return false
      }
      const taskIndex = tasks.findIndex(item => item._id === droppableTask._id)
      const task = tasks.splice(taskIndex, 1)[0]
      task.status = newStatus
      tasks.splice(taskIndex, 0, task)
    }
    return {
      isTaskShow,
      taskToShow,
      searchString,
      dateRange,
      kanbanList,
      handleTaskDetail,
      handlerOnCLose,
      handlerDrugTask,
      handlerSubmit
    }
  }
})
</script>

<style lang="scss" itemscope>
.kanban {
  width: 100%;

  &__container {
    padding: 0 0.8rem 0.8rem;
  }

  &__filters {
    display: flex;
    padding: 15px 0;
    margin-bottom: 10px;
    background-color: #ffffff;
  }

  &__board {
    display: flex;
    align-items: flex-start;
  }

  &__column {
    display: flex;
    flex-direction: column;
    background-color: #e2e4e6;
    max-height: calc(100vh - 11.8rem);
    border-radius: 0.3rem;
    margin-right: 1rem;
    max-width: calc(100% / 3);
    min-width: calc(100% / 3 - 1rem);

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

  .filters {
    display: flex;

    &__item {
      padding: 0 10px;
    }

    &__input {
      padding: 10px;
      background: #eaeaea;
      border-radius: 10px;
      outline: none;
      max-width: 100%;

      &--serach {
      }
    }
  }
}
</style>
