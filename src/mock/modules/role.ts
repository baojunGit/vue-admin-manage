const roleList = [
  {
    id: 1,
    roleName: '项目经理'
  },
  {
    id: 2,
    roleName: '产品经理'
  },
  {
    id: 3,
    roleName: 'UI'
  },
  {
    id: 4,
    roleName: '测试岗'
  },
  {
    id: 5,
    roleName: '开发岗'
  },
  {
    id: 6,
    roleName: 'BA'
  }
]

const getRoleList = {
  url: '/role/getRoleList',
  method: 'get',
  template: {
    message: '获取成功',
    code: 200,
    data: {
      list: roleList,
      total: roleList.length
    }
  }
}

export default [getRoleList]
