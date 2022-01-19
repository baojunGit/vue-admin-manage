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
      datetime: '@datetime',
      // 模拟一组包含两个元素，元素值在1-5之间
      'roleIds|2': [() => Mock.Random.integer(1, 6)]
    }
  ]
})
const List = analog.data

const getUserList = {
  url: '/user/getUserList',
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

export default [getUserList, doEdit]
