import { hornImg,user1Img, user2Img, user3Img } from "@/config/getImg";

export interface ListItem {
	avatar: string;
	title: string;
	datetime: string;
	type: string;
	description: string;
	status?: '' | 'success' | 'warning' | 'info' | 'danger';
	extra?: string;
}

export interface TabItem {
	key: string;
	name: string;
	noticeList: ListItem[];
}

const mockList = [
	{
		key: '1',
		name: '通知',
		noticeList: [
			{
				avatar: hornImg,
				title: '你收到了来自处女座的报告修改提醒',
				datetime: '一年前',
				description: '',
				type: '1'
			},
			{
				avatar: hornImg,
				title: '你推荐的菜鸡程序员已通过第二轮面试',
				datetime: '一周前',
				description: '',
				type: '1'
			},
			{
				avatar: hornImg,
				title: '这种模板可以区分多种通知类型',
				datetime: '一月前',
				description: '',
				type: '1'
			},
			{
				avatar: hornImg,
				title:
					'展示标题内容超过一行后的处理方式，如果内容超过1行将自动截断并支持tooltip显示完整标题。',
				datetime: '一年前',
				description: '',
				type: '1'
			},
			{
				avatar: hornImg,
				title: '左侧图标用于区分不同的类型',
				datetime: '一年前',
				description: '',
				type: '1'
			},
			{
				avatar: hornImg,
				title: '图标可以保存在nginx上新建的文件服务器目录上',
				datetime: '一年前',
				description: '',
				type: '1'
			}
		]
	},
	{
		key: '2',
		name: '消息',
		noticeList: [
			{
				avatar: user1Img,
				title: '麦克 评论了你',
				description: '好好干，公司不会亏待你的',
				datetime: '一年前',
				type: '2'
			},
			{
				avatar: user2Img,
				title: '李雷 回复了你',
				description: '公司的薪资延后发放，希望员工能跟公司共患难',
				datetime: '一个月前',
				type: '2'
			},
			{
				avatar: user3Img,
				title: '韩梅梅 回复了你',
				description:
					'您好，这个问题你可以联系M78星球的奥特曼进行答复，温馨提示，当前奥特曼正在外追打小怪兽，可能联系不上，请耐心等候！',
				datetime: '一年前',
				type: '2'
			}
		]
	},
	{
		key: '3',
		name: '代办',
		noticeList: [
			{
				avatar: '',
				title: '新增需求',
				description:
					'2020/2/10的中心例会，有室经理希望上半年能够有功能，可以查询到自己属下参与测试的项目清单并导出',
				datetime: '',
				extra: '未开始',
				status: 'info',
				type: '3'
			},
			{
				avatar: '',
				title: 'bug修复',
				description: '后端同学在2月17日删除了数据库，请尽快恢复',
				datetime: '',
				extra: '马上到期',
				status: 'danger',
				type: '3'
			},
			{
				avatar: '',
				title: '教练认证',
				description: '指派葫芦娃在今年上半年度完成教练认证',
				datetime: '',
				extra: '已耗时 8 天',
				status: 'warning',
				type: '3'
			},
			{
				avatar: '',
				title: '版本发布',
				description: '本周三发布xxx平台v1.88版本',
				datetime: '',
				extra: '已耗时 3 天',
				status: 'info',
				type: '3'
			}
		]
	}
];

const getNoticeList = {
	url: '/notice/getNoticeList',
	method: 'get',
	template: {
		msg: '获取成功',
		code: 0,
		data: mockList
	}
};

export default [getNoticeList];
