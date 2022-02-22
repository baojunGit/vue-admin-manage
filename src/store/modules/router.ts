import { defineStore } from 'pinia'
import '@/mock/index'
import { getRouterList } from '@/api/router'
import { formatRouter, filterRouter } from '@/utils/useRouter'
// 导入默认已经注册的路由asyncRoutes
import { store } from '@/store'

interface RouterType {
  routes: Array<Object>
}

export const useRouterStore = defineStore('router', {
  state: (): RouterType => ({
    // 动态路由信息
    routes: []
  }),
  getters: {
    getSideMenu() {
      return filterRouter(this.routes, 'hideInMenu')
    }
  },
  actions: {
    /**
     * @description 从接口获取动态路由数据
     */
    async setRoutes() {
      const {
        data: { routers }
      } = await getRouterList()
      this.routes = formatRouter(routers)
    }
  }
})

// 这样是为了方便在非vue文件的js程序里跑，可以直接引入使用
export function useRouterStoreHook() {
  return useRouterStore(store)
}
