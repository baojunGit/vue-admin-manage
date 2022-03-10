<template>
  <div id="dict-container">
    <my-query-form>
      <my-query-form-left-panel :span="12">
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
              v-model="queryParams.desc"
              placeholder="请输入字典描述"
              @keyup.enter="queryData"
            ></el-input>
          </el-form-item>
        </el-form>
      </my-query-form-left-panel>
      <my-query-form-right-panel :span="12">
        <!-- 行内表单模式 -->
        <el-form label-width="auto" :inline="true">
          <el-form-item label="字典状态">
            <el-select
              v-model="queryParams.status"
              placeholder="字典状态"
              clearable
              @change="queryData"
            >
              <el-option label="正常" :value="1" />
              <el-option label="停用" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </my-query-form-right-panel>
    </my-query-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { getDictList } from '@/api/dict'

const state = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 5,
    dictName: '',
    desc: '',
    status: null
  }
})

const fetchData = async () => {
  let res = await getDictList(state.queryParams)
  console.log(res)
}

const queryData = () => {
  state.queryParams.pageNum = 1
  fetchData()
}

queryData()

const { queryParams } = toRefs(state)
</script>

<style lang="scss" scoped></style>
