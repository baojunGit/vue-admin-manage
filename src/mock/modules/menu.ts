/**
 * 路由mock数据
 * id: 路由编号
 * path: 路由模块路径, 有特定格式要求容易报错，注意不要设置为空，空会覆盖之前的/设置跳转的路由，不选它为路由跳转标识
 * name: 路由名和合法的url外链
 * frameSrc：内联外部地址
 */
// 获取路由菜单接口
const menus = [
  {
    id: 2,
    path: '/sys',
    name: 'sys',
    frameSrc: '',
    component: 'layout/Layout.vue',
    redirect: '/sys/user',
    title: '系统管理',
    icon: 'iconfont icon-setup',
    sort: 2,
    hideInMenu: false,
    hideInBread: false,
    children: [
      {
        id: 21,
        path: 'user',
        name: 'user',
        frameSrc: '',
        component: 'modules/sys/User/User.vue',
        redirect: '',
        title: '用户管理',
        icon: '',
        sort: 1,
        hideInMenu: false,
        hideInBread: false,
        children: null
      },
      {
        id: 22,
        path: 'role',
        name: 'role',
        frameSrc: '',
        component: 'modules/sys/Role/Role.vue',
        redirect: '',
        title: '角色管理',
        icon: '',
        sort: 2,
        hideInMenu: false,
        hideInBread: false,
        children: null
      },
      {
        id: 23,
        path: 'menu',
        name: 'menu',
        frameSrc: '',
        component: 'modules/sys/Menu/Menu.vue',
        redirect: '',
        title: '菜单管理',
        icon: '',
        sort: 3,
        hideInMenu: false,
        hideInBread: false,
        children: null
      },
      {
        id: 24,
        path: 'dict',
        name: 'dict',
        frameSrc: '',
        component: 'modules/sys/Dict/Dict.vue',
        redirect: '',
        title: '字典管理',
        icon: '',
        sort: 4,
        hideInMenu: false,
        hideInBread: false,
        children: null
      }
    ]
  },
  // 不要设置title名就不会被显示在面包屑里
  {
    id: 3,
    path: '/edit',
    name: 'edit',
    frameSrc: '',
    component: 'layout/Layout.vue',
    redirect: '/edit/article',
    title: '文章管理',
    icon: 'iconfont icon-edit',
    sort: 3,
    hideInBread: true,
    children: [
      {
        id: 31,
        path: 'article',
        name: 'article',
        frameSrc: '',
        component: 'modules/edit/Article.vue',
        redirect: '',
        title: '文章管理',
        icon: 'iconfont icon-edit',
        sort: 1,
        hideInMenu: false,
        hideInBread: false,
        children: null
      }
    ]
  },
  {
    id: 4,
    path: '/case',
    name: 'case',
    frameSrc: '',
    component: 'layout/Layout.vue',
    redirect: '/case/scroll',
    title: '组件管理',
    icon: 'iconfont icon-app',
    sort: 1,
    hideInMenu: false,
    hideInBread: false,
    children: [
      {
        id: 41,
        path: 'scroll',
        name: 'scroll',
        frameSrc: '',
        component: 'modules/case/Scroll.vue',
        redirect: '',
        title: '滚动组件',
        icon: '',
        sort: 1,
        hideInMenu: false,
        hideInBread: false,
        children: null
      },
      {
        id: 42,
        path: 'button',
        name: 'button',
        component: 'modules/case/Button.vue',
        redirect: '',
        title: '按钮组件',
        icon: '',
        sort: 2,
        hideInMenu: false,
        hideInBread: false,
        children: null
      },
      {
        id: 43,
        path: 'video',
        name: 'video',
        component: 'modules/case/Video.vue',
        redirect: '',
        title: '视频组件',
        icon: '',
        sort: 3,
        hideInMenu: false,
        hideInBread: false,
        children: null
      },
      {
        id: 44,
        path: 'table',
        name: 'table',
        component: 'modules/case/Table.vue',
        redirect: '',
        title: '表格组件',
        icon: '',
        sort: 4,
        hideInMenu: false,
        hideInBread: false,
        children: null
      },
      {
        id: 45,
        path: 'draggable',
        name: 'draggable',
        component: 'modules/case/Draggable.vue',
        redirect: '',
        title: '拖拽组件',
        icon: '',
        sort: 5,
        hideInMenu: false,
        hideInBread: false,
        children: null
      },
      {
        id: 46,
        path: 'splitPane',
        name: 'splitPane',
        component: 'modules/case/SplitPane.vue',
        redirect: '',
        title: '切割面板',
        icon: '',
        sort: 6,
        hideInMenu: false,
        hideInBread: false,
        children: null
      }
    ]
  },
  {
    id: 5,
    path: '/error',
    name: 'error',
    frameSrc: '',
    component: 'layout/Layout.vue',
    redirect: '401',
    title: '错误页面',
    icon: '',
    sort: 5,
    hideInMenu: false,
    hideInBread: false,
    children: [
      {
        id: 51,
        path: '401',
        name: '401',
        frameSrc: '',
        component: 'modules/error/401.vue',
        redirect: '',
        title: '401',
        icon: '',
        sort: 1,
        hideInMenu: false,
        hideInBread: false,
        children: null
      },
      {
        id: 52,
        path: '404',
        name: '404',
        frameSrc: '',
        component: 'modules/error/404.vue',
        redirect: '',
        title: '404',
        icon: '',
        sort: 2,
        hideInMenu: false,
        hideInBread: false,
        children: null
      }
    ]
  },
  {
    id: 6,
    path: '/https://www.baidu.com/',
    name: 'https://www.baidu.com/',
    frameSrc: '',
    component: '',
    redirect: '',
    title: '外链',
    icon: '',
    sort: 6,
    hideInMenu: false,
    hideInBread: false,
    children: null
  }
]

const getMenuList = {
  url: '/menu/getMenuList',
  method: 'get',
  template: {
    message: '获取成功',
    code: 200,
    data: { menus }
  }
}

export default [getMenuList]
