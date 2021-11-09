import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: '登陆页',
      showLink: false
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
          icon: 'iconfont icon-index'
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
