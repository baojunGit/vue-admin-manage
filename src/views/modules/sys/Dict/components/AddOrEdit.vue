<template>
  <el-dialog
    v-model="visible"
    :title="title"
    width="500px"
    @close="handleClose"
  >
    <!-- label-width设置为auto自适应宽度 -->
    <el-form ref="formRef" label-width="auto" :model="form" :rules="rules">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="字典名称" prop="dictName">
            <el-input v-model.trim="form.dictName" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="字典描述" prop="desc">
            <el-input v-model.trim="form.desc" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio label="1"> 正常 </el-radio>
              <el-radio label="0"> 停用 </el-radio>
            </el-radio-group>
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
import { reactive, toRefs, nextTick, defineExpose, defineEmits } from 'vue'
import { successMessage } from '@/utils/message'

interface DictItem {
  id?: string
  dictName?: string
  desc?: string
  status?: string
  datatime?: string
}

// const props = defineProps({
//   menuOptions: {
//     type: Array as PropType<MenuItem[]>,
//     require: true,
//     default: () => []
//   }
// })

// /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/  只能包含中文、英文字母、数字和下划线
const checkDictName = (rule, value, callback) => {
  const patten = /^[a-zA-Z0-9_]+$/
  const limit = /^(?!_)(?![0-9])/
  if (!patten.test(value))
    return callback(new Error('只能包含英文字母、数字和下划线'))
  if (!limit.test(value)) return callback(new Error('不能以数字或者下划线开头'))
  callback()
}

const state = reactive({
  visible: false,
  title: '',
  formRef: null,
  form: {} as DictItem,
  rules: {
    dictName: [{ required: true, trigger: 'blur', validator: checkDictName }]
  }
})

// 重置表单数据
const resetForm = () => {
  state.form = {
    id: '',
    dictName: '',
    desc: '',
    status: ''
  }
}

const init = row => {
  if (row?.id) {
    state.title = '编辑'
    // 深拷贝
    nextTick(() => {
      state.form = Object.assign({}, row)
    })
  } else {
    state.title = '添加'
    resetForm()
  }
  state.visible = true
}

// 1.如果一个数据依赖于其他数据，那么把这个数据设计为computed的
// 2.如果你需要在某个数据变化时做一些事情，使用watch来观察这个数据变化
// const formTitle = computed(() => {
//   return t(state.form.title)
// })

const handleClose = () => {
  // 移除所有表单的校验
  // state.formRef.clearValidate()
  // 移除某一项校验
  // state.formRef.clearValidate(['dictName'])
  // 重置form里的数据
  // state.form = {}

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

const { formRef, visible, title, form, rules } = toRefs(state)

defineExpose({
  init
})
</script>
<style lang="scss">
.el-popper.is-customized {
  width: 200px;
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(31, 148, 255), rgb(119, 225, 157));
  color: #fff;
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #6ab6ce, #6db9cb);
  right: 0;
}
</style>
