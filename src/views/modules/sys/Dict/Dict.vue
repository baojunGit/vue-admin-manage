<template>
  <div id="dict-container">
    <my-query-form>
      <my-query-form-top-panel>
        <!-- 行内表单模式 -->
        <el-form label-width="auto" :inline="true">
          <el-form-item label="字典名称">
            <el-input
              v-model="queryParams.dictName"
              mr10
              clearable
              placeholder="请输入字典名称"
              @keyup.enter="queryData"
            ></el-input>
          </el-form-item>
          <el-form-item label="字典描述">
            <el-input
              mr10
              clearable
              v-model="queryParams.desc"
              placeholder="请输入字典描述"
              @keyup.enter="queryData"
            ></el-input>
          </el-form-item>
          <el-form-item label="字典状态">
            <el-select
              v-model="queryParams.status"
              placeholder="字典状态"
              clearable
              @change="queryData"
            >
              <el-option label="正常" value="1" />
              <el-option label="停用" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" type="primary">搜索</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </my-query-form-top-panel>
      <my-query-form-btn-panel>
        <el-button
          plain
          :icon="Plus"
          type="primary"
          @click="handleDict($event)"
        >
          添加
        </el-button>
        <el-button
          mt10
          plain
          :icon="Delete"
          type="danger"
          @click="handleDelete($event)"
        >
          批量删除
        </el-button>
        <el-button mt10 plain :icon="Download" type="warning"> 导出 </el-button>
      </my-query-form-btn-panel>
    </my-query-form>
    <vxe-table
      border
      show-overflow
      :data="list"
      :loading="loading"
      :row-config="{ isHover: true }"
      row-id="id"
      :checkbox-config="{ checkField: 'checked' }"
      @checkbox-change="selectChangeEvent"
      @checkbox-all="selectChangeEvent"
    >
      <vxe-column
        align="center"
        type="checkbox"
        width="60"
        fixed="left"
      ></vxe-column>
      <vxe-column align="center" field="dictName" title="字典名称"></vxe-column>
      <vxe-column align="center" field="desc" title="字典描述"></vxe-column>
      <vxe-column align="center" field="status" title="状态">
        <template #default="{ row }">
          <el-tag v-if="row.status === '1'" type="success">正常</el-tag>
          <el-tag v-else type="danger">停用</el-tag>
        </template>
      </vxe-column>
      <vxe-column align="center" title="操作" min-width="160" fixed="right">
        <template #default="{ row }">
          <el-button
            @click="handleDict(row)"
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
            @click="handleCheck(row)"
            plain
            size="small"
            type="warning"
            :icon="Check"
          >
          </el-button>
        </template>
      </vxe-column>
    </vxe-table>
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
    <add-or-edit ref="addEditRef" @refresh="fetchData"></add-or-edit>
    <dict-set-drawer></dict-set-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue'
import { getDictList } from '@/api/dict'
import {
  Plus,
  Edit,
  Delete,
  Download,
  Search,
  Check
} from '@element-plus/icons'
import AddOrEdit from './components/AddOrEdit.vue'
import DictSetDrawer from './components/DictSetDrawer.vue'
import { successMessage, errorMessage } from '@/utils/message'
import { ElMessageBox } from 'element-plus'

const state = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 5,
    dictName: '',
    desc: '',
    status: ''
  },
  list: [],
  total: null,
  loading: false,
  selectIds: []
})

const fetchData = async () => {
  const {
    data: { list, total }
  } = await getDictList(state.queryParams)
  state.list = list
  state.total = total
}

fetchData()

const queryData = () => {
  state.queryParams.pageNum = 1
  fetchData()
}

const pageQuery = param => {
  if (param.type === 'size') state.queryParams.pageNum = 1
  fetchData()
}

interface SonData {
  init: () => void
}

// 新增或编辑组件实例
const addEditRef = ref<InstanceType<typeof AddOrEdit> & SonData>()

const handleDict = row => {
  if (row?.id) {
    addEditRef.value.init(row)
  } else {
    addEditRef.value.init()
  }
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

const { queryParams, list, total, loading } = toRefs(state)
</script>

<style lang="scss" scoped></style>
