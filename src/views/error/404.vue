<template>
  <div id="not-found-404">
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
        <div class="bullshit__info">
          请检查您输入的网址是否正确,或者点击下面的按钮返回首页。
        </div>
        <el-button round type="primary" @click="$router.push({ name: 'index' })"
          >{{ jumpTime }}s 返回首页</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeMount, onUnmounted, ref } from 'vue'
import four from '@/assets/image/404.png'
import cloud from '@/assets/image/cloud.png'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: '404',
  setup() {
    let jumpTime = ref(5)
    let timer = ref(null)
    const router = useRouter()

    const timeChange = () => {
      // 返回定时器的数字ID（ID是随机生成的ID）， 清除定时器可用
      timer.value = setInterval(() => {
        if (jumpTime.value) {
          jumpTime.value--
        } else {
          router.push({ name: 'index' })
        }
      }, 1000)
    }

    onBeforeMount(() => {
      nextTick(() => {
        timeChange()
      })
    })

    onUnmounted(() => {
      if (timer.value) {
        clearInterval(timer.value)
        // 设置为null的作用是断开引用，回收内存
        timer.value = null
      }
    })

    return {
      four,
      cloud,
      jumpTime
    }
  }
})
</script>

<style lang="scss" scoped>
#not-found-404 {
  position: relative;
  height: 100%;
  .not-found-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    .pic-error {
      position: relative;
      float: left;
      width: 600px;
      overflow: hidden;
      &__parent {
        width: 100%;
      }
      &__child {
        position: absolute;
        &.left {
          width: 80px;
          top: 17px;
          left: 220px;
          opacity: 0;
          animation-name: cloudLeft;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          animation-delay: 1s;
        }
        &.mid {
          width: 46px;
          top: 10px;
          left: 420px;
          opacity: 0;
          animation-name: cloudMid;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          animation-delay: 1.2s;
        }
        &.right {
          width: 62px;
          top: 100px;
          left: 500px;
          opacity: 0;
          animation-name: cloudRight;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          animation-delay: 1s;
        }
        @keyframes cloudLeft {
          0% {
            top: 17px;
            left: 220px;
            opacity: 0;
          }
          20% {
            top: 33px;
            left: 188px;
            opacity: 1;
          }
          80% {
            top: 81px;
            left: 92px;
            opacity: 1;
          }
          100% {
            top: 97px;
            left: 60px;
            opacity: 0;
          }
        }
        @keyframes cloudMid {
          0% {
            top: 10px;
            left: 420px;
            opacity: 0;
          }
          20% {
            top: 40px;
            left: 360px;
            opacity: 1;
          }
          70% {
            top: 130px;
            left: 180px;
            opacity: 1;
          }
          100% {
            top: 160px;
            left: 120px;
            opacity: 0;
          }
        }
        @keyframes cloudRight {
          0% {
            top: 100px;
            left: 500px;
            opacity: 0;
          }
          20% {
            top: 120px;
            left: 460px;
            opacity: 1;
          }
          80% {
            top: 180px;
            left: 340px;
            opacity: 1;
          }
          100% {
            top: 200px;
            left: 300px;
            opacity: 0;
          }
        }
      }
    }
    .bullshit {
      position: relative;
      float: left;
      width: 300px;
      padding: 30px 0;
      overflow: hidden;
      &__oops {
        font-size: 80px;
        font-weight: bold;
        line-height: 100px;
        color: #1482f0;
        opacity: 0;
        margin-bottom: 20px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
      }
      &__headline {
        font-size: 20px;
        line-height: 24px;
        color: #222;
        font-weight: bold;
        opacity: 0;
        margin-bottom: 10px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
      }
      &__info {
        font-size: 13px;
        line-height: 21px;
        color: grey;
        opacity: 0;
        margin-bottom: 30px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
      }
      @keyframes slideUp {
        0% {
          transform: translateY(60px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
  }
}
</style>
