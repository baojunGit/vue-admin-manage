import Layout from '@/layout/index.vue';
import { shallowRef } from 'vue';
/**
 * 生成路由
 * @param {Array} routerList 格式化路由
 * @returns
 */

//  用interface描述**数据结构**，用type描述**类型关系**
//  公共的用 interface 实现，不能用 interface 实现的再用 type 实现。是一对互帮互助的好兄弟

interface MenuItem {
	id: number;
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
	isNew: boolean;
	children: MenuItem[] | null;
}

type MenuList = MenuItem[];

interface RouteItem {
	id: number;
	path: string;
	name: string;
	component: unknown;
	redirect: string;
	meta: {
		title: string;
		icon: string;
		frameSrc: string;
		external: boolean;
		hideInMenu: boolean;
		hideInBread: boolean;
		noCloseTab: boolean;
		sort: number;
		isNew: boolean;
	};
	children: RouteItem[];
}

/**
 * @description 处理后端返回的路由数据
 * @param routerList 路由数据
 * @returns
 */
// es6 的动态 import 不支持动态参数，可以使用 vite 提供的 glob 功能，这里不要用@符号
// @see https://cn.vitejs.dev/guide/features#glob-import
const modules = import.meta.glob('../views/**/*.vue');
export const formatRoutes = (routeList: MenuList) => {
	const router = [];
	let rNew;
	let component;
	for (const r of routeList) {
		r.component === 'layout'
			? (component = shallowRef(Layout))
			: (component = modules[`../views/${r.component}.vue`]);
		rNew = {
			id: r.id,
			path: r.path,
			name: r.name,
			redirect: r.redirect,
			component: component
		} as RouteItem;
		rNew = {
			...rNew,
			meta: {
				title: r.title,
				icon: r.icon,
				frameSrc: r.frameSrc,
				external: r.external,
				hideInMenu: r.hideInMenu,
				hideInBread: r.hideInBread,
				noCloseTab: r.noCloseTab,
				sort: r.sort,
				isNew: r.isNew
			}
		};
		// if (e.redirect) {
		//   e_new = { ...e_new, redirect: e.redirect }
		// }
		if (r.children) {
			const children = formatRoutes(r.children);
			// 保存权限
			rNew = { ...rNew, children: children };
		} else {
			rNew = { ...rNew, children: null };
		}
		router.push(rNew);
	}
	return router;
};
