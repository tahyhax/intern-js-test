import { EUserTask, IUser } from '@/types/user'

export enum userMutationTypes {
  CALCULATE_TASK_INFO = 'CALCULATE_TASK_INFO',
  UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION'
}

const store = {
  namespaced: true,
  state: {
    user: {
      lastname: 'Jean',
      firstname: 'Gonzales',
      position: 'Product Owner',
      logo: '../assets/images/8081b26e05bb4354f7d65ffc34cbbd67.jpeg', // NOTE  how  this  work
      notifications: 3,
      task: {
        open: 11,
        complete: 372
      }
    } as IUser
  },
  mutations: {
    [userMutationTypes.CALCULATE_TASK_INFO] (state, payload: { type: EUserTask, revertType: EUserTask }) {
      state.user.task[payload.type]--
      state.user.task[payload.revertType]++
    },
    [userMutationTypes.UPDATE_NOTIFICATION] (state, index:number) {
      state.user.notifications = index
    }
  },
  getters: {
    fullName: (state) => `${state.user.firstname} ${state.user.lastname}`
  }
}

export default store
