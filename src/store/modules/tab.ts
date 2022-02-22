import { defineStore } from 'pinia'

interface TabType {
  visitedRoutes: Array<any>
}

export const useTabStore = defineStore('tab', {
  state: (): TabType => ({
    visitedRoutes: []
  }),
  getters: {
    getVisitedRoutes() {
      return this.visitedRoutes.filter(route => route.name !== 'login')
    }
  },
  actions: {
    /**
     * @description 添加标签页
     * @param {*} route
     */
    addVisitedRoute(route) {
      // 判断当前路由地址是否已存在
      const target = this.visitedRoutes.find(item => item.name === route.name)
      // 若存在，执行一段无意义的代码
      if (target) Object.assign(target, route)
      // 若不存在，添加到访问的路由集里
      else if (!target) this.visitedRoutes.push(Object.assign({}, route))
    },
    /**
     * @description 删除当前标签页
     * @param path
     */
    delVisitedRoute(path) {
      this.visitedRoutes.splice(
        this.visitedRoutes.findIndex(route => route.path === path),
        1
      )
    },
    /**
     * @description 删除当前及不可关闭标签页以外其它全部标签页
     * @param path
     */
    delOthersVisitedRoutes(path) {
      this.visitedRoutes = this.visitedRoutes.filter(
        route => route.meta.noCloseTab || route.path === path
      )
    },
    /**
     * @description 删除当前及不可关闭标签页左边全部标签页
     * @param path
     */
    delLeftVisitedRoutes(path) {
      let found = false
      this.visitedRoutes = this.visitedRoutes.filter(route => {
        if (route.path === path) found = true
        return route.meta.noCloseTab || found
      })
    },
    /**
     * @description 删除当前及不可关闭标签页右边全部标签页
     * @param path
     */
    delRightVisitedRoutes(path) {
      let found = false
      this.visitedRoutes = this.visitedRoutes.filter(route => {
        const close = found
        if (route.path === path) found = true
        return route.meta.noCloseTab || !close
      })
    },
    /**
     * @description 删除不可关闭标签页以外全部标签页
     */
    delAllVisitedRoutes() {
      this.visitedRoutes = this.visitedRoutes.filter(
        route => route.meta.noCloseTab
      )
    }
  }
})
