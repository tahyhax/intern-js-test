import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { ETaskStatus, ITask } from '@/types/task'
import { taskActionTypes, taskMutationTypes } from '@/store/modules/task.ts'

export default function useTask () {
  const store = useStore()
  const tasks = computed(() => store.state.task.tasks)
  const taskToShow = computed(() => store.state.task.task)
  store.dispatch(`task/${taskActionTypes.GET_TASKS_LIST}`)

  const handlerTaskDetail = (taskId: string) => {
    store.dispatch(`task/${taskActionTypes.GET_TASK}`, taskId)
  }
  const clearTaskToShow = () => {
    store.commit(`task/${taskMutationTypes.CLEAR_TASK}`)
  }

  const handlerTaskSave = (task: ITask) => {
    !task._id ? createTask(task) : updateTask(task)
  }

  const createTask = (task: ITask) => {
    store.dispatch(`task/${taskActionTypes.ADD_TASK}`, { task })
  }

  const updateTask = (task: ITask) => {
    store.dispatch(`task/${taskActionTypes.UPDATE_TASK}`, task)
  }

  const handlerTaskDelete = (taskId: string) => {
    store.dispatch(`task/${taskActionTypes.DELETE_TASK}`, taskId)
  }

  const handlerTaskUpdateStatus = (payload: { taskId: string, nesStatus: ETaskStatus }) => {
    store.dispatch(`task/${taskActionTypes.UPDATE_TASK_STATUS}`, payload)
  }

  return {
    tasks,
    taskToShow,
    clearTaskToShow,
    handlerTaskDetail,
    handlerTaskSave,
    handlerTaskDelete,
    handlerTaskUpdateStatus
  }
}
