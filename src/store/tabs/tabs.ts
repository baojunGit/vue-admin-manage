import { Module } from 'vuex'
import { RootState } from '../types'
// import { handleLocal } from '@/utils/storage'

interface TabsState {
  visitedRoutes: Array<any>
}

const tabsModule: Module<TabsState, RootState> = {
  namespaced: true,
  state() {
    return {
      visitedRoutes: []
    }
  },
  mutations: {
    /**
     * @description 添加标签页
     * @param state
     * @param route
     * @
     */
    /**
     * @description Object.assign(target, ...sources) 会将source里面的可枚举属性复制到target
     * @effect1 合并多个对象
     * @effect2 克隆对象
     * @effect3 更改属性的值
     */
    addVisitedRoute(state, route) {
      // 判断当前路由地址是否已存在
      const target = state.visitedRoutes.find(item => item.name === route.name)
      // 若存在，执行一段无意义的代码
      if (target) Object.assign(target, route)
      // 若不存在，添加到访问的路由集里
      else if (!target) state.visitedRoutes.push(Object.assign({}, route))
    },
    /**
     * @description 删除当前标签页
     * @param state
     * @param path
     */
    delVisitedRoute(state, path) {
      state.visitedRoutes.splice(
        state.visitedRoutes.findIndex(route => route.path === path),
        1
      )
    },
    /**
     * @description 删除当前及不可关闭标签页以外其它全部标签页
     * @param state
     * @param path
     */
    delOthersVisitedRoutes(state, path) {
      state.visitedRoutes = state.visitedRoutes.filter(
        route => route.meta.noClosable || route.path === path
      )
    },
    /**
     * @description 删除当前及不可关闭标签页左边全部标签页
     * @param state
     * @param path
     */
    delLeftVisitedRoutes(state, path) {
      let found = false
      state.visitedRoutes = state.visitedRoutes.filter(route => {
        if (route.path === path) found = true
        return route.meta.noClosable || found
      })
    },
    /**
     * @description 删除当前及不可关闭标签页右边全部标签页
     * @param state
     * @param path
     */
    delRightVisitedRoutes(state, path) {
      let found = false
      state.visitedRoutes = state.visitedRoutes.filter(route => {
        const close = found
        if (route.path === path) found = true
        return route.meta.noClosable || !close
      })
    },
    /**
     * @description 删除不可关闭标签页以外全部标签页
     * @param state
     */
    delAllVisitedRoutes(state) {
      state.visitedRoutes = state.visitedRoutes.filter(
        route => route.meta.noClosable
      )
    }
  },
  actions: {
    /**
     * @description 添加标签页
     * @param {*} { commit }
     * @param {*} route
     */
    addVisitedRoute({ commit }, route) {
      commit('addVisitedRoute', route)
    },
    /**
     * @description 删除当前标签页
     * @param {*} { commit }
     * @param {*} path
     */
    delVisitedRoute({ commit }, path) {
      commit('delVisitedRoute', path)
    },
    /**
     * @description 删除当前标签页以外其它全部标签页
     * @param {*} { commit }
     * @param {*} path
     */
    delOthersVisitedRoutes({ commit }, path) {
      commit('delOthersVisitedRoutes', path)
    },
    /**
     * @description 删除当前标签页左边全部标签页
     * @param {*} { commit }
     * @param {*} path
     */
    delLeftVisitedRoutes({ commit }, path) {
      commit('delLeftVisitedRoutes', path)
    },
    /**
     * @description 删除当前标签页右边全部标签页
     * @param {*} { commit }
     * @param {*} path
     */
    delRightVisitedRoutes({ commit }, path) {
      commit('delRightVisitedRoutes', path)
    },
    /**
     * @description 删除全部标签页
     * @param {*} { commit }
     */
    delAllVisitedRoutes({ commit }) {
      commit('delAllVisitedRoutes')
    }
  },
  getters: {
    visitedRoutes: state =>
      state.visitedRoutes.filter(route => route.name !== 'login')
  }
}

export default tabsModule
