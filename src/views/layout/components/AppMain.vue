<template>
  <main class="app-main">
    <!-- 每个组件中间都有插槽，可以添加内容 -->
    <slot></slot>
  </main>
</template>

<script lang="ts">
export default {
  name: 'appMain'
}
</script>

<style lang="scss" scoped>
.app-main {
  overflow: auto;
  flex: 1;
}
</style>
