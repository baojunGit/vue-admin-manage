<template>
  <div class="center-left">
    <my-edging1
      height="400px"
      width="100%"
      background="rgba(0, 235, 255, 0.08)"
    >
      <ul class="button-wrapper">
        <li
          v-for="(item, index) in tabs"
          @click="tabHandle(item.current)"
          :key="index"
          :class="{ active: index === state.currentIndex }"
        >
          {{ item.name }}
        </li>
      </ul>
      <my-echart
        height="360px"
        width="100%"
        :options="state.options"
      ></my-echart>
    </my-edging1>
  </div>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue'
import * as echarts from 'echarts'
const tabs = [
  {
    name: 'UV',
    current: 0
  },
  {
    name: 'PV',
    current: 1
  }
]
// 使用 reactive 包装数组(直接传入数组)响应式失效
// vue3使用proxy，对于对象或数组都不能直接将整个数据赋值，用data.xxx的方式多包裹一层就OK
// 解决方法1: 创建一个响应式对象，对象的属性是数组；解决方法2:使用ref函数。
type List = {
  name: string
  value: number
}
const state = reactive({
  currentIndex: 0,
  list: [
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
  ] as Array<List>,
  options: {}
})

let xAxisData = []
let seriesData = []

const getData = () => {
  xAxisData = []
  seriesData = []
  state.list.forEach(item => {
    xAxisData.push(item.name)
    seriesData.push(item.value)
  })
}

getData()

const tabHandle = index => {
  state.currentIndex = index
  if (index) {
    state.list = [
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
    ]
  } else {
    state.list = [
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
    ]
  }
  getData()
}
// 监听
watch(
  //监听多个参数 () => [state.list, state.currentIndex],
  () => state.list,
  // 当只有一个回调参数val默认是newVal，两个回调参数就是新、旧数据
  (newVal, oldVal) => {
    console.log(newVal, oldVal)
    state.options = {
      // backgroundColor: 'rgba(0, 235, 255, 0.08)',
      title: {
        text: `${tabs[state.currentIndex].name}访问趋势`,
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
<style lang="scss">
.button-wrapper {
  width: 100px;
  height: 24px;
  display: flex;
  li {
    height: 100%;
    box-sizing: border-box;
    width: 50%;
    padding: 4 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: color 0.3s, background 0.3s, border-color 0.3s, box-shadow 0.3s;
    &.active {
      color: #1890ff;
      border-color: #1890ff;
      border-style: solid;
      border-width: 0 0 1px 0;
    }
  }
}
</style>
