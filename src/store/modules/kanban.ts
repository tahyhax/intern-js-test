import { IKanbanColumns } from '@/types/kanbanColumns'

const kanban = {
  namespaced: true,
  state: {
    columns: [
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
  },
  mutations: {},
  actions: {},
  getters: {}

}
export default kanban
