<template>
  <el-dialog v-model="visible" :title="title" width="500px" @close="close">
    <el-form ref="formRef" label-width="80px" :model="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="form.username" />
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model.trim="form.account" />
      </el-form-item>
      <el-form-item label="信息" prop="info">
        <el-input v-model.trim="form.info" />
      </el-form-item>
      <el-form-item label="修改时间" prop="datetime">
        <el-input v-model.trim="form.datetime" />
      </el-form-item>
      <el-form-item label="角色" prop="roles">
        <el-checkbox-group v-model="form.roleIds">
          <el-checkbox label="admin" />
          <el-checkbox label="editor" />
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue'

interface Iroles {
  username: string
  account: string
  info: string
  datetime: string
  roleIds: number[]
}
const state = reactive({
  visible: false,
  title: '',
  formRef: null,
  form: {
    roleIds: []
  } as Iroles
})

const show

const close = () => {}

const { visible, title, form } = toRefs(state)
</script>
<style lang="scss" scoped></style>
