<template>
  <footer class="my-footer">
    Copyright @
    {{ fullYear }} vue3-admin-manage
  </footer>
</template>

<script setup lang="ts">
const fullYear = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.my-footer {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: $base-footer-height;
  padding: 0 $base-padding 0 $base-padding;
  color: rgba(0, 0, 0, 0.45);
  background: #fff;
  border-top: 1px dashed $base-border-color;

  i {
    margin: 0 5px;
  }
}
</style>
