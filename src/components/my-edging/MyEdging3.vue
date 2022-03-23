<!-- 当鼠标移入一个元素的时候，元素出现一个动态的边框 -->
<template>
  <div
    class="my-edging3"
    :style="{
      width: width,
      height: height,
      padding: padding,
      background: background
    }"
  >
    <slot></slot>
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
.my-edging3 {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  // ease-in 加速 过渡时间0.3s
  transition: ease-in 0.3s;
  // 用四个linear-gradient线性渐变的背景来模拟四个边框
  // background-color不支持多个值,所有即便是纯色的边框，我们也只能使用渐变
  background: linear-gradient(0, #108b96 2px, #108b96 2px) no-repeat,
    linear-gradient(-90deg, #108b96 2px, #108b96 2px) no-repeat,
    linear-gradient(-180deg, #108b96 2px, #108b96 2px) no-repeat,
    linear-gradient(-270deg, #108b96 2px, #108b96 2px) no-repeat;
  // 设置背景图片的大小
  background-size: 0 2px, 2px 0, 0 2px, 2px 0;
  background-position: left top, right top, right bottom, left bottom;
  &:hover {
    background-size: 100% 2px, 2px 100%, 100% 2px, 2px 100%;
  }
}
</style>
