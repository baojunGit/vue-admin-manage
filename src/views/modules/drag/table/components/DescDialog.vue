<template>
  <el-dialog v-model="visible" title="指标描述">
    <div v-html="desc"></div>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, defineExpose } from 'vue'
const visible = ref(false)
const desc = ref('')
const init = param => {
  desc.value = param
  visible.value = true
}
defineExpose({
  init
})
</script>
<style lang="scss"></style>
