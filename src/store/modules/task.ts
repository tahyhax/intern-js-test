import { ETaskStatus, ITask } from '@/types/task'
import TaskService from '@/services/task.service'

export enum taskActionTypes {
  GET_TASKS_LIST = 'GET_TASKS_LIST',
  GET_TASK = 'GET_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  ADD_TASK = 'ADD_TASK',
  DELETE_TASK = 'DELETE_TASK',
  UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS',
}

export enum taskMutationTypes {
  GET_TASKS_LIST = 'GET_TASKS_LIST',
  GET_TASK = 'GET_TASK',
  ADD_TASK = 'ADD_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS',
}

export interface ITasksStore {
  tasks: ITask[];
  task: ITask
}

const task = {
  namespaced: true,
  state: {
    tasks: [] as ITask[],
    task: {} as ITask || undefined
  },
  mutations: {
    [taskMutationTypes.GET_TASKS_LIST] (state: ITasksStore, payload: ITask[]) {
      state.tasks = payload
    },
    [taskMutationTypes.GET_TASK] (state: ITasksStore, payload: ITask) {
      state.task = payload
    },
    [taskMutationTypes.UPDATE_TASK] (state: ITasksStore, payload: ITask) {
      state.tasks[state.tasks.findIndex((item: ITask) => item._id === payload._id)] = payload
    },
    [taskMutationTypes.ADD_TASK] (state: ITasksStore, payload: ITask) {
      state.tasks.push(payload)
    },
    [taskMutationTypes.UPDATE_TASK_STATUS] (state: ITasksStore, payload:ITask) {
      state.tasks[state.tasks.findIndex((item: ITask) => item._id === payload._id)].status = payload.status
    }
  },
  actions: {
    async [taskActionTypes.GET_TASKS_LIST] ({ state, commit }) {
      try {
        const list = await TaskService.get()
        commit(taskMutationTypes.GET_TASKS_LIST, list)
      } catch (error) {
        console.log(error)
      }
    },
    async [taskActionTypes.GET_TASK] ({ state: ITasksStore, commit }, taskId: string) {
      try {
        const task = await TaskService.getById(taskId)
        commit(taskMutationTypes.GET_TASK, task)
      } catch (error) {
        console.log(error)
      }
    },
    async [taskActionTypes.UPDATE_TASK] ({ state: ITasksStore, commit }, task: ITask) {
      try {
        const taskUpdated = await TaskService.update(task._id, task)
        commit(taskMutationTypes.UPDATE_TASK, taskUpdated)
      } catch (error) {
        console.log(error)
      }
    },

    async [taskActionTypes.ADD_TASK] ({ state: ITasksStore, commit }, payload: ITask) {
      try {
        const task = await TaskService.add(payload)
        commit(taskMutationTypes.ADD_TASK, task)
      } catch (error) {
        console.log(error)
      }
    },
    async [taskActionTypes.DELETE_TASK] ({ state: ITasksStore, commit }, taskId: string) {
      try {
        const tasks = await TaskService.delete(taskId)
        commit(taskMutationTypes.GET_TASKS_LIST, tasks)
      } catch (error) {
        console.log(error)
      }
    },
    async [taskActionTypes.UPDATE_TASK_STATUS] ({ state: ITasksStore, commit }, payload: { taskId: string, newStatus: ETaskStatus }) {
      try {
        const task = await TaskService.updateStatus(payload.taskId, payload.newStatus)
        commit(taskMutationTypes.UPDATE_TASK_STATUS, task)
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {}
}
export default task
