// 多组件库的国际化和本地项目国际化兼容
import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { localesConfigs } from './config'

export const i18n = createI18n({
  locale: 'zh', // 设置默认语言
  fallbackLocale: 'en', // 设置备用语言
  messages: localesConfigs
})

export function usI18n(app: App) {
  app.use(i18n)
}
