<template>
  <div class="app-header">
    <div class="left-menu">
      <hamburger></hamburger>
      <breadcrumb></breadcrumb>
    </div>
    <div class="right-menu">
      <!-- 全屏 -->
      <screenfull></screenfull>
      <!-- 国际化 -->
      <el-dropdown size="medium">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import Hamburger from './components/Hamburger.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import Screenfull from './components/Screenfull.vue'
import { useI18n } from 'vue-i18n'
import { toRefs } from '@vueuse/core'

type Language = {
  name: string
  value: string
}

export default defineComponent({
  name: 'AppHeader',
  components: {
    Hamburger,
    Breadcrumb,
    Screenfull
  },
  setup() {
    const { locale } = useI18n()

    // zh or en
    //console.log(locale.value)

    const store = useStore()

    const state = reactive({
      languages: [
        { name: 'English', value: 'en' },
        { name: '中文', value: 'zh' }
      ] as Array<Language>,
      handleLang: (lang: string) => {
        locale.value = lang
        store.dispatch('app/handleLang', lang)
      }
    })

    return {
      ...toRefs(state),
      lang: computed(() => store.state.app.lang)
    }
  }
})
</script>

<style scoped></style>
