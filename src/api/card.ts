import request from '@/utils/request'

export const getIconList = () => {
  return request({
    url: '/card/getIconList',
    method: 'get'
  })
}
