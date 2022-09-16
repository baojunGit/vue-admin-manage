<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as echarts from 'echarts';
import theme from './theme'; // 引入默认主题
const props = defineProps({
	// 图表唯一id
	id: {
		type: String,
		default: '',
		require: true
	},
	// 图表类名
	className: {
		type: String,
		default: 'chart'
	},
	// 图表宽度
	width: {
		type: String,
		require: true,
		default: () => '100%'
	},
	// 图表高度
	height: {
		type: String,
		require: true,
		default: () => '100%'
	},
	// 图表数据项
	options: {
		type: Object,
		require: false,
		default: () => {}
	}
});

const chartRef = ref<HTMLElement>();
const chart = ref<any>();

/**
 * @description 初始化echart
 * @param data 数据项
 * @param clearCaching 是否清除缓存, 更新图表
 */
const initChart = (data?: any, clearCaching = false) => {
	if (data || props.options) {
		chart.value.setOption(data || props.options, clearCaching);
	}
};

const emit = defineEmits(['chart-click']);
const onChartClick = () => {
	emit('chart-click');
};

onMounted(() => {
	// 定义echart实例
	echarts.registerTheme('myTheme', theme); // 覆盖默认主题
	chart.value = echarts.init(chartRef.value, 'myTheme');
	chart.value.on('click', () => {
		onChartClick();
	});
	initChart();
});

onBeforeUnmount(() => {
	chart.value.dispose();
	chart.value = null;
});

// 监听改变
watch(
	() => props.options,
	val => {
		val && initChart(val);
	},
	{
		deep: true
	}
);

// 编译器宏: 对外暴露属性、方法, 一般暴露给父组件用
// 在父组件中直接修改子组件的属性，子组件也会相应更新
defineExpose({
	chartRef,
	chart,
	initChart
});
</script>

<template>
	<div
		:id="id"
		:class="className"
		ref="chartRef"
		:style="{ height: height, width: width }"
	></div>
</template>

<style lang="scss" scoped></style>
