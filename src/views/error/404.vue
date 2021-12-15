<template>
  <div id="not-found-wrap">
    <div class="not-found-content">
      <div class="pic-error">
        <img class="pic-error__parent" :src="four" alt="404" />
        <img class="pic-error__child left" :src="cloud" alt="404" />
        <img class="pic-error__child mid" :src="cloud" alt="404" />
        <img class="pic-error__child right" :src="cloud" alt="404" />
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">404</div>
        <div class="bullshit__headline">当前页面不存在...</div>
        <div class="bullshit__info">请检查您输入的网址是否正确,或者点击下面的按钮返回首页。</div>
        <el-button
          round
          type="primary"
          @click="$router.push({ name: 'index' })"
        >{{ jumpTime }}s 返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import four from '@/assets/image/404.png'
import cloud from '@/assets/image/cloud.png'
import { useRouter } from 'vue-router'

let jumpTime = ref(10)
let timer = ref(null)
const router = useRouter()

const timeChange = () => {
  // 返回定时器的数字ID（ID是随机生成的ID）， 清除定时器可用
  timer.value = setInterval(() => {
    if (jumpTime.value) {
      jumpTime.value--
    } else {
      router.push('/')
    }
  }, 1000)
}

onMounted(() => {
  timeChange()
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
    // 设置为null的作用是断开引用，回收内存
    timer.value = null
  }
})
</script>

<style lang="scss" scoped>
@import "@/style/components/error.scss";
</style>
