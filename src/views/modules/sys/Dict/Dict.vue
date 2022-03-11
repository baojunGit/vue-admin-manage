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
              placeholder="请输入字典名称"
              @keyup.enter="queryData"
            ></el-input>
          </el-form-item>
          <el-form-item label="字典描述">
            <el-input
              mr10
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
            <el-button type="primary">搜索</el-button>
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
    <vxe-table border show-overflow :data="list">
      <vxe-column
        align="center"
        type="checkbox"
        width="60"
        fixed="left"
      ></vxe-column>
      <vxe-column align="center" field="dictName" title="字典名称"></vxe-column>
      <vxe-column align="center" field="desc" title="字典描述"></vxe-column>
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
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { getDictList } from '@/api/dict'
import { Plus, Edit, Delete, Download } from '@element-plus/icons'

const state = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 5,
    dictName: '',
    desc: '',
    status: ''
  },
  list: []
})

const fetchData = async () => {
  const {
    data: { list }
  } = await getDictList(state.queryParams)
  state.list = list
  console.log(state.queryParams)
  console.log(list)
}

const queryData = () => {
  state.queryParams.pageNum = 1
  fetchData()
}

queryData()

const handleDict = row => {
  console.log(row)
}
const handleDelete = row => {
  console.log(row)
}

const { queryParams, list } = toRefs(state)
</script>

<style lang="scss" scoped></style>
