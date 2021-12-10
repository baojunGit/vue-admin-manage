import { Module } from 'vuex'
import { rootState } from '../types'

interface versionState {
  openRecord: boolean
}

const versionModule: Module<versionState, rootState> = {
  namespaced: true,
  state() {
    return {
      openRecord: false
    }
  },
  mutations: {
    // 设置token
    setDialogState(state, openRecord) {
      state.openRecord = openRecord
    }
  },
  actions: {
    setDialogState({ commit }, openRecord) {
      commit('setDialogState', openRecord)
    }
  },
  getters: {
    openRecord: state => state.openRecord
  }
}

export default versionModule
