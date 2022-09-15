import request from '@/utils/request';

// 获取消息列表
export const getNoticeList = (): any => {
	return request({
		url: 'notice/getNoticeList',
		method: 'get'
	});
};
