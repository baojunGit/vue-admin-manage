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
        <el-form ref="form" label-position="left" :model="theme">
          <el-form-item label="主题">
            <el-select v-model="theme.themeName" @change="updateTheme">
              <el-option
                key="blue-black"
                :label="translateTitle('蓝黑')"
                value="blue-black"
              />
              <el-option
                key="blue-white"
                :label="translateTitle('蓝白')"
                value="blue-white"
              />
              <el-option
                key="green-black"
                :label="translateTitle('绿黑')"
                value="green-black"
              />
              <el-option
                key="green-white"
                :label="translateTitle('绿白')"
                value="green-white"
              />
              <el-option
                key="purple-black"
                :label="translateTitle('紫黑')"
                value="purple-black"
              />
              <el-option
                key="purple-white"
                :label="translateTitle('紫白')"
                value="purple-white"
              />
              <!-- 红黑、红白主题完成群文档任务免费获取 -->
              <el-option
                key="red-black"
                :label="translateTitle('红黑')"
                value="red-black"
              />
              <el-option
                key="red-white"
                :label="translateTitle('红白')"
                value="red-white"
              />
              <el-option
                key="ocean"
                :label="translateTitle('渐变')"
                value="ocean"
              />
            </el-select>
          </el-form-item>
        </el-form>
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
