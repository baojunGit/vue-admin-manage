import request from '@/utils/request'

//获取用户路由信息的接口
export const getMenuList = (): any => {
  return request({
    url: 'menu/getMenuList',
    method: 'get'
  })
}
