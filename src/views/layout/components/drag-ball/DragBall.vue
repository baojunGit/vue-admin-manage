<!-- 实现思路 -->
<!-- 参照 https://github.com/prabhuignoto/vue-float-menu -->
<!-- 参照 https://gitee.com/chenhongshi/vue-drag-ball -->
<!-- 实现思路 -->
<!-- 1.鼠标按下时  记录拖拽事件开始的时间 -->
<!-- 2.按下移动时 监听document拖拽事件  style控制位置 ; -->
<!-- 2.1.判断拖拽区域 溢出时 归位判断； 2.2.拖拽时 阻止页面滑动  2.3.增加拖拽计数 -->
<!-- 3.鼠标抬起 -->
<!-- 3.1.修改 按下状态 为false  3.2.根据元素位置和容器高宽动态计算元素最后应该吸附位置 -->
<!-- 4.元素点击事件 -->
<!-- 4.1.拖拽计数与历史计数差小于10则执行点击事件  4.2.反之不执行 -->
<template>
  <!-- 如果适配移动端，则需加注touch事件 -->
  <div ref="drag-ball" class="drag-ball" :style="style">
    <div
      :class="[isCloseBtn ? 'close-button' : 'open-button', 'button-container']"
      @mousedown="handleDragStart"
      @mouseup="handleDragEnd"
      @mousemove="handleDragMove"
      @touchstart="handleDragStart"
      @touchend="handleDragEnd"
      @touchmove="handleDragMove"
      @click="toggleMenu"
    >
      <i v-if="isCloseBtn" class="iconfont icon-guanbi"></i>
      <i v-else class="iconfont icon-bangzhuzhongxin"></i>
    </div>
    <div v-show="isCloseBtn" class="open-panel">
      <a
        target="_blank"
        style="text-decoration: none"
        href="https://github.com/baojunGit/vue3-admin-manage"
        class="repositories bts"
        >代码仓库</a
      >
      <div
        @click="store.dispatch('feedback/setDialogState', true)"
        class="customer-feedback bts"
      >
        提交反馈
      </div>
      <div @click="cleanCache" class="clean-cache bts">清理缓存</div>
      <div
        @click="store.dispatch('version/setDialogState', true)"
        class="version-announcement-button bts"
      >
        版本公告
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, unref, onMounted, onUnmounted, computed } from 'vue'
import { handleLocal } from '@/utils/storage'
import Cookies from 'js-cookie'
import { useStore } from 'vuex'
interface Position {
  left: number
  top: number
}

const store = useStore()

// 是否开始拖拽
const dragStart = ref(false)
const previousPosition = ref<Position | null>(null)
// 工具按钮的直径
const dimension = 45
// 开始时间
const startTime = ref(0)
// 结束时间
const endTime = ref(0)
/**
 * vue事件使用不带圆括号的形式，event 对象将被自动当做实参传入；
 * 使用带圆括号的形式，我们需要使用 $event 变量显式传入 event 对象。
 */
const handleDragStart = (event: MouseEvent) => {
  if (!dragStart.value) {
    startTime.value = event.timeStamp
    dragStart.value = true
  }
}

const handleDragMove = (event: MouseEvent) => {
  // 当按下键滑动时， 阻止屏幕滑动事件(主要是移动端的体验), 只能写在这里，写在handleMove里不生效
  /**
   * @description event.preventDefault()
   * 阻止默认事件的方法，调用此方法是，连接不会被打开
   * 但是会发生冒泡，冒泡会传递到上一层的父元素
   */
  event.preventDefault()
}

const handleMove = (event: MouseEvent | TouchEvent) => {
  // 鼠标按下 切换移动状态
  if (dragStart.value) {
    let clientX = 0
    let clientY = 0
    if (event instanceof MouseEvent) {
      clientX = event.clientX
      clientY = event.clientY
    } else if (event instanceof TouchEvent) {
      clientX = event.touches[0].clientX
      clientY = event.touches[0].clientY
    }
    const left = clientX - Math.round(dimension / 2)
    const top = clientY - Math.round(dimension / 2)
    position.value = {
      left:
        left > 0 && left < window.innerWidth - dimension
          ? left
          : left < 0
          ? 0
          : innerWidth - dimension,
      top:
        top > 0 && top < window.innerHeight - dimension
          ? top
          : top < 0
          ? 0
          : innerHeight - dimension
    }
  }
}

