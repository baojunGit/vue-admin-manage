<template>
  <div class="bar1">
    <my-echart
      @chart-click="handleClick"
      height="160px"
      width="100%"
      :options="state.options"
    />
    <div class="statistic">
      <div class="suspend">暂缓 <span>0</span>个</div>
      <div class="tech-suspend">因技术原因暂缓 <span>0</span>个</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, toRefs, reactive, watch } from 'vue'

interface List {
  name: string
  value: number
  suffix: string
}

const props = defineProps({
  list: {
    type: Array as PropType<List[]>,
    default: () => [{}]
  },
  url: {
    type: String,
    default: () => {}
  }
})

const { list, url } = toRefs(props)
console.log(list.value)
console.log(url.value)

const state = reactive({
  currentIndex: 0,
  options: {}
})

let yAxisData = []
let seriesData = []
const colorList = ['#0d7abb', '#42acd6', '#0d9b8e']

const getData = () => {
  yAxisData = []
  seriesData = []
  for (const { name, value } of list.value) {
    yAxisData.push(name)
    seriesData.push(value)
  }
}
getData()

// 计算最大值
const calMax = arr => {
  // ES6获取数组中的最大值
  const max = arr.reduce((a, b) => {
    return b > a ? b : a
  })
  const maxInt = Math.ceil(max / 9.5)
  // 不让最高的值超过最上面的刻度
  const maxVal = maxInt * 10
  // 让显示的刻度是整数
  return maxVal
}

const maxValue = calMax(seriesData)

// console.log(maxValue)
// console.log(yAxisData)
// console.log(seriesData)

// 监听
watch(
  // 监听多个参数 () => [list.value, state.currentIndex],
  () => list.value,
  // 当只有一个回调参数val默认是newVal，两个回调参数就是新、旧数据
  () => {
    state.options = {
      xAxis: [
        {
          type: 'value',
          // 最小值
          min: 0,
          // 最大值
          max: maxValue,
          //  平均分为5份
          interval: maxValue / 5,
          // 坐标轴在图表区域中的分隔线
          splitLine: {
            show: true
            //   lineStyle: {
            //     color: ''
            //   }
          },
          splitNumber: 5,
          // 坐标轴轴线
          axisLine: {
            show: false
          },
          // 坐标轴刻度标签
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
          // 坐标轴轴线
          axisLine: {
            show: false
          },
          // 坐标轴刻度
          axisTick: {
            alignWithLabel: true
          },
          //   坐标轴刻度标签
          axisLabel: {
            show: true,
            color: 'rgba(0,0,0,0.45)',
            fontWeight: 'bold',
            interval: 'auto',
            formatter: `{value}`
          }
        }
      ],
      //   xAxis: {
      //     // 设置为value，yAxis设置为category，就是横向柱状图
      //     type: 'value',
      //     // 坐标轴在图表区域中的分隔线
      //     splitLine: {
      //       show: true
      //       //   lineStyle: {
      //       //     color: ''
      //       //   }
      //     },
      //     splitNumber: 5,
      //     // 坐标轴刻度
      //     axisTick: {
      //       show: true
      //     },
      //     // 坐标轴轴线
      //     axisLine: {
      //       show: true
      //     },
      //     // 坐标轴刻度标签
      //     axisLabel: {
      //       show: true,
      //       color: '#409eff',
      //       fontSize: 16,
      //       fontWeight: 'bold'
      //     },
      //     // 最小值
      //     min: 0,
      //     // 最大值
      //     max: maxValue,
      //     //  平均分为5份
      //     interval: maxValue / 5
      //   },
      //   yAxis: [
      //     {
      //       type: 'category',
      //       inverse: true,
      //       axisLabel: {
      //         show: true,
      //         color: 'blue'
      //       },
      //       splitLine: {
      //         show: false
      //       },
      //       axisTick: {
      //         show: true
      //       },
      //       axisLine: {
      //         show: false
      //       },
      //       data: xAxisData
      //     },
      //     {
      //       type: 'category',
      //       inverse: true,
      //       axisTick: 'none',
      //       axisLine: 'none',
      //       show: true,
      //       axisLabel: {
      //         color: 'red',
      //         fontSize: '12'
      //       },
      //       data: seriesData
      //     }
      //   ],
      legend: {
        orient: 'vertical', // 控制水平排列
        top: '36%', // 调整位置
        right: '6%', // 距离右侧位置
        icon: 'circle', // 修改小图标为圆形
        itemHeight: 12, // 修改圆形小图标的大小
        textStyle: {
          // 文字的样式
          fontSize: 24, // 可控制每个legend项的间距
          color: '#828282',
          rich: {
            // 通过富文本rich给每个项设置样式，下面的oneone、twotwo、threethree可以理解为"每一列"的样式
            oneone: {
              // 设置文字、数学、英语这一列的样式
              width: 50,
              color: '#000000',
              fontSize: 12,
              fontWeight: 'bolder'
            },
            twotwo: {
              // 设置10分、20分、30分这一列的样式
              width: 35,
              color: '#333',
              fontSize: 12
            },
            threethree: {
              // 设置百分比这一列的样式
              width: 20,
              color: '#E0E0E0',
              fontSize: 12
            }
          }
        },
        formatter: name => {
          // formatter格式化函数动态呈现数据
          console.log(name)
          let total = 0 // 用于计算总数
          let target // 遍历拿到数据
          for (let i = 0; i < list.value.length; i++) {
            total += list.value[i].value
            if (list.value[i].name === name) {
              target = list.value[i].value
            }
          }
          const v = ((target / total) * 100).toFixed(2)
          return `{oneone|${name}}  {twotwo|${target}分}   {threethree|${v}%}`
          //     富文本第一列样式应用    富文本第二列样式应用      富文本第三列样式应用
        }
      },
      color: ['#baf', '#bfa', '#cde'], // 控制圆环图的颜色
      series: [
        {
          data: list.value,
          type: 'bar',
          // 柱形显示数值
          label: {
            // 柱图头部显示值
            show: true,
            position: 'right',
            color: '#333',
            fontSize: '16px',
            formatter: params => {
              return params.value[params.encode.x[0]]
            }
          },
          // 柱体宽度
          barWidth: 18,
          // 柱体显示不同颜色
          itemStyle: {
            color: params => {
              // 核心代码
              return `${colorList[params.dataIndex]}`
            }
          },
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ],
      // 图表主体内容四周的留白
      grid: {
        top: '30px',
        // 右边要有间距才不会遮住横轴最后的坐标
        right: '10px',
        bottom: '10px',
        left: '0px',
        // 当echarts是获取动态数据绘图时，就可能会出现坐标轴的label过长溢出的情况
        // 设置containLabel: true来防止标签溢出
        containLabel: true
      }
    }
  },
  {
    immediate: true,
    deep: true
  }
)

const handleClick = () => {
  window.open(url.value)
}
</script>
<style lang="scss" scoped>
.bar1 {
  height: 100%;
  .statistic {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: #409eff;
      font-size: 30px;
      margin-left: 20px;
    }
  }
}
</style>
