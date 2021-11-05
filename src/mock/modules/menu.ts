/*eslint-disable */

// 获取路由菜单接口
const menus = {
  message: '获取成功',
  code: 200,
  data: {
    menus: [
      {
        id: 1,
        path: '/',
        name: 'layout',
        component: 'layout/Layout.vue',
        redirect: '/index',
        title: 'message.index',
        icon: 'iconfont icon-index',
        sort: 1,
        hidden: false,
        children: [
          {
            id: 11,
            path: 'index',
            name: 'index',
            component: 'dashboard/Index.vue',
            redirect: '',
            title: 'message.index',
            icon: 'iconfont icon-index',
            sort: 1,
            hidden: false,
            children: null
          },
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
        sort: 2,
        hidden: false,
        children: [
          {
            id: 21,
            path: 'user',
            name: 'user',
            component: 'sys/User.vue',
            redirect: '',
            title: 'message.userManage',
            icon: '',
            sort: 1,
            hidden: false,
            children: null
          },
          {
            id: 22,
            path: 'role',
            name: 'role',
            component: 'sys/Role.vue',
            redirect: '',
            title: 'message.permission',
            icon: '',
            sort: 2,
            hidden: false,
            children: null
          },
          {
            id: 23,
            path: 'menu',
            name: 'menu',
            component: 'sys/Menu.vue',
            redirect: '',
            title: 'message.menuManage',
            icon: '',
            sort: 3,
            hidden: false,
            children: null
          },
          {
            id: 24,
            path: 'dict',
            name: 'dict',
            component: 'sys/Dict.vue',
            redirect: '',
            title: 'message.dictManage',
            icon: '',
            sort: 4,
            hidden: false,
            children: null
          }
        ]
      },
      {
        id: 3,
        path: '/edit',
        name: 'edit',
        component: 'layout/Layout.vue',
        redirect: '/edit/article',
        title: 'message.editManage',
        icon: 'iconfont icon-edit',
        sort: 3,
        hidden: false,
        children: [
          {
            id: 31,
            path: 'article',
            name: 'article',
            component: 'edit/Article.vue',
            redirect: '',
            title: 'message.articleManage',
            icon: '',
            sort: 1,
            hidden: false,
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
        sort: 1,
        hidden: false,
        children: [
          {
            id: 41,
            path: 'scroll',
            name: 'scroll',
            component: 'case/Scroll.vue',
            redirect: '',
            title: 'message.scrollCase',
            icon: '',
            sort: 1,
            hidden: false,
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
            hidden: false,
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
            hidden: false,
            children: null
          }
        ]
      },
      {
        id: 5,
        path: '/error',
        name: 'error',
        component: 'layout/Layout.vue',
        redirect: '',
        title: 'message.error',
        icon: '',
        sort: 5,
        hidden: false,
        children: [
          {
            id: 51,
            path: '401',
            name: '401',
            component: 'error/401.vue',
            redirect: '',
            title: 'message.hsfourZeroOne',
            icon: '',
            sort: 1,
            hidden: false,
            children: null
          },
          {
            id: 52,
            path: '404',
            name: '404',
            component: 'error/404.vue',
            redirect: '',
            title: 'message.hsfourZeroFour',
            icon: '',
            sort: 2,
            hidden: false,
            children: null
          }
        ]
      },
      {
        id: 6,
        path: '/https://github.com/baojunGit/vue3-admin-manage',
        name: 'https://github.com/baojunGit/vue3-admin-manage',
        component: '',
        redirect: '',
        title: 'message.externalLink',
        icon: '',
        sort: 6,
        hidden: false,
        children: null
      }
    ]
  }
}

const getMenu = {
  url: /\/menu\/getMenu/,
  methods: 'get',
  template: menus
}

export default [getMenu]
