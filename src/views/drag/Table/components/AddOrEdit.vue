<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { successMessage } from '@/utils/message'

interface TargetItem {
  boardId?: number
  name?: string
  desc?: string
  sort?: number
  type?: string
  show?: boolean
  isNew?: boolean
  url1?: string
  url2?: string
  url3?: string
}

const formRef = ref(null)
const visible = ref(false)
const form = ref<TargetItem>({
  boardId: null,
  name: '',
  desc: '',
  sort: null,
  type: '',
  show: null,
  isNew: null,
  url1: '',
  url2: '',
  url3: ''
})
const title = ref('')

const init = row => {
  visible.value = true
  if (row?.id) {
    title.value = '编辑指标'
    nextTick(() => {
      form.value = { ...row }
    })
  } else {
    title.value = '添加指标'
  }
}

const handleClose = () => {
  formRef.value?.resetFields()
  visible.value = false
}

// 定义事件类型接口
interface Emits {
  (e: 'refresh'): void;
}
const emit = defineEmits<Emits>()

const handleSave = () => {
  successMessage('模拟保存/新增成功')
  emit('refresh')
  handleClose()
}

defineExpose({
  init
})
</script>

<template>
  <el-dialog v-model="visible" :title="title" width="660px" @close="handleClose">
    <el-form ref="formRef" label-width="auto" :model="form">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="面板ID" prop="boardId">
            <el-input v-model.trim="form.boardId" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="指标名称" prop="name">
            <el-input v-model.trim="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="模板类型" prop="type">
            <el-input v-model.trim="form.type" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="isNew">
            <template #label>
              <el-tooltip content="设置为新增会指标上显示new标识" placement="bottom" effect="customized">
                <i class="iconfont icon-xinxi"></i>
              </el-tooltip>
              是否新增
            </template>
            <el-radio-group v-model="form.isNew">
              <el-radio :label="true"> 是 </el-radio>
              <el-radio :label="false"> 否 </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="跳转链接1" prop="url1">
            <el-input v-model.trim="form.url1" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="跳转链接2" prop="url2">
            <el-input v-model.trim="form.url2" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="跳转链接3" prop="url3">
            <el-input v-model.trim="form.url3" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="指标描述" prop="desc">
            <el-input v-model.trim="form.desc" type="textarea" :rows="5" />
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

<style lang="scss">
.el-popper.is-customized {
  width: 200px;

  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  color: #ffffff;
  background: linear-gradient(90deg, rgb(31 148 255), rgb(119 225 157));
}
.el-popper.is-customized .el-popper__arrow::before {
  right: 0;
  background: linear-gradient(45deg, #6ab6ce, #6db9cb);
}
</style>
