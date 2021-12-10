import { Module } from 'vuex'
import { rootState } from '../types'

interface feedbackState {
  openFeedback: boolean
}

const feedbackModule: Module<feedbackState, rootState> = {
  namespaced: true,
  state() {
    return {
      openFeedback: false
    }
  },
  mutations: {
    setDialogState(state, openFeedback) {
      state.openFeedback = openFeedback
    }
  },
  actions: {
    setDialogState({ commit }, openFeedback) {
      commit('setDialogState', openFeedback)
    }
  },
  getters: {
    openFeedback: state => state.openFeedback
  }
}

export default feedbackModule
