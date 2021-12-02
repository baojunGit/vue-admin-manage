<template>
  <div class="page-refresh">
    <i class="iconfont icon-jiazai_shuaxin" @click="refreshRoute"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'PageRefresh',
  setup() {
    /**
     * @description getCurrentInstance获取当前组件实例
     * @proxy 获取挂载到全局中的方法
     */
    const { proxy }: any = getCurrentInstance()
    const refreshRoute = () => {
      proxy.$pub('reload-router-view')
    }
    return {
      refreshRoute
    }
  }
})
</script>

<style scoped></style>
