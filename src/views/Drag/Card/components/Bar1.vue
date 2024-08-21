<script setup lang="ts">
import { ref, watch } from 'vue';

interface List {
	name: string;
	value: number;
	suffix: string;
}

interface Props {
	list: List[];
	url: string;
}

// Define the props with withDefaults
const props = withDefaults(defineProps<Props>(), {
	list: () => [],
	url: ''
});

// Access the props using destructuring
const { list, url } = props;

const options = ref({});

let yAxisData: string[] = [];
let seriesData: number[] = [];
const colorList = ['#0d7abb', '#42acd6', '#0d9b8e'];

const getData = () => {
	yAxisData = [];
	seriesData = [];
	for (const { name, value } of list) {
		yAxisData.push(name);
		seriesData.push(value);
	}
};
getData();

// Calculate maximum value
const calMax = (arr: number[]) => {
	const max = arr.reduce((a, b) => (b > a ? b : a));
	const maxInt = Math.ceil(max / 9.5);
	const maxVal = maxInt * 10;
	return maxVal;
};

const maxValue = calMax(seriesData);

// Watch the list prop and update the chart options
watch(
	() => list,
	() => {
		getData();
		options.value = {
			xAxis: [
				{
					type: 'value',
					min: 0,
					max: maxValue,
					interval: maxValue / 5,
					splitLine: {
						show: true
					},
					splitNumber: 5,
					axisLine: {
						show: false
					},
					axisLabel: {
						show: true,
						color: 'rgba(0,0,0,0.45)',
						fontWeight: 'bold',
						formatter: `{value}`
					},
					triggerEvent: true
				}
			],
			yAxis: [
				{
					type: 'category',
					data: yAxisData,
					axisLine: {
						show: false
					},
					axisTick: {
						alignWithLabel: true
					},
					axisLabel: {
						show: true,
						color: 'rgba(0,0,0,0.45)',
						fontWeight: 'bold',
						interval: 'auto',
						formatter: `{value}`
					}
				}
			],
			legend: {
				data: seriesData
			},
			series: [
				{
					data: list,
					type: 'bar',
					label: {
						show: true,
						position: 'right',
						color: '#333',
						fontSize: '16px',
						formatter: params => params.value[params.encode.x[0]]
					},
					barWidth: 18,
					itemStyle: {
						color: params => colorList[params.dataIndex]
					},
					showBackground: true,
					backgroundStyle: {
						color: 'rgba(180, 180, 180, 0.2)'
					}
				}
			],
			grid: {
				top: '0px',
				right: '10px',
				bottom: '10px',
				left: '0px',
				containLabel: true
			}
		};
	},
	{
		immediate: true,
		deep: true
	}
);

const handleClick = () => {
	window.open(url);
};
</script>

<template>
	<div class="bar1">
		<EchartsView
			@chart-click="handleClick"
			height="160px"
			width="100%"
			:options="options"
			draggable="true"
		/>
		<div class="statistic">
			<div class="suspend">暂缓 <span>0</span>个</div>
			<div class="tech-suspend">因技术原因暂缓 <span>0</span>个</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.bar1 {
	height: 100%;
	.statistic {
		display: flex;
		align-items: center;
		justify-content: space-between;
		span {
			margin-left: 20px;
			font-size: 28px;
			color: #409eff;
		}
	}
}
</style>
