<template>
  <div class="login">
    <header>
      <div class="header-logo">
        <a href="javascript:;">
          <img class="logo" src="@/assets/image/logo.jpg" alt="" />
          <span class="title">Baojun</span>
        </a>
      </div>
      <div class="header-desc">
        这是一个程序员的仿写网站，享受生活，热爱人生～～
      </div>
    </header>
    <div class="info">
      <!-- stretch设置文字下面的那条蓝线：平均宽度 -->
      <el-tabs stretch v-model="activeModel">
        <el-tab-pane label="账号密码登陆" name="account">
          <login-account></login-account>
        </el-tab-pane>
        <el-tab-pane label="手机号登陆" name="phone">
          <login-phone></login-phone>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { LoginAccount, LoginPhone } from './components'
export default defineComponent({
  name: 'login',
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    let activeModel = ref('account') // 是账号还是手机号模式

    return {
      activeModel
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  background: #fff url(@/assets/image/background.svg) no-repeat 60px 60px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  header {
    background-size: 100%;
    // padding-top: 80px;
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
          color: rgb(0, 0, 0, 0.85);
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
}
</style>
