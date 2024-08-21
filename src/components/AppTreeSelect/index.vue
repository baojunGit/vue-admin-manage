<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';

interface DataType {
	id: string;
	parentId: string;
	path: string;
	name: string;
	component: string;
	redirect: string;
	title: string;
	icon: string;
	frameSrc: string;
	external: boolean;
	hideInMenu: boolean;
	hideInBread: boolean;
	noCloseTab: boolean;
	sort: number;
	isNew: number;
	children: DataType[] | null;
}

interface ConfigType {
	label: string;
	value: string;
	children: string;
}

interface Props {
	modelValue: string;
	width: string;
	disabled: boolean;
	data: DataType[];
	config: ConfigType;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	width: '100%',
	disabled: false,
	data: () => [] as DataType[],
	config: () => ({ label: 'title', value: 'id', children: 'children' } as ConfigType),
});

const treeSelect = ref(null);
const selectTree = ref(null);
const treeExpandIds = ref<string[]>([]);
const treeDataValue = ref<string>('');

const emit = defineEmits(['select']);

// Get default expanded node IDs
const getTreeExpandIds = () => {
	if (props.data.length > 0) {
		treeExpandIds.value.push(props.data[0].id);
	}
};
getTreeExpandIds();

const getTreeDataValue = (arr: DataType[], param: string) => {
	if (!param) {
		treeDataValue.value = '';
		return;
	}

	const { label, value, children } = props.config;
	for (const item of arr) {
		if (item[value] === param) {
			treeDataValue.value = item[label];
			nextTick(() => {
				selectTree.value?.setCurrentKey(param);
			});
			break;
		}
		if (item[children] && item[children].length) {
			getTreeDataValue(item[children], param);
		}
	}
};

watch(
	() => props.modelValue,
	() => {
		getTreeDataValue(props.data, props.modelValue);
	},
	{ immediate: true }
);

const handleNodeClick = (node: DataType) => {
	treeDataValue.value = node.title;
	treeSelect.value?.blur();
	emit('select', node);
};

const handleClear = () => {
	nextTick(() => {
		selectTree.value?.setCurrentKey(null);
	});
};
</script>

<template>
	<div class="app-tree-select-container" :style="{ width: width }">
		<el-select
			ref="treeSelect"
			v-model="treeDataValue"
			clearable
			@clear="handleClear"
			:multiple="false"
			:disabled="disabled"
			style="width: 100%"
			:teleported="false"
			placeholder="请选择上级菜单"
		>
			<el-option :value="treeDataValue">
				<el-tree
					id="tree-option"
					ref="selectTree"
					:expand-on-click-node="false"
					:data="data"
					:props="config"
					:default-expanded-keys="treeExpandIds"
					node-key="id"
					highlight-current
					@node-click="handleNodeClick"
				>
					<template #default="{ node }">
						<span class="tree-item">{{ node.label }}</span>
					</template>
				</el-tree>
			</el-option>
		</el-select>
	</div>
</template>

<style lang="scss" scoped>
:deep() {
	.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
		height: auto !important;
		padding: 0 !important;
	}

	.tree-item {
		font-weight: normal;
	}
}
</style>
