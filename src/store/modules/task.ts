import { uuid } from '@/utils'
import { ETaskStatus, ITask } from '@/types/task'

export enum taskActionTypes {
  GET_TASK = 'GET_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  ADD_TASK = 'ADD_TASK',
  DELETE_TASK = 'DELETE_TASK',
  UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS',
}

export enum taskMutationTypes {
  GET_TASK = 'GET_TASK',
  ADD_TASK = 'ADD_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS',
}
export interface ITasksStore {
  tasks: ITask[];
  task: ITask
}

const task = {
  namespaced: true,
  state: {
    tasks: [
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
    ] as ITask[],
    task: {} as ITask || undefined
  },
  mutations: {
    [taskMutationTypes.GET_TASK] (state: ITasksStore, payload:ITask) {
      state.task = payload
    },
    [taskMutationTypes.UPDATE_TASK] (state: ITasksStore, payload:ITask) {
      state.tasks[state.tasks.findIndex((item:ITask) => item._id === payload._id)] = payload
    },
    [taskMutationTypes.ADD_TASK] (state: ITasksStore, payload:ITask) {
      state.tasks.push(payload)
    },
    [taskMutationTypes.DELETE_TASK] (state: ITasksStore, taskId:string) {
      state.tasks.splice(state.tasks.findIndex((item:ITask) => item._id === taskId), 1)
    },
    [taskMutationTypes.UPDATE_TASK_STATUS] (state: ITasksStore, payload:{ taskId: string, newStatus: ETaskStatus }) {
      console.log(state.tasks[state.tasks.findIndex((item: ITask) => item._id === payload.taskId)])
      state.tasks[state.tasks.findIndex((item: ITask) => item._id === payload.taskId)].status = payload.newStatus
    }
  },
  actions: {
    [taskActionTypes.GET_TASK] ({ state, commit }, taskId: string) {
      // eslint-disable-next-line no-return-assign
      const task = state.tasks.find((item: ITask) => item._id === taskId)
      commit(taskMutationTypes.GET_TASK, task)
    },
    [taskActionTypes.UPDATE_TASK] ({ state, commit }, task:ITask) {
      commit(taskMutationTypes.UPDATE_TASK, task)
    },
    [taskActionTypes.ADD_TASK] ({ state, commit }, task:ITask) {
      commit(taskMutationTypes.ADD_TASK, task)
    },
    [taskActionTypes.DELETE_TASK] ({ state, commit }, taskId:string) {
      commit(taskMutationTypes.DELETE_TASK, taskId)
    },
    [taskActionTypes.UPDATE_TASK_STATUS] ({ state, commit }, payload:{ taskId: string, newStatus: ETaskStatus }) {
      commit(taskMutationTypes.UPDATE_TASK_STATUS, payload)
    }
  },
  getters: {}
}
export default task
