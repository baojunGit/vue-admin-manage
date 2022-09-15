import request from '@/utils/request';

// 获取用户列表数据
// params会自动拼接在url后面
export const getUserList = params => {
	return request({
		url: 'user/getUserList',
		method: 'get',
		params
	});
};

// 编辑用户信息
export const doEdit = data => {
	return request({
		url: 'user/doEdit',
		method: 'post',
		data
	});
};

// 删除用户信息
export const doDelete = data => {
	return request({
		url: '/userManagement/doDelete',
		method: 'post',
		data
	});
};
