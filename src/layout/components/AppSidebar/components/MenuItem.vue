<script setup lang="ts">
import { PropType, computed, toRefs } from 'vue';

// 定义值的写法，能有类型提示
interface MenuItemType {
	id: number;
	path: string;
	name: string;
	component: unknown;
	redirect?: string;
	meta: {
		title: string;
		icon: string;
		frameSrc?: string;
		hideInMenu?: boolean;
		hideInBread?: boolean;
		noCloseTab?: boolean;
	};

	// 泛型就是在编译期间不确定的类型，在调用时由程序员指定泛型具体指向什么类型
	// 在定义函数或是类时，如果遇到类型不明确就可以使用泛型
	// Array<> 泛型类写法
	children?: MenuItemType[];
}

const props = defineProps({
	menuItem: {
		// PropsType 是vue中提供的类型推论
		// 如果不使用，只能知道type是对象类型，里面有什么参数不知道，且多层嵌套有规律的数据可能会有警告信息 如：ts Property 'xxx' does not exist on type 'unknown'.
		// 使用后的好处：不论在 ts 中还是模版中都能获得类型的推断和自动补全等等。
		type: Object as PropType<MenuItemType>,
		require: true
	}
});

// 使用 `toRefs` 创建对prop的 `menuItem` property 的响应式引用
const { menuItem } = toRefs(props);
// 不需要数据响应，只要初始值用于显示
const item = menuItem.value;

// 优化菜单类型 if结构
// 0: 无子菜单， 1：有子菜单
const showMenuType = computed(() => {
	if (item.children?.length > 0) {
		return 1;
	} else {
		return 0;
	}
});
</script>

<template>
	<!-- 有子菜单 -->
	<el-sub-menu v-if="showMenuType === 1" :index="menuItem.name">
		<!-- element-plus改为具名插槽 -->
		<template #title>
			<i
				:class="menuItem.meta?.icon"
				style="margin-right: 8px; font-size: 18px; vertical-align: bottom"
			></i>
			<span>{{ menuItem.meta?.title }}</span>
		</template>
		<div v-for="i in menuItem.children" :key="i.id">
			<!-- 判断子菜单下面是否还有三级和四级菜单 -->
			<!-- 在组件中调用自己，递归组件文档 -->
			<!-- https://v3.cn.vuejs.org/api/sfc-script-setup.html#%E9%80%92%E5%BD%92%E7%BB%84%E4%BB%B6 -->
			<!-- v-if 加key值的作用 vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染 -->
			<MenuItem v-if="i.children" :menu-item="i"></MenuItem>
			<el-menu-item v-else :index="i.name">
				{{ i.meta?.title }}
			</el-menu-item>
		</div>
	</el-sub-menu>
	<!-- 无子菜单 -->
	<el-menu-item v-else :index="menuItem?.name">
		<i
			:class="menuItem.meta?.icon"
			style="margin-right: 8px; font-size: 18px; vertical-align: bottom"
		></i>
		<template #title>
			{{ menuItem.meta?.title }}
		</template>
	</el-menu-item>
</template>
