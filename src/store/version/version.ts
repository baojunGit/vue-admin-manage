import { Module } from 'vuex'
import { RootState } from '../types'

interface VersionState {
  openRecord: boolean
}

const versionModule: Module<VersionState, RootState> = {
  namespaced: true,
  state() {
    return {
      openRecord: false
    }
  },
  mutations: {
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
