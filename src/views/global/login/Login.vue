<template>
  <div id="login">
    <header>
      <div class="header-logo">
        <a href="javascript:;">
          <img class="logo" src="@/assets/image/logo.jpg" alt="" />
          <span class="title">BaoJun</span>
        </a>
      </div>
      <div class="header-desc">这是一个程序员的试验田，喜欢给个star～～</div>
    </header>
    <div class="info">
      <!-- stretch设置文字下面的那条蓝线：平均宽度 -->
      <el-tabs stretch v-model="activeModel">
        <el-tab-pane label="账号密码登陆" name="account">
          <LoginAccount></LoginAccount>
        </el-tab-pane>
        <el-tab-pane label="手机号登陆" name="phone">
          <LoginPhone></LoginPhone>
        </el-tab-pane>
      </el-tabs>
    </div>
    <footer @click="toPage"><span>闽ICP备19000630号-1</span></footer>
  </div>
</template>

<script setup lang="ts">
import { LoginAccount, LoginPhone } from './components'
import { ref } from 'vue'
// 是账号还是手机号模式
// 因为被编译到setup函数中，可以直接访问顶层定义的属性和方法，不用return
const activeModel = ref('account')
const toPage = () => {
  window.location.href = 'https://beian.miit.gov.cn/'
}
</script>

<style lang="scss" scoped>
#login {
  height: 100%;
  background: #fff url(@/assets/image/background.svg) no-repeat 60px 60px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  header {
    .header-logo {
      @include box-center(center, center);
      a {
        text-decoration: none;
        .logo {
          height: 60px;
          vertical-align: top;
          margin-right: 16px;
          border-style: none;
        }
        .title {
          height: 60px;
          line-height: 60px;
          font-size: 30px;
          color: rgba(0, 0, 0, 0.85);
          font-weight: 600;
        }
      }
    }
    .header-desc {
      text-align: center;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      margin-top: 12px;
      margin-bottom: 40px;
    }
  }
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 12px;
    span {
      cursor: pointer;
    }
  }
}
</style>
