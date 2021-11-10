/**
 * 生成路由
 * @param {Array} routerList 格式化路由
 * @returns
 */

//  用interface描述**数据结构**，用type描述**类型关系**
//  公共的用 interface 实现，不能用 interface 实现的再用 type 实现。是一对互帮互助的好兄弟

interface routerInfo {
  id: number
  path: string
  name: string
  component: string
  redirect: string
  title: string
  icon: string
  sort: number
  hideInBread: boolean
  children: Array<routerInfo> | null
}

interface eType {
  path: string
  name: string
  component: unknown
  redirect?: string
  meta: {
    title: string
    icon: string
    hideInBread: boolean
  }
  children?: Array<eType>
}

export const addRouter = (routerList: Array<routerInfo>) => {
  const router = []
  try {
    routerList.forEach(e => {
      let e_new = {
        path: e.path,
        name: e.name,
        // 不能把@也配置在接口里返回，直接import()里是个变量会报错
        component: () => import(`@/views/${e.component}`)
      } as eType
      e_new = {
        ...e_new,
        meta: {
          title: e.title,
          icon: e.icon,
          hideInBread: e.hideInBread
        }
      }
      if (e.redirect) {
        e_new = { ...e_new, redirect: e.redirect }
      }
      if (e.children) {
        const children = addRouter(e.children)
        // 保存权限
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
