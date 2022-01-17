<template>
  <el-col :lg="span" :md="24" :sm="24" :xl="span" :xs="24">
    <div class="left-panel">
      <slot />
    </div>
  </el-col>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue'
const props = defineProps({
  span: {
    type: Number,
    default: () => 14
  }
})
const { span } = toRefs(props)
</script>
