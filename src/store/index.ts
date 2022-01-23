import { createStore } from 'vuex'
import task from '@/store/modules/task'
import kanban from '@/store/modules/kanban'
import activity from '@/store/modules/activity'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    task,
    kanban,
    activity
  }
})
