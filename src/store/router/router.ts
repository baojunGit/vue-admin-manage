import { Module } from 'vuex'
import { RootState } from '../types'
import '@/mock/index'
import { getMenu } from '@/api/menu'
import { addRouter } from '@/utils/useRouter'
import { asyncRoutes } from '@/router'

interface RouterState {
  routes: Array<Object>
  sidebarRouters: Array<Object>
}

const routerModule: Module<RouterState, RootState> = {
  namespaced: true,
  state() {
    return {
      // 动态路由信息
      routes: [],

      // 侧边菜单栏信息
      sidebarRouters: []
    }
  },
  mutations: {
    // 设置动态路由格式化后的数据
    setRoutes: (state, routers) => {
      state.routes = routers
    },
    // 设置侧边菜单栏的数据
    setSidebarRouter: (state, routers) => {
      state.sidebarRouters = routers
    }
  },
  actions: {
    // 从后台获取动态路由
    async setRoutes({ commit }) {
      // 默认前端路由
      const res = await getMenu()
      const routerRes = addRouter(res.data.menus)
      // console.log(routerRes)
      const routes = [...asyncRoutes, ...routerRes]
      // console.log(routes)
      commit('setRoutes', routes)
    },
    async setSidebarRouter({ commit }) {
      const res = await getMenu()
      const routerRes = addRouter(res.data.menus)
      const sidebarRouters = routerRes
      commit('setSidebarRouter', sidebarRouters)
    }
  },
  getters: {
    // 获取动态路由
    routes: state => state.routes
  }
}

export default routerModule
