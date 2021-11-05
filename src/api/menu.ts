import request from '@/utils/request'

//获取用户路由信息的接口
export const getMenu = (): any => {
  return request({
    url: 'menu/getMenu',
    method: 'get'
  })
}
