import { Module } from 'vuex'
import { rootState } from '../types'
// import { handleLocal } from '@/utils/storage'

interface tabsState {
  visitedRoutes: Array<any>
}

const tabsModule: Module<tabsState, rootState> = {
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
     */
    addVisitedRoute(state, route) {
      const target = state.visitedRoutes.find(item => item.path === route.path)
      if (target && !route.meta.dynamicNewTab) Object.assign(target, route)
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
     * @description 删除当前标签页以外其它全部标签页
     * @param state
     * @param path
     */
    delOthersVisitedRoutes(state, path) {
      state.visitedRoutes = state.visitedRoutes.filter(
        route => route.meta.noClosable || route.path === path
      )
    },
    /**
     * @description 删除当前标签页左边全部标签页
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
     * @description 删除当前标签页右边全部标签页
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
    visitedRoutes(state) {
      return state.visitedRoutes.filter(route => route.name !== 'login')
    }
  }
}

export default tabsModule
