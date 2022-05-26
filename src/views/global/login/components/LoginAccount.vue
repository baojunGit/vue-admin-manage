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
        <!-- 这里要设置width为100%，因为el-form-item里会用flex布局把内部原素变为行内块，行内块不会充满整行 -->
        <el-row style="width: 100%" justify="space-between">
          <el-col :span="14">
            <el-input
              size="large"
              v-model.trim="form.verifyCode"
              placeholder="请输入验证码"
              clearable
              text
              prefix-icon="el-icon-edit"
              @keyup.enter="submit"
            >
            </el-input>
          </el-col>
          <el-col :span="9">
            <!-- img标签的宽高属性设置百分比的时候，要给父元素设置宽高才能生效 -->
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
        <el-row style="width: 100%" justify="space-between">
          <el-col :span="6">
            <el-checkbox v-model="remenberMe"> 自动登陆 </el-checkbox>
          </el-col>
          <el-col :span="4">
            <router-link :to="{ name: 'login' }">
              <a> 忘记密码 </a>
            </router-link>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <!-- @click.stop: 阻止事件冒泡 -->
        <el-button
          size="large"
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

<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { getCode } from '@/api/login'

const userStore = useUserStore()
const { setLogin } = userStore

const router = useRouter()

const checkPassword = (rule, value, callback) => {
  if (value === '') callback(new Error('密码不能为空'))
  if (value.length < 6) callback(new Error('密码长度必须不少于六位'))
  callback()
}

const checkVerifyCode = (rule, value, callback) => {
  if (value === '') callback(new Error('验证码不能为空'))
  callback()
}

const state = reactive({
  formRef: null,
  form: {
    username: 'admin', // 用户名
    password: '123456', // 密码
    verifyCode: 'Azt5', // 验证码
    svg: '' // base64图片
  },
  loading: false,
  rules: {
    // rules里的限制规则写两行编辑器会报错，就改用自定义验证规则
    username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
    password: [{ required: true, trigger: 'blur', validator: checkPassword }],
    verifyCode: [
      { required: true, trigger: 'blur', validator: checkVerifyCode }
    ]
  }
})

const requestCodeSuccess = ref(true) // 是否请求验证码成功

// 获取&刷新验证码
const refreshGetVerify = async () => {
  const res = await getCode()
  state.form.svg = res.data.kaptchaImg
}

refreshGetVerify()

const changeCode = (): void => {
  refreshGetVerify()
}

// 提交账户信息登陆
const submit = () => {
  state.formRef.validate(async valid => {
    if (!valid) return
    try {
      state.loading = true
      await setLogin(state.form)
      router.push('/')
    } finally {
      state.loading = false
    }
  })
}

const remenberMe = ref(false) // 是否自动登陆

// script-setup没法通过...toRefs将响应式对象转变为响应式数据
const { formRef, form, loading, rules } = toRefs(state)
</script>

<style lang="scss" scoped>
.code {
  width: 100%;
}
</style>
