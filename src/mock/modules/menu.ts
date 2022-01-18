/**
 * 路由mock数据
 * id: 路由编号
 * path: 路由模块路径, 有特定格式要求容易报错，注意不要设置为空，空会覆盖之前的/设置跳转的路由，不选它为路由跳转标识
 * name: 路由名和合法的url外链
 * frameSrc：内联外部地址
 */
// 获取路由菜单接口
const menus = {
  message: '获取成功',
  code: 200,
  data: {
    menus: [
      {
        id: 2,
        path: '/sys',
        name: 'sys',
        frameSrc: '',
        component: 'layout/Layout.vue',
        redirect: '/sys/user',
        title: 'message.sysManage',
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
            component: 'sys/User/User.vue',
            redirect: '',
            title: 'message.userManage',
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
            component: 'sys/Role.vue',
            redirect: '',
            title: 'message.permission',
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
            component: 'sys/Menu.vue',
            redirect: '',
            title: 'message.menuManage',
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
            component: 'sys/Dict.vue',
            redirect: '',
            title: 'message.dictManage',
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
        title: '编辑管理',
        icon: 'iconfont icon-edit',
        sort: 3,
        hideInBread: true,
        children: [
          {
            id: 31,
            path: 'article',
            name: 'article',
            frameSrc: '',
            component: 'edit/Article.vue',
            redirect: '',
            title: 'message.articleManage',
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
        title: 'message.caseManage',
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
            component: 'case/Scroll.vue',
            redirect: '',
            title: 'message.scrollCase',
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
            component: 'case/Button.vue',
            redirect: '',
            title: 'message.buttonCase',
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
            component: 'case/Video.vue',
            redirect: '',
            title: 'message.videoCase',
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
            component: 'case/Table.vue',
            redirect: '',
            title: 'message.tableCase',
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
            component: 'case/Draggable.vue',
            redirect: '',
            title: 'message.draggableCase',
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
            component: 'case/SplitPane.vue',
            redirect: '',
            title: 'message.splitPane',
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
        title: 'message.error',
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
            component: 'error/401.vue',
            redirect: '',
            title: 'message.hsfourZeroOne',
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
            component: 'error/404.vue',
            redirect: '',
            title: 'message.hsfourZeroFour',
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
        title: 'message.externalLink',
        icon: '',
        sort: 6,
        hideInMenu: false,
        hideInBread: false,
        children: null
      }
    ]
  }
}

const getMenu = {
  url: '/menu/getMenu',
  method: 'get',
  template: menus
}

export default [getMenu]
