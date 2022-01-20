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
              @keyup.enter="queryData()"
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
      row-id="id"
      :checkbox-config="{ checkField: 'checked' }"
      @checkbox-change="selectChangeEvent"
      @checkbox-all="selectChangeEvent"
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
        field="datetime"
        title="修改时间"
        show-overflow
        width="180"
      ></vxe-column>
      <vxe-column field="role" title="角色" show-overflow>
        <template #default="{ row }">
          <el-select
            multiple
            collapse-tags
            v-model="row.roleIds"
            @visible-change="handleRole($event, row)"
            style="width: 180px"
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
    <add-or-edit
      ref="addEditRef"
      @refresh="fetchData"
      :roleList="roleList"
    ></add-or-edit>
  </div>
</template>

<script setup lang="ts">
import { Delete, Plus, Search, Edit } from '@element-plus/icons'
import { reactive, toRefs, onMounted, ref } from 'vue'
import { getUserList } from '@/api/user'
import { getRoleList } from '@/api/role'
import { successMessage, errorMessage } from '@/utils/message'
import { ElMessageBox } from 'element-plus'
import AddOrEdit from './components/AddOrEdit.vue'

interface RoleList {
  id: number
  roleName: string
}
const state = reactive({
  queryForm: {
    pageNum: 1,
    pageSize: 5,
    username: ''
  },
  list: [],
  total: null,
  loading: false,
  selectIds: [], // 选中的id集合
  roleList: [] as Array<RoleList> // 权限列表
})

interface SonData {
  showEdit: () => void
}

// 新增或编辑组件实例
const addEditRef = ref<InstanceType<typeof AddOrEdit> & SonData>()

const handleEdit = row => {
  // console.log(addEditRef.value)
  // console.log(addEditRef.value.showEdit(row))
  if (row?.id) {
    addEditRef.value.showEdit(row)
  } else {
    addEditRef.value.showEdit()
  }
}

const fetchData = async () => {
  state.loading = true
  let res = await getUserList(state.queryForm)
  console.log(res)
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

const selectChangeEvent = param => {
  // 重置选中的id
  state.selectIds = []
  const selectRows = param.records
  selectRows.forEach((item): void => {
    state.selectIds.push(item.id)
  })
}

const handleDelete = row => {
  // console.log(row)
  if (row?.id) {
    console.log(1)
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
      ElMessageBox.confirm('您确定要删除当前项吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(state.selectIds)
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

const handleRole = (e, row) => {
  console.log(row)
  if (e) return false
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

const { queryForm, list, total, loading, roleList } = toRefs(state)
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
