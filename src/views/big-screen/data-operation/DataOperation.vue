<template>
  <div id="data-operation">
    <div class="data-operation-wrap" ref="screen">
      <div class="bg">
        <div v-if="loading" :v-loading="true"></div>
        <!-- 主体部分内容 -->
        <div v-else class="host-body">主体内容</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
// 自适应配置方法
import adaptive from '@/utils/adaptive'
// 适配处理
const { screen, calcRate, windowDraw, unWindowDraw } = adaptive()
// 生命周期
onMounted(() => {
  // todo 屏幕适应
  windowDraw()
  calcRate()
})

onBeforeUnmount(() => {
  unWindowDraw()
})
const loading = ref(true)
</script>
<style lang="scss">
@import './DataOperation.scss';
</style>
