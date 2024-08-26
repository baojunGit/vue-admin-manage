<script setup lang="ts">
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { Plus, Edit, Delete, Download, Search, Check } from '@element-plus/icons-vue'
import { getDictList } from '@/api/dict'
import { successMessage, errorMessage } from '@/utils/message'
import AddOrEdit from './components/AddOrEdit.vue'
import DictSetDrawer from './components/DictSetDrawer.vue'

const queryParams = ref({
  pageNum: 1,
  pageSize: 5,
  dictName: '',
  desc: '',
  status: '1'
})
const list = ref([])
const total = ref<number | null>(null)
const loading = ref(false)
const selectIds = ref<number[]>([])

const fetchData = async () => {
  const {
    data: { dataList, total: totalData }
  } = await getDictList(queryParams.value)
  list.value = dataList
  total.value = totalData
}

fetchData()

const queryData = () => {
  queryParams.value.pageNum = 1
  fetchData()
}

const handleSizeChange = (newSize: number) => {
  queryParams.value.pageSize = newSize
  queryParams.value.pageNum = 1 // 当页面大小改变时，重置页码为1
  fetchData()
}

const handleCurrentChange = (newPage: number) => {
  queryParams.value.pageNum = newPage
  fetchData()
}

interface SonData {
  init: () => void
}

// 新增或编辑组件实例
const addEditRef = ref<InstanceType<typeof AddOrEdit> & SonData>()
const handleDict = (row?: any) => {
  if (row?.id) {
    addEditRef.value?.init(row)
  } else {
    addEditRef.value?.init()
  }
}

// 设置字典参数抽屉组件实例
const dictSetRef = ref<InstanceType<typeof DictSetDrawer> & SonData>()
const handleDrawer = (row: any) => {
  dictSetRef.value?.init(row)
}

const selectChangeEvent = (param: any) => {
  selectIds.value = []
  const selectRows = param.records
  for (const { id } of selectRows) {
    selectIds.value.push(id)
  }
  console.log(selectIds.value)
}

const handleDelete = (row?: any) => {
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
    if (selectIds.value.length > 0) {
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
</script>

<template>
  <div id="dict-container">
    <QueryForm>
      <QueryFormTopPanel>
        <!-- 行内表单模式 -->
        <el-form :inline="true">
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
            <el-select v-model="queryParams.status" placeholder="字典状态" clearable @change="queryData">
              <el-option label="正常" value="1" />
              <el-option label="停用" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" type="primary"> 搜索 </el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </QueryFormTopPanel>
      <QueryFormBtnPanel>
        <el-button plain :icon="Plus" type="primary" @click="handleDict($event)"> 添加 </el-button>
        <el-button mt10 plain :icon="Delete" type="danger" @click="handleDelete($event)"> 批量删除 </el-button>
        <el-button mt10 plain :icon="Download" type="warning"> 导出 </el-button>
      </QueryFormBtnPanel>
    </QueryForm>
    <vxe-table
      border
      show-overflow
      :data="list"
      :loading="loading"
      :row-config="{ useKey: true, keyField: 'id', isHover: true }"
      :checkbox-config="{ checkField: 'checked' }"
      @checkbox-change="selectChangeEvent"
      @checkbox-all="selectChangeEvent"
    >
      <vxe-column align="center" type="checkbox" width="60" fixed="left"></vxe-column>
      <vxe-column align="center" field="dictName" title="字典名称"></vxe-column>
      <vxe-column align="center" field="desc" title="字典描述"></vxe-column>
      <vxe-column align="center" field="status" title="状态">
        <template #default="{ row }">
          <el-tag v-if="row.status === '1'" type="success"> 正常 </el-tag>
          <el-tag v-else type="danger"> 停用 </el-tag>
        </template>
      </vxe-column>
      <vxe-column align="center" title="操作" min-width="160" fixed="right">
        <template #default="{ row }">
          <el-button @click="handleDict(row)" plain size="small" type="primary" :icon="Edit"> </el-button>
          <el-button @click="handleDelete(row)" plain size="small" type="danger" :icon="Delete"></el-button>
          <el-button @click="handleDrawer(row)" plain size="small" type="warning" :icon="Check"> </el-button>
        </template>
      </vxe-column>
    </vxe-table>
    <el-pagination
      style="height: 80px"
      background
      layout="prev, pager, next, jumper, sizes, total"
      :current-page.sync="queryParams.pageNum"
      :page-size.sync="queryParams.pageSize"
      :total="total"
      :page-sizes="[5, 20, 50, 100, 1000]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <AddOrEdit ref="addEditRef" @refresh="fetchData"></AddOrEdit>
    <DictSetDrawer ref="dictSetRef"></DictSetDrawer>
  </div>
</template>

<style lang="scss" scoped></style>
