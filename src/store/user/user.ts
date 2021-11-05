import { Module } from 'vuex'
import { rootState } from '../types'
import '@/mock/index'
import { getMenu } from '@/api/menu'
import { addRouter } from '@/utils/addRouter'

interface routerState {
  asyncRouters: Array<Object>
}

const userModule: Module<routerState, rootState> = {
  namespaced: true,
  state() {
    return {
      asyncRouters: []
    }
  },
  mutations: {
    // 格式化重置动态路由
    setAsyncRouter(state, asyncRouters) {
      state.asyncRouters = asyncRouters
    }
  },
  actions: {
    // 从后台获取动态路由
    async setRouterListAction({ commit }) {
      const res = await getMenu()
      const routerRes = addRouter(res.data.menus)
      const asyncRouters = routerRes
      commit('setAsyncRouter', asyncRouters)
    }
  },
  getters: {
    // 获取动态路由
    asyncRouters(state) {
      return state.asyncRouters
    }
  }
}

export default userModule
