import request from '@/utils/request'

// 获取用户列表数据
// params会自动拼接在url后面
export const getRoleList = () => {
  return request({
    url: 'role/getRoleList',
    method: 'get'
  })
}
