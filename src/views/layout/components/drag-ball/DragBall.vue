<template>
  <!-- 如果适配移动端，则需加注touch事件 -->
  <div
    ref="drag-ball"
    :class="[{ dragActive }, 'drag-ball']"
    :style="style"
    @mousedown="handleDragStart"
    @mouseup="handleDragEnd"
    @mousemove="handleDragMove"
    @touchstart="handleDragStart"
    @touchend="handleDragEnd"
    @touchmove="handleDragMove"
    @click="toggleMenu"
  >
    <div><i class="iconfont icon-bangzhuzhongxin"></i></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  unref,
  computed,
  onUnmounted,
  onMounted
} from 'vue'
interface Position {
  left: number
  top: number
}
export default defineComponent({
  name: 'DragBall',
  setup() {
    // PC 端与移动端的判断(判断是否支持touch事件)
    const isTouch = ref(window.ontouchstart !== undefined)
    // 是否开始拖动
    const dragStart = ref(false)
    const dragActive = ref(false)
    const perviousPosition = ref<Position | null>(null)
    // 工具按钮的直径
    const dimension = 45
    /**
     * vue事件使用不带圆括号的形式，event 对象将被自动当做实参传入；
     * 使用带圆括号的形式，我们需要使用 $event 变量显式传入 event 对象。
     */
    const handleDragStart = (event: MouseEvent) => {
      if (!isTouch.value) {
        // event.preventDefault()是通知浏览器不要执行与事件关联的默认动作
        event.preventDefault()
      }
      dragStart.value = true
    }

    const handleDragMove = () => {
      if (dragStart.value) {
        dragActive.value = true
      }
    }

    const handleDragEnd = (event: MouseEvent) => {
      /**
       * clientX：当鼠标事件发生时（不管是onclick，还是omousemove，onmouseover等），鼠标相对于浏览器（这里说的是浏览器的有效区域）x轴的位置；
       * clientY：当鼠标事件发生时，鼠标相对于浏览器（这里说的是浏览器的有效区域）y轴的位置；
       */
      const { clientX, clientY } = event
      if (dragActive.value) {
        perviousPosition.value = {
          left: clientX - Math.round(dimension / 2),
          top: clientY - Math.round(dimension / 2)
        }
        setTimeout(() => {
          dragActive.value = false
        })
        dragStart.value = false
      }
    }

    const toggleMenu = () => {}

    const moveEvent = computed(() =>
      unref(isTouch) ? 'touchmove' : 'mousemove'
    )

    const position = ref<Position | null>(null)

    const handleMove = (event: MouseEvent | TouchEvent) => {
      let clientX = 0
      let clientY = 0

      if (event instanceof MouseEvent) {
        clientX = event.clientX
        clientY = event.clientY
      } else if (event instanceof TouchEvent) {
        clientX = event.touches[0].clientX
        clientY = event.touches[0].clientY
      }

      if (dragActive.value) {
        const top = clientY - Math.round(dimension / 2)

        position.value = {
          left: clientX - Math.round(dimension / 2),
          top:
            top > 0 && top < window.innerHeight - dimension
              ? top
              : top < 0
              ? 0
              : top - dimension
        }
      }
    }

    onMounted(() => {
      /**
       * @description JS事件监听：document.addEventListener("事件名称", 函数, boolean);
       * 如果为true事件执行顺序为 addEventListener ---- 标签的onclick事件 ---- document.onclick
       * 如果为false事件的顺序为 标签的onclick事件 ---- document.onclick ---- addEventListener
       */
      document.addEventListener(moveEvent.value, handleMove)
    })

    onUnmounted(() => {
      document.removeEventListener(moveEvent.value, handleMove)
    })

    // compute the style
    const style = computed(() => {
      const pos = unref(position)

      if (pos) {
        return {
          left: `${pos.left}px`,
          top: `${pos.top}px`,
          width: `${dimension}px`,
          height: `${dimension}px`
        }
      } else {
        return {}
      }
    })

    return {
      handleDragStart,
      handleDragEnd,
      handleDragMove,
      toggleMenu,
      dragActive,
      style
    }
  }
})
</script>

<style lang="scss" scoped>
.drag-ball {
  position: absolute;
  z-index: 9999;
  right: 86px;
  bottom: 100px;
  width: 45px;
  height: 45px;
  box-sizing: border-box;
  border-radius: 50%;
  background: #409eff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  i {
    font-size: 24px;
    font-weight: 700;
    color: white;
  }
}
</style>
