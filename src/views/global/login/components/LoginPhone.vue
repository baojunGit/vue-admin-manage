<template>
  <div class="login-phone">
    <el-form
      style="width: 350px"
      ref="formRef"
      status-icon
      :rules="rules"
      :model="form"
    >
      <el-form-item prop="telephone">
        <el-input
          v-model="form.telephone"
          clearable
          size="large"
          placeholder="手机号"
          prefix-icon="el-icon-mobile"
          @keyup.enter="submit"
        ></el-input>
      </el-form-item>
      <el-form-item prop="verifyCode">
        <el-row style="width: 100%" justify="space-between">
          <el-col :span="15">
            <el-input
              size="large"
              v-model.trim="form.verifyCode"
              placeholder="请输入验证码"
              clearable
              type="text"
              prefix-icon="el-icon-edit"
              @keyup.enter="submit"
            >
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-button
              style="width: 100%"
              size="large"
              :disabled="smsSendBtn"
              @click="getCaptcha"
              >{{ (!smsSendBtn && '获取验证码') || time + 's' }}</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row style="width: 100%" justify="space-between">
          <el-col :span="6">
            <el-checkbox v-model="remenberMe">自动登陆</el-checkbox>
          </el-col>
          <el-col :span="4">
            <router-link tag="a" :to="{ name: 'login' }">
              忘记密码
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
import { reactive, toRefs, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

// 验证手机号格式
const checkPhone = (rule, value, callback) => {
  if (
    value &&
    new RegExp(
      /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
    ).test(value)
  ) {
    callback()
  } else {
    callback('请输入正确手机号！')
  }
}

const checkVerifyCode = (rule, value, callback) => {
  if ('' === value) callback(new Error('手机验证码不能为空'))
  if (typeof value !== 'number') callback(new Error('手机验证码必须是数字'))
  else callback()
}

const state = reactive({
  formRef: null,
  form: {
    telephone: '',
    verifyCode: '' // 验证码
  },
  loading: false,
  rules: {
    telephone: [
      {
        required: true,
        trigger: 'blur',
        validator: checkPhone
      }
    ],
    verifyCode: [
      { required: true, trigger: 'blur', validator: checkVerifyCode }
    ]
  },
  time: 60,
  smsSendBtn: false
})

// 输入正确的手机号，获取手机验证码
const getCaptcha = () => {
  state['formRef'].validateField('telephone', err => {
    if (!err) {
      state.smsSendBtn = true
      let interval = window.setInterval(() => {
        if (state.time-- <= 0) {
          state.time = 60
          state.smsSendBtn = false
          window.clearInterval(interval)
        }
      }, 1000)
    }
  })
}

// 提交账户信息登陆
const submit = async () => {
  state['formRef'].validate(async valid => {
    if (valid) {
      try {
        state.loading = true
        await store.dispatch('user/login', state.form)
        router.push('/')
      } finally {
        state.loading = false
      }
    }
  })
}

let remenberMe = ref(false) // 是否自动登陆

const { formRef, form, loading, rules, time, smsSendBtn } = toRefs(state)
</script>
