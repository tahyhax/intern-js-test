import { useStore } from 'vuex'
import { computed, reactive, ref } from 'vue'
import { IKanbanColumns } from '@/types/kanbanColumns'
import { ETaskStatus, ITask } from '@/types/task'
import { taskActionTypes } from '@/store/modules/task.ts'

export default function useKanban () {
  const store = useStore()
  const kanbanColumns = reactive(store.state.kanban.columns)
  const tasks = computed(() => store.state.task.tasks)
  const searchString = ref<string>('')
  const dateRange = ref([])

  const kanbanList = computed(() => {
    return kanbanColumns.map((column: IKanbanColumns) => {
      return {
        ...column,
        tasks: tasks.value
          .filter((item: ITask) => item.status === column.type)
          .filter((item: ITask) => {
            return !dateRange.value.length ||
              (+new Date(dateRange.value[0]) <= +new Date(item.date) && +new Date(dateRange.value[1]) >= +new Date(item.date))
          })
          .filter((item: ITask) => item.title.indexOf(searchString.value) !== -1)
      }
    })
  })
  const handlerDrugTask = (druggableData: { item: ITask, newStatus: ETaskStatus }) => {
    // eslint-disable-next-line no-return-assign
    const { item: droppableTask, newStatus } = druggableData
    if (droppableTask.status === ETaskStatus.done && newStatus === ETaskStatus.todo) {
      alert('You cannot perform this action. If the status of the task is Done, you cannot change the status in Todo')
      return false
    }
    store.commit(`task/${taskActionTypes.UPDATE_TASK_STATUS}`, { taskId: droppableTask._id, newStatus })
  }

  return {
    kanbanList,
    searchString,
    dateRange,
    handlerDrugTask
  }
}
