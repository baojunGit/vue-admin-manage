<template>
  <div class="screen-full" @click="toggle">
    <i
      :class="
        isFullscreen
          ? 'iconfont icon-quanping6-xianxing'
          : 'iconfont icon-quanping5-xianxing'
      "
    ></i>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
// console.log(isFullscreen)
</script>
