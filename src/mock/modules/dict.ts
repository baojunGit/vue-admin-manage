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

const mockList = dict.data

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
    let totalList = []
    // filter()不会对空数组进行检测、不会改变原始数组
    totalList = mockList.filter(item => {
      if (
        item.dictName.toUpperCase().includes(dictName.toUpperCase()) &&
        item.desc.toUpperCase().includes(desc.toUpperCase()) &&
        item.status.toUpperCase().includes(status.toUpperCase())
      ) {
        return item
      }
    })
    console.log('执行了dict获取接口')

    // 是否有分页条件，没有分页条件就返回全部
    if (pageSize && pageNum) {
      dictList = totalList.filter(
        (item, index) =>
          index < pageSize * pageNum && index >= pageSize * (pageNum - 1)
      )
    }

    // console.log(list)
    return {
      code: 200,
      msg: 'success',
      data: { list: dictList, total: totalList.length }
    }
  }
}

export default [getDictList]
