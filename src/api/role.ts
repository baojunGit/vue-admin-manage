import request from '@/utils/request';

// 获取角色列表数据
// params可选参数，会自动拼接在url后面
export const getRoleList = (params?: Object) => {
	return request({
		url: 'role/getRoleList',
		method: 'get',
		params
	});
};
