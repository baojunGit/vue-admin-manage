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
      status: '1',
      datetime: '@datetime'
    }
  ]
})

const List = dict.data

const getDictList = {
  url: '/dict/getDictList',
  method: 'get',
  template: config => {
    // console.log(config.url)
    const dictName = getQueryValue(config.url, 'dictName')
    const desc = getQueryValue(config.url, 'desc')
    const status = getQueryValue(config.url, 'desc')
    const pageNum = parseInt(getQueryValue(config.url, 'pageNum'))
    const pageSize = parseInt(getQueryValue(config.url, 'pageSize'))
    let list = []
    const mockList = List.filter(item => {
      const a =
        dictName &&
        item.roleName.toUpperCase().indexOf(dictName.toUpperCase()) < 0
      const b =
        desc && item.roleName.toUpperCase().indexOf(desc.toUpperCase()) < 0
      const c =
        status && item.roleName.toUpperCase().indexOf(status.toUpperCase()) < 0
      if (a && b && c) return item
    })
    // 是否有分页条件，没有分页条件就返回全部
    if (pageSize && pageNum) {
      list = mockList.filter(
        (item, index) =>
          index < pageSize * pageNum && index >= pageSize * (pageNum - 1)
      )
    } else {
      list = mockList
    }

    // console.log(list)
    return {
      code: 200,
      msg: 'success',
      data: { list, total: list.length }
    }
  }
}

export default [getDictList]
