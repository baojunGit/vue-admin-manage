import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

/**
 * meta: 除了原生参数外可配置的参数
 * meta: {
 *  title: { String } 显示在侧边栏、面包屑和标签栏的文字
 *  icon: (阿里字体图标样式) 该页面在左侧菜单、面包屑和标签导航处显示的图标
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  cache: (true) 设为true后页面在切换标签后缓存，如果不需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 * }
 */

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: '登陆页'
    }
  },
  // layout里不要写meta，就不会被识别显示在面包屑
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/dashboard/Index.vue'),
        redirect: '',
        meta: {
          title: 'message.index',
          icon: 'iconfont icon-index',
          hideInBread: false
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user/center',
    children: [
      {
        path: 'center',
        component: () => import('@/views/dashboard/center.vue'),
        meta: { title: '个人中心' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router的onError函数捕获路由懒加载找不到对应的moudle
router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  console.log(
    isChunkLoadFailed,
    '/Loading chunk (d)+ failed/g',
    '路由懒加载找不到对应的moudle'
  )
  if (isChunkLoadFailed) {
    window.location.reload()
  } else {
    console.log(error)
  }
})

export default router
