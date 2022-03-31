import request from '@/utils/request'

// 获取角色列表数据
// params可选参数，会自动拼接在url后面
export const getTargetList = (params?: Object) => {
  return request({
    url: 'target/getTargetList',
    method: 'get',
    params
  })
}
