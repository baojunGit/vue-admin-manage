<template>
  <!-- 不需要默认头部 with-header=false -->
  <el-drawer
    title="菜单分配"
    v-model="drawer"
    direction="rtl"
    :before-close="handleClose"
  >
    <span>Hi, there!</span>
  </el-drawer>
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue'
const state = reactive({
  drawer: true
})

const handleClose = () => {
  state.drawer = false
}

const { drawer } = toRefs(state)
</script>
<style lang="scss"></style>
