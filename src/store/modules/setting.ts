import { defineStore } from 'pinia'
import { handleLocal, handleSession } from '@/utils/storage'
import { getLang } from '@/locale'
import { themeType, themeColor } from '@/config'
// import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { themeTypes } from '@/utils/theme'

type ThemeColor =
  | 'blue-black'
  | 'blue-white'
  | 'green-black'
  | 'green-white'
  | 'ocean'
  | 'red-white'
  | 'red-black'
  | string

interface ThemeType {
  // 主题模式
  themeType: string
  // 主题颜色
  themeColor: ThemeColor
}

const defaultTheme: ThemeType = {
  themeType: themeType,
  themeColor: themeColor
}

interface SettingType {
  opened: boolean
  lang: string
  driverState: boolean
  mobile: boolean
  theme: ThemeType
}

export const useSettingStore = defineStore('setting', {
  state: (): SettingType => ({
    // ES6 引入了一个新的 空值合并操作符??
    // 当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数
    opened: handleLocal.get('sidebarStatus') ?? true,
    lang: getLang(), // 默认采用的国际化方案,初次进入，采用浏览器当前设置的语言，默认采用中文
    driverState: handleSession.get('driverState') ?? true, // 是否引导
    mobile: false,
    theme: handleLocal.get('theme') || { ...defaultTheme }
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
      // console.log(this.opened)
    },
    /**
     * @descript 切换语言类型
     * @param { string } lang 语言类型
     */
    toggleLang(lang) {
      this.lang = lang
      handleLocal.set('lang', lang)
    },
    /**
     * @description 关闭引导状态
     */
    closeIntro() {
      this.driverState = false
      handleSession.set('driverState', false)
    },
    /**
     * @description 判断是否移动端
     */
    toggleMobile(mobile) {
      this.mobile = mobile
    },
    updateTheme() {
      const themeTypeObj = themeTypes[this.theme.themeType]
      handleLocal.set('theme', this.theme)
      // 设置css 变量
      Object.keys(themeTypeObj).map(item => {
        document.documentElement.style.setProperty(item, themeTypeObj[item])
      })
      // const index = this.theme.themeColor.indexOf('-')
      // const themeColor = this.theme.themeColor.substring(0, index) || 'blue'
      // let variables = require(`@/styles/variables/${themeColor}-var.module.scss`)
      // if (variables.default) variables = variables.default
      // console.log(variables['my-color-primary'])
      // generateNewStyle(variables['my-color-primary']).then(newStyle => {
      //   writeNewStyle(newStyle)
      // })
    }
  }
})
