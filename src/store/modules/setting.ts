import { defineStore } from 'pinia';
import { handleLocal } from '@/utils/storage';

interface SettingType {
	driverState: boolean;
	mobile: boolean;
	lang: string;
}

export const useSettingStore = defineStore('setting', {
	state: (): SettingType => ({
		driverState: handleLocal.get('driverState') ?? true, // 是否引导
		mobile: false,
		lang: 'zh'
	}),
	getters: {},
	actions: {
		/**
		 * @description 关闭引导状态
		 */
		closeIntro() {
			this.driverState = false;
			handleLocal.set('driverState', false);
		},
		/**
		 * @description 判断是否移动端
		 */
		toggleMobile(mobile) {
			this.mobile = mobile;
		},
		/**
		 * @descript 切换语言类型
		 * @param { string } lang 语言类型
		 */
		toggleLang(lang) {
			this.lang = lang;
			handleLocal.set('lang', lang);
		}
	}
});
