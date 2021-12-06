<template>
  <div class="login-account">
    <el-form
      style="width: 350px"
      ref="formRef"
      status-icon
      :rules="rules"
      :model="form"
    >
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入账号"
          clearable
          size="large"
          prefix-icon="el-icon-user"
          @keyup.enter="submit"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          clearable
          size="large"
          prefix-icon="el-icon-lock"
          @keyup.enter="submit"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="verifyCode">
        <el-row>
          <el-col :span="15">
            <el-input
              v-model.trim="form.verifyCode"
              placeholder="请输入验证码"
              clearable
              type="text"
              prefix-icon="el-icon-edit"
              @keyup.enter="submit"
            >
            </el-input>
          </el-col>
          <el-col :span="9">
            <img
              v-if="requestCodeSuccess"
              class="code"
              :src="form.svg"
              @click="changeCode"
            />
            <img
              v-else
              class="code"
              src="@/assets/image/checkcode.png"
              @click="changeCode"
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="remenberMe">自动登陆</el-checkbox>
        <router-link fr tag="a" :to="{ name: 'login' }"> 忘记密码 </router-link>
      </el-form-item>
      <el-form-item>
        <!-- @click.stop: 阻止事件冒泡 -->
        <el-button
          size="medium"
          type="primary"
          class="login-button"
          :loading="loading"
          style="width: 100%"
          @click="submit"
        >
          登陆
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getCode } from '@/api/login'
export default defineComponent({
  name: 'LoginAccount',
  setup() {
    const store = useStore()
    const router = useRouter()

    const info = reactive({
      formRef: null,
      form: {
        username: '', // 用户名
        password: '', // 密码
        telephone: '',
        verifyCode: '', // 验证码
        svg: '' // base64图片
      },
      loading: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度必须不小于6位', trigger: 'blur' }
        ],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
          // { type: 'number', message: '验证码必须是数字类型', trigger: 'blur' }
        ]
      }
    })

    let requestCodeSuccess = ref(true) // 是否请求验证码成功

    // 获取&刷新验证码
    const refreshGetVerify = async () => {
      let res = await getCode()
      info.form.svg = res.data.kaptchaImg
    }

    refreshGetVerify()

    const changeCode = (): void => {
      refreshGetVerify()
    }

    // 提交账户信息登陆
    const submit = async () => {
      info['formRef'].validate(async valid => {
        console.log(1.5)
        console.log(valid)
        if (valid) {
          try {
            console.log(2)
            info.loading = true
            await store.dispatch('user/login', info.form)
            router.push('/')
          } finally {
            console.log(3)
            info.loading = false
          }
        }
      })
    }

    let remenberMe = ref(false) // 是否自动登陆

    return {
      ...toRefs(info),
      requestCodeSuccess,
      changeCode,
      submit,
      remenberMe
    }
  }
})
</script>

<style lang="scss" scoped>
.info {
  .code {
    float: right;
    height: 100%;
    margin-left: 10px;
  }
}
</style>
