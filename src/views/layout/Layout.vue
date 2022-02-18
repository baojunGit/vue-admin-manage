<template>
  <!-- computed计算属性和pinia里的属性一起用就会失效 -->
  <div id="layout">
    <div
      :class="[
        'layout-container',
        opened ? 'openSidebar' : 'hideSidebar',
        { mobile }
      ]"
    >
      <!-- 侧边栏 -->
      <app-sidebar class="sidebar-container"></app-sidebar>
      <!-- 移动端侧边栏展开时候的遮罩层 -->
      <div
        v-show="mobile && opened"
        class="app-mask"
        @click="appStore.toggleSidebar()"
      ></div>
      <main class="main-container">
        <!-- 网站顶部 -->
        <div class="app-header">
          <!-- 网站头部功能导航 -->
          <app-nav></app-nav>
          <!-- 网站tabs标签页 -->
          <app-tabs></app-tabs>
        </div>
        <!-- 网页内容区 -->
        <app-page class="app-page"></app-page>
      </main>
      <!-- 悬浮工具按钮 -->
      <drag-ball class="drag-ball"></drag-ball>
      <!-- 版本公告 -->
      <version-announcement></version-announcement>
      <feedback></feedback>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入layout样式代码
import './Layout.scss'
import { onMounted, onUnmounted } from 'vue'
import {
  AppSidebar,
  AppNav,
  AppTabs,
  AppPage,
  DragBall,
  VersionAnnouncement,
  Feedback
} from './components/index'
import { useAppStore } from '@/store/modules/app'
import { storeToRefs } from 'pinia'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
// import { deviceDetection } from '@/utils/deviceDetection'

const appStore = useAppStore()

const { opened, driverState, mobile } = storeToRefs(appStore)

const { closeIntro } = appStore

// 引导步骤配置
const steps = [
  {
    element: '.my-notice',
    popover: {
      title: '消息通知',
      description: '你可以在这里查看系统发送的消息',
      position: 'bottom-right' // bottom-right：不是代表右下角，而是显示在下方，右边和高亮元素对齐
    }
  },
  {
    element: '.my-screenfull',
    popover: {
      title: '全屏',
      description: '你可以在这里进行全屏切换',
      position: 'bottom-right'
    }
  },
  {
    element: '#international',
    popover: {
      title: '国际化',
      description: '你可以在这里进行语言切换',
      position: 'bottom-right'
    }
  },
  // element不能设置没有宽高的元素，会有bug无法显示
  {
    element: '.button-container',
    popover: {
      title: '拓展功能',
      description: '你可以点击悬浮球展开更多功能配置',
      position: 'top-right'
    }
  }
]

// 引导功能配置
const driverJs = new Driver({
  className: 'driver-popover', // 弹出框类名
  animate: true, // 是否打开动画效果, 如果选择是会有bug，纯色背景覆盖高亮元素，需要添加底下css样式配置才能修复
  opacity: 0.75, // 透明度
  padding: 0, // 内间距
  allowClose: false, // 是否点击朦层关闭
  overlayClickNext: false, // 点击朦层跳转到下一步吗
  stageBackground: '#fff', // 引导对话框背景色
  doneBtnText: '完成',
  closeBtnText: '关闭',
  nextBtnText: '下一步',
  prevBtnText: '上一步',
  // 结束引导时调用
  onReset: () => {
    closeIntro()
  }
})

const resizeBody = () => {
  // 下面两种方式来判断移动端设备都可以, 但是用deviceDetection方法，宽度变化测试的时候偶尔会失效
  mobile.value = document.body.getBoundingClientRect().width - 1 < 992
  // mobile.value = deviceDetection()
  opened.value = !mobile.value // 默认移动端初始化的时候，要隐藏菜单栏，PC端要展示
  // console.log(mobile.value)
}

resizeBody()

// 监听页面尺寸变化
window.addEventListener('resize', resizeBody)

onMounted(() => {
  // 引导状态为false或者是移动端就不进行引导
  // return 和 return false的区别
  // 1.相同点： 都可以终止执行当前方法
  /**
   * 2.不同点：如果方法A调用了方法B，则在方法A中使用return可以终止程序，
   * 但是在方法B中使用return则终止执行B方法，A方法继续执行，
   * 这个时候需要在方法B中return false,方法A根据B方法的返回boolean值
   * 决定是否终止A方法即可
   */
  if (!driverState.value || mobile.value) return
  driverJs.defineSteps(steps)
  driverJs.start()
})

onUnmounted(() => {
  // 移除监听事件
  window.removeEventListener('resize', resizeBody)
})
</script>

<style lang="scss">
// 解决焦点框把元素内容遮盖了的问题
div#driver-highlighted-element-stage,
div#driver-page-overlay {
  background: transparent !important;
  outline: 5000px solid rgba(0, 0, 0, 0.75);
}
div#driver-popover-item {
  min-width: 200px;
  max-width: 600px;
}
</style>
