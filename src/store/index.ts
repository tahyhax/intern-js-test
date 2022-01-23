import { createStore, Store } from 'vuex'
import task from '@/store/modules/task'
import kanban from '@/store/modules/kanban'
import activity from '@/store/modules/activity'
import VuexPersistence from 'vuex-persist'

const VuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    task,
    kanban,
    activity
  },
  plugins: [VuexLocal.plugin]
})
