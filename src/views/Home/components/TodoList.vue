<script setup lang="ts">
import { reactive } from 'vue';
const state = reactive({
	tableData: [
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
	]
});

const defaultSelecteRows = [];
// let defaultSelecteRows: number[]，这样命名下面的数组方法push就会失效，报错， Cannot read properties of undefined (reading 'push')

for (const { status, id } of state.tableData) {
	if (status) defaultSelecteRows.push(id);
}

const selectChangeEvent = param => {
	// console.log(state.tableData[param.$rowIndex])
	state.tableData[param.$rowIndex].status =
		!state.tableData[param.$rowIndex].status;
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
			<!-- 隐藏头部，通过设置 show-header 参数 -->
			<!-- checkbox-config配置必须要搭配row-id属性，不然默认勾选不生效 -->
			<vxe-table
				ref="xTable1"
				:data="state.tableData"
				height="120"
				:show-header="false"
				border="inner"
				row-id="id"
				@checkbox-change="selectChangeEvent"
				:checkbox-config="{ checkRowKeys: defaultSelecteRows, highlight: true }"
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
