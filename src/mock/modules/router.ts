/**
 * 路由mock数据
 * id: 路由编号
 * path: 路由模块路径, 有特定格式要求容易报错，注意不要设置为空，空会覆盖之前的/设置跳转的路由，不选它为路由跳转标识
 * name: 路由名和合法的url外链
 * frameSrc：内联外部地址
 */
// 获取路由菜单接口
// 返回固定的数据 数据里包含 @符号的时候会报错
const routers = [
  {
    id: 1,
    path: '/',
    name: 'root',
    component: 'layout/Layout.vue',
    redirect: '/index',
    title: 'message.index',
    icon: 'iconfont icon-index',
    frameSrc: '',
    hideInMenu: false,
    hideInBread: true,
    noCloseTab: false,
    children: [
      {
        id: 11,
        path: 'index',
        name: 'index',
        component: 'modules/index/Index.vue',
        redirect: '',
        title: 'message.index',
        icon: 'iconfont icon-index',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        noCloseTab: true,
        children: null
      },
      {
        id: 12,
        path: 'personal-center',
        name: 'personal-center',
        component: 'modules/index/PersonalCenter.vue',
        redirect: '',
        title: 'message.personalCenter',
        icon: '',
        frameSrc: '',
        hideInMenu: true,
        hideInBread: false,
        noCloseTab: false,
        children: null
      }
    ]
  },
  {
    id: 2,
    path: '/sys',
    name: 'sys',
    component: 'layout/Layout.vue',
    redirect: '/sys/user',
    title: 'message.sysManage',
    icon: 'iconfont icon-setup',
    frameSrc: '',
    hideInMenu: false,
    hideInBread: false,
    noCloseTab: false,
    children: [
      {
        id: 21,
        path: 'user',
        name: 'user',
        component: 'modules/sys/User/User.vue',
        redirect: '',
        title: 'message.userManage',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        noCloseTab: false,
        children: null
      },
      {
        id: 22,
        path: 'role',
        name: 'role',
        component: 'modules/sys/Role/Role.vue',
        redirect: '',
        title: 'message.permission',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        noCloseTab: false,
        children: null
      },
      {
        id: 23,
        path: 'menu',
        name: 'menu',
        component: 'modules/sys/Menu/Menu.vue',
        redirect: '',
        title: 'message.menuManage',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        noCloseTab: false,
        children: null
      },
      {
        id: 24,
        path: 'dict',
        name: 'dict',
        component: 'modules/sys/Dict/Dict.vue',
        redirect: '',
        title: 'message.dictManage',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        noCloseTab: false,
        children: null
      }
    ]
  },
  // 不要设置title名就不会被显示在面包屑里
  {
    id: 3,
    path: '/edit',
    name: 'edit',
    component: 'layout/Layout.vue',
    redirect: '/edit/article',
    title: 'message.editManage',
    icon: 'iconfont icon-edit',
    frameSrc: '',
    hideInBread: true,
    hideInMenu: false,
    noCloseTab: false,
    children: [
      {
        id: 31,
        path: 'article',
        name: 'article',
        component: 'modules/edit/Article.vue',
        redirect: '',
        title: 'message.articleManage',
        icon: 'iconfont icon-edit',
        frameSrc: '',
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
    component: 'layout/Layout.vue',
    redirect: '/case/scroll',
    title: 'message.caseManage',
    icon: 'iconfont icon-app',
    frameSrc: '',
    hideInMenu: false,
    hideInBread: false,
    children: [
      {
        id: 41,
        path: 'scroll',
        name: 'scroll',
        component: 'modules/case/Scroll.vue',
        redirect: '',
        title: 'message.scrollCase',
        icon: '',
        frameSrc: '',
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
        title: 'message.buttonCase',
        icon: '',
        frameSrc: '',
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
        title: 'message.videoCase',
        icon: '',
        frameSrc: '',
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
        title: 'message.tableCase',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        children: null
      },
      {
        id: 45,
        path: 'splitPane',
        name: 'splitPane',
        component: 'modules/case/SplitPane.vue',
        redirect: '',
        title: 'message.splitPane',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        children: null
      }
    ]
  },
  {
    id: 5,
    path: '/drag',
    name: 'drag',
    component: 'layout/Layout.vue',
    redirect: '/drag/scroll',
    title: 'message.drag',
    icon: 'iconfont icon-Group',
    frameSrc: '',
    hideInMenu: false,
    hideInBread: false,
    children: [
      {
        id: 51,
        path: 'table-drag',
        name: 'table-drag',
        component: 'modules/drag/Table.vue',
        redirect: '',
        title: 'message.tableDrag',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        children: null
      },
      {
        id: 52,
        path: 'list-drag',
        name: 'list-drag',
        component: 'modules/drag/List.vue',
        redirect: '',
        title: 'message.listDrag',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        children: null
      }
    ]
  },
  {
    id: 6,
    path: '/error',
    name: 'error',
    component: 'layout/Layout.vue',
    redirect: '401',
    title: 'message.error',
    icon: 'iconfont icon-warn',
    frameSrc: '',
    hideInMenu: false,
    hideInBread: false,
    children: [
      {
        id: 61,
        path: '401',
        name: '401',
        component: 'modules/error/401.vue',
        redirect: '',
        title: 'message.hsfourZeroOne',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        children: null
      },
      {
        id: 62,
        path: '404',
        name: '404',
        component: 'modules/error/404.vue',
        redirect: '',
        title: 'message.hsfourZeroFour',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        children: null
      }
    ]
  },
  {
    id: 7,
    path: '/https://www.baidu.com/',
    name: 'https://www.baidu.com/',
    component: '',
    redirect: '',
    title: 'message.externalLink',
    icon: 'iconfont icon-link',
    frameSrc: '',
    hideInMenu: false,
    hideInBread: false,
    children: null
  }
]

const getRouterList = {
  url: '/router/getRouterList',
  method: 'get',
  template: {
    message: '获取成功',
    code: 200,
    data: { routers }
  }
}

export default [getRouterList]
