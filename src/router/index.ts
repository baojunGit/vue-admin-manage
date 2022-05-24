import { createRouter, createWebHistory } from 'vue-router'

// import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
/**
 * @description shallowRef解决如下报错：组件被包装成了响应式的对象，会造成不必要的性能开销
 * Vue received a Component which was made a reactive object
 * This can lead to unnecessary performance overhead, and should be avoided
 * by marking the component with `markRaw` or using `shallowRef` instead of `ref`
 * */
// import { shallowRef } from 'vue'
// import Layout from '@/Layout.vue'

/**
 * meta: 除了原生参数外可配置的参数
 * meta: {
 *  title: { String } 显示在侧边栏、面包屑和标签栏的文字
 *  icon: { String } 该页面在左侧菜单、面包屑和标签导航处显示的图标
 *  target: '_blank', 外链
 *  frameSrc { String } 内嵌iframe的地址
 *  hideInBread: { Boolean } 设为true后此级路由将不会出现在面包屑中
 *  noCloseTab: 路由标签是否可以关闭(目前只有首页不可关闭)
 *  hideInMenu: { Boolean }  设为true后在左侧菜单不会显示该页面选项
 *  cache: { Boolean }  设为true后页面在切换标签后缓存，如果不需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 * }
 */

const defaultRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/global/login/Login.vue'),
    meta: {
      title: '登陆页'
    }
  },
  {
    path: '/data-operation',
    name: 'data-operation',
    component: () =>
      import('@/views/global/big-screen/data-operation/DataOperation.vue'),
    meta: {
      title: '数据运营大屏'
    }
  }
]

// export const asyncRoutes: Array<RouteRecordRaw> = [
//   // layout里不要写meta，就不会被识别显示在面包屑
//   {
//     path: '/',
//     name: 'layout',
//     component: shallowRef(Layout),
//     redirect: '/index',
//     children: [
//       {
//         path: 'personal-center',
//         name: 'personal-center',
//         component: () => import('@/views/modules/index/PersonalCenter.vue'),
//         meta: {
//           title: '个人中心',
//           icon: '',
//           hideInBread: false
//         }
//       }
//     ]
//   }
// ]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: defaultRoutes
})

// const originalPush = router.prototype.push
// router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

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
