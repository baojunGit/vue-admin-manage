import { defineStore } from 'pinia';

interface TabType {
	visitedTabs: any[];
}

const filterTabs = ['redirect'];

export const useTabStore = defineStore('tab', {
	state: (): TabType => ({
		visitedTabs: []
	}),
	getters: {
		getVisitedTabs() {
			return this.visitedTabs.filter(tab => !filterTabs.includes(tab.name));
		}
	},
	actions: {
		/**
		 * @description 添加标签页
		 * @param {*} tab
		 */
		addVisitedTab(route) {
			// 判断当前路由地址是否已存在
			const target = this.visitedTabs.find(item => item.name === route.name);
			// 若存在，执行一段无意义的代码
			if (target) Object.assign(target, route);
			// 若不存在，添加到访问的路由集里
			else if (!target) this.visitedTabs.push(Object.assign({}, route));
		},
		/**
		 * @description 删除当前标签页
		 * @param path
		 */
		delVisitedTab(path) {
			this.visitedTabs.splice(
				this.visitedTabs.findIndex(route => route.path === path),
				1
			);
		},
		/**
		 * @description 删除当前及不可关闭标签页以外其它全部标签页
		 * @param path
		 */
		delOthersVisitedTabs(path) {
			this.visitedTabs = this.visitedTabs.filter(
				route => route.meta.noCloseTab || route.path === path
			);
		},
		/**
		 * @description 删除当前及不可关闭标签页左边全部标签页
		 * @param path
		 */
		delLeftVisitedTabs(path) {
			let found = false;
			this.visitedTabs = this.visitedTabs.filter(route => {
				if (route.path === path) found = true;
				return route.meta.noCloseTab || found;
			});
		},
		/**
		 * @description 删除当前及不可关闭标签页右边全部标签页
		 * @param path
		 */
		delRightVisitedTabs(path) {
			let found = false;
			this.visitedTabs = this.visitedTabs.filter(route => {
				const close = found;
				if (route.path === path) found = true;
				return route.meta.noCloseTab || !close;
			});
		},
		/**
		 * @description 删除不可关闭标签页以外全部标签页
		 */
		delAllVisitedTabs() {
			this.visitedTabs = this.visitedTabs.filter(
				route => route.meta.noCloseTab
			);
		}
	}
});
