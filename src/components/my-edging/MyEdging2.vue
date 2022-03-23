<template>
  <div class="my-edging2" :style="{ width: width, height: height }">
    <div class="edging-wrap" :style="{ padding: padding }">
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
    require: true,
    default: () => '100%'
  },
  // 边框高度
  height: {
    type: String,
    require: true,
    default: () => '100%'
  },
  // 内边距
  padding: {
    type: String,
    require: true,
    default: () => '10px'
  }
})
</script>
<style lang="scss" scoped>
.my-edging2 {
  position: relative;
  background: rgba(0, 235, 255, 0.08);
  // 边框盒子
  .edging-wrap {
    box-sizing: border-box;
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
    // 旋转的主体元素
    &::before {
      content: '';
      position: absolute;
      z-index: -2;
      left: -50%;
      top: -50%;
      width: 200%;
      height: 200%;
      background-color: #1a232a;
      background-repeat: no-repeat;
      background-position: 0 0;
      background-image: conic-gradient(
        transparent,
        rgba(0, 205, 162, 1),
        transparent 30%
      );
      animation: rotate 4s linear infinite;
    }
    // 遮罩层的层级，留个边框
    &::after {
      content: '';
      position: absolute;
      z-index: -1;
      left: 6px;
      top: 6px;
      width: calc(100% - 12px);
      height: calc(100% - 12px);
      background: #000;
      border-radius: 5px;
    }
  }
}
</style>
