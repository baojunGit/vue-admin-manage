import request from '@/utils/request';

// 获取用户路由信息的接口
export const getArticleList = (): any => {
	return request({
		url: 'article/getArticleList',
		method: 'get'
	});
};
