import Mock from 'mockjs'
import { getQueryValue } from '@/utils/url'
const dict = Mock.mock({
  data: [
    {
      id: 1,
      dictName: 'user_status',
      desc: '用户状态',
      status: '1',
      datetime: '@datetime'
    },
    {
      id: 2,
      dictName: 'job_status',
      desc: '岗位状态',
      status: '1',
      datetime: '@datetime'
    },
    {
      id: 3,
      dictName: 'dept_status',
      desc: '部门状态',
      status: '0',
      datetime: '@datetime'
    }
  ]
})

let mockList = dict.data

const getDictList = {
  url: '/dict/getDictList',
  method: 'get',
  template: config => {
    // console.log(config.url)
    const dictName = getQueryValue(config.url, 'dictName')
    const desc = getQueryValue(config.url, 'desc')
    const status = getQueryValue(config.url, 'status')
    const pageNum = parseInt(getQueryValue(config.url, 'pageNum'))
    const pageSize = parseInt(getQueryValue(config.url, 'pageSize'))
    let dictList = []
    // 这样获取到的值是0
    // console.log('aaa'.indexOf(''))
    mockList = mockList.filter(item => {
      console.log(
        item.dictName.toUpperCase().indexOf(dictName.toUpperCase()) >= 0
      )
      console.log(item.desc.toUpperCase().indexOf(desc.toUpperCase()) >= 0)
      console.log(item.status.toUpperCase().indexOf(status.toUpperCase()) >= 0)
      if (
        item.dictName.toUpperCase().indexOf(dictName.toUpperCase()) >= 0 &&
        item.desc.toUpperCase().indexOf(desc.toUpperCase()) >= 0 &&
        item.status.toUpperCase().indexOf(status.toUpperCase()) >= 0
      ) {
        return item
      }
    })

    // 是否有分页条件，没有分页条件就返回全部
    if (pageSize && pageNum) {
      dictList = mockList.filter(
        (item, index) =>
          index < pageSize * pageNum && index >= pageSize * (pageNum - 1)
      )
    } else {
      dictList = mockList
    }

    // console.log(list)
    return {
      code: 200,
      msg: 'success',
      data: { list: dictList, total: dictList.length }
    }
  }
}

export default [getDictList]
