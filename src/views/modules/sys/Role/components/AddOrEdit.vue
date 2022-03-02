<template>
  <el-dialog v-model="visible" :title="title" width="500px" @close="close">
    <el-form ref="formRef" label-width="80px" :model="form">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model.trim="form.roleName" />
      </el-form-item>
      <el-form-item label="角色类型" prop="type">
        <el-select v-model="form.type" style="width: 100%">
          <el-option label="非关联数据类角色" :value="0"></el-option>
          <el-option label="关联数据类角色" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色描述" prop="desc">
        <el-input v-model.trim="form.desc" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive, toRefs, defineExpose, defineEmits } from 'vue'
import { successMessage } from '@/utils/message'
interface RoleItem {
  roleName?: string
  type?: number
  desc?: string
}
const state = reactive({
  visible: false,
  title: '',
  formRef: null,
  form: {} as RoleItem
})

const init = row => {
  if (row?.id) {
    state.title = '编辑'
    state.form = Object.assign({}, row)
  } else {
    state.title = '添加'
  }
  state.visible = true
}

const close = () => {
  // 弹框关闭前一定要重置form里的数据，下次重新打开新增才不会把编辑的数据带入
  state.form = {}
  state.visible = false
}

// 声明事件
const emit = defineEmits(['refresh'])
const save = () => {
  successMessage('模拟保存/新增成功')
  // emit子传父调用父组件事件, 有传参就逗号隔开
  emit('refresh')
  close()
}

const { visible, title, form } = toRefs(state)

defineExpose({
  init
})
</script>
<style lang="scss" scoped></style>
