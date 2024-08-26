import Mock from 'mockjs';
import { getQueryValue } from '@/utils/urlQueryParam';
const analog = Mock.mock({
	'data|1000': [
		// 生成1000条数据 数组
		{
			// 生成100条数据
			'id|+1': 1,
			userName: '@cname',
			'account|100000-999999': 100000, // 100000只作为数据类型的判断，数值没有实际意义
			info: '@county(true)',
			datetime: '@datetime',
			// 模拟一组包含两个元素，元素值在1-5之间
			'roleIds|2': [() => Mock.Random.integer(1, 6)]
		}
	]
});

const mockList = analog.data;

const getUserList = {
	url: '/user/getUserList',
	type: 'get',
	template: config => {
		// console.log(config.url)
		const userName = getQueryValue(config.url, 'userName');
		const pageNum = parseInt(getQueryValue(config.url, 'pageNum'));
		const pageSize = parseInt(getQueryValue(config.url, 'pageSize'));
		let userList = [];
		let totalList = [];
		totalList = mockList.filter(
			// toUpperCase()全部转换为大写，toLowerCase()全部转换为小写
			item => item.userName.toUpperCase().includes(userName.toUpperCase())
		);
		if (pageSize && pageNum) {
			userList = totalList.filter(
				(_, index) =>
					index < pageSize * pageNum && index >= pageSize * (pageNum - 1)
			);
		} else {
			userList = totalList;
		}
		return {
			code: 0,
			msg: 'success',
			data: { dataList: userList, total: mockList.length }
		};
	}
};

const doEdit = {
	url: '/user/doEdit',
	type: 'post',
	template: {
		msg: '模拟保存成功',
		code: 0
	}
};

const arrApi = [getUserList, doEdit]

export default arrApi;
