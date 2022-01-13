<template>
  <div class="flip-clock">
    <FlipItem ref="flipperHour1" />
    <FlipItem ref="flipperHour2" />
    <em>:</em>
    <FlipItem ref="flipperMinute1" />
    <FlipItem ref="flipperMinute2" />
    <em>:</em>
    <FlipItem ref="flipperSecond1" />
    <FlipItem ref="flipperSecond2" />
  </div>
</template>
<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  getCurrentInstance,
  nextTick,
  onUnmounted
} from 'vue'
import FlipItem from './components/FlipItem.vue'
import { formatDate } from '@/utils/date'
let vm: any
let timer = ref(null)
let flipObjs = ref([])

// 初始化数字
const init = () => {
  let now = new Date()
  let nowTimeStr = formatDate(new Date(now.getTime()), 'hhiiss')
  for (let i = 0; i < flipObjs.value.length; i++) {
    flipObjs.value[i].setFront(nowTimeStr[i])
  }
}
// 开始计时
const run = () => {
  timer.value = setInterval(() => {
    // 获取当前时间
    let now = new Date()
    let nowTimeStr = formatDate(new Date(now.getTime() - 1000), 'hhiiss')
    let nextTimeStr = formatDate(now, 'hhiiss')
    for (let i = 0; i < flipObjs.value.length; i++) {
      if (nowTimeStr[i] === nextTimeStr[i]) {
        continue
      }
      flipObjs.value[i].flipDown(nowTimeStr[i], nextTimeStr[i])
    }
  }, 1000)
}

onBeforeMount(() => {
  // setup的执行时组件对象还没有创建,可以通过 getCurrentInstance这个函数来返回当前组件的实例对象
  vm = getCurrentInstance()
  nextTick(() => {
    flipObjs.value = [
      vm.refs.flipperHour1,
      vm.refs.flipperHour2,
      vm.refs.flipperMinute1,
      vm.refs.flipperMinute2,
      vm.refs.flipperSecond1,
      vm.refs.flipperSecond2
    ]

    init()
    run()
  })
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
})
</script>
<style lang="scss">
.flip-clock .m-flipper {
  margin: 0 3px;
}
.flip-clock em {
  display: inline-block;
  line-height: 102px;
  font-size: 66px;
  font-style: normal;
  vertical-align: top;
}
</style>
