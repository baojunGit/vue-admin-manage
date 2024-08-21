/** 底层原理：Service Workers 1.Service Workers
是一种运行在浏览器背后的独立线程，可以拦截和处理网络请求，缓存资源，以及管理推送通知等功能 2.在 PWA（Progressive Web
App）中，Service Workers 用于实现离线访问、后台同步和定期更新等功能
文档：https://vite-pwa-org.netlify.app/frameworks/vue.html */
<script setup lang="ts">
// Vite内置虚拟模块virtual:pwa-register/vue
// 还得安装pnpm i -D workbox-window，不然报错Rollup failed to resolve import "workbox-window" from "/@vite-plugin-pwa/virtual:pwa-register/vue"
import { useRegisterSW } from 'virtual:pwa-register/vue'

// 配置为每小时检查服务工作线程一次
const intervalMS = 60 * 60 * 1000
// needRefresh 表示是否有新的内容或更新可用，需要用户刷新页面以加载新版本。当检测到服务工作线程有新的更新时，needRefresh 会变为 true
const { needRefresh, updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegisteredSW(_, r) {
    r &&
      setInterval(async () => {
        // 检查更新，如果vite.config.ts配置为autoUpdate，此操作将直接触发更新，并刷新页面激活更新
        await r.update()
      }, intervalMS)
  }
})

const close = async () => {
  needRefresh.value = false
}

const reload = async () => {
  await updateServiceWorker()
  // 刷新页面以激活更新
  window.location.reload()
}
</script>

<template>
  <div v-if="needRefresh" class="pwa-toast" role="alert">
    <div class="message">
      <span> 新内容可用，点击重新加载按钮以更新。 </span>
    </div>
    <el-button type="primary" @click="reload"> 重新加载 </el-button>
    <el-button @click="close"> 关闭 </el-button>
  </div>
</template>

<style scoped>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0px #8885;
  background-color: var(--el-bg-color);
}

.pwa-toast .message {
  margin-bottom: 8px;
}
</style>
