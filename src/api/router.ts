import request from '@/utils/request'

// 获取用户路由信息的接口
export const getRouterList = (): any => {
  return request({
    url: 'router/getRouterList',
    method: 'get'
  })
}
