import Mock from 'mockjs'
import { getQueryValue } from '@/utils/url'
const analog = Mock.mock({
  'data|1000': [
    //生成1000条数据 数组
    {
      // 生成100条数据
      'id|+1': 1,
      username: '@cname',
      'account|100000-999999': 100000, // 100000只作为数据类型的判断，数值没有实际意义
      info: '@county(true)',
      datatime: '@datetime',
      roleIds: [1, 2]
    }
  ]
})
const List = analog.data

const getList = {
  url: '/user/getList',
  type: 'get',
  template: config => {
    // console.log(config.url)
    const username = getQueryValue(config.url, 'username')
    const pageNum = parseInt(getQueryValue(config.url, 'pageNum'))
    const pageSize = parseInt(getQueryValue(config.url, 'pageSize'))
    const mockList = List.filter(
      item => !(username && item.username.indexOf(username) < 0)
    )
    const list = mockList.filter(
      (item, index) =>
        index < pageSize * pageNum && index >= pageSize * (pageNum - 1)
    )
    // console.log(list)
    return {
      code: 200,
      msg: 'success',
      data: { list, ...{ total: mockList.length } }
    }
  }
}

const doEdit = {
  url: '/user/doEdit',
  type: 'post',
  template: () => ({
    code: 200,
    msg: '模拟保存成功'
  })
}

export default [getList, doEdit]
