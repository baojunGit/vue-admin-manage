<template>
  <el-dialog
    v-model="visible"
    :title="title"
    width="500px"
    @close="handleClose"
  >
    <el-form ref="formRef" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model.trim="form.userName" />
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model.trim="form.account" />
      </el-form-item>
      <el-form-item label="信息" prop="info">
        <el-input v-model.trim="form.info" />
      </el-form-item>
      <el-form-item v-if="title === '编辑'" label="修改时间" prop="datetime">
        <el-input v-model.trim="form.datetime" :disabled="title === '编辑'" />
      </el-form-item>
      <el-form-item label="角色" prop="roleIds">
        <el-checkbox-group v-model="form.roleIds">
          <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">
            {{ item.roleName }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose"> 取 消 </el-button>
      <el-button type="primary" @click="handleSave"> 确 定 </el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive, toRefs, nextTick, PropType } from 'vue'
import { successMessage } from '@/utils/message'
interface UserItem {
  userName?: string
  account?: string
  info?: string
  datetime?: string
  roleIds?: number[]
}
const state = reactive({
  visible: false,
  title: '',
  formRef: null,
  form: {} as UserItem,
  rules: {
    userName: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
    account: [{ required: true, trigger: 'blur', message: '请输入账号' }]
  }
})

const init = row => {
  if (row?.id) {
    state.title = '编辑'
    nextTick(() => {
      state.form = Object.assign({}, row)
    })
  } else {
    state.title = '添加'
  }
  state.visible = true
}

const handleClose = () => {
  // 移除校验结果并重置字段值
  state.formRef.resetFields()
  state.visible = false
}

// 声明事件
const emit = defineEmits(['refresh'])
const handleSave = () => {
  state.formRef.validate(async valid => {
    if (!valid) return
    successMessage('模拟保存/新增成功')
    // emit子传父调用父组件事件, 有传参就逗号隔开
    emit('refresh')
    handleClose()
  })
}

interface RoleList {
  id: number
  roleName: string
}
const props = defineProps({
  roleList: {
    // PropType是vue提供的，对props传递的复杂数据进行类型定义
    type: Array as PropType<RoleList[]>,
    require: true,
    default: () => []
  }
})

const { roleList } = toRefs(props)
const { formRef, visible, title, form, rules } = toRefs(state)

defineExpose({
  init
})
</script>
<style lang="scss" scoped></style>
