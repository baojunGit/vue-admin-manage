<template>
  <div class="my-theme">
    <i class="iconfont icon-tubiao02-xianxing" @click="openDrawer"></i>
    <!-- append-to-body 让层级最高 -->
    <el-drawer
      title="主题配置"
      v-model="drawer"
      direction="rtl"
      size="300px"
      append-to-body
    >
      <el-scrollbar height="88vh">
        <div class="demo-color-block">
          <span class="demonstration">With default value</span>
          <el-color-picker v-model="color1" />
        </div>
      </el-scrollbar>
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

const updateTheme = () => {
  console.log(111)
}

const { drawer } = toRefs(state)
</script>
