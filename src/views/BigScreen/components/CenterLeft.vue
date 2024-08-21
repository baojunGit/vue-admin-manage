<script setup lang="ts">
import { ref, watch } from 'vue';
import * as echarts from 'echarts';

const tabs = [
	{
		name: 'UV',
		current: 0
	},
	{
		name: 'PV',
		current: 1
	}
];

interface List {
	name: string;
	value: number;
}

const currentIndex = ref(0);
const list = ref<List[]>([
	{
		name: '2021/10/9',
		value: 400
	},
	{
		name: '2021/10/10',
		value: 1000
	},
	{
		name: '2021/10/11',
		value: 1308
	},
	{
		name: '2021/10/12',
		value: 875
	},
	{
		name: '2021/10/13',
		value: 678
	}
]);

const options = ref({});

let xAxisData: string[] = [];
let seriesData: number[] = [];

const getData = () => {
	xAxisData = [];
	seriesData = [];
	for (const { name, value } of list.value) {
		xAxisData.push(name);
		seriesData.push(value);
	}
};

getData();

const tabHandle = (index: number) => {
	currentIndex.value = index;
	if (index) {
		list.value = [
			{
				name: '2021/10/9',
				value: 500
			},
			{
				name: '2021/10/10',
				value: 790
			},
			{
				name: '2021/10/11',
				value: 308
			},
			{
				name: '2021/10/12',
				value: 975
			},
			{
				name: '2021/10/13',
				value: 658
			}
		];
	} else {
		list.value = [
			{
				name: '2021/10/9',
				value: 400
			},
			{
				name: '2021/10/10',
				value: 1000
			},
			{
				name: '2021/10/11',
				value: 1308
			},
			{
				name: '2021/10/12',
				value: 875
			},
			{
				name: '2021/10/13',
				value: 678
			}
		];
	}
	getData();
};

watch(
	() => list.value,
	() => {
		options.value = {
			title: {
				text: `${tabs[currentIndex.value].name}访问趋势`,
				top: 10,
				left: 'center',
				textStyle: {
					color: '#fff',
					fontSize: 20
				}
			},
			tooltip: {
				trigger: 'axis',
				extraCssText: 'z-index:1'
			},
			xAxis: [
				{
					type: 'category',
					boundaryGap: false,
					data: xAxisData,
					axisTick: {
						alignWithLabel: true
					}
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: [
				{
					name: '访问量',
					type: 'line',
					data: seriesData,
					smooth: true,
					areaStyle: {},
					itemStyle: {
						borderRadius: [0, 5, 5, 0],
						color: new echarts.graphic.LinearGradient(
							0,
							0,
							1,
							0,
							['#3ED572', '#399efd'].map((color, offset) => ({
								color,
								offset
							}))
						)
					},
					label: {
						show: true,
						position: 'top',
						fontSize: 16,
						color: '#fff'
					}
				}
			],
			grid: {
				top: '40px',
				right: '40px',
				bottom: '20px',
				left: '30px',
				containLabel: true
			}
		};
	},
	{
		immediate: true,
		deep: true
	}
);
</script>

<template>
	<div class="center-left">
		<Edging1 height="400px" width="100%" background="rgba(0, 235, 255, 0.08)">
			<ul class="button-wrapper">
				<li
					v-for="(item, index) in tabs"
					@click="tabHandle(item.current)"
					:key="index"
					:class="{ active: index === currentIndex }"
				>
					{{ item.name }}
				</li>
			</ul>
			<EchartsView height="360px" width="100%" :options="options" />
		</Edging1>
	</div>
</template>

<style lang="scss" scoped>
.button-wrapper {
	display: flex;
	width: 100px;
	height: 24px;
	li {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50%;
		height: 100%;
		padding: 10px;
		cursor: pointer;
		transition: color 0.3s, background 0.3s, border-color 0.3s, box-shadow 0.3s;
		&.active {
			color: #1890ff;
			border-color: #1890ff;
			border-style: solid;
			border-width: 0 0 1px;
		}
	}
}
</style>
