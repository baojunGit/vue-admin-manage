const noticeList = {
  message: '获取成功',
  code: 200,
  data: {
    list: [
      {
        email: '@email',
        image: 'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
        notice:
          'github开源地址：<a target="_blank" href="https://github.com/chuzhixin/vue-admin-beautiful">点我</a>'
      },
      {
        email: '@email',
        image: 'https://i.gtimg.cn/club/item/face/img/0/15640_100.gif',
        notice:
          '开源中国地址：<a target="_blank" href="https://www.oschina.net/p/vue-admin-beautiful">点我</a>'
      },
      {
        email: '@email',
        image: 'https://i.gtimg.cn/club/item/face/img/9/15919_100.gif',
        notice:
          "gitee开源地址：<a target='_blank' href='https://gitee.com/chu1204505056/vue-admin-beautiful?_from=gitee_search'>点我</a>"
      }
    ]
  }
}

const getMenu = {
  url: '/notice/getList',
  method: 'get',
  template: noticeList
}

export default [getMenu]
