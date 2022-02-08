import { defineStore } from 'pinia'
import '@/mock/index'
import { getMenuList } from '@/api/menu'
import { addRouter } from '@/utils/useRouter'
// 导入默认已经注册的路由asyncRoutes
import { asyncRoutes } from '@/router'
import { store } from '@/store'

interface RouterType {
  routes: Array<Object>
  siderbarRouters: Array<Object>
}

export const useRouterStore = defineStore('router', {
  state: (): RouterType => ({
    // 动态路由信息
    routes: [],
    // 侧边菜单栏信息
    siderbarRouters: []
  }),
  getters: {},
  actions: {
    /**
     * @description 从接口获取动态路由数据，注册页面路由
     */
    async setRoutes() {
      const {
        data: { menus }
      } = await getMenuList()
      const routerRes = addRouter(menus)
      const routes = [...asyncRoutes, ...routerRes]
      this.routes = routes
    },
    /**
     * @description 设置侧边菜单栏路由
     */
    async setSideRouter() {
      const {
        data: { menus }
      } = await getMenuList()
      const sidebarRouters = addRouter(menus)
      this.sidebarRouters = sidebarRouters
    }
  }
})

// 这样是为了方便在非vue文件的js程序里跑，可以直接引入使用
export function useRouterStoreHook() {
  return useRouterStore(store)
}
