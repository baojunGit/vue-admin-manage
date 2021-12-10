<template>
  <div class="app-feedback">
    <el-dialog
      title="用户反馈"
      :append-to-body="false"
      v-model="$store.state.feedback.openFeedback"
    >
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Feedback',
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped></style>
