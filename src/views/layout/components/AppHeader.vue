<template>
  <header class="app-header">
    <!-- 每个组件中间都有插槽，可以添加内容 -->
    <slot></slot>
    1111
  </header>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export interface UserProps {
  isLogin: boolean
  name?: string // 问号表示可选，可有可无
  id?: number
}
export default defineComponent({
  name: 'appHeader',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      require: true
    }
  }
})
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 10;
}
</style>
