<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMenuStore } from '@/store/modules/menu';
import { storeToRefs } from 'pinia';
import MenuItem from './components/MenuItem.vue';
import Logo from './components/Logo.vue';
import { filterMenu, findNameAttr } from '@/utils/menu';

const route = useRoute();
const router = useRouter();
const menuStore = useMenuStore();
const { collapse } = storeToRefs(menuStore);
const { menuList } = storeToRefs(menuStore);
console.log(menuList.value);

// v-for和v-if不能用在同一个标签上，在计算属性里过滤
// 计算属性常⽤场景是简化⾏内模板中的复杂表达式，模板中出现太多逻辑会是模板变得臃肿不易维护
const menus = computed(() =>
	filterMenu({ menuList: menuList.value, attr: 'hideInMenu' })
);

// el-menu菜单激活回调
// index: 选中菜单项的 index, indexPath: 选中菜单项的 index集合, el: 选中路由对象信息,
// el: vue-router 的返回值（如果 router 为 true）
const selectMenuItem = (index, indexPath, el) => {
	const isExternal = findNameAttr({ menuList: menuList.value, name: index });
	// 传参的键和值
	const query = {};
	const params = {};
	// 获取url携带参数
	// el &&el.route &&el.route.parameters 用可选链写法代替
	// 这里不能使用for of，会报错&&右边应该为表达式
	el.route?.parameters &&
		el.route.parameters.forEach(item => {
			if (item.type === 'query') {
				query[item.key] = item.value;
				return; // 跳出本次循环
			}
			params[item.key] = item.value;
		});
	// 点击的是当前页
	if (index === route.name) return;
	// 判断是否其它系统页面，如果是就不用再经过router处理
	if (/http(s)?:/.test(index)) {
		window.open(index);
		return;
	}
	// 本系统需要跳转新窗口的页面
	if (isExternal) {
		const { href } = router.resolve({
			name: index // 跳转的name
			// path: '/test' 跳转的path
		});
		window.open(href, '_blank');
		return;
	}
	// 判断是否全局页面，如大屏，跳转新窗口
	// 正常跳转路由
	router.push({ name: index, query, params });
};

// el-menu路由匹配方法
const activeMenu = computed((): string => {
	const { meta, name } = route;
	// 可以在meta里添加信息，重置高亮的路由，比如要让父路由高亮
	if (meta.activeMenu) {
		// 不能将类型“unknown”分配给类型“string”
		// 要么使用@ts-ignore 注释掉，要么使用类型断言
		return meta.activeMenu as string;
	}
	// @ts-ignore 不能将类型“RouteRecordName”分配给类型“string”。
	return name;
});
</script>
<template>
	<div class="app-sidebar">
		<Logo></Logo>
		<!-- wrap-class 包裹层自定义样式类 -->
		<el-scrollbar wrap-class="scroll-wrapper">
			<!-- unique-opened有且只能展开一个 -->
			<!-- :collapse="isCollapse" 是否收缩侧边菜单-->
			<!-- :collapse-transition=false解决折叠卡顿不流畅 -->
			<!-- router 会默认匹配路由，执行激活菜单回调 -->
			<el-menu
				:default-active="activeMenu"
				unique-opened
				mode="vertical"
				:collapse="collapse"
				:collapse-transition="false"
				@select="selectMenuItem"
			>
				<MenuItem
					v-for="item in menus"
					:key="item.id"
					:menu-item="item"
				></MenuItem>
			</el-menu>
		</el-scrollbar>
	</div>
</template>
