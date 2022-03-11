<template>
  <div id="user-container">
    <my-query-form>
      <my-query-form-left-panel :span="12">
        <el-button
          plain
          :icon="Plus"
          type="primary"
          @click="handleUser($event)"
        >
          添加
        </el-button>
        <el-button
          plain
          :icon="Delete"
          type="danger"
          @click="handleDelete($event)"
        >
          批量删除
        </el-button>
        <el-button plain :icon="Download" type="warning"> 导出 </el-button>
      </my-query-form-left-panel>
      <my-query-form-right-panel :span="12">
        <el-form :inline="true" :model="queryParams" @submit.prevent>
          <el-form-item>
            <el-input
              @keyup.enter="queryData()"
              v-model.trim="queryParams.userName"
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
      row-id="id"
      :checkbox-config="{ checkField: 'checked' }"
      @checkbox-change="selectChangeEvent"
      @checkbox-all="selectChangeEvent"
    >
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column field="id" title="No" width="60"></vxe-column>
      <vxe-column field="userName" title="用户名" width="100"></vxe-column>
      <vxe-column field="account" title="账号" width="120"></vxe-column>
      <vxe-column
        field="info"
        title="信息"
        width="200"
        show-overflow
      ></vxe-column>
      <vxe-column field="datetime" title="修改时间" width="180"></vxe-column>
      <vxe-column field="role" title="角色" min-width="180">
        <template #default="{ row }">
          <el-select
            multiple
            collapse-tags
            v-model="row.roleIds"
            @visible-change="handleRole($event)"
            style="width: 140px"
          >
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </template>
      </vxe-column>
      <vxe-column title="操作" min-width="110" fixed="right">
        <template #default="{ row }">
          <el-button
            @click="handleUser(row)"
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
    <!-- style="height: 80px" 为了兼容移动端分页变成两行的样式 -->
    <vxe-pager
      style="height: 80px"
      perfect
      align="center"
      size="small"
      @page-change="pageQuery"
      v-model:current-page="queryParams.pageNum"
      v-model:page-size="queryParams.pageSize"
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
    <add-or-edit
      ref="addEditRef"
      @refresh="fetchData"
      :roleList="roleList"
    ></add-or-edit>
  </div>
</template>

<script setup lang="ts">
import { Delete, Plus, Search, Edit, Download } from '@element-plus/icons'
import { reactive, toRefs, onMounted, ref } from 'vue'
import { getUserList } from '@/api/user'
import { getRoleList } from '@/api/role'
import { successMessage, errorMessage } from '@/utils/message'
import { ElMessageBox } from 'element-plus'
import AddOrEdit from './components/AddOrEdit.vue'

interface RoleItem {
  id: number
  roleName: string
}
const state = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 5,
    userName: ''
  },
  list: [],
  total: null,
  loading: false,
  selectIds: [], // 选中的id集合
  roleList: [] as Array<RoleItem> // 权限列表
})

interface SonData {
  init: () => void
}

// 新增或编辑组件实例
const addEditRef = ref<InstanceType<typeof AddOrEdit> & SonData>()

// 新增或编辑用户方法
const handleUser = row => {
  // console.log(addEditRef.value)
  // console.log(addEditRef.value.init(row))
  if (row?.id) {
    addEditRef.value.init(row)
  } else {
    addEditRef.value.init()
  }
}

const fetchData = async () => {
  state.loading = true
  let res = await getUserList(state.queryParams)
  console.log(res)
  state.list = res.data.list
  state.total = res.data.total
  state.loading = false
}

const queryData = () => {
  state.queryParams.pageNum = 1
  fetchData()
}

const pageQuery = param => {
  if (param.type === 'size') state.queryParams.pageNum = 1
  fetchData()
}

const selectChangeEvent = param => {
  // 重置选中的id
  state.selectIds = []
  const selectRows = param.records
  for (const { id } of selectRows) {
    state.selectIds.push(id)
  }
  console.log(state.selectIds)
}

const handleDelete = row => {
  // console.log(row)
  if (row?.id) {
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
  } else {
    if (state.selectIds.length > 0) {
      ElMessageBox.confirm('您确定要进行批量删除吗?', '温馨提示', {
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
    } else {
      errorMessage('未选中任何行')
    }
  }
}

const fetchRoles = async () => {
  let res = await getRoleList()
  state.roleList = res.data.list
}
fetchRoles()

// 第一个参数为true时代表下拉框打开，false为关闭下拉框时触发，第二个参数是行数据
const handleRole = status => {
  if (status) return false
  ElMessageBox.confirm('您正在修改用户角色，是否继续?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      successMessage('模拟修改成功')
    })
    .catch(() => {
      // 不操作
    })
}

onMounted(async () => {
  fetchData()
})

const { queryParams, list, total, loading, roleList } = toRefs(state)
</script>
<style lang="scss" scoped>
:deep() {
  .el-select {
    .el-select__tags {
      .el-tag--info {
        margin: 0 6px;
      }
      .el-tag--default.is-closable {
        padding: 0 9px;
      }
    }
    .el-tag__close {
      display: none;
    }
  }
}
</style>
