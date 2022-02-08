<template>
  <div class="app-feedback">
    <el-dialog title="用户反馈" :append-to-body="false" v-model="openFeedback">
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useFeedbackStore } from '@/store/modules/feedback'
import { storeToRefs } from 'pinia'

const feedbackStore = useFeedbackStore()
const { openFeedback } = storeToRefs(feedbackStore)
</script>

<style lang="scss" scoped></style>
