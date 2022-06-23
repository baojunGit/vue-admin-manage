<!-- 四角边框效果 -->
<template>
  <div
    class="my-edging1"
    :style="{
      width: width,
      height: height,
      background: background
    }"
  >
    <div class="edging-wrap" :style="{ padding: padding }">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
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
  },
  // 背景色
  background: {
    type: String,
    require: true,
    default: () => ''
  }
})
</script>
<style lang="scss" scoped>
.my-edging1 {
  position: relative;
  .edging-wrap {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
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
