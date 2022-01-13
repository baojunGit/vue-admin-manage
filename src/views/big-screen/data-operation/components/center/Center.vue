<template>
  <div class="data-center">
    <ul class="plant-up">
      <li>
        <p class="li-title">今日UV<i></i></p>
        <count-to
          prefix=""
          :duration="3000"
          :color="'#0efcff'"
          :fontSize="'30px'"
          :startVal="1"
          :endVal="674"
        ></count-to>
        <span class="line" style="background: #409eff"></span>
      </li>
      <li>
        <p class="li-title">日均UV<i></i></p>
        <count-to
          prefix=""
          :duration="3000"
          :color="'#0efcff'"
          :fontSize="'30px'"
          :startVal="1"
          :endVal="823"
        ></count-to>
        <span class="line" style="background: #67c23a"></span>
      </li>
      <li>
        <p class="li-title">今日PV<i></i></p>
        <count-to
          prefix=""
          :duration="3000"
          :color="'#0efcff'"
          :fontSize="'30px'"
          :startVal="1"
          :endVal="1496"
        ></count-to>
        <span class="line" style="background: #e6a23c"></span>
      </li>
      <li>
        <p class="li-title">日均PV<i></i></p>
        <count-to
          prefix=""
          :duration="3000"
          :color="'#0efcff'"
          :fontSize="'30px'"
          :startVal="1"
          :endVal="1388"
        ></count-to>
        <span class="line" style="background: #f56c6c"></span>
      </li>
    </ul>
    <div class="plant-down">
      <my-edging2 height="256px" width="100%">
        <my-echart :options="options"></my-echart>
      </my-edging2>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue'
import * as echarts from 'echarts'
const data = reactive([
  {
    name: '部门高层领导',
    value: 4
  },
  {
    name: '团队主管',
    value: 10
  },
  {
    name: '室经理',
    value: 134
  },
  {
    name: '组长',
    value: 516
  }
])
// echarts配置项
let options = {}
const xAxisData = []
const seriesData = []
const barTopColor = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c']
const barBottomColor = [
  'rgba(64,158,255,0.1)',
  'rgba(103, 194, 58, 0.1)',
  'rgba(230, 162, 60, 0.1)',
  'rgba(245, 108, 108, 0.1)'
]
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
        text: '关键用户访问',
        top: 10,
        left: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 20
        }
      },
      xAxis: {
        data: xAxisData,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        // 坐标轴刻度标签的相关设置
        axisLabel: {
          show: true,
          margin: 25,
          align: 'center',
          fontSize: 14,
          color: '#fff',
          formatter: function (params) {
            return `{a|${params}}`
          },
          // 设置formatter里文本的格式，可以设置多个
          rich: {
            a: {
              height: 20,
              fontSize: 14,
              color: '#fff'
            }
          }
        },
        // 坐标轴分隔线的显示间隔
        interval: 0
      },
      yAxis: {
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        }
      },
      series: [
        {
          name: '柱顶部',
          type: 'pictorialBar',
          symbolSize: [26, 10],
          symbolOffset: [0, -5],
          z: 12,
          itemStyle: {
            color: function (params) {
              return barTopColor[params.dataIndex]
            }
          },
          label: {
            show: true,
            position: 'top',
            fontSize: 16,
            color: '#fff'
          },
          symbolPosition: 'end',
          data: seriesData
        },
        {
          name: '柱底部',
          type: 'pictorialBar',
          symbolSize: [26, 10],
          symbolOffset: [0, 5],
          z: 12,
          itemStyle: {
            color: function (params) {
              return barTopColor[params.dataIndex]
            }
          },
          data: seriesData
        },
        {
          name: '第一圈',
          type: 'pictorialBar',
          symbolSize: [47, 16],
          symbolOffset: [0, 11],
          z: 11,
          itemStyle: {
            color: 'transparent',
            borderColor: '#3ACDC5',
            borderWidth: 2
          },
          data: seriesData
        },
        {
          name: '第二圈',
          type: 'pictorialBar',
          symbolSize: [62, 22],
          symbolOffset: [0, 17],
          z: 10,
          itemStyle: {
            color: 'transparent',
            borderColor: barTopColor[0],
            borderWidth: 2
          },
          data: seriesData
        },
        {
          type: 'bar',
          itemStyle: {
            color: function (params) {
              return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 1,
                  color: barTopColor[params.dataIndex]
                },
                {
                  offset: 0,
                  color: barBottomColor[params.dataIndex]
                }
              ])
            },
            opacity: 0.8
          },
          z: 16,
          silent: true,
          barWidth: 26,
          barGap: '-100%', // Make series be overlap
          data: seriesData
        }
      ],
      // 控制echarts视图四周的留白
      grid: {
        top: '40px',
        right: '20px',
        bottom: '20px',
        left: '20px',
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
