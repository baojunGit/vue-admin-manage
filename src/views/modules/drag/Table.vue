<template>
  <div id="table-container">
    <my-query-form>
      <my-query-form-left-panel :span="12">
        <el-select v-model="value" placeholder="请选择项目">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </my-query-form-left-panel>
    </my-query-form>
    <!-- 拖拽后顺序错乱：由于直接操作了 Dom 节点，需要与 Vue 的数据同步，必须设置 row-key，并且自行根据 vue 的规则自行实现数据同步 -->
    <!-- 提交数据后没有显示默认勾选项目：vxe-table配置默认选中的项，只在表格第一次渲染的时候生效 -->
    <!-- reserve: true  数据被刷新之后还要保留默认的勾选状态 -->
    <vxe-table
      border
      align="center"
      max-height="500"
      row-key
      row-id="id"
      ref="xTable"
      class="sortable-row"
      :scroll-y="{ enabled: false }"
      :data="state.tableData"
      :checkbox-config="{ checkRowKeys: defaultSelecteRows, reserve: true }"
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
      <vxe-column field="name" title="Name" min-width="80"></vxe-column>
      <vxe-column field="sex" title="Sex" min-width="80"></vxe-column>
      <vxe-column field="age" title="Age" min-width="80"></vxe-column>
      <vxe-column
        field="address"
        title="Address"
        show-overflow
        min-width="80"
      ></vxe-column>
    </vxe-table>
    <el-button @click="handleSave" style="margin: 20px 0" type="primary"
      >保存</el-button
    >
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onUnmounted, onMounted, toRefs } from 'vue'
import { VxeTableInstance } from 'vxe-table'
import Sortable from 'sortablejs'
import { ElMessageBox } from 'element-plus'

const xTable = ref({} as VxeTableInstance)

const state = reactive({
  showHelpTip: false,
  tableData: [
    {
      id: 10001,
      name: 'Test1',
      nickname: 'T1',
      role: 'Develop',
      sex: 'Man',
      age: 28,
      address: 'Shenzhen',
      sort: '1',
      isCheck: true
    },
    {
      id: 10002,
      name: 'Test2',
      nickname: 'T2',
      role: 'Test',
      sex: 'Women',
      age: 22,
      address: 'Guangzhou',
      sort: '2',
      isCheck: true
    },
    {
      id: 10003,
      name: 'Test3',
      nickname: 'T3',
      role: 'PM',
      sex: 'Man',
      age: 32,
      address: 'Shanghai',
      sort: '3',
      isCheck: false
    },
    {
      id: 10004,
      name: 'Test4',
      nickname: 'T4',
      role: 'Designer',
      sex: 'Women',
      age: 23,
      address: 'Shenzhen',
      sort: '4',
      isCheck: false
    },
    {
      id: 10005,
      name: 'Test5',
      nickname: 'T5',
      role: 'Develop',
      sex: 'Women',
      age: 30,
      address: 'Shanghai',
      sort: '5',
      isCheck: false
    }
  ],
  defaultSelecteRows: [],
  options: [
    {
      id: 1,
      name: '项目1'
    },
    {
      id: 2,
      name: '项目2'
    },
    {
      id: 3,
      name: '项目3'
    },
    {
      id: 4,
      name: '项目4'
    }
  ],
  value: 1
})

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
onMounted(() => {
  rowDrop()
})

onUnmounted(() => {
  if (sortable) {
    sortable.destroy()
  }
})

const init = () => {
  state.defaultSelecteRows = []
  state.tableData.forEach((item): void => {
    if (item.isCheck) state.defaultSelecteRows.push(item.id)
  })
}

init()

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
    })
    .catch(() => {
      // 不操作
    })
  // console.log(state.tableData)
}

const { defaultSelecteRows, options, value } = toRefs(state)
</script>
<style lang="scss">
.sortable-row .drag-btn {
  cursor: move;
  font-size: 12px;
}
.sortable-row .vxe-body--row.sortable-ghost,
.sortable-row .vxe-body--row.sortable-chosen {
  background-color: #dfecfb;
}
</style>
