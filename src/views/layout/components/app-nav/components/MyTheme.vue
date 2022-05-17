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
          <el-color-picker
            v-model="theme.themeColor"
            :predefine="predefineColors"
          />
        </div>
        <el-button @click="updateTheme">确定</el-button>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref } from 'vue'
import { useSettingStore } from '@/store/modules/setting'
import { storeToRefs } from 'pinia'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

const state = reactive({
  drawer: false
})

const openDrawer = () => {
  state.drawer = true
}

const settingStore = useSettingStore()

const { updateThemeColor } = settingStore

const { theme } = storeToRefs(settingStore)

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])

const updateTheme = async () => {
  const newStyle = await generateNewStyle(theme.value.themeColor)
  writeNewStyle(newStyle)
  updateThemeColor(theme.value.themeColor)
}

const { drawer } = toRefs(state)
</script>
