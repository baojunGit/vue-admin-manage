<script setup lang="ts">
import { ref } from 'vue';

const tableData = ref([
	{
		id: 1,
		description: '今天要修复10个bug',
		status: true
	},
	{
		id: 2,
		description: '明天记得有迭代会',
		status: true
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
]);

const defaultSelectedRows = [];
// Initialize default selected rows based on status
for (const { status, id } of tableData.value) {
	if (status) defaultSelectedRows.push(id);
}

const selectChangeEvent = param => {
	tableData.value[param.$rowIndex].status =
		!tableData.value[param.$rowIndex].status;
};
</script>

<template>
	<div class="todo-list">
		<el-card>
			<template #header>
				<div class="card-header">
					<div class="card-header-title">
						<i class="iconfont icon-daiban"></i> 待办事项
					</div>
					<div class="card-header-set">
						<span>添加</span>
						<span>保存</span>
					</div>
				</div>
			</template>
			<vxe-table
				ref="xTable1"
				:data="tableData"
				height="120"
				:show-header="false"
				border="inner"
				:row-config="{ useKey: true, keyField: 'id' }"
				@checkbox-change="selectChangeEvent"
				:checkbox-config="{ checkRowKeys: defaultSelectedRows, highlight: true }"
			>
				<vxe-column type="checkbox" width="60"></vxe-column>
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

<style lang="scss" scoped>
.todo-list {
	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		&-set {
			display: flex;
			align-items: center;
			justify-content: space-between;
			span {
				padding: 2px;
				font-size: 12px;
				cursor: pointer;
				&:nth-of-type(1) {
					margin-right: 10px;
					color: $base-color-green;
				}
				&:nth-of-type(2) {
					color: $base-color-blue;
				}
			}
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
			margin-right: 10px;
			font-size: 14px;
			color: $base-color-blue;
			cursor: pointer;
		}
	}
	.todo-item-del {
		color: #999999;
		text-decoration: line-through;
	}
}
</style>
