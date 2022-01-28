<template>
  <!-- 不需要默认头部 with-header=false -->
  <el-drawer
    title="菜单分配"
    v-model="drawer"
    direction="rtl"
    :before-close="handleClose"
  >
    <el-tree
      :data="list"
      ref="menuTree"
      show-checkbox
      node-key="id"
      default-expand-all
    ></el-tree>
  </el-drawer>
</template>
<script setup lang="ts">
import { reactive, toRefs, defineExpose } from 'vue'
import { getMenuList } from '@/api/menu'
const state = reactive({
  drawer: false,
  list: []
})

const fetchData = async () => {}

const init = row => {
  state.drawer = true
  console.log(row)
}

const handleClose = () => {
  state.drawer = false
}

const { drawer, list } = toRefs(state)

defineExpose({
  init
})
</script>
<style lang="scss"></style>
