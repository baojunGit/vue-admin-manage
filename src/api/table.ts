import request from '@/utils/request';

export const getTableList = (params?: Object) => {
	return request({
		url: 'table/getTableList',
		method: 'get',
		params
	});
};
