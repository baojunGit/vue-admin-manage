<template>
  <el-col :xl="span" :lg="span" :md="24" :sm="24" :xs="24">
    <div class="right-panel">
      <slot />
    </div>
  </el-col>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
const props = defineProps({
  span: {
    type: Number,
    default: () => 10
  }
})
const { span } = toRefs(props)
</script>
