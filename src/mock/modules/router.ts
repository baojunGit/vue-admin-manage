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
    id: '1',
    parentId: '0',
    path: '/',
    name: 'root',
    component: 'layout/Layout.vue',
    redirect: '/index',
    title: '首页',
    icon: 'iconfont icon-index',
    frameSrc: '',
    hideInMenu: false,
    hideInBread: true,
    noCloseTab: false,
    sort: 1,
    isNew: false,
    menuType: 0, // 0目录，1菜单，2按钮
    children: [
      {
        id: '11',
        parentId: '1',
        path: 'index',
        name: 'index',
        component: 'modules/index/Index.vue',
        redirect: '',
        title: '首页',
        icon: 'iconfont icon-index',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        noCloseTab: true,
        sort: 1,
        isNew: false,
        menuType: 1,
        children: null
      },
      {
        id: '12',
        parentId: '1',
        path: 'personal-center',
        name: 'personal-center',
        component: 'modules/index/PersonalCenter.vue',
        redirect: '',
        title: '个人中心',
        icon: '',
        frameSrc: '',
        hideInMenu: true,
        hideInBread: false,
        noCloseTab: false,
        sort: 2,
        isNew: false,
        menuType: 1,
        children: null
      }
    ]
  },
  {
    id: '2',
    parentId: '0',
    path: '/sys',
    name: 'sys',
    component: 'layout/Layout.vue',
    redirect: '/sys/user',
    title: '系统管理',
    icon: 'iconfont icon-setup',
    frameSrc: '',
    hideInMenu: false,
    hideInBread: false,
    noCloseTab: false,
    sort: 2,
    isNew: false,
    menuType: 0,
    children: [
      {
        id: '21',
        parentId: '2',
        path: 'user',
        name: 'user',
        component: 'modules/sys/User/User.vue',
        redirect: '',
        title: '用户管理',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        noCloseTab: false,
        sort: 1,
        isNew: false,
        menuType: 1,
        children: null
      },
      {
        id: '22',
        parentId: '2',
        path: 'role',
        name: 'role',
        component: 'modules/sys/Role/Role.vue',
        redirect: '',
        title: '角色管理',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        noCloseTab: false,
        sort: 2,
        isNew: false,
        menuType: 1,
        children: null
      },
      {
        id: '23',
        parentId: '2',
        path: 'menu',
        name: 'menu',
        component: 'modules/sys/Menu/Menu.vue',
        redirect: '',
        title: '菜单管理',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        noCloseTab: false,
        sort: 3,
        isNew: false,
        menuType: 1,
        children: null
      },
      {
        id: '24',
        parentId: '2',
        path: 'dict',
        name: 'dict',
        component: 'modules/sys/Dict/Dict.vue',
        redirect: '',
        title: '字典管理',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        noCloseTab: false,
        sort: 4,
        isNew: false,
        menuType: 1,
        children: null
      }
    ]
  },
  // 不要设置title名就不会被显示在面包屑里
  {
    id: '3',
    parentId: '0',
    path: '/edit',
    name: 'edit',
    component: 'layout/Layout.vue',
    redirect: '/edit/article',
    title: '编辑管理',
    icon: 'iconfont icon-edit',
    frameSrc: '',
    hideInBread: true,
    hideInMenu: false,
    noCloseTab: false,
    sort: 3,
    isNew: true,
    menuType: 0,
    children: [
      {
        id: '31',
        parentId: '3',
        path: 'article',
        name: 'article',
        component: 'modules/edit/Article.vue',
        redirect: '',
        title: '文章管理',
        icon: 'iconfont icon-edit',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        sort: 1,
        isNew: false,
        menuType: 1,
        children: null
      }
    ]
  },
  {
    id: '4',
    parentId: '0',
    path: '/case',
    name: 'case',
    component: 'layout/Layout.vue',
    redirect: '/case/scroll',
    title: '组件管理',
    icon: 'iconfont icon-app',
    frameSrc: '',
    hideInMenu: false,
    hideInBread: false,
    sort: 4,
    isNew: false,
    menuType: 0,
    children: [
      {
        id: '41',
        parentId: '4',
        path: 'scroll',
        name: 'scroll',
        component: 'modules/case/Scroll.vue',
        redirect: '',
        title: '滚动组件',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        sort: 1,
        isNew: false,
        menuType: 1,
        children: null
      },
      {
        id: '42',
        parentId: '4',
        path: 'button',
        name: 'button',
        component: 'modules/case/Button.vue',
        redirect: '',
        title: '按钮组件',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        sort: 2,
        isNew: false,
        menuType: 1,
        children: null
      },
      {
        id: '43',
        parentId: '4',
        path: 'video',
        name: 'video',
        component: 'modules/case/Video.vue',
        redirect: '',
        title: '视频组件',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        sort: 3,
        isNew: false,
        menuType: 1,
        children: null
      },
      {
        id: '44',
        parentId: '4',
        path: 'table',
        name: 'table',
        component: 'modules/case/Table.vue',
        redirect: '',
        title: '表格组件',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        sort: 4,
        isNew: false,
        menuType: 1,
        children: null
      },
      {
        id: '45',
        parentId: '4',
        path: 'splitPane',
        name: 'splitPane',
        component: 'modules/case/SplitPane.vue',
        redirect: '',
        title: '切割面板',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        sort: 5,
        isNew: false,
        menuType: 1,
        children: null
      }
    ]
  },
  {
    id: '5',
    parentId: '0',
    path: '/drag',
    name: 'drag',
    component: 'layout/Layout.vue',
    redirect: '/drag/scroll',
    title: '拖拽功能',
    icon: 'iconfont icon-Group',
    frameSrc: '',
    hideInMenu: false,
    hideInBread: false,
    sort: 5,
    isNew: false,
    menuType: 0,
    children: [
      {
        id: '51',
        parentId: '5',
        path: 'table-drag',
        name: 'table-drag',
        component: 'modules/drag/Table.vue',
        redirect: '',
        title: '表格拖拽',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        sort: 1,
        isNew: false,
        menuType: 1,
        children: null
      },
      {
        id: '52',
        parentId: '5',
        path: 'list-drag',
        name: 'list-drag',
        component: 'modules/drag/List.vue',
        redirect: '',
        title: '列表拖拽',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        sort: 2,
        isNew: false,
        menuType: 1,
        children: null
      }
    ]
  },
  {
    id: '6',
    parentId: '0',
    path: '/error',
    name: 'error',
    component: 'layout/Layout.vue',
    redirect: '401',
    title: '错误页面',
    icon: 'iconfont icon-warn',
    frameSrc: '',
    hideInMenu: false,
    hideInBread: false,
    sort: 6,
    isNew: false,
    menuType: 0,
    children: [
      {
        id: '61',
        parentId: '6',
        path: '401',
        name: '401',
        component: 'modules/error/401.vue',
        redirect: '',
        title: '401',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        sort: 1,
        isNew: false,
        menuType: 1,
        children: null
      },
      {
        id: '62',
        parentId: '6',
        path: '404',
        name: '404',
        component: 'modules/error/404.vue',
        redirect: '',
        title: '404',
        icon: '',
        frameSrc: '',
        hideInMenu: false,
        hideInBread: false,
        sort: 2,
        isNew: false,
        menuType: 1,
        children: null
      }
    ]
  },
  {
    id: '7',
    parentId: '0',
    path: '/https://www.baidu.com/',
    name: 'https://www.baidu.com/',
    component: '',
    redirect: '',
    title: '外链',
    icon: 'iconfont icon-link',
    frameSrc: '',
    hideInMenu: false,
    hideInBread: false,
    sort: 7,
    isNew: false,
    menuType: 0,
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
