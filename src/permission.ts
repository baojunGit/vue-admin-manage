import router from './router'
import store from './store'
import Cookies from 'js-cookie'

// 路由白名单
const whiteList = ['/login']

// 获取动态路由状态的标识，防止多次获取动态路由和栈溢出
let asyncRouterFlag: any = 0
// 用户登录的token
const token: string = Cookies.get('token')

// 注册动态路由的方法
const regRouter = async () => {
  await store.dispatch('user/setRouterListAction')
  const asyncRouters = store.getters['user/asyncRouters']
  // 打印所有已挂载的路由
  console.log(router.getRoutes())
  asyncRouters.forEach(item => {
    // addRoute添加的是路由对象
    router.addRoute(item)
  })
  // console.log(router.getRoutes())
}

router.beforeEach(async (to, from, next) => {
  // 在白名单内的页面，任何人可以进入
  if (whiteList.indexOf(to.path) > -1) {
    next()
    return
  }
  // 不在白名单中且已登录
  if (token) {
    // 已经获取了动态路由，直接放行
    if (asyncRouterFlag) {
      next()
      // 初次获取动态路由
    } else {
      asyncRouterFlag++
      /**
       * 确保addRoutes已完成
        在addRoutes()后第一次访问添加的路由会白屏，因为此时addRoutes()没有执行结束，
        找不到刚被添加的路由导致白屏。需要重新访问一次路由才行。
        如果参数to不能找到对应的路由的话，就再执行一次beforeEach((to, from, next)
        直到其中的next({ ...to})能找到对应的路由为止。
       */
      await regRouter()
      next({ ...to, replace: true })
    }
  } else {
    next({ name: 'login' })
  }
})
