import Layout from '@/layout/index.vue'
import { shallowRef } from 'vue'
/**
 * 生成路由
 * @param {Array} routerList 格式化路由
 * @returns
 */

//  用interface描述**数据结构**，用type描述**类型关系**
//  公共的用 interface 实现，不能用 interface 实现的再用 type 实现。是一对互帮互助的好兄弟

interface MenuItem {
  id: number
  path: string
  name: string
  component: string
  redirect: string
  title: string
  icon: string
  frameSrc: string
  external: boolean
  hideInMenu: boolean
  hideInBread: boolean
  noCloseTab: boolean
  sort: number
  isNew: boolean
  children: MenuItem[] | null
}

type MenuList = MenuItem[]

interface RouteItem {
  id: number
  path: string
  name: string
  component: unknown
  redirect: string
  meta: {
    title: string
    icon: string
    frameSrc: string
    external: boolean
    hideInMenu: boolean
    hideInBread: boolean
    noCloseTab: boolean
    sort: number
    isNew: boolean
  }
  children: RouteItem[]
}

/**
 * @description 处理后端返回的路由数据
 * @param routerList 路由数据
 * @returns
 */
// es6 的动态 import 不支持动态参数，可以使用 vite 提供的 glob 功能，这里不要用@符号
// @see https://cn.vitejs.dev/guide/features#glob-import
const modules = import.meta.glob('../views/**/*.vue')
export const formatRoutes = (routeList: MenuList) => {
  const router = []
  let rNew
  let component
  for (const r of routeList) {
    r.component === 'layout' ? (component = shallowRef(Layout)) : (component = modules[`../views/${r.component}.vue`])
    rNew = {
      id: r.id,
      path: r.path,
      name: r.name,
      redirect: r.redirect,
      component: component
    } as RouteItem
    rNew = {
      ...rNew,
      children: r.children ? formatRoutes(r.children) : [],
      meta: {
        title: r.title,
        icon: r.icon,
        frameSrc: r.frameSrc,
        external: r.external,
        hideInMenu: r.hideInMenu,
        hideInBread: r.hideInBread,
        noCloseTab: r.noCloseTab,
        sort: r.sort,
        isNew: r.isNew
      }
    }

    // 如果存在子路由且没有设置默认重定向，则添加默认重定向
    if (rNew?.children?.length > 0) {
      // 拼接路径
      const firstChildPath = rNew.children[0].path
	  // redirect存在就拼接，不存在就拼接path
      const redirectPath = rNew.redirect ? `${rNew.redirect}/${firstChildPath}` : `${rNew.path}/${firstChildPath}`
      console.log(redirectPath.replace(/\/+/g, '/'))
	  // 将字符串中连续出现的斜杠 / 替换为单个斜杠 /, 解决根路径/拼接问题
      rNew.redirect = redirectPath.replace(/\/+/g, '/')
    }

    router.push(rNew)
  }
  return router
}
