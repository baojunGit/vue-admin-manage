<!-- login 用户信息组件 -->
<template>
  <div class="info">
    <el-form
      style="width: 350px"
      ref="loginForm"
      status-icon
      :rules="rules"
      :model="model"
    >
      <!-- stretch设置文字下面的那条蓝线：平均宽度 -->
      <el-tabs stretch v-model="activeModel">
        <el-tab-pane label="账号密码登陆" name="account">
          <el-form-item>
            <el-input
              v-model="model.userName"
              clearable
              size="large"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="model.passWord"
              clearable
              size="large"
              prefix-icon="el-icon-lock"
            >
            </el-input>
          </el-form-item>
          <div class="captcha">
            <el-input
              style="margin-right: 14px"
              v-model="model.verify"
              clearable
              size="large"
              placeholder="请输入验证码"
              prefix-icon="el-icon-edit"
            >
            </el-input>
            <img
              v-if="requestCodeSuccess"
              :src="model.svg"
              @click="refreshVerify"
            />
            <img
              v-else
              src="@/assets/image/checkcode.png"
              @click="refreshVerify"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="手机号登陆" name="phone">
          <el-form-item>
            <el-input
              v-model="model.telephone"
              clearable
              size="large"
              placeholder="手机号"
              prefix-icon="el-icon-mobile"
            ></el-input>
          </el-form-item>
          <div class="captcha">
            <el-input
              style="margin-right: 14px"
              v-model="model.verify"
              clearable
              size="large"
              placeholder="请输入验证码"
              prefix-icon="el-icon-edit"
            >
            </el-input>
            <img
              v-if="requestCodeSuccess"
              :src="model.svg"
              @click="refreshVerify"
            />
            <img
              v-else
              src="@/assets/image/checkcode.png"
              @click="refreshVerify"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
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
          :loading="loginStatus"
          :disabled="loginStatus"
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
import {
  ref,
  toRef,
  defineComponent,
  PropType,
  onMounted,
  onBeforeMount,
  getCurrentInstance
} from 'vue'
export interface ContextProps {
  userName?: string // 用户名
  passWord?: string // 密码
  telephone?: number
  verify: string // 验证码
  svg: any // base64图片
}
export default defineComponent({
  name: 'Info',
  props: {
    userForm: {
      type: Object as PropType<ContextProps>,
      require: true
    }
  },
  // 定义子组件发出的事件
  emits: ['refreshVerify', 'submit'],
  // setup函数第一个形参接收props数据
  // 第二个形参接收上下文对象
  setup(props, ctx) {
    let vm: any // 声明组件用的
    let activeModel = ref('account') // 是账号还是手机号模式
    const model = toRef(props, 'userForm') // 声明用户信息模型
    let requestCodeSuccess = ref(true) // 是否请求验证码成功
    let remenberMe = ref(false) // 是否自动登陆
    let loginStatus = ref(false) // 登陆状态
    const rules: Object = ref({
      userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      passWord: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度必须不小于6位', trigger: 'blur' }
      ],
      verify: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { type: 'number', message: '验证码必须是数字类型', trigger: 'blur' }
      ]
    })

    // 获取&刷新验证码
    const refreshVerify = (): void => {
      ctx.emit('refreshVerify')
    }

    // 点击登陆
    const submit = (evt: Object): void => {
      vm.refs.loginForm.validate((valid: boolean) => {
        if (valid) {
          ctx.emit('submit', evt)
        } else {
          return false
        }
      })
    }

    onBeforeMount(() => {
      vm = getCurrentInstance()
    })

    onMounted(() => {
      refreshVerify()
    })

    return {
      activeModel,
      model,
      rules,
      requestCodeSuccess,
      remenberMe,
      loginStatus,
      refreshVerify,
      submit
    }
  }
})
</script>

<style lang="scss" scoped>
.info {
  @include box-center(center, center);
  :deep(.el-tabs__header) {
    .el-tabs__nav-wrap::after {
      width: 0; //把未选中tab的灰色下划线去掉
    }
  }
  .captcha {
    display: flex;
  }
}
</style>
