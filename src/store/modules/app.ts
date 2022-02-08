import { defineStore } from 'pinia'
import { handleLocal } from '@/utils/storage'
import { getLang } from '@/locale'

interface AppType {
  opened: boolean
  lang: string
  introState: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppType => ({
    // ES6 引入了一个新的 Null 判断运算符??
    // 只有运算符左侧的值为null或undefined时，才会返回右侧的值, 属性的值如果为空字符串或false或0，默认值也会生效
    opened: handleLocal.get('sidebarStatus') ?? true,
    lang: getLang(), // 默认采用的国际化方案,初次进入，采用浏览器当前设置的语言，默认采用中文
    introState: handleLocal.get('introState') ?? true // 是否引导
  }),
  getters: {},
  actions: {
    /**
     * @description 侧边栏切换伸缩状态
     */
    toggleSidebar() {
      // console.log('执行mutations切换侧边栏')
      this.opened = !this.opened
      // state.sidebar.withoutAnimation = false
      handleLocal.set('sidebarStatus', this.opened)
      console.log(this.opened)
    },
    /**
     * @descript 切换语言类型
     * @param { string } lang 语言类型
     */
    toggleLang(lang) {
      this.lang = lang
      handleLocal.set('lang', this.lang)
    },
    /**
     * @description 关闭引导状态
     */
    closeIntro() {
      this.introState = false
      handleLocal.set('introState', false)
    }
  }
})
