<template>
  <div class="todo-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <div><i class="iconfont icon-daiban"></i> 待办事项</div>
          <span>添加</span>
        </div>
      </template>
      <!-- 隐藏头部，通过设置 show-header 参数 -->
      <vxe-table
        ref="xTable1"
        :data="state.tableData"
        height="120"
        :show-header="false"
        border="inner"
        @checkbox-change="selectChangeEvent"
      >
        <vxe-column type="checkbox" field="status" width="60"></vxe-column>
        <vxe-column field="description" title="描述">
          <template #default="scope">
            <div
              class="operation"
              :class="{
                'todo-item-del': scope.row.status
              }"
            >
              {{ scope.row.description }}
            </div>
          </template>
        </vxe-column>
        <vxe-column title="操作">
          <template #default>
            <div class="operation">
              <i class="iconfont icon-bianji"></i>
              <i class="iconfont icon-lajitong"></i>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
const state = reactive({
  tableData: [
    {
      id: 1,
      description: '今天要修复10个bug',
      status: false
    },
    {
      id: 2,
      description: '明天记得有迭代会',
      status: false
    },
    {
      id: 3,
      description: '下周三有室内回顾会',
      status: false
    },
    {
      id: 4,
      description: '快到年底了，记得备年货',
      status: false
    },
    {
      id: 5,
      description: '明年的规划记得在近期完成',
      status: false
    }
  ]
})
const selectChangeEvent = param => {
  console.log(state.tableData[param.$rowIndex])
  state.tableData[param.$rowIndex].status =
    !state.tableData[param.$rowIndex].status
}
</script>
<style lang="scss" scoped>
.todo-list {
  margin-bottom: 20px;
  height: 200px;
  .card-header {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 12px;
      color: #409eff;
      cursor: pointer;
    }
  }
  :deep() {
    .vxe-table--render-default .vxe-body--column:not(.col--ellipsis),
    .vxe-table--render-default .vxe-footer--column:not(.col--ellipsis),
    .vxe-table--render-default .vxe-header--column:not(.col--ellipsis) {
      padding: 8px 0;
    }
  }
  .operation {
    float: right;
    i {
      font-size: 14px;
      color: #409eff;
      cursor: pointer;
      margin-right: 10px;
    }
  }
  .todo-item-del {
    text-decoration: line-through;
    color: #999;
  }
}
</style>
