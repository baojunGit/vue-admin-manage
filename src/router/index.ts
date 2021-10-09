import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/common/Login.vue'),
    meta: {
      title: '登陆页',
      showLink: false
    }
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('@/views/Index.vue'),
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    path: '/sys',
    name: 'sys',
    redirect: '/sys/user',
    component: Layout,
    meta: {
      title: '系统管理'
    },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/sys/User.vue'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/sys/Role.vue'),
        meta: {
          title: '权限管理'
        }
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/sys/Menu.vue'),
        meta: {
          title: '菜单管理'
        }
      },
      {
        path: 'dict',
        name: 'dict',
        component: () => import('@/views/sys/Dict.vue'),
        meta: {
          title: '字典管理'
        }
      }
    ]
  },
  {
    path: '/edit',
    name: 'edit',
    redirect: '/edit/article',
    component: Layout,
    meta: {
      title: '编辑管理'
    },
    children: [
      {
        path: 'article',
        name: 'article',
        component: () => import('@/views/edit/Article.vue'),
        meta: {
          title: '文章管理'
        }
      }
    ]
  },
  {
    path: '/case',
    name: 'case',
    redirect: '/case/scroll',
    component: Layout,
    meta: {
      title: '组件管理'
    },
    children: [
      {
        path: 'scroll',
        name: 'scroll',
        component: () => import('@/views/case/Scroll.vue')
      },
      {
        path: 'button',
        name: 'button',
        component: () => import('@/views/case/Button.vue')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/case/Video.vue')
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
