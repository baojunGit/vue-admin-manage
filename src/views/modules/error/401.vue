<template>
  <div id="error-container">
    <div class="not-found-content">
      <div class="pic-error">
        <img class="pic-error__parent" :src="four" alt="401" />
        <img class="pic-error__child left" :src="cloud" alt="401" />
        <img class="pic-error__child mid" :src="cloud" alt="401" />
        <img class="pic-error__child right" :src="cloud" alt="401" />
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">401</div>
        <div class="bullshit__headline">您没有操作权限...</div>
        <div class="bullshit__info">当前帐号没有操作权限，请联系管理员</div>
        <el-button round type="primary" @click="$router.push({ name: 'index' })"
          >{{ jumpTime }}s 返回首页</el-button
        >
      </div>
    </div>
    <div class="not-found-content">
      <div class="pic-error">
        <img class="pic-error__parent" :src="four" alt="401" />
        <img class="pic-error__child left" :src="cloud" alt="401" />
        <img class="pic-error__child mid" :src="cloud" alt="401" />
        <img class="pic-error__child right" :src="cloud" alt="401" />
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">401</div>
        <div class="bullshit__headline">您没有操作权限...</div>
        <div class="bullshit__info">当前帐号没有操作权限，请联系管理员</div>
        <el-button round type="primary" @click="$router.push({ name: 'index' })"
          >{{ jumpTime }}s 返回首页</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/style/components/error.scss'
import { onMounted, onUnmounted, ref } from 'vue'
import four from '@/assets/image/401.png'
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

