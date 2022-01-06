<template>
  <div class="center-right">
    <h3
      style="
        text-align: center;
        font-size: 20px;
        line-height: 30px;
        color: '#fff';
      "
    >
      模块访问分布
    </h3>
    <my-echart
      ref="myChart"
      height="370px"
      width="100%"
      :options="state.options"
    ></my-echart>
  </div>
</template>
<script setup lang="ts">
import { reactive, watch, ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import MyEchart from '@/components/my-echart/MyEchart.vue'
// ts中使用的时候，你可能需要获取子组件的类型，
// 你可以使用InstanceType<typeof 组件名称> 来获取组件的类型，以传入ref泛型

const state = reactive({
  list: [
    {
      name: '组织级度量',
      value: 4500,
      itemStyle: {
        color: new echarts.graphic.RadialGradient(
          0.5,
          0.5,
          1,
          [
            {
              offset: 0,
              color: '#0C1622'
            },
            {
              offset: 1,
              color: '#06647D'
            }
          ],
          false
        )
      },
      label: {
        color: '#00E3FE'
      }
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
            {
              offset: 0,
              color: '#23203B'
            },
            {
              offset: 1,
              color: '#43396D'
            }
          ],
          false
        )
      },
      label: {
        color: '#9065FD'
      }
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
            {
              offset: 0,
              color: '#2C3E42' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#4E6170' // 100% 处的颜色
            }
          ],
          false
        )
      },
      label: {
        color: '#7DA7BD'
      }
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
            {
              offset: 0,
              color: '#463428' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#584133' // 100% 处的颜色
            }
          ],
          false
        )
      },
      label: {
        color: '#D19A71'
      }
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
            {
              offset: 0,
              color: '#502630' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#72353D' // 100% 处的颜色
            }
          ],
          false
        )
      },
      label: {
        color: '#D06168'
      }
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
            {
              offset: 0,
              color: '#051B32' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#05508A' // 100% 处的颜色
            }
          ],
          false
        )
      },
      label: {
        color: '#0092FF'
      }
    }
  ],
  options: {}
})

let formatUtil = echarts.format

// 监听
watch(
  () => state.list,
  () => {
    state.options = {
      // backgroundColor: 'rgba(0, 235, 255, 0.08)',
      tooltip: {
        show: true,
        formatter: function (info) {
          var value = info.value
          var treePathInfo = info.treePathInfo
          var treePath = []

          for (var i = 1; i < treePathInfo.length; i++) {
            treePath.push(treePathInfo[i].name)
          }

          return [
            '<div class="tooltip-title">' +
              formatUtil.encodeHTML(treePath.join('/')) +
              '</div>',
            'PV访问: ' + formatUtil.addCommas(value)
          ].join('')
        }
      },

      series: [
        {
          name: '访问分布图',
          // 树形图类型
          type: 'treemap',
          visibleMin: 300,
          // 不设置百分百不会铺满盒子
          width: '100%',
          height: '100%',
          // 不能缩放平移
          // roam: 'false',
          // 点击某个节点，会自动放大那个节点到合适的比例（节点占可视区域的面积比例），这个配置项就是这个比例。
          // 取值类型为 number，默认值为 0.32*0.32。
          zoomToNodeRatio: 0.5 * 0.5,
          // 是否显示矩阵的父节点标签
          // upperLabel: {
          //   show: false
          // },
          // 点击矩阵模块后不执行默认行为
          // nodeClick: false,
          // 文字标签定义
          label: {
            show: true,
            formatter: '{b}',
            fontSize: 20
          },
          // 对树的每个层级进行配置, 有几层配置几个对象
          levels: [
            {
              visualDimension: 0,
              itemStyle: {
                // 表示同一层级的节点的 颜色 选取列表
                // color: '#009a9c',
                // 矩形边框宽度
                borderWidth: 12,
                // 矩形边框 和 矩形间隔（gap）的颜色
                borderColor: '#05212c',
                // 矩形之间分隔的宽度
                gapWidth: 9
              }
            }
          ],
          // 数据来源
          data: state.list
        }
      ]
    }
  },
  {
    immediate: true,
    deep: true
  }
)
interface SonData {
  chartRef: HTMLElement
  chart: any
  initChart: () => void
}
// 不能在onMounted里再去获取子组件，要先获取，然后在onMounted里取子组件属性值
const myChart = ref<InstanceType<typeof MyEchart> & SonData>()
// 调用Echarts子组件中的点击方法
onMounted(() => {
  console.log(myChart.value.chart)
  myChart.value.chart.on('click', params => {
    console.log(1)
    console.log(params)
    console.log(2)
    window.open('https://www.baidu.com')
  })
})
</script>
<style lang="scss"></style>
