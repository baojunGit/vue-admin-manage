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
  let rNew
  for (const r of routerList) {
    rNew = {
      id: r.id,
      path: r.path,
      name: r.name,
      redirect: r.redirect,
      // 不能把@也配置在接口里返回，直接import()里是个变量会报错
      component: () => import(`@/${r.component}`)
    } as RType
    rNew = {
      ...rNew,
      meta: {
        title: r.title,
        icon: r.icon,
        frameSrc: r.frameSrc,
        hideInMenu: r.hideInMenu,
        hideInBread: r.hideInBread,
        noCloseTab: r.noCloseTab,
        sort: r.sort,
        isNew: r.isNew
      }
    }
    // if (e.redirect) {
    //   e_new = { ...e_new, redirect: e.redirect }
    // }
    if (r.children) {
      const children = formatRouter(r.children)
      // 保存权限
      rNew = { ...rNew, children: children }
    } else {
      rNew = { ...rNew, children: null }
    }
    router.push(rNew)
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
  let rNew
  for (const r of routerList) {
    if (r.meta[param]) return // 终止本次继续执行
    rNew = {
      id: r.id,
      path: r.path,
      name: r.name,
      // 不能把@也配置在接口里返回，直接import()里是个变量会报错
      component: r.component,
      meta: r.meta
    } as RType
    if (r.children) {
      const children = filterRouter(r.children, param)
      rNew = { ...rNew, children: children }
    }
    router.push(rNew)
  }
  return router
}
