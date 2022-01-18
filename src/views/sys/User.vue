<template>
  <div id="user-container">
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
              v-model.trim="queryForm.username"
              clearable
              placeholder="请输入用户名"
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
    <!-- :checkbox-config="{ checkField: 'checked', trigger: 'row' }" 点击整行出发选中效果 -->
    <vxe-table
      border
      align="center"
      :data="list"
      :loading="loading"
      :row-config="{ isHover: true }"
      :checkbox-config="{ checkField: 'checked' }"
    >
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column field="id" title="No" width="60"></vxe-column>
      <vxe-column field="username" title="用户名" width="100"></vxe-column>
      <vxe-column field="account" title="账号" width="120"></vxe-column>
      <vxe-column
        field="info"
        title="信息"
        show-overflow
        width="180"
      ></vxe-column>
      <vxe-column
        field="datatime"
        title="修改时间"
        show-overflow
        width="180"
      ></vxe-column>
      <vxe-column field="role" title="角色" show-overflow></vxe-column>
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
import { Delete, Plus, Search, Edit } from '@element-plus/icons'
import { reactive, toRefs, onMounted } from 'vue'
import { getList } from '@/api/user'
import { Message, successMessage } from '@/utils/message'
import { ElMessageBox } from 'element-plus'
const state = reactive({
  queryForm: {
    pageNum: 1,
    pageSize: 5,
    username: ''
  },
  list: [],
  total: null,
  loading: false
})

const handleEdit = row => {
  console.log(row)
}

const fetchData = async () => {
  state.loading = true
  let res = await getList(state.queryForm)
  // console.log(res)
  state.list = res.data.list
  state.total = res.data.total
  state.loading = false
}

const queryData = () => {
  state.queryForm.pageNum = 1
  fetchData()
}

const pageQuery = param => {
  if (param.type === 'size') state.queryForm.pageNum = 1
  fetchData()
}

const handleDelete = row => {
  // console.log(row)
  ElMessageBox.confirm('您确定要删除当前项吗?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      successMessage('模拟删除成功')
    })
    .catch(() => {
      // 不操作
    })
}

onMounted(async () => {
  fetchData()
})

const { queryForm, list, total, loading } = toRefs(state)
</script>
