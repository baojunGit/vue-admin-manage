<template>
	<div class="app-tree-select-container" :style="{ width: width }">
		<!-- :teleported="false" 属性可使弹框插入到 body 中，方便修改样式 -->
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
			<!-- :label="treeData" -->
			<!-- node-key 设置默认选中的id，该属性必须设置 -->
			<!-- highlight-current 选中节点背景色高亮 -->
			<!-- default-expand-all 默认全部展开 -->
			<!-- default-expanded-keys 设置默认展开的节点 -->
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
<script setup lang="ts">
import { PropType, reactive, toRefs, watch, nextTick } from 'vue';

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

const props = defineProps({
	// vue3用props里的属性modelValue表示默认的v-model绑定值属性，可以自行更改如：v-model:title="title"
	modelValue: { type: String, default: () => '' },
	width: { type: String, default: () => '100%' },
	disabled: {
		type: Boolean,
		default: () => false
	},
	data: {
		// 此处的 Array 并不是变量类型，而是构造函数，
		// 所以不能用[]代替，不然报错Invalid prop: type check failed for prop "data". Expected , got Array
		// 通过 PropType 指定构造函数的类型
		type: Array as PropType<DataType[]>,
		default: () => [
			// {
			//   title: '选项1',
			//   id: '1',
			//   parentId: '0',
			//   children: [{ title: '选项1-1', parentId: '1-1' }]
			// },
			// { title: '选项2', id: '2', parentId: '0' }
		]
	},
	config: {
		type: Object as PropType<ConfigType>,
		default: () => {
			return { label: 'title', value: 'id', children: 'children' };
		}
	}
});

const { modelValue, width, disabled, data, config } = toRefs(props);

// console.log(data.value)

const state = reactive({
	treeSelect: null,
	selectTree: null,
	treeExpandIds: [],
	treeDataValue: ''
});

const emit = defineEmits(['select']);

// 获取树形结构默认展开节点, 这里默认配置为展开一层
// 后续考虑配置默认展开层级的属性设置 :defaultExpandLevel="Infinity"
const getTreeExpandIds = () => {
	state.treeExpandIds.push(data.value[0].id);
};
getTreeExpandIds();

const getTreeDataValue = (arr, param) => {
	// 监听的变量没有值，显示的数据重置为空，不再往下执行
	if (!param) {
		state.treeDataValue = '';
		return;
	}
	// console.log(param)
	// 要声明string，不然会报类型错误
	const label = config.value.label;
	const value = config.value.value;
	const children = config.value.children;
	// for-of(ES6)
	for (const item of arr) {
		if (item[value] === param) {
			state.treeDataValue = item[label];
			// 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key  属性
			// 且初始化的时候要在nextTick里执行
			nextTick(() => {
				state.selectTree.setCurrentKey(param);
			});
			break;
		}
		if (item[children] && item[children].length) {
			getTreeDataValue(item[children], param);
		}
	}
	// forEach（ES5）的缺点
	// 1.forEach函数内部是异步的，在它的循环体中使用 await，await会失效；
	// 2.forEach不能用break跳出循环，也不能用return返回外层；
	// 3.没有返回值，即使你给出return也不管用。
	// try {
	//   arr.forEach(e => {
	//     if (e[value] === param) {
	//       state.treeDataValue = e[label]
	//     }
	//     if (e[children] && e[children].length) {
	//       getTreeDataValue(e[children], param)
	//     }
	//   })
	// } catch (error) {
	//   console.error(error)
	//   return
	// }
};

watch(
	() => modelValue.value,
	() => {
		getTreeDataValue(data.value, modelValue.value);
	},
	// 初始化的时候就立马执行
	{ immediate: true }
);

// 点击树形节点的事件
const handleNodeClick = node => {
	// 要声明string，不然会报类型错误
	// const param = config.value.label as string
	state.treeDataValue = node.title;
	state.treeSelect.blur();
	emit('select', node);
};

// 清除筛选框内容的时候重置树形菜单选中状态
const handleClear = () => {
	nextTick(() => {
		state.selectTree.setCurrentKey(null);
	});
};

const { treeSelect, selectTree, treeExpandIds, treeDataValue } = toRefs(state);
</script>
<!-- 要修改dialog的样式不能直接在<style scoped>中修改，因为dialog的元素是在组件外，这样修改后不会生效。
使用 :popper-append-to-body="false" 属性可使弹框插入到 body 中，就可以用scoped+:deep的方式穿透修改样式，且不污染其它页面
 -->
<style lang="scss" scoped>
:deep() {
	.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
		// 解决下拉框没有高度的问题
		height: auto !important;
		padding: 0 !important;

		// max-height: 274px;
		// overflow: hidden;
		// overflow-y: auto;
	}

	// 设置树节点字体不加粗
	.tree-item {
		font-weight: normal;
	}

	// 修改选中节点的字体样式
	// .el-tree-node.is-current .el-tree-node__label {
	//   color: #409eff;
	//   font-weight: 700;
	// }
}
</style>
