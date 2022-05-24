<template>
  <div class="my-theme">
    <i class="iconfont icon-tubiao02-xianxing" @click="openDrawer"></i>
    <!-- append-to-body 让层级最高 -->
    <el-drawer
      title="项目配置"
      v-model="drawer"
      direction="rtl"
      size="400px"
      append-to-body
    >
      <el-scrollbar height="88vh">
        <el-form ref="form" label-position="left" :model="theme">
          <el-divider><h3>换肤配置</h3></el-divider>
          <el-form-item label="主题颜色">
            <el-switch
              style="color: #409eff"
              v-model="theme.themeModel"
              class="mt-2"
              inline-prompt
              :active-icon="Sunny"
              :inactive-icon="Moon"
              active-value="light"
              inactive-value="dark"
              @change="updateTheme"
            />
          </el-form-item>
          <el-form-item label="更多主题">
            <el-select v-model="theme.themeModel" @change="updateTheme">
              <el-option label="浅色" value="light" key="light"></el-option>
              <el-option label="深色" value="dark" key="dark"></el-option>
              <el-option
                label="蓝黑"
                value="blue-black"
                key="blue-black"
              ></el-option>
              <el-option
                label="蓝白"
                value="blue-white"
                key="blue-white"
              ></el-option>
              <el-option
                label="绿黑"
                value="green-black"
                key="green-black"
              ></el-option>
              <el-option
                label="绿白"
                value="green-white"
                key="green-white"
              ></el-option>
              <el-option
                label="紫黑"
                value="purple-black"
                key="purple-black"
              ></el-option>
              <el-option
                label="紫白"
                value="purple-white"
                key="purple-white"
              ></el-option>
              <el-option
                label="红黑"
                value="red-black"
                key="red-black"
              ></el-option>
              <el-option
                label="红白"
                value="red-white"
                key="red-white"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <template #footer>
        <el-button type="primary" @click="handleSaveTheme"> 保存 </el-button>
        <el-button @click="setDefaultTheme"> 恢复默认 </el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { useSettingStore } from '@/store/modules/setting'
import { storeToRefs } from 'pinia'
import { Sunny, Moon } from '@element-plus/icons-vue'
// import { generateNewStyle, writeNewStyle } from '@/utils/theme'

const state = reactive({
  drawer: false
})

const openDrawer = () => {
  state.drawer = true
}

const settingStore = useSettingStore()

const { updateTheme } = settingStore

const { theme } = storeToRefs(settingStore)

// const updateTheme = async () => {
//   const newStyle = await generateNewStyle(theme.value.themeColor)
//   writeNewStyle(newStyle)
//   updateThemeColor(theme.value.themeColor)
// }

const handleSaveTheme = () => {
  console.log(1111)
}

const setDefaultTheme = () => {
  console.log(2222)
}

const { drawer } = toRefs(state)
</script>
