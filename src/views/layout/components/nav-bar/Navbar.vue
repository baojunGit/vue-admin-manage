<template>
  <div class="navbar">
    <div class="left-menu">
      <hamburger></hamburger>
      <breadcrumb></breadcrumb>
    </div>
    <div class="right-menu">
      <!-- 全屏 -->
      <screenfull></screenfull>
      <!-- 国际化 -->
      <div
        class="inter"
        :title="langs ? '中文' : 'English'"
        @click="toggleLang"
      >
        <img :src="langs ? ch : en" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, unref } from 'vue'
import { useRoute } from 'vue-router'
import Hamburger from './components/Hamburger.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import Screenfull from './components/Screenfull.vue'
import ch from '@/assets/image/ch.png'
import en from '@/assets/image/en.png'
import { useI18n } from 'vue-i18n'
import ElementLocale from 'element-plus/lib/locale'
import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  name: 'Navbar',
  components: {
    Hamburger,
    Breadcrumb,
    Screenfull
  },
  setup() {
    let langs = ref(true)

    const { locale, t } = useI18n()

    const route = useRoute()

    console.log(route.meta.title)

    // 国际化语言切换
    const toggleLang = (): void => {
      langs.value = !langs.value
      if (langs.value) {
        locale.value = 'zh'
        ElementLocale.use(zhLocale)
      } else {
        locale.value = 'en'
        ElementLocale.use(enLocale)
      }
    }

    console.log(document.title)

    watch(
      () => langs.value,
      () => {
        // @ts-ignore
        // 通过 '@ts-ignore' 注释隐藏 .ts 文件中的错误
        // 动态title , 这里unref 如果参数是一个 ref 则返回它的 value，否则返回参数本身, 是 val = isRef(val) ? val.value : val 的语法糖
        document.title = t(unref(route.meta.title))
      }
    )

    return {
      langs,
      ch,
      en,
      toggleLang
    }
  }
})
</script>

<style scoped></style>
