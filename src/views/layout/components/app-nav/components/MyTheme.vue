<template>
  <div class="my-theme">
    <i class="iconfont icon-tubiao02-xianxing" @click="openDrawer"></i>
    <!-- append-to-body 让层级最高 -->
    <el-drawer
      title="主题配置"
      v-model="drawer"
      direction="rtl"
      size="450px"
      append-to-body
    >
      11111
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'

const state = reactive({
  drawer: false
})

const openDrawer = () => {
  state.drawer = true
}

const { drawer } = toRefs(state)
</script>
