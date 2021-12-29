<template>
  <div
    :id="id"
    :class="className"
    ref="chartRef"
    :style="{ height: height, width: width }"
  ></div>
</template>
<script setup lang="ts">
import {
  defineProps,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  defineExpose
} from 'vue'
import * as echarts from 'echarts'
import theme from './theme' // 引入默认主题
const props = defineProps({
  // 图表唯一id
  id: String,
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
})

const chartRef = ref<HTMLElement>()
const chart = ref<any>()

/**
 * @description 初始化echart
 * @param data 数据项
 * @param clearCaching 是否清除缓存
 */
const initChart = (data?: any, clearCaching = false) => {
  if (data || props.options) {
    chart.value.setOption(data || props.options, clearCaching)
  }
}

onMounted(() => {
  // 定义echart实例
  echarts.registerTheme('myTheme', theme) // 覆盖默认主题
  chart.value = echarts.init(chartRef.value, 'myTheme')
  initChart()
})

onBeforeUnmount(() => {
  chart.value.dispose()
  chart.value = null
})

// 监听改变
watch(
  () => props.options,
  val => {
    val && initChart(val)
  },
  {
    deep: true
  }
)

// 对外暴露接口, 一般暴露给父组件用
defineExpose({
  chartRef,
  initChart
})
</script>
<style lang="scss" scoped></style>
