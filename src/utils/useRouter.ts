/**
 * 生成路由
 * @param {Array} routerList 格式化路由
 * @returns
 */

//  用interface描述**数据结构**，用type描述**类型关系**
//  公共的用 interface 实现，不能用 interface 实现的再用 type 实现。是一对互帮互助的好兄弟

interface RouterInfo {
  id: number
  path: string
  name: string
  component: string
  redirect: string
  title: string
  icon: string
  frameSrc: string
  hideInMenu: boolean
  hideInBread: boolean
  noCloseTab: boolean
  sort: number
  isNew: boolean
  children: Array<RouterInfo> | null
}

interface RType {
  id: number
  path: string
  name: string
  component: unknown
  redirect: string
  meta: {
    title: string
    icon: string
    frameSrc: string
    hideInMenu: boolean
    hideInBread: boolean
    noCloseTab: boolean
    sort: number
    isNew: boolean
  }
  children: Array<RType>
}

/**
 * @description 处理后端返回的路由数据
 * @param routerList 路由数据
 * @returns
 */
export const formatRouter = (routerList: Array<RouterInfo>) => {
  const router = []
  let e_new
  try {
    routerList.forEach(e => {
      e_new = {
        id: e.id,
        path: e.path,
        name: e.name,
        redirect: e.redirect,
        // 不能把@也配置在接口里返回，直接import()里是个变量会报错
        component: () => import(`@/views/${e.component}`)
      } as RType
      e_new = {
        ...e_new,
        meta: {
          title: e.title,
          icon: e.icon,
          frameSrc: e.frameSrc,
          hideInMenu: e.hideInMenu,
          hideInBread: e.hideInBread,
          noCloseTab: e.noCloseTab,
          sort: e.sort,
          isNew: e.isNew
        }
      }
      // if (e.redirect) {
      //   e_new = { ...e_new, redirect: e.redirect }
      // }
      // if (e.frameSrc) {
      //   e_new.meta.frameSrc = e.frameSrc
      // }
      // if (e.hideInMenu) {
      //   e_new.meta.hideInMenu = e.hideInMenu
      // }
      // if (e.hideInBread) {
      //   e_new.meta.hideInBread = e.hideInBread
      // }
      // if (e.noCloseTab) {
      //   e_new.meta.noCloseTab = e.noCloseTab
      // }
      // if (e.sort) {
      //   e_new.meta.sort = e.sort
      // }
      // if (e.isNew) {
      //   e_new.meta.isNew = e.isNew
      // }
      // if (e.children) {
      //   const children = formatRouter(e.children)
      //   // 保存权限
      //   e_new = { ...e_new, children: children }
      // }
      if (e.children) {
        const children = formatRouter(e.children)
        // 保存权限
        e_new = { ...e_new, children: children }
      } else {
        e_new = { ...e_new, children: null }
      }
      router.push(e_new)
    })
  } catch (error) {
    console.error(error)
    return []
  }
  return router
}

/**
 * @description 递归过滤格式化后的路由数据
 * @param routerList 路由数据
 * @param param 过滤条件 默认过滤条件 meta.param === true
 */

export const filterRouter = (routerList: Array<RType>, param: string) => {
  const router = []
  let e_new
  try {
    routerList.forEach(e => {
      if (e.meta[param]) return // 终止本次继续执行
      e_new = {
        id: e.id,
        path: e.path,
        name: e.name,
        // 不能把@也配置在接口里返回，直接import()里是个变量会报错
        component: e.component,
        meta: e.meta
      } as RType
      if (e.children) {
        const children = filterRouter(e.children, param)
        e_new = { ...e_new, children: children }
      }
      router.push(e_new)
    })
  } catch (error) {
    console.error(error)
    return []
  }
  return router
}
