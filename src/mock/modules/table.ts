import Mock from 'mockjs';
import { getQueryValue } from '@/utils/urlQueryParam';
const analog = Mock.mock({
	data: [
		{
			boardId: 1,
			id: 1,
			name: '迭代完成率',
			desc: '指标业务价值：反映迭代中的故事按计划完成的能力，是衡量迭代团队管理和运作成熟度的参考指标。<br><br>计算公式：迭代完成率=∑实际完成故事点数/∑计划完成故事点数<br><br>详细逻辑：<br>1、实际完成故事点数：统计迭代结束日期后第3个工作日24:00，在看板价值列为测试完成及之后的故事卡的故事点数（不包括子卡故事点数）<br>注：若在迭代结束日期后第3个工作日24:00之前手动关闭迭代，则在迭代关闭时刻统计实际完成故事点数<br>2、计划完成故事点数：统计迭代激活且迭代开始日期后第5个工作日24:00，迭代内所有故事卡的故事点数（不包括子卡故事点数）',
			sort: '1',
			type: 'iteration1',
			isNew: true,
			url1: 'url1',
			url2: 'url2',
			url3: 'url3',
			show: true
		},
		{
			boardId: 1,
			id: 2,
			name: '迭代速率',
			desc: '指标业务价值：度量各迭代的产出故事点数，通过趋势分析反映各迭代的交付容量变化。<br><br>计算公式：迭代速率=∑迭代完成故事点数/∑迭代个数<br><br>详细逻辑：<br>迭代完成故事点数：统计迭代结束日期后第3个工作日24:00，在看板价值列为测试完成及之后的故事卡的故事点数（不包括子卡故事点数）',
			type: 'iteration2',
			isNew: false,
			sort: '2',
			url1: 'url1',
			url2: 'url2',
			url3: 'url3',
			show: true
		},
		{
			boardId: 1,
			id: 3,
			name: '报工统计',
			desc: '指标业务价值：反映敏捷团队的投入与资源的分布情况。<br><br>指标说明：统计敏捷团队的报工工时之和',
			type: 'iteration3',
			isNew: false,
			sort: '3',
			url1: 'url1',
			url2: 'url2',
			url3: 'url3',
			show: false
		},
		{
			boardId: 1,
			id: 4,
			name: '迭代缺陷',
			desc: '<b style="color:#15aeff;font-size:14px">迭代缺陷数</b><br>指标业务价值：反映了敏捷团队的近N个迭代的缺陷数量趋势及平均缺陷数，帮助团队了解缺陷水平及关注数据异常波动。<br>定义：指按迭代汇总开发有效缺陷（ST和UAT阶段的）的数量。<br>计算公式：迭代缺陷数=∑归属迭代的有效缺陷数<br><br><b style="color:#15aeff;font-size:14px">未关闭缺陷数</b><br>指标业务价值：提示团队聚焦待处理的缺陷，加快缺陷修复速度。<br>定义：统计缺陷为非终态状态（已修复、已分配、已发布、待讨论、打开、新建、重新打开）的有效缺陷数量。<br>计算公式：未关闭缺陷数=∑非终态状态的有效缺陷数<br><br>有效缺陷定义：<br>a.排除缺陷状态为："已否决"、"非问题关闭"、"取消"<br>b.排除一级根因为："需求错误" 、"环境错误"、"测试错误“<br>c.排除缺陷归属为："行外" 、"项目外"',
			type: 'iteration4',
			isNew: true,
			sort: '4',
			url1: 'url1',
			url2: 'url2',
			url3: 'url3',
			show: false
		}
	]
});

const mockList = analog.data;

const getTableList = {
	url: '/table/getTableList',
	method: 'get',
	template: config => {
		// console.log(config.url)
		const name = getQueryValue(config.url, 'name');
		const pageNum = parseInt(getQueryValue(config.url, 'pageNum'));
		const pageSize = parseInt(getQueryValue(config.url, 'pageSize'));
		let tableList = [];
		let totalList = [];
		totalList = mockList.filter(item =>
			item.name.toUpperCase().includes(name.toUpperCase())
		);
		// 是否有分页条件，没有分页条件就返回全部
		if (pageSize && pageNum) {
			tableList = totalList.filter(
				(_, index) =>
					index < pageSize * pageNum && index >= pageSize * (pageNum - 1)
			);
		} else {
			tableList = totalList;
		}

		// console.log(list)
		return {
			code: 0,
			msg: 'success',
			data: { dataList: tableList, total: totalList.length }
		};
	}
};

export default [getTableList];
