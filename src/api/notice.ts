import request from '@/utils/request'

//获取用户路由信息的接口
export const getNoticeList = (): any => {
  return request({
    url: 'notice/getList',
    method: 'get'
  })
}
