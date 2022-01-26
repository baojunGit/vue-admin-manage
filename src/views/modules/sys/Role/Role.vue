<template>
  <div id="role-container">
    <my-query-form>
      <my-query-form-left-panel :span="12">
        <el-button :icon="Plus" type="primary" @click="handleEdit($event)">
          添加
        </el-button>
        <el-button :icon="Delete" type="danger" @click="handleDelete($event)">
          批量删除
        </el-button>
      </my-query-form-left-panel>
      <my-query-form-right-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.prevent>
          <el-form-item>
            <el-input
              @keyup.enter="queryData()"
              v-model.trim="queryForm.roleName"
              clearable
              placeholder="请输入角色名"
            />
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" type="primary" @click="queryData()">
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </my-query-form-right-panel>
    </my-query-form>
    <vxe-table
      border
      align="center"
      :data="list"
      :loading="loading"
      :row-config="{ isHover: true }"
      row-id="id"
      :checkbox-config="{ checkField: 'checked' }"
      @checkbox-change="selectChangeEvent"
      @checkbox-all="selectChangeEvent"
    >
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column field="id" title="No" width="60"></vxe-column>
      <vxe-column field="roleName" title="角色名" width="100"></vxe-column>
      <vxe-column
        field="desc"
        title="描述"
        width="500"
        show-overflow
      ></vxe-column>
      <vxe-column
        field="datetime"
        title="修改时间"
        show-overflow
        width="180"
      ></vxe-column>
      <vxe-column title="操作">
        <template #default="{ row }">
          <el-button
            @click="handleEdit(row)"
            plain
            size="small"
            type="primary"
            :icon="Edit"
          >
          </el-button>
          <el-button
            @click="handleDelete(row)"
            plain
            size="small"
            type="danger"
            :icon="Delete"
          ></el-button>
          <el-button
            plain
            size="small"
            type="warning"
            :icon="Check"
          ></el-button>
        </template>
      </vxe-column>
    </vxe-table>
    <vxe-pager
      perfect
      align="center"
      size="small"
      @page-change="pageQuery"
      v-model:current-page="queryForm.pageNum"
      v-model:page-size="queryForm.pageSize"
      :total="total"
      :page-sizes="[
        5,
        20,
        50,
        100,
        { label: '大量数据', value: 1000 },
        { label: '全量数据', value: -1 }
      ]"
      :layouts="[
        'PrevJump',
        'PrevPage',
        'Number',
        'NextPage',
        'NextJump',
        'Sizes',
        'FullJump',
        'Total'
      ]"
    >
    </vxe-pager>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { Delete, Plus, Search, Edit, Check } from '@element-plus/icons'
import { getRoleList } from '@/api/role'
interface RoleItem {
  id: number
  roleName: string
}
const state = reactive({
  queryForm: {
    pageNum: 1,
    pageSize: 5,
    roleName: ''
  },
  list: [],
  total: null,
  loading: false,
  selectIds: [],
  roleList: [] as Array<RoleItem>
})

const fetchData = async () => {
  const {
    data: { list, total }
  } = await getRoleList(state.queryForm)
  state.list = list
  state.total = total
}
fetchData()

const queryData = () => {
  state.queryForm.pageNum = 1
  fetchData()
}

const pageQuery = param => {
  if (param.type === 'size') state.queryForm.pageNum = 1
  fetchData()
}

const handleEdit = param => {
  console.log(2)
}

const handleDelete = param => {
  console.log(3)
}

const selectChangeEvent = () => {
  console.log(5)
}

const handleRole = () => {
  console.log(6)
}

const { queryForm, list, total, loading, roleList } = toRefs(state)
</script>

<style lang="scss" scoped></style>
