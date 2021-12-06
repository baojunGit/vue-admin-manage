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

<script lang="ts">
import { defineComponent } from 'vue'
import { useFullscreen } from '@vueuse/core'
export default defineComponent({
  name: 'Screenfull',
  setup() {
    const { isFullscreen, toggle } = useFullscreen()
    // console.log(isFullscreen)
    return {
      isFullscreen,
      toggle
    }
  }
})
</script>
