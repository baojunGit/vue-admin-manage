import Mock from 'mockjs';
import { getQueryValue } from '@/utils/urlQueryParam';

const dict = Mock.mock({
	data: [
		{
			dictId: 1,
			dictName: 'big_screen_url',
			desc: '大屏url链接',
			status: '1',
			datetime: '@datetime',
			children: [
				{
					id: 1,
					dictName: 'big_screen_url',
					itemText: 'Echarts大屏链接',
					itemValue: 'http://vue.lubaojun.com/data-operation',
					sort: 1,
					status: true
				}
			]
		},
		{
			dictId: 2,
			dictName: 'user_status',
			desc: '用户状态',
			status: '1',
			datetime: '@datetime',
			children: [
				{
					id: 1,
					dictName: 'user_status',
					itemText: '启用',
					itemValue: '1',
					sort: 1,
					status: true
				},
				{
					id: 2,
					dictName: 'user_status',
					itemText: '停用',
					itemValue: '0',
					sort: 1,
					status: true
				}
			]
		},
		{
			dictId: 3,
			dictName: 'job_status',
			desc: '岗位状态',
			status: '1',
			datetime: '@datetime'
		},
		{
			dictId: 4,
			dictName: 'dept_status',
			desc: '部门状态',
			status: '0',
			datetime: '@datetime'
		},
		{
			dictId: 5,
			dictName: 'sys_normal_disable',
			desc: '系统开关',
			status: '0',
			datetime: '@datetime'
		},
		{
			dictId: 6,
			dictName: 'sys_notice_type',
			desc: '系统通知类型',
			status: '0',
			datetime: '@datetime'
		},
		{
			dictId: 7,
			dictName: 'sys_menu_type',
			desc: '菜单类型',
			status: '0',
			datetime: '@datetime'
		}
	]
});

const mockList = dict.data;

const getDictList = {
	url: '/dict/getDictList',
	method: 'get',
	template: config => {
		// console.log(config.url)
		const dictName = getQueryValue(config.url, 'dictName');
		const desc = getQueryValue(config.url, 'desc');
		const status = getQueryValue(config.url, 'status');
		const pageNum = parseInt(getQueryValue(config.url, 'pageNum'));
		const pageSize = parseInt(getQueryValue(config.url, 'pageSize'));
		let dictList = [];
		let totalList = [];
		// filter()不会对空数组进行检测、不会改变原始数组
		totalList = mockList.filter(
			item =>
				item.dictName.toUpperCase().includes(dictName.toUpperCase()) &&
				item.desc.toUpperCase().includes(desc.toUpperCase()) &&
				item.status.toUpperCase().includes(status.toUpperCase())
		);

		// 是否有分页条件，没有分页条件就返回全部
		if (pageSize && pageNum) {
			dictList = totalList.filter(
				(_, index) =>
					index < pageSize * pageNum && index >= pageSize * (pageNum - 1)
			);
		} else {
			dictList = totalList;
		}

		// console.log(list)
		return {
			code: 0,
			msg: 'success',
			data: { dataList: dictList, total: mockList.length }
		};
	}
};

const getDictItem = {
	url: '/dict/getDictItem',
	method: 'get',
	template: config => {
		const dictId = getQueryValue(config.url, 'dictId');
		let totalList = [];
		totalList = mockList.filter(item => {
			return item.dictId === parseInt(dictId);
		});
		const itemList = totalList[0].children;
		return {
			code: 0,
			msg: 'success',
			data: itemList
		};
	}
};

export default [getDictList, getDictItem];
