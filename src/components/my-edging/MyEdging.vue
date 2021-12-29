<template>
  <div class="my-edging">
    <div class="edging-wrap" :style="{ width: width, height: height }">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
// 没用到props就不用声明const props = xxx
defineProps({
  // 边框宽度
  width: {
    type: String,
    require: true
  },
  // 边框高度
  height: {
    type: String,
    require: true
  }
})
</script>
<style lang="scss" scoped>
.my-edging {
  position: relative;
  background: rgba(0, 235, 255, 0.08);
  .edging-wrap {
    position: absolute;
    box-shadow: 0px 0px 10px 0px rgba(82, 255, 226, 0.23) inset;
    background: linear-gradient(to left, #00cda2, #00cda2) left top no-repeat,
      linear-gradient(to bottom, #00cda2, #00cda2) left top no-repeat,
      linear-gradient(to left, #00cda2, #00cda2) right top no-repeat,
      linear-gradient(to bottom, #00cda2, #00cda2) right top no-repeat,
      linear-gradient(to left, #00cda2, #00cda2) left bottom no-repeat,
      linear-gradient(to bottom, #00cda2, #00cda2) left bottom no-repeat,
      linear-gradient(to left, #00cda2, #00cda2) right bottom no-repeat,
      linear-gradient(to left, #00cda2, #00cda2) right bottom no-repeat;
    // 设置边角大小
    background-size: 3px 9px, 9px 3px, 3px 9px, 9px 3px;
  }
}
</style>
