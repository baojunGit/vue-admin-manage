<template>
  <div class="center-left">
    <my-edging1
      height="400px"
      width="100%"
      background="rgba(0, 235, 255, 0.08)"
    >
      <ul class="button-wrapper">
        <li
          v-for="(item, index) in list"
          @click="tabHandle(item.current)"
          :key="index"
          :class="{ active: index === currentIndex }"
        >
          {{ item.name }}
        </li>
      </ul>
      <my-echart height="360px" width="100%" :options="options"></my-echart>
    </my-edging1>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, toRefs } from 'vue'
import * as echarts from 'echarts'
type List = {
  name: string
  current: number
}
const currentIndex = ref(0)
const state = reactive({
  list: [
    {
      name: 'UV',
      current: 0
    },
    {
      name: 'PV',
      current: 1
    }
  ] as Array<List>
})

const { list } = toRefs(state)
let data = ref([
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

const options = ref({})
let xAxisData = []
let seriesData = []

const getData = () => {
  xAxisData = []
  seriesData = []
  data.value.forEach(item => {
    xAxisData.push(item.name)
    seriesData.push(item.value)
  })
}

getData()

const tabHandle = index => {
  currentIndex.value = index
  if (index) {
    data.value = [
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
    data.value = [
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
  //监听多个参数 () => [data.value, currentIndex.value],
  () => data.value,
  // 当只有一个回调参数val默认是newVal，两个回调参数就是新、旧数据
  (newVal, oldVal) => {
    console.log(newVal, oldVal)
    options.value = {
      // backgroundColor: 'rgba(0, 235, 255, 0.08)',
      title: {
        text: `${list.value[currentIndex.value].name}访问趋势`,
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
