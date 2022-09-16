<script setup lang="ts">
import { reactive, ref, onUnmounted, onMounted, toRefs } from 'vue';
import { VxeTableInstance } from 'vxe-table';
import Sortable from 'sortablejs';
import { ElMessageBox } from 'element-plus';
import { successMessage } from '@/utils/message';
import { getTableList } from '@/api/table';
import { AddOrEdit, AddOrEditTab, DescDialog } from './components';
import {
	Plus,
	Check,
	Search,
	Edit,
	Delete,
	CaretBottom
} from '@element-plus/icons-vue';
import { useTableStore } from '@/store/modules/table';
import { storeToRefs } from 'pinia';

const tableStore = useTableStore();
const { activeValue } = storeToRefs(tableStore);
const { setTableDragTab } = tableStore;

const state = reactive({
	tabList: [
		{
			id: '1',
			name: '研发中心'
		},
		{
			id: '2',
			name: '敏捷迭代'
		},
		{
			id: '3',
			name: '云数据中心'
		},
		{
			id: '4',
			name: '架构团队'
		},
		{
			id: '5',
			name: '资管团队'
		}
	],
	queryParams: {
		name: ''
	},
	tableData: [],
	loading: false,
	showHelpTip: false
});

const handleClick = tab => {
	// console.log(tab.name)
	activeValue.value = tab.name;
	setTableDragTab(tab.name);
};

const xTable = ref({} as VxeTableInstance);

const fetchData = async () => {
	state.loading = true;
	const {
		data: { dataList }
	} = await getTableList(state.queryParams);
	state.tableData = dataList;
	for (const item of state.tableData) {
		if (item.show) {
			xTable.value.setCheckboxRow(item, true);
		}
	}
	state.loading = false;
};

fetchData();

let sortable: any;

const rowDrop = () => {
	const $table = xTable.value;
	sortable = Sortable.create(
		$table.$el.querySelector('.body--wrapper>.vxe-table--body tbody'),
		{
			handle: '.drag-btn',
			onEnd: sortableEvent => {
				const newIndex = sortableEvent.newIndex as number;
				const oldIndex = sortableEvent.oldIndex as number;
				// console.log(newIndex, oldIndex)
				// splice可以删除和添加原数组
				const currRow = state.tableData.splice(oldIndex, 1)[0];
				state.tableData.splice(newIndex, 0, currRow);
			}
		}
	);
};

// 加载完成之后再绑定拖动事件
onMounted(async () => {
	rowDrop();
});

onUnmounted(() => {
	if (sortable) {
		sortable.destroy();
	}
});

const selectChangeEvent = ({ rowIndex }) => {
	state.tableData[rowIndex].show = !state.tableData[rowIndex].show;
};

const forArray = (arr: any, attr: string, val: boolean) => {
	for (const item of arr) {
		item[attr] = val;
	}
};

const selectAllChangeEvent = ({ checked }) => {
	if (checked) {
		xTable.value.setAllCheckboxRow(true);
		forArray(state.tableData, 'show', true);
		return;
	}
	xTable.value.clearCheckboxRow();
	forArray(state.tableData, 'show', false);
};

const handleSave = () => {
	ElMessageBox.confirm('您确定要提交当前数据?', '温馨提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
			for (let i = 0; i < state.tableData.length; i++) {
				state.tableData[i].sort = String(i + 1);
			}
			successMessage('模拟保存成功');
		})
		.catch(() => {
			// 不操作
		});
	// console.log(state.tableData)
};

interface SonData {
	init: () => void;
}

// 新增or编辑指标组件实例
const addEditRef = ref<InstanceType<typeof AddOrEdit> & SonData>();

// 新增或编辑用户方法
const handleTarget = row => {
	if (row?.id) {
		addEditRef.value.init(row);
	} else {
		addEditRef.value.init();
	}
};

// 新增页签组件实例
const addEditTabRef = ref<InstanceType<typeof AddOrEditTab> & SonData>();

const handleTab = row => {
	if (row?.label) {
		const param = state.tabList.find(tab => tab.name === row.label);
		addEditTabRef.value.init(param);
		return;
	}
	addEditTabRef.value.init();
};

// 删除页签
const deleteTab = item => {
	const param = state.tabList.find(tab => tab.name === item.label);
	console.log(param);
	ElMessageBox.confirm('您确定要删除当前项吗？', '温馨提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(async () => {
			successMessage('模拟删除成功');
		})
		.catch(() => {});
};

// 查看详情组件实例
const descDialogRef = ref<InstanceType<typeof DescDialog> & SonData>();

const handleDesc = row => {
	// console.log(row?.desc)
	descDialogRef.value.init(row);
};

// console.log(activeValue.value)

const { tabList, queryParams, tableData, loading } = toRefs(state);
</script>

