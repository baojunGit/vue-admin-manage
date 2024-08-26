import request from '@/utils/request';

// 获取字典列表
// params可选参数，会自动拼接在url后面
export const getDictList = (params?: Object) => {
	return request({
		url: 'dict/getDictList',
		method: 'get',
		params
	});
};

// 获取某个字典所有参数配置
export const getDictItem = (dictId?: string) => {
	return request({
		url: `dict/getDictItem?dictId=${dictId}`,
		method: 'get'
	});
};
