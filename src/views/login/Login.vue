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
    <info
      :userForm="contextInfo"
      @refreshVerify="refreshVerify"
      @submit="submit"
    ></info>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import info, { ContextProps } from '@/components/Info.vue'
import { getCode, signIn } from '@/api/login'
import { successMessage, warnMessage } from '@/utils/message'
import { handleSession } from '@/utils/storage'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
export default {
  name: 'login',
  components: {
    info
  },
  setup() {
    const contextInfo: ContextProps = reactive({
      userName: '',
      passWord: '',
      telephone: null,
      verify: null,
      svg: null
    })

    const router = useRouter()

    // 获取&刷新验证码
    const refreshGetVerify = async () => {
      let res = await getCode()
      console.log(res)
      contextInfo.svg = res.data.kaptchaImg
    }

    // 跳转页面的方法
    const toPage = (data: Object): void => {
      handleSession.set('userInfo', data)
      router.push('/')
    }

    // 登陆
    const submit = async () => {
      let { userName, passWord, telephone, verify } = contextInfo
      let { code, message, token, data } = await signIn({
        username: userName,
        password: passWord,
        telephone: telephone,
        verify: verify
      })
      console.log(code)
      console.log(message)
      console.log(token)
      code === 200
        ? successMessage(message) &&
          Cookies.set('token', token) &&
          toPage({
            data
          })
        : warnMessage(message)
    }

    const refreshVerify = (): void => {
      refreshGetVerify()
    }

    return {
      contextInfo,
      refreshVerify,
      submit
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  background: #fff url(@/assets/image/background.svg) no-repeat 60px 60px;
  header {
    background-size: 100%;
    padding-top: 80px;
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
