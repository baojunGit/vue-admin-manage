<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { successMessage } from '@/utils/message'


interface UserItem {
  id?: string
  userName?: string
  account?: string
  info?: string
  datetime?: string
  roleIds?: number[]
}

interface RoleList {
  id: number
  roleName: string
}

interface Props {
	roleList:RoleList[]
}

/** props
 * 1.可以直接在template中使用props的子属性如：roleList
 * 2.withDefaults和defineProps都是宏定义，不需要引入，全局可以使用
 */

withDefaults(defineProps<Props>(), {
	// 默认值为引用类型的需要包装一个函数return出去
	// roleList: () => [***,***]
	roleList: null // 用[] 会报undefined[]不能分配给RoleList[]的错误，用null可以
});

const visible = ref(false)
const title = ref('')
const formRef = ref(null)
const form = ref<UserItem>({
  userName: '',
  account: '',
  info: '',
  datetime: '',
  roleIds: []
})
const rules = ref({
  userName: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  account: [{ required: true, trigger: 'blur', message: '请输入账号' }]
})

const init = (row: UserItem) => {
  if (row?.id) {
    title.value = '编辑'
    nextTick(() => {
      form.value = { ...row }
    })
  } else {
    title.value = '添加'
  }
  visible.value = true
}

const handleClose = () => {
  // 移除校验结果并重置字段值
  formRef.value?.resetFields()
  visible.value = false
}

// 声明事件
const emit = defineEmits(['refresh'])
const handleSave = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (!valid) return
    successMessage('模拟保存/新增成功')
    // emit子传父调用父组件事件, 有传参就逗号隔开
    emit('refresh')
    handleClose()
  })
}



defineExpose({
  init
})
</script>

<template>
  <el-dialog v-model="visible" :title="title" width="500px" @close="handleClose">
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

<style lang="scss" scoped></style>
