import { Module } from 'vuex'
import { RootState } from '../types'

interface FeedbackState {
  openFeedback: boolean
}

const feedbackModule: Module<FeedbackState, RootState> = {
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
