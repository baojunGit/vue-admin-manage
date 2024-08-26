import request from '@/utils/request';

export const getCardList = ():any => {
	return request({
		url: 'card/getCardList',
		method: 'get'
	});
};
