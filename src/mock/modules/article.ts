/**
 * 路由mock数据
 * id: 路由编号
 * path: 路由模块路径, 有特定格式要求容易报错，注意不要设置为空，空会覆盖之前的/设置跳转的路由，不选它为路由跳转标识
 * name: 路由名和合法的url外链
 * frameSrc：内联外部地址
 */
// 获取路由菜单接口
const articles = [
  {
    id: 1,
    title: '知识库',
    content: '',
    children: [
      {
        id: 11,
        title: '知识库新手必读',
        content: '',
        children: [
          {
            id: 111,
            title: '系统角色和职责',
            content: ''
          },
          {
            id: 222,
            title: '数字产品能力模型',
            content: ''
          },
          {
            id: 333,
            title: '数字产品经理入门',
            content: ''
          },
          {
            id: 444,
            title: '需求分析师入门',
            content: ''
          }
        ]
      },
      {
        id: 12,
        title: '基本概念',
        content: '',
        children: [
          {
            id: 121,
            title: '业务领域',
            content: ''
          },
          {
            id: 122,
            title: '数字产品',
            content: ''
          },
          {
            id: 123,
            title: '成效衡量指标',
            content: ''
          }
        ]
      },
      {
        id: 13,
        title: '书籍推荐',
        content: '',
        children: [
          {
            id: 131,
            title: '数字产品读书推荐',
            content: ''
          }
        ]
      },
      {
        id: 14,
        title: '常见问题',
        content: '',
        children: [
          {
            id: 141,
            title: '实施常见&QA',
            content: ''
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: '案例库',
    content: '',
    children: [
      {
        id: 21,
        title: '专题分析案例',
        content: '',
        children: [
          {
            id: 211,
            title: '交易安全锁',
            content: ''
          },
          {
            id: 212,
            title: '资金交易基础数据监控',
            content: ''
          }
        ]
      },
      {
        id: 22,
        title: '特性分析案例',
        content: '',
        children: [
          {
            id: 221,
            title: '后台查询锁卡记录',
            content: ''
          },
          {
            id: 222,
            title: '自助配置审核流程',
            content: ''
          }
        ]
      },
      {
        id: 23,
        title: '产品规划案例',
        content: ''
      },
      {
        id: 24,
        title: '价值评审案例',
        content: ''
      }
    ]
  }
]

const getArticleList = {
  url: '/article/getArticleList',
  method: 'get',
  template: {
    message: '获取成功',
    code: 200,
    data: { articles }
  }
}

export default [getArticleList]
