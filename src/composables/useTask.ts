import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { ETaskStatus, ITask } from '@/types/task'
import { taskActionTypes } from '@/store/modules/task.ts'

export default function useTask () {
  const store = useStore()
  const isTaskShow = ref<boolean>(false)
  const taskToShow = computed(() => store.state.task.task)
  const handleTaskDetail = (task: ITask) => {
    store.dispatch(`task/${taskActionTypes.GET_TASK}`, task._id)
    isTaskShow.value = true
  }
  // NOTE ТАска не должна ничего знать ха модальное окно
  const handlerOnCLose = () => {
    isTaskShow.value = false
  }

  const handlerCreate = (task: ITask) => {
    store.dispatch(`task/${taskActionTypes.ADD_TASK}`, task)
  }
  const handlerUpdate = (task: ITask) => {
    store.dispatch(`task/${taskActionTypes.UPDATE_TASK}`, task)
  }
  const handlerDelete = (taskId: string) => {
    store.dispatch(`task/${taskActionTypes.DELETE_TASK}`, taskId)
  }
  const handlerUpdateStatus = (payload: { taskId: string, nesStatus: ETaskStatus }) => {
    store.dispatch(`task/${taskActionTypes.UPDATE_TASK_STATUS}`, payload)
  }

  return {
    taskToShow,
    isTaskShow,
    handleTaskDetail,
    handlerOnCLose,
    handlerCreate,
    handlerUpdate,
    handlerDelete,
    handlerUpdateStatus
  }
}
