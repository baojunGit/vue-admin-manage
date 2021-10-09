<template>
  <footer class="app-footer">
    <!-- 每个组件中间都有插槽，可以添加内容 -->
    <slot></slot>
  </footer>
</template>

<script lang="ts">
export default {
  name: 'appFooter'
}
</script>

<style lang="scss" scoped>
.app-footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
}
</style>
