<template>
  <div class="app-nav">
    <el-row :gutter="15">
      <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="4">
        <div class="left-panel">
          <hamburger></hamburger>
          <breadcrumb></breadcrumb>
        </div>
      </el-col>
      <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="20">
        <div class="right-panel">
          <!-- 通知 -->
          <my-notice class="my-notice"></my-notice>
          <!-- 全屏 -->
          <my-screen-full class="my-screenfull" />
          <!-- 国际化 -->
          <div id="international" class="international">
            <el-dropdown>
              <span class="el-dropdown-link">
                <i style="font-size: 20px" class="iconfont icon-wenzi"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="item in languages"
                    :key="item.value"
                    :disabled="lang === item.value"
                  >
                    <span @click="handleLang(item.value)">{{ item.name }}</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <!-- 页面刷新 -->
          <page-refresh class="page-refresh"></page-refresh>
          <!-- 头像模块 -->
          <my-avatar class="my-avatar"></my-avatar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { useAppStore } from '@/store/modules/app'
import {
  Hamburger,
  Breadcrumb,
  MyNotice,
  PageRefresh,
  MyAvatar
} from './components/index'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

interface Language {
  name: string
  value: string
}

const { locale } = useI18n()

// zh or en
//console.log(locale.value)
const appStore = useAppStore()
const { toggleLang } = appStore
const { lang } = storeToRefs(appStore)

const state = reactive({
  languages: [
    { name: 'English', value: 'en' },
    { name: '中文', value: 'zh' }
  ] as Array<Language>,
  handleLang: (lang: string) => {
    locale.value = lang
    toggleLang(lang)
  }
})

const { languages, handleLang } = toRefs(state)
</script>

<style scoped></style>
