import { Module } from 'vuex'
import { rootState } from '../types'
import { handleLocal } from '@/utils/storage'
import { getLang } from '@/locale'

interface appState {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  lang: string
}

// Module<S, R>一定要传入两个泛型，vuex4其实对ts支持不好
// S表示当前模块state的类型
// R表示根模块state的类型，所以要把在根模块抽取一个types.ts文件
const appModule: Module<appState, rootState> = {
  // 模块增加命名空间
  namespaced: true,
  state() {
    return {
      sidebar: {
        // 存在storage里的true和false，取出都会是字符串
        // 所以一般存0和1，取出后再用+进行类型转换，0代表false,'0'是true
        // 这里的打开状态表示，默认是true，有存储值的时候，转化存储值为boolean类型
        opened: handleLocal.get('sidebarStatus')
          ? !!+handleLocal.get('sidebarStatus')
          : true,
        withoutAnimation: false
      },
      lang: getLang() // 默认采用的国际化方案,初次进入，采用浏览器当前设置的语言，默认采用中文
    }
  },
  // 声明vuex同步方法
  // 可以直接获取state
  mutations: {
    // 第一个参数固定是vuex的state对象
    // 第二个参数可以是外部传入的参数对象
    // toggleSidebar(state, payload)
    toggleSidebar(state) {
      // console.log('执行mutations切换侧边栏')
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        handleLocal.set('sidebarStatus', 1)
      } else {
        handleLocal.set('sidebarStatus', 0)
      }
    },
    handleLang(state, lang) {
      state.lang = lang
      handleLocal.set('lang', state.lang)
    }
  },
  // 声明vuex异步方法, 比如说接口请求
  actions: {
    // 第一个参数固定是vuex的context对象
    // 第二个参数可以是外部传入的参数对象
    // toggleSidebar(context,payload)
    toggleSidebar({ commit }) {
      // 通过context去调用mutations、getters、其他actions的方法
      // console.log(context)
      // 第一个参数固定是vuex的mutations里方法名
      // 第二个参数可以是外部传入的参数对象
      // context.commit('toggleSidebar', payload)
      commit('toggleSidebar')
    },
    handleLang({ commit }, lang: string) {
      commit('handleLang', lang)
    }
  },
  // getters，可以认为是store的计算属性，就是在某个数据在经过一系列的变化之后，才显示在页面上。
  getters: {}
}

export default appModule
