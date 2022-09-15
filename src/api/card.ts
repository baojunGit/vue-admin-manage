import request from '@/utils/request';

export const getIndexList = () => {
	return request({
		url: '/card/getIconList',
		method: 'get'
	});
};
