<template>
  <el-dialog v-model="visible" title="新建页签" width="400px">
    <el-form ref="formRef" label-width="auto" :model="form">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="页签ID" prop="id">
            <el-input v-model.trim="form.id" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="页签名" prop="name">
            <el-input v-model.trim="form.name" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleClose"> 取 消 </el-button>
      <el-button type="primary" @click="handleSave"> 确 定 </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, toRefs, defineExpose, defineEmits } from 'vue'
import { successMessage } from '@/utils/message'

interface TabItem {
  id?: string
  name?: string
}

const state = reactive({
  visible: false,
  formRef: null,
  form: {} as TabItem
})

const init = () => {
  state.visible = true
}

const handleClose = () => {
  // 弹框关闭前一定要重置form里的数据，下次重新打开新增才不会把编辑的数据带入
  state.form = {}
  // console.log(state.form.parentId)
  state.visible = false
}

// 声明事件
const emit = defineEmits(['refresh'])
const handleSave = () => {
  successMessage('模拟保存/新增成功')
  // emit子传父调用父组件事件, 有传参就逗号隔开
  emit('refresh')
  handleClose()
}

const { visible, form } = toRefs(state)

defineExpose({
  init
})
</script>
