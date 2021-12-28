<template>
  <span class="count-to" :style="{ color: color, fontSize: fontSize }">
    {{ state.displayValue }}
  </span>
</template>
<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  reactive,
  computed,
  watch,
  unref,
  onMounted
} from 'vue'
import { isNumber } from '@/utils/is'
const props = defineProps({
  // 初始数字
  startVal: {
    type: Number,
    require: false,
    default: () => 0
  },
  // 结束数字
  endVal: {
    type: Number,
    require: false,
    default: () => 2021
  },
  // 动画持续多少毫秒
  duration: {
    type: Number,
    required: false,
    default: () => 3000
  },
  // 自动开始动画效果, 当 为true 时，它会在 startVal 或 endVal 改变时自动开始
  autoplay: {
    type: Boolean,
    required: false,
    default: () => true
  },
  // 几个小数位
  decimals: {
    type: Number,
    required: false,
    default: 0,
    validator(value) {
      return value >= 0
    }
  },
  // 小数点
  decimal: {
    type: String,
    required: false,
    default: () => '.'
  },
  // 分隔符
  separator: {
    type: String,
    required: false,
    default: () => ','
  },
  // 前缀
  prefix: {
    type: String,
    required: false,
    default: () => ''
  },
  // 后缀
  suffix: {
    type: String,
    required: false,
    default: () => ''
  },
  // 字体颜色
  color: {
    type: String,
    required: false,
    default: () => ''
  },
  // 字体大小
  fontSize: {
    type: String,
    required: false,
    default: () => ''
  },
  // 是否使用缓动功能
  useEasing: {
    type: Boolean,
    required: false,
    default: () => true
  },
  // 缓动函数
  easingFn: {
    type: Function,
    default: (t, b, c, d) => {
      return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
    }
  }
})

const emit = defineEmits(['mounted', 'callback'])

const formatNumber = (num: Number | String) => {
  const { decimals, decimal, separator, suffix, prefix } = props
  num = Number(num).toFixed(decimals)
  num += ''
  const x = num.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? decimal + x[1] : ''
  const rgx = /(\d+)(\d{3})/
  if (separator && !isNumber(separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2')
    }
  }
  return prefix + x1 + x2 + suffix
}

const state = reactive<{
  localStartVal: number
  displayValue: string
  printVal: number | null
  paused: boolean
  localDuration: number | null
  startTime: number | null
  timestamp: number | null
  remaining: number | null
  rAF: any
  color: string
  fontSize: string
}>({
  localStartVal: props.startVal,
  displayValue: formatNumber(props.startVal),
  printVal: null,
  paused: false,
  localDuration: props.duration,
  startTime: null,
  timestamp: null,
  remaining: null,
  rAF: null,
  color: null,
  fontSize: '16px'
})

watch([() => props.startVal, () => props.endVal], () => {
  if (props.autoplay) {
    start()
  }
})

const start = () => {
  const { startVal, duration, color, fontSize } = props
  state.localStartVal = startVal
  state.startTime = null
  state.localDuration = duration
  state.paused = false
  state.color = color
  state.fontSize = fontSize
  // H5提供的请求动画方法 requestAnimationFrame
  state.rAF = requestAnimationFrame(count)
}

const getCountDown = computed(() => {
  return props.startVal > props.endVal
})

const count = (timestamp: number) => {
  const { useEasing, easingFn, endVal } = props
  if (!state.startTime) state.startTime = timestamp
  state.timestamp = timestamp
  const progress = timestamp - state.startTime
  state.remaining = (state.localDuration as number) - progress
  if (useEasing) {
    if (unref(getCountDown)) {
      state.printVal =
        state.localStartVal -
        easingFn(
          progress,
          0,
          state.localStartVal - endVal,
          state.localDuration as number
        )
    } else {
      state.printVal = easingFn(
        progress,
        state.localStartVal,
        endVal - state.localStartVal,
        state.localDuration as number
      )
    }
  } else {
    if (unref(getCountDown)) {
      state.printVal =
        state.localStartVal -
        (state.localStartVal - endVal) *
          (progress / (state.localDuration as number))
    } else {
      state.printVal =
        state.localStartVal +
        (endVal - state.localStartVal) *
          (progress / (state.localDuration as number))
    }
  }
  if (unref(getCountDown)) {
    state.printVal = state.printVal < endVal ? endVal : state.printVal
  } else {
    state.printVal = state.printVal > endVal ? endVal : state.printVal
  }
  state.displayValue = formatNumber(state.printVal)
  if (progress < (state.localDuration as number)) {
    state.rAF = requestAnimationFrame(count)
  } else {
    emit('callback')
  }
}

onMounted(() => {
  if (props.autoplay) {
    start()
  }
  emit('mounted')
})
</script>
<style lang="scss"></style>
