<template>
  <div class="my-theme">
    <i class="iconfont icon-tubiao02-xianxing" @click="openDrawer"></i>
    <!-- append-to-body 让层级最高 -->
    <el-drawer
      title="主题配置"
      v-model="drawer"
      direction="rtl"
      size="400px"
      append-to-body
    >
      <el-scrollbar height="88vh">
        <div class="demo-color-block">
          <span class="demonstration">主题色更换</span>
          <el-color-picker v-model="theme.themeColor" />
        </div>
        <el-button @click="updateTheme">确定</el-button>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { useSettingStore } from '@/store/modules/setting'
import { storeToRefs } from 'pinia'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

const settingStore = useSettingStore()

const { updateThemeColor } = settingStore

const { theme } = storeToRefs(settingStore)

const state = reactive({
  drawer: false
})

const openDrawer = () => {
  state.drawer = true
}

const updateTheme = async () => {
  const newStyle = await generateNewStyle(theme.value.themeColor)
  writeNewStyle(newStyle)
  updateThemeColor(theme.value.themeColor)
}

const { drawer } = toRefs(state)
</script>
