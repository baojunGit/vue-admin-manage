<template>
  <div id="user">
    <my-query-form>
      <my-query-form-left-panel :span="12">
        <el-button :icon="Plus" type="primary" @click="handleEdit($event)">
          添加
        </el-button>
        <el-button :icon="Delete" type="danger" @click="handleDelete($event)">
          批量删除
        </el-button></my-query-form-left-panel
      >
      <my-query-form-right-panel :span="12">
        <!-- <el-form :inline="true" :model="queryForm" @submit.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.username"
              clearable
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" type="primary" @click="queryData">
              查询
            </el-button>
          </el-form-item>
        </el-form> -->
      </my-query-form-right-panel>
    </my-query-form>
  </div>
</template>

<script setup lang="ts">
import { Delete, Plus } from '@element-plus/icons'
</script>

<style lang="scss" scoped></style>
