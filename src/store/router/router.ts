import { Module } from 'vuex'
import { rootState } from '../types'
import '@/mock/index'
import { getMenu } from '@/api/menu'
import { addRouter } from '@/utils/addRouter'

interface routerState {
  asyncRouters: Array<Object>
  sidebarRouters: Array<Object>
}

const routerModule: Module<routerState, rootState> = {
  namespaced: true,
  state() {
    return {
      // 动态路由信息
      asyncRouters: [],

      // 侧边菜单栏信息
      sidebarRouters: []
    }
  },
  mutations: {
    // 设置动态路由格式化后的数据
    setAsyncRouter: (state, routers) => {
      state.asyncRouters = routers
    },
    // 设置侧边菜单栏的数据
    setSidebarRouter: (state, routers) => {
      state.sidebarRouters = routers
    }
  },
  actions: {
    // 从后台获取动态路由
    async setAsyncRouterAction({ commit }) {
      const res = await getMenu()
      const routerRes = addRouter(res.data.menus)
      const asyncRouters = routerRes
      commit('setAsyncRouter', asyncRouters)
    },
    async setSidebarRouterAction({ commit }) {
      const res = await getMenu()
      const routerRes = addRouter(res.data.menus)
      const sidebarRouters = routerRes
      commit('setSidebarRouter', sidebarRouters)
    }
  },
  getters: {
    // 获取动态路由
    asyncRouters(state) {
      return state.asyncRouters
    }
  }
}

export default routerModule
