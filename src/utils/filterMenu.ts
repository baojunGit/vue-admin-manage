/**
 * @description 递归过滤格式化后的路由数据
 * @param routeList 路由数据
 * @param param 过滤条件 默认过滤条件 meta.param === true
 */

interface MenuItem {
	id: number;
	path: string;
	name: string;
	component: unknown;
	redirect: string;
	meta: {
		title: string;
		icon: string;
		frameSrc: string;
		hideInMenu: boolean;
		hideInBread: boolean;
		noCloseTab: boolean;
		sort: number;
		isNew: boolean;
	};
	children: MenuItem[];
}

type MenuList = MenuItem[];

/**
 *
 * @param menuList 菜单列表
 * @param param 菜单meta中的过滤属性名
 * @param nameList 过滤菜单名数组
 * @returns
 */

interface ParamType {
	menuList: MenuList;
	attr: string;
}

export const filterMenu = ({ menuList, attr }: ParamType) => {
	const router = [];
	let rNew;
	for (let r of menuList) {
		if (r.meta[attr]) return; // 终止本次执行
		if (r.name === 'layout') r = r?.children[0];
		rNew = {
			id: r.id,
			path: r.path,
			name: r.name,
			// 不能把@也配置在接口里返回，直接import()里是个变量会报错
			component: r.component,
			meta: r.meta
		} as MenuItem;
		if (r.children) {
			const children = filterMenu({
				menuList: r.children,
				attr: attr
			});
			rNew = { ...rNew, children: children };
		}
		router.push(rNew);
	}
	return router;
};
