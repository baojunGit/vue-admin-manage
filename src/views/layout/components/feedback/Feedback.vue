<template>
  <div class="app-feedback">
    <el-dialog
      title="用户反馈"
      :append-to-body="false"
      v-model="store.state.feedback.openFeedback"
    >
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
const store = useStore()
</script>

<style lang="scss" scoped></style>
