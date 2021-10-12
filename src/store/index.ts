import { createStore } from 'vuex'
import { IRootState } from './types'
import app from './app/app'

// createStore可以传入一个泛型
const store = createStore<IRootState>({
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
    app
  }
})

export default store