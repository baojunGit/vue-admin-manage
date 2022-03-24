<template>
  <div id="table-container">
    <my-query-form>
      <my-query-form-left-panel :span="12">
        <el-button plain :icon="Plus" type="primary"> 添加 </el-button>
        <el-button plain :icon="Check" type="success" @click="handleSave">
          保存
        </el-button>
      </my-query-form-left-panel>
      <my-query-form-right-panel :span="12">
        <el-form :inline="true" :model="queryParams" @submit.prevent>
          <el-form-item>
            <el-input
              @keyup.enter="fetchData"
              v-model.trim="queryParams.name"
              clearable
              placeholder="请输入指标名"
            />
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" type="primary" @click="fetchData">
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </my-query-form-right-panel>
    </my-query-form>
    <!-- 拖拽后顺序错乱：由于直接操作了 Dom 节点，需要与 Vue 的数据同步，必须设置 row-key，并且自行根据 vue 的规则自行实现数据同步 -->
    <!-- 提交数据后没有显示默认勾选项目：vxe-table配置默认选中的项
    （checkRowKeys: defaultSelecteRows,），只在表格第一次渲染的时候生效 
     最好不要使用这个功能，各种bug和问题，自己在初始化的时候调用vxe-table的API设置默认
    -->
    <!-- reserve: true  数据被刷新之后还要保留默认的勾选状态 -->
    <!-- 可以通过 show-overflow 和 row-config.height 修改行的高度 -->
    <vxe-table
      border
      :loading="loading"
      max-height="400"
      align="center"
      row-key
      row-id="id"
      ref="xTable"
      class="sortable-row"
      :scroll-y="{ enabled: false }"
      :data="state.tableData"
      :checkbox-config="{ reserve: true }"
    >
      <vxe-column width="60">
        <template #default>
          <span class="drag-btn">
            <i class="vxe-icon--menu"></i>
          </span>
        </template>
        <template #header>
          <vxe-tooltip
            v-model="state.showHelpTip"
            content="按住后可以上下拖动排序！"
            enterable
          >
            <i
              class="vxe-icon--question"
              @click="state.showHelpTip = !state.showHelpTip"
            ></i>
          </vxe-tooltip>
        </template>
      </vxe-column>
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column field="sort" title="顺序" width="60"></vxe-column>
      <vxe-column field="name" title="指标名" width="120"></vxe-column>
      <vxe-column field="type" title="模板类型" width="120"></vxe-column>
      <vxe-column field="desc" title="指标描述" width="80">
        <template #default="{ row }">
          <el-button type="info" plain size="small" @click="handleDesc(row)"
            >查看</el-button
          >
        </template>
      </vxe-column>
      <vxe-column align="center" field="isNew" title="新增" width="100">
        <template #default="{ row }">
          <el-tag v-if="row.isNew" type="warning">是</el-tag>
          <span v-else>否</span>
        </template>
      </vxe-column>
      <vxe-column field="url1" title="跳转1" min-width="80"></vxe-column>
      <vxe-column field="url2" title="跳转2" min-width="80"></vxe-column>
      <vxe-column field="url3" title="跳转3" min-width="80"></vxe-column>
      <vxe-column align="center" title="操作" min-width="160" fixed="right">
        <template #default="{ row }">
          <el-button
            @click="handleMenu(row)"
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
    <desc-dialog ref="descDialogRef"></desc-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onUnmounted, onMounted, toRefs } from 'vue'
import { VxeTableInstance } from 'vxe-table'
import Sortable from 'sortablejs'
import { ElMessageBox } from 'element-plus'
import { successMessage } from '@/utils/message'
import { getTargetList } from '@/api/target'
import DescDialog from './components/DescDialog.vue'
import { Plus, Check, Search, Edit, Delete } from '@element-plus/icons'

const xTable = ref({} as VxeTableInstance)

const state = reactive({
  queryParams: {
    name: ''
  },
  tableData: [],
  loading: false,
  showHelpTip: false
})

const fetchData = async () => {
  state.loading = true
  const {
    data: { list }
  } = await getTargetList(state.queryParams)
  state.tableData = list
  for (const item of state.tableData) {
    if (item.show) {
      xTable.value.setCheckboxRow(item, true)
    }
  }
  state.loading = false
}

fetchData()

let sortable: any

const rowDrop = () => {
  const $table = xTable.value
  sortable = Sortable.create(
    $table.$el.querySelector('.body--wrapper>.vxe-table--body tbody'),
    {
      handle: '.drag-btn',
      onEnd: sortableEvent => {
        const newIndex = sortableEvent.newIndex as number
        const oldIndex = sortableEvent.oldIndex as number
        // console.log(newIndex, oldIndex)
        // splice可以删除和添加原数组
        const currRow = state.tableData.splice(oldIndex, 1)[0]
        state.tableData.splice(newIndex, 0, currRow)
      }
    }
  )
}

// 加载完成之后再绑定拖动事件
onMounted(async () => {
  rowDrop()
})

onUnmounted(() => {
  if (sortable) {
    sortable.destroy()
  }
})

const handleSave = () => {
  ElMessageBox.confirm('您确定要提交当前数据?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      for (let i = 0; i < state.tableData.length; i++) {
        state.tableData[i].sort = String(i + 1)
      }
      successMessage('模拟保存成功')
    })
    .catch(() => {
      // 不操作
    })
  // console.log(state.tableData)
}

interface SonData {
  init: () => void
}

const descDialogRef = ref<InstanceType<typeof DescDialog> & SonData>()

const handleDesc = row => {
  // console.log(row?.desc)
  descDialogRef.value.init(row?.desc)
}

const { queryParams, loading } = toRefs(state)
</script>
<!-- 这里不能用scoped，不然拖拽的元素样式会失效 -->
<style lang="scss">
.sortable-row {
  .drag-btn {
    cursor: move;
    font-size: 12px;
  }
  .vxe-body--row.sortable-ghost,
  .vxe-body--row.sortable-chosen {
    background-color: #dfecfb;
  }
}
</style>
