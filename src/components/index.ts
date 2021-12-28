/* 统一管理全局组件的地方 */
import { App } from 'vue'
import Screenfull from './screenfull/Screenfull.vue'
import CountTo from './count-to/CountTo.vue'
import MyEchart from './my-echart/MyEchart.vue'

const component = {
  Screenfull,
  CountTo,
  MyEchart
}

const appComponent = {
  install(app: App) {
    for (const key in component) {
      // console.log(component)
      // console.log(key)
      /**
       * @description 注册全局组件
       * @param key 组件名  component[key] 组件对应的文件
       */
      app.component(key, component[key])
    }
  }
}

export default appComponent
