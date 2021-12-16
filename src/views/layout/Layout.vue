<template>
  <div id="layout" :class="classes">
    <!-- 侧边栏 -->
    <app-sidebar
      class="sidebar-container"
      data-title="新增功能"
      data-step="1"
      data-intro="侧边导航菜单<br> 
      <img style='width:400px' src='https://element-plus.gitee.io/images/theme-index-blue.png' />"
    ></app-sidebar>
    <main class="main-container">
      <!-- 网站顶部 -->
      <div class="app-header">
        <!-- 网站头部功能导航 -->
        <app-nav
          data-title="新增功能"
          data-step="2"
          data-intro="顶部功能栏"
        ></app-nav>
        <!-- 网站tabs标签页 -->
        <app-tabs
          data-title="版本优化"
          data-step="3"
          data-intro="导航记忆页签"
        ></app-tabs>
      </div>
      <!-- 网页内容区 -->
      <app-page class="app-page"></app-page>
    </main>
    <!-- 悬浮工具按钮 -->
    <drag-ball
      data-title="版本优化"
      data-step="4"
      data-intro="拖拽悬浮球，展开含版本、反馈等功能"
    ></drag-ball>
    <!-- 版本公告 -->
    <version-announcement></version-announcement>
    <feedback></feedback>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, toRefs, onMounted } from 'vue'
import {
  AppSidebar,
  AppNav,
  AppTabs,
  AppPage,
  DragBall,
  VersionAnnouncement,
  Feedback
} from './components/index'
import { useStore } from 'vuex'
import introJs from 'intro.js'
import 'intro.js/introjs.css'

const store = useStore()

const set = reactive({
  classes: computed(() => {
    return {
      hideSidebar: !store.state.app.sidebar.opened,
      openSidebar: store.state.app.sidebar.opened,
      withoutAnimation: store.state.app.sidebar.withoutAnimation
    }
  })
})
const { classes } = toRefs(set)

// 引导功能demo
const guide = () => {
  introJs()
    .setOptions({
      nextLabel: '下一个', // 下一个按钮文字
      prevLabel: '上一个', // 上一个按钮文字
      skipLabel: 'x', // 跳过按钮文字
      doneLabel: '立即体验', // 完成按钮文字
      hidePrev: true, // 在第一步中是否隐藏上一个按钮
      // hideNext: true, // 在最后一步中是否隐藏下一个按钮，这个开启会把完成按钮也干掉
      scrollToElement: true, // 是否滑动到高亮的区域
      showBullets: true, // 是否显示面板导航点
      exitOnOverlayClick: false, // 点击朦层是否退出介绍
      showStepNumbers: false, // 是否显示红色圆圈的步骤编号
      disableInteraction: true, // 是否禁用与突出显示的框内的元素的交互，就是禁止点击
      tooltipClass: 'my-tooltip' // 添加弹框css类名，用于样式设置
      // showProgress: true, // 显示引导进度
      // exitOnEsc: true, // 是否允许按ESC处退出，默认是true
      // showButtons: false, // 是否显示导航按钮
      // overlayOpacity: 0.6, // 遮罩层的透明度
      // positionPrecedence: ['bottom', 'top', 'right', 'left'], // 当位置选择自动的时候，位置排列的优先级
    })
    .oncomplete(function () {
      //点击跳过按钮后执行的事件
      console.log('点击跳过')
    })
    .onexit(function () {
      //点击结束按钮后， 执行的事件
      console.log('点击结束')
    })
    .goToStepNumber(1) // 从第几步开始引导
    .start()
}

onMounted(() => {
  guide()
})
</script>

<style lang="scss">
// 引入外部.scss文件, 这里不能加scoped, 不然无法对子组件内的样式生效
@import './Layout.module.scss';
.my-tooltip {
  max-width: 500px; // 改变intro.js默认的最大宽度是300px
  .introjs-tooltip-header {
    .introjs-tooltip-title {
      font-size: 16px;
    }
    .introjs-skipbutton {
      font-size: 16px;
      display: flex;
      justify-items: center;
      padding: 0;
      line-height: normal;
    }
  }
  .introjs-tooltiptext {
    font-size: 12px;
  }
  .introjs-tooltipbuttons {
    border-top: none;
    .introjs-button {
      color: #409eff;
      padding: 0.3rem 0.6rem;
    }
  }
}
</style>
