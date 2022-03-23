import { defineStore } from 'pinia'

interface FeedbackType {
  openFeedback: boolean
}

export const useFeedbackStore = defineStore('feedback', {
  state: (): FeedbackType => ({
    openFeedback: false
  }),
  getters: {},
  actions: {
    /**
     * @description 反馈弹框的状态
     */
    setFeedbackDialog(openFeedback) {
      this.openFeedback = openFeedback
    }
  }
})
