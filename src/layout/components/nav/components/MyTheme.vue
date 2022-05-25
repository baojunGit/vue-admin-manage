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
          <!-- <el-form-item label="更多主题">
            <el-select v-model="theme.themeModel" @change="updateTheme">
              <el-option label="浅色" value="light" key="light"></el-option>
              <el-option label="深色" value="dark" key="dark"></el-option>
              <el-option
                label="蓝黑"
                value="blue-dark"
                key="blue-dark"
              ></el-option>
              <el-option
                label="蓝白"
                value="blue-light"
                key="blue-light"
              ></el-option>
              <el-option
                label="绿黑"
                value="green-dark"
                key="green-dark"
              ></el-option>
              <el-option
                label="绿白"
                value="green-light"
                key="green-light"
              ></el-option>
              <el-option
                label="紫黑"
                value="purple-dark"
                key="purple-dark"
              ></el-option>
              <el-option
                label="紫白"
                value="purple-light"
                key="purple-light"
              ></el-option>
              <el-option
                label="红黑"
                value="red-dark"
                key="red-dark"
              ></el-option>
              <el-option
                label="红白"
                value="red-light"
                key="red-light"
              ></el-option>
              <el-option label="渐变" value="ocean" key="ocean"></el-option>
            </el-select>
          </el-form-item> -->
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

const state = reactive({
  drawer: false
})

const openDrawer = () => {
  state.drawer = true
}

const settingStore = useSettingStore()

const { updateTheme } = settingStore

const { theme } = storeToRefs(settingStore)

const handleSaveTheme = () => {
  console.log(1111)
}

const setDefaultTheme = () => {
  console.log(2222)
}

const { drawer } = toRefs(state)
</script>
