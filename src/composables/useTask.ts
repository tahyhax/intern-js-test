import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { ETaskStatus, ITask } from '@/types/task'
import { taskActionTypes } from '@/store/modules/task.ts'

export default function useTask () {
  const store = useStore()
  const isTaskShow = ref<boolean>(false)
  const tasks = computed(() => store.state.task.tasks)
  const taskToShow = computed(() => store.state.task.task)
  const handlerTaskDetail = (taskId: string) => {
    store.dispatch(`task/${taskActionTypes.GET_TASK}`, taskId)
    isTaskShow.value = true
  }
  // NOTE ТАска не должна ничего знать ха модальное окно
  const handlerOnCLose = () => {
    isTaskShow.value = false
  }

  const handlerTaskCreate = (task: ITask) => {
    store.dispatch(`task/${taskActionTypes.ADD_TASK}`, task)
  }
  const handlerTaskUpdate = (task: ITask) => {
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
    isTaskShow,
    handlerTaskDetail,
    handlerOnCLose,
    handlerTaskCreate,
    handlerTaskUpdate,
    handlerTaskDelete,
    handlerTaskUpdateStatus
  }
}