const handleDragEnd = (event: MouseEvent) => {
  /**
   * clientX：当鼠标事件发生时（不管是onclick，还是omousemove，onmouseover等），鼠标相对于浏览器（这里说的是浏览器的有效区域）x轴的位置；
   * clientY：当鼠标事件发生时，鼠标相对于浏览器（这里说的是浏览器的有效区域）y轴的位置；
   */
  const { clientX, clientY } = event
  previousPosition.value = {
    left: clientX - Math.round(dimension / 2),
    top: clientY - Math.round(dimension / 2)
  }

  dragStart.value = false
}

// 监听全屏鼠标弹起事件，解决拖拽到屏幕边缘鼠标不在拖拽对象上的时候，不会取消拖拽状态
window.addEventListener('mouseup', () => {
  dragStart.value = false
})

// PC 端与移动端的判断(判断是否支持touch事件)
const isTouch = ref(window.ontouchstart !== undefined)

const moveEvent = computed(() => (unref(isTouch) ? 'touchmove' : 'mousemove'))

// 监听页面拖拽事件，而不是按钮拖拽事件，拖拽快的时候会导致失去按钮对象，使得拖拽事件失效
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

const position = ref<Position | null>(null)

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

/**
 * @description 点击菜单伸缩功能
 */

const isCloseBtn = ref(false)

// 在mousemove中加状态，在click事件中识别该状态
const toggleMenu = (event: MouseEvent) => {
  endTime.value = event.timeStamp
  let spaceTime = endTime.value - startTime.value
  // 拖拽时间小200ms就是点击事件，因为click事件发生在mouseup后
  if (spaceTime < 200) {
    isCloseBtn.value = !isCloseBtn.value
  }
  // 下面暂时没用到
  // 阻止展开菜单的事件冒泡
  /**
   * @description event.stopPropagation()
   * 点击子元素不触发父元素点击事件(js阻止冒泡)
   * 但是默认事件任然会执行，当你用这个方法的时候，如果点击一个连接，这个连接仍然会被打开
   */
  // event.stopPropagation()
  // event.preventDefault()
}

// 清理缓存
const cleanCache = () => {
  handleLocal.clearAll()
  Cookies.remove('token')
  location.reload()
}
</script>

<style lang="scss" scoped>
.drag-ball {
  position: absolute;
  right: 120px;
  bottom: 120px;
  .button-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 45px;
    height: 45px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    z-index: 9998;
    i {
      font-size: 24px;
      font-weight: 700;
      color: white;
    }
    &.close-button {
      background: #4a4a4a;
      // transform属性使用时存在覆盖性效果
      transform: translate(-50%, -50%) rotate(90deg);
      transition: all 1s;
    }
    &.open-button {
      background: #409eff;
    }
  }

  .open-panel {
    transition: all 3s ease-in;
    width: 180px;
    height: 180px;
    cursor: pointer;
    background: rgba(100, 174, 211, 0.15);
    border-radius: 50%;
    border: none;
    position: absolute;
    z-index: 9997;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    .bts {
      box-sizing: border-box;
      width: 45px;
      height: 45px;
      padding: 0 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background: #fff;
      color: #409eff;
      font-size: 12px;
      border: 2px solid #409eff;
      text-align: center;
      &.repositories {
        position: absolute;
        top: -17px;
      }
      &.customer-feedback {
        position: absolute;
        left: -17px;
      }
      &.clean-cache {
        position: absolute;
        bottom: -17px;
      }
      &.version-announcement-button {
        position: absolute;
        right: -17px;
      }
    }
  }
}
</style>
