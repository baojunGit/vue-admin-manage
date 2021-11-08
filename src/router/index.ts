import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: '登陆页',
      showLink: false
    }
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

// {
//   path: '/',
//   name: 'layout',
//   component: Layout,
//   redirect: '/index',
//   children: [
//     {
//       path: '/index',
//       name: 'index',
//       component: () => import('@/views/Index.vue'),
//       meta: {
//         title: 'message.index'
//       }
//     }
//   ]
// },
// {
//   path: '/sys',
//   name: 'sys',
//   redirect: '/sys/user',
//   component: Layout,
//   meta: {
//     title: 'message.sysManage'
//   },
//   children: [
//     {
//       path: 'user',
//       name: 'user',
//       component: () => import('@/views/sys/User.vue'),
//       meta: {
//         title: 'message.userManage'
//       }
//     },
//     {
//       path: 'role',
//       name: 'role',
//       component: () => import('@/views/sys/Role.vue'),
//       meta: {
//         title: 'message.permission'
//       }
//     },
//     {
//       path: 'menu',
//       name: 'menu',
//       component: () => import('@/views/sys/Menu.vue'),
//       meta: {
//         title: 'message.menuManage'
//       }
//     },
//     {
//       path: 'dict',
//       name: 'dict',
//       component: () => import('@/views/sys/Dict.vue'),
//       meta: {
//         title: 'message.dictManage'
//       }
//     }
//   ]
// },
// {
//   path: '/edit',
//   name: 'edit',
//   redirect: '/edit/article',
//   component: Layout,
//   meta: {
//     title: 'message.editManage'
//   },
//   children: [
//     {
//       path: 'article',
//       name: 'article',
//       component: () => import('@/views/edit/Article.vue'),
//       meta: {
//         title: 'message.articleManage'
//       }
//     }
//   ]
// },
// {
//   path: '/case',
//   name: 'case',
//   redirect: '/case/scroll',
//   component: Layout,
//   meta: {
//     title: 'message.caseManage'
//   },
//   children: [
//     {
//       path: 'scroll',
//       name: 'scroll',
//       component: () => import('@/views/case/Scroll.vue'),
//       meta: {
//         title: 'message.scrollCase'
//       }
//     },
//     {
//       path: 'button',
//       name: 'button',
//       component: () => import('@/views/case/Button.vue'),
//       meta: {
//         title: 'message.buttonCase'
//       }
//     },
//     {
//       path: 'video',
//       name: 'video',
//       component: () => import('@/views/case/Video.vue'),
//       meta: {
//         title: 'message.videoCase'
//       }
//     }
//   ]
// },
// {
//   path: '/error',
//   name: 'error',
//   redirect: '/error/401',
//   component: Layout,
//   meta: {
//     title: 'message.error'
//   },
//   children: [
//     {
//       path: '401',
//       name: '401',
//       component: () => import('@/views/error/401.vue'),
//       meta: {
//         title: 'message.hsfourZeroOne'
//       }
//     },
//     {
//       path: '404',
//       name: '404',
//       component: () => import('@/views/error/404.vue'),
//       meta: {
//         title: 'message.hsfourZeroFour'
//       }
//     }
//   ]
// }
