import { createApp } from 'vue'
import { setup } from '@/utils/global'
import App from './App.vue'
import router from './router'
// 权限配置
import './permission'
import store from './store'
// 与vue.config.js中的全局css配置区分，纯样式只要在公共入口导入就行
import 'normalize.css/normalize.css'
import './style/index.scss'
import '@/assets/font/iconfont.css'
// import appComponent from '@/component/index'
import { useElementPlus } from './plugins/element-plus'
//
import i18n from './locale'
// import命令会被 JavaScript 引擎静态分析，不能放在代码块里（if代码中）
// import()函数支持动态加载模块和按条件导入，可以放在代码块里（if代码中）
// 至于true为什么要加引号，大家体验一下不加的情况就能明白了，.env.development文件中的value都自动加了引号。
// console.log(process.env.VUE_APP_MOCK,typeof process.env.VUE_APP_MOCK)
process.env.VUE_APP_MOCK === 'true' && import('./mock')

const app = createApp(App)

setup(app)

app.use(store).use(useElementPlus).use(i18n).use(router).mount('#app')
