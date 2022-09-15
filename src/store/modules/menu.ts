import { defineStore } from 'pinia';
// 导入默认已经注册的路由asyncRoutes
import { store } from '@/store';

interface MenuType {
	// 菜单列表
	menu: any[];
	// 菜单是否折叠
	collapse: boolean;
}

export const useMenuStore = defineStore('menu', {
	state: (): MenuType => ({
		// 菜单列表
		menu: [],
		// 菜单是否折叠
		collapse: false
	}),
	getters: {},
	actions: {
		/**
		 * @description 设置用户菜单
		 */
		setMenu(menu) {
			this.menu = menu;
		},
		/**
		 * 设置菜单栏是否折叠
		 */
		toggleCollapse() {
			this.collapse = !this.collapse;
		}
	}
});

// 这样是为了方便在非vue文件的js程序里跑，可以直接引入使用
export function useMenuStoreHook() {
	return useMenuStore(store);
}