<template>
	<div id="table-drag-container">
		<AppTabs v-model="activeValue" @tab-click="handleClick">
			<!-- <AppTabPane label="研发中心" name="1"></AppTabPane>
        <AppTabPane label="敏捷迭代" name="2"></AppTabPane>
        <AppTabPane label="云数据中心" name="3"></AppTabPane>
        <AppTabPane label="架构团队" name="4"></AppTabPane>
        <AppTabPane label="资管团队" name="5"></AppTabPane>
        <p>hhhhhhh</p> -->
			<AppTabPane
				v-for="(item, index) in tabList"
				:key="index"
				:label="item.name"
				:name="item.id"
			></AppTabPane>
			<template #suffix="{ item }">
				<!--        阻止el-popover点击事件冒泡-->
				<div @click.stop>
					<el-popover
						popper-class="tab-set"
						style="min-width: auto"
						placement="bottom"
						:width="80"
						trigger="click"
					>
						<template #reference>
							<el-icon :size="16" style="padding: 4px; cursor: pointer">
								<caret-bottom />
							</el-icon>
						</template>
						<ul class="menu">
							<li class="menu-item" @click="handleTab(item)">编辑</li>
							<li class="menu-item" @click="deleteTab(item)">删除</li>
						</ul>
					</el-popover>
				</div></template
			>
			<template #append>
				<el-button :icon="Plus" text @click="handleTab"> 新建页签 </el-button>
			</template>
		</AppTabs>
		<QueryForm>
			<QueryFormLeftPanel :span="12">
				<el-button
					plain
					:icon="Plus"
					type="primary"
					@click="handleTarget($event)"
				>
					添加
				</el-button>
				<el-button plain :icon="Check" type="success" @click="handleSave">
					保存
				</el-button>
			</QueryFormLeftPanel>
			<QueryFormRightPanel :span="12">
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
			</QueryFormRightPanel>
		</QueryForm>
		<!-- 拖拽后顺序错乱：由于直接操作了 Dom 节点，需要与 Vue 的数据同步，必须设置 row-key，并且根据 vue 的规则自行实现数据同步 -->
		<!-- 提交数据后没有显示默认勾选项目：vxe-table配置默认选中的项
      （checkRowKeys: defaultSelecteRows,），只在表格第一次渲染的时候生效 
       最好不要使用这个功能，各种bug和问题，自己在初始化的时候调用vxe-table的API设置默认，详情见fetchData里
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
			:data="tableData"
			:checkbox-config="{ reserve: true }"
			@checkbox-change="selectChangeEvent"
			@checkbox-all="selectAllChangeEvent"
		>
			<vxe-column width="60">
				<template #default>
					<span class="drag-btn">
						<i class="vxe-icon-menu"></i>
					</span>
				</template>
				<template #header>
					<vxe-tooltip
						v-model="state.showHelpTip"
						content="按住后可以上下拖动排序！"
						enterable
					>
						<i
							class="vxe-icon-question-circle"
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
					<el-button type="info" plain size="small" @click="handleDesc(row)">
						查看
					</el-button>
				</template>
			</vxe-column>
			<vxe-column align="center" field="isNew" title="新增" width="100">
				<template #default="{ row }">
					<el-tag v-if="row.isNew" type="warning"> 是 </el-tag>
					<span v-else>否</span>
				</template>
			</vxe-column>
			<vxe-column field="url1" title="跳转1" min-width="80"></vxe-column>
			<vxe-column field="url2" title="跳转2" min-width="80"></vxe-column>
			<vxe-column field="url3" title="跳转3" min-width="80"></vxe-column>
			<vxe-column align="center" title="操作" min-width="160" fixed="right">
				<template #default="{ row }">
					<el-button
						plain
						size="small"
						type="primary"
						:icon="Edit"
						@click="handleTarget(row)"
					>
					</el-button>
					<el-button
						plain
						size="small"
						type="danger"
						:icon="Delete"
					></el-button>
				</template>
			</vxe-column>
		</vxe-table>
		<!-- @refresh=""调用重新获取页签 -->
		<AddOrEdit ref="addEditRef"></AddOrEdit>
		<AddOrEditTab ref="addEditTabRef"></AddOrEditTab>
		<DescDialog ref="descDialogRef"></DescDialog>
	</div>
</template>

<!-- 这里不能用scoped，不然拖拽的元素样式会失效 -->
<style lang="scss">
.sortable-row {
	.drag-btn {
		font-size: 12px;
		cursor: move;
	}
	.vxe-body--row.sortable-ghost,
	.vxe-body--row.sortable-chosen {
		background-color: #dfecfb;
	}
}
.tab-set {
	min-width: auto !important;
	padding: 5px 0 !important;
	.menu {
		.menu-item {
			padding: 5px 12px;
			cursor: pointer;
			transition: all 0.3s;
			&:hover {
				color: (0, 0, 0, 0.65);
				background-color: #f5f5f5;
			}
		}
	}
}
.el-popper.is-customized {
	width: 200px;

	/* Set padding to ensure the height is 32px */
	padding: 6px 12px;
	color: #ffffff;
	background: linear-gradient(90deg, rgb(31 148 255), rgb(119 225 157));
}
.el-popper.is-customized .el-popper__arrow::before {
	right: 0;
	background: linear-gradient(45deg, #6ab6ce, #6db9cb);
}
</style>
