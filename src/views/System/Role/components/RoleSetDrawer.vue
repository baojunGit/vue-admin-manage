<script setup lang="ts">
import { reactive, toRefs, ref } from 'vue';
import { getMenuList } from '@/api/menu';
import { successMessage } from '@/utils/message';

const state = reactive({
	drawer: false,
	list: [],
	defaultProps: {
		children: 'children',
		label: 'title'
	},
	openLevel: '收合所有',
	menuIds: [2],
	flag: false // 全选，反选的标识，默认为false
});

const fetchData = async () => {
	const { data } = await getMenuList();
	state.list = data;
};

fetchData();

const init = row => {
	state.drawer = true;
	console.log(row);
};

const handleClose = () => {
	state.drawer = false;
};

const handleSave = () => {
	successMessage('模拟保存/新增成功');
	// emit子传父调用父组件事件, 有传参就逗号隔开
	handleClose();
};

const menuTree = ref(null);

const handleTreeAll = () => {
	state.flag = !state.flag;
	if (state.flag) {
		menuTree.value.setCheckedNodes(state.list);
	} else {
		menuTree.value.setCheckedNodes([]);
	}
};

const handleTreeOpen = param => {
	// arr是树形数据的扁平化数组
	const arr = menuTree.value.store._getAllNodes();
	if (param === '0') {
		for (const item of arr) {
			item.expanded = false;
		}
	} else {
		for (const item of arr) {
			item.expanded = true;
		}
	}
};

const { drawer, list, defaultProps, openLevel, menuIds } = toRefs(state);

defineExpose({
	init
});
</script>

<template>
	<!-- 不需要默认头部 with-header=false -->
	<el-drawer
		title="菜单分配"
		v-model="drawer"
		direction="rtl"
		:before-close="handleClose"
		:close-on-click-modal="false"
	>
		<!-- check-strictly 显示复选框的情况下，父子节点选中不互相关联的做法 -->
		<el-tree
			ref="menuTree"
			:data="list"
			:props="defaultProps"
			show-checkbox
			node-key="id"
			:default-expanded-keys="[]"
			:default-checked-keys="menuIds"
		>
			<!-- 可以传两个参数：node和data -->
			<template #default="{ node }">
				<span class="custom-tree-node">
					<span>{{ node.label }}</span>
					<!-- <span>
            <a @click="append(data)"> Append </a>
            <a @click="remove(node, data)"> Delete </a>
          </span> -->
				</span>
			</template>
		</el-tree>
		<template #footer>
			<el-button size="small" @click="handleClose"> 取消 </el-button>
			<el-button size="small" plain @click="handleTreeAll">
				全选/反选
			</el-button>
			<el-select
				style="width: 110px; margin: 0 10px"
				size="small"
				v-model="openLevel"
				@change="handleTreeOpen"
			>
				<el-option label="收合所有" value="0"></el-option>
				<el-option label="展开所有" value="1"></el-option>
			</el-select>
			<el-button size="small" type="primary" @click="handleSave">
				确定
			</el-button>
		</template>
	</el-drawer>
</template>
