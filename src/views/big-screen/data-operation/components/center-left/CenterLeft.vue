<template>
  <div class="center-left">
    <my-edging1
      height="400px"
      width="100%"
      background="rgba(0, 235, 255, 0.08)"
    >
      <ul>
        <li>UV</li>
        <li>PV</li>
      </ul>
      <my-echart height="360px" width="100%" :options="options"></my-echart>
    </my-edging1>
  </div>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue'
import * as echarts from 'echarts'

const data = reactive([
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
])
let options = {}
const xAxisData = []
const seriesData = []
data.forEach(item => {
  xAxisData.push(item.name)
  seriesData.push(item.value)
})
// 监听
watch(
  () => data,
  () => {
    options = {
      // backgroundColor: 'rgba(0, 235, 255, 0.08)',
      title: {
        text: '访问趋势',
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
    }
  },
  {
    immediate: true,
    deep: true
  }
)
</script>
<style lang="scss"></style>
