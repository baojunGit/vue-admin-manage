// 获取验证码接口
const base64Img = {
  message: '获取成功',
  code: 200,
  data: {
    kaptchaImg:
      'data:image/jpg;base64,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' // base64图片验证码
  }
}

const kaptcha = {
  url: '/login/kaptcha', //  或者需要拦截请求的完整url `${api}/login/kaptcha`
  method: 'get',
  template: base64Img
}

// 登陆获取用户信息接口
const loginRes = {
  message: '登陆成功',
  code: 200,
  data: {
    id: 18,
    name: 'baojun',
    routers: [
      {
        path: '',
        component: 'Layout',
        redirect: 'dashboard',
        children: [
          {
            path: 'dashboard',
            component: 'dashboard/index',
            meta: {
              title: '首页',
              icon: 'dashboard'
            }
          }
        ]
      },
      {
        path: '/example',
        component: 'Layout',
        redirect: '/example/table',
        name: 'Example',
        meta: {
          title: '案例',
          icon: 'example'
        },
        children: [
          {
            path: 'table',
            name: 'Table',
            component: 'table/index',
            meta: {
              title: '表格',
              icon: 'table'
            }
          },
          {
            path: 'tree',
            name: 'Tree',
            component: 'tree/index',
            meta: {
              title: '树形菜单',
              icon: 'tree'
            }
          }
        ]
      },
      {
        path: '/form',
        component: 'Layout',
        children: [
          {
            path: 'index',
            name: 'Form',
            component: 'form/index',
            meta: {
              title: '表单',
              icon: 'form'
            }
          }
        ]
      },
      {
        path: '*',
        redirect: '/404',
        hidden: true
      }
    ]
  },
  token: 'admin_login_token.12345678'
}

const signIn = {
  url: '/login/signIn',
  method: 'post',
  template: loginRes
}

export default [kaptcha, signIn]
