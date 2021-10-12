// element-plus国际化
import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'

// 菜单国际化配置
import menusConfig from './menu'

const localesList = [menusConfig]

export const localesConfigs = {
  zh: {
    message: Object.assign({}, ...localesList.map(v => v.zh.message)),
    ...zhLocale
  },
  en: {
    message: Object.assign({}, ...localesList.map(v => v.en.message)),
    ...enLocale
  }
}
