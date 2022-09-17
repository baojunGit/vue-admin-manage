import { defineStore } from 'pinia';

interface VersionType {
	openVersion: boolean;
}

export const useVersionStore = defineStore('version', {
	state: (): VersionType => ({
		openVersion: false
	}),
	getters: {},
	actions: {
		/**
		 * @description 反馈弹框的状态
		 */
		setVersionDialog(openVersion) {
			this.openVersion = openVersion;
		}
	}
});
