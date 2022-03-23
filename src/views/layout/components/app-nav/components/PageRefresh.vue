<template>
  <div class="page-refresh-container">
    <i class="iconfont icon-shuaxin2 rotate" @click="refreshRoute"></i>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { toggleClass, removeClass } from '@/utils/useClass'

/**
 * @description getCurrentInstance获取当前组件实例
 * @proxy 获取挂载到全局中的方法
 */
const { proxy }: any = getCurrentInstance()
const refreshRoute = async () => {
  // console.log(document.querySelector('.rotate'))
  toggleClass(true, 'refresh-button', document.querySelector('.rotate'))
  proxy.$pub('reload-router-view')
  // 600ms刚好完成一轮动态效果，转了一圈
  setTimeout(() => {
    removeClass(document.querySelector('.rotate'), 'refresh-button')
  }, 600)
}
</script>

<style lang="scss" scoped>
/* 刷新按钮动画效果 */
.page-refresh {
  .refresh-button {
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    -webkit-transition-duration: 600ms;
    transition-duration: 600ms;
    -moz-transition-property: -moz-transform;
    -moz-transition-duration: 600ms;
    -webkit-animation: rotate 600ms linear infinite;
    -moz-animation: rotate 600ms linear infinite;
    -o-animation: rotate 600ms linear infinite;
    animation: rotate 600ms linear infinite;
  }
  @-webkit-keyframes rotate {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-moz-keyframes rotate {
    from {
      -moz-transform: rotate(0deg);
    }
    to {
      -moz-transform: rotate(360deg);
    }
  }
  @-o-keyframes rotate {
    from {
      -o-transform: rotate(0deg);
    }
    to {
      -o-transform: rotate(360deg);
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
