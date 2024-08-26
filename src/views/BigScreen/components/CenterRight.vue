<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import * as echarts from 'echarts';
import EchartsView from '@/components/EchartsView/index.vue';

const list = ref([
	{
		name: '组织级度量',
		value: 4500,
		itemStyle: {
			color: new echarts.graphic.RadialGradient(
				0.5,
				0.5,
				1,
				[
					{ offset: 0, color: '#0C1622' },
					{ offset: 1, color: '#06647D' }
				],
				false
			)
		},
		label: { color: '#00E3FE' }
	},
	{
		name: '数据服务',
		value: 4000,
		itemStyle: {
			color: new echarts.graphic.RadialGradient(
				0.5,
				0.5,
				1,
				[
					{ offset: 0, color: '#23203B' },
					{ offset: 1, color: '#43396D' }
				],
				false
			)
		},
		label: { color: '#9065FD' }
	},
	{
		name: '成效分析',
		value: 2000,
		itemStyle: {
			color: new echarts.graphic.RadialGradient(
				0.5,
				0.5,
				1,
				[
					{ offset: 0, color: '#2C3E42' },
					{ offset: 1, color: '#4E6170' }
				],
				false
			)
		},
		label: { color: '#7DA7BD' }
	},
	{
		name: '其他度量',
		value: 600,
		itemStyle: {
			color: new echarts.graphic.RadialGradient(
				0.5,
				0.5,
				1,
				[
					{ offset: 0, color: '#463428' },
					{ offset: 1, color: '#584133' }
				],
				false
			)
		},
		label: { color: '#D19A71' }
	},
	{
		name: '研发度量',
		value: 500,
		itemStyle: {
			color: new echarts.graphic.RadialGradient(
				0.5,
				0.5,
				1,
				[
					{ offset: 0, color: '#502630' },
					{ offset: 1, color: '#72353D' }
				],
				false
			)
		},
		label: { color: '#D06168' }
	},
	{
		name: '工程技术度量',
		value: 900,
		itemStyle: {
			color: new echarts.graphic.RadialGradient(
				0.5,
				0.5,
				1,
				[
					{ offset: 0, color: '#051B32' },
					{ offset: 1, color: '#05508A' }
				],
				false
			)
		},
		label: { color: '#0092FF' }
	}
]);

const options = ref({});

const formatUtil = echarts.format;

// Watch for changes in the list and update the options
watch(
	() => list.value,
	() => {
		options.value = {
			tooltip: {
				show: true,
				textStyle: { fontSize: 18 },
				formatter: function (info) {
					const value = info.value;
					const treePathInfo = info.treePathInfo;
					const treePath = treePathInfo.slice(1).map(item => item.name).join('/');
					return `<div class="tooltip-title">${formatUtil.encodeHTML(treePath)}</div>PV访问: ${formatUtil.addCommas(value)}`;
				}
			},
			series: [
				{
					name: '访问分布图',
					type: 'treemap',
					leafDepth: 1,
					breadcrumb: { show: true },
					visibleMin: 300,
					width: '100%',
					height: '100%',
					label: {
						show: true,
						formatter: '{b}',
						fontSize: 20
					},
					levels: [
						{
							visualDimension: 0,
							itemStyle: {
								borderWidth: 12,
								borderColor: '#05212c',
								gapWidth: 9
							}
						}
					],
					data: list.value
				}
			]
		};
	},
	{ immediate: true, deep: true }
);

// Reference to the EchartsView component
const myChart = ref<InstanceType<typeof EchartsView> & { chart: any }>();

// Handle mounted lifecycle to set up chart click event
onMounted(() => {
	if (myChart.value) {
		myChart.value.chart.on('click', () => {
			window.open('https://www.baidu.com');
		});
	}
});
</script>

<template>
	<div class="center-right">
		<h3
			style="
				font-size: 20px;
				line-height: 30px;
				color: '#fff';
				text-align: center;
			"
		>
			模块访问分布
		</h3>
		<EchartsView
			ref="myChart"
			height="370px"
			width="100%"
			:options="options"
		/>
	</div>
</template>
