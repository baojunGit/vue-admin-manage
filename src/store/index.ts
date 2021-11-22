import { createStore } from 'vuex'
import { rootState } from './types'
import app from './app/app'
import router from './router/router'
import tabs from './tabs/tabs'

// createStore可以传入一个泛型
const store = createStore<rootState>({
  state() {
    return {
      name: 'baojun',
      age: 18
    }
  },
  mutations: {},
  actions: {},
  // 注册vuex模块
  modules: {
    app,
    router,
    tabs
  }
})

export default store
