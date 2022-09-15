/* 统一管理全局组件的地方 */
import { App } from 'vue';
import AppLoading from './AppLoading.vue';
import AppScreenfull from './AppScreenfull.vue';
import FlipClock from './FlipClock/index.vue';
import QueryForm from './QueryForm/index.vue';
import QueryFormTopPanel from './QueryForm/QueryFormTopPanel.vue';
import QueryFormBottomPanel from './QueryForm/QueryFormBottomPanel.vue';
import QueryFormBtnPanel from './QueryForm/QueryFormBtnPanel.vue';
import QueryFormLeftPanel from './QueryForm/QueryFormLeftPanel.vue';
import QueryFormRightPanel from './QueryForm/QueryFormRightPanel.vue';
import AppTabs from './AppTabs/index.vue';
import AppTabPane from './AppTabs/AppTabPane.vue';
import AppTreeSelect from './AppTreeSelect/index.vue';

const component = {
	AppLoading,
	AppScreenfull,
	FlipClock,
	QueryForm,
	QueryFormTopPanel,
	QueryFormBottomPanel,
	QueryFormBtnPanel,
	QueryFormLeftPanel,
	QueryFormRightPanel,
	AppTabs,
	AppTabPane,
	AppTreeSelect
};

const appComponent = {
	install(app: App) {
		for (const key in component) {
			// console.log(component)
			// console.log(key)
			/**
			 * @description 注册全局组件
			 * @param key 组件名  component[key] 组件对应的文件
			 */
			app.component(key, component[key]);
		}
	}
};

export default appComponent;
