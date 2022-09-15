import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import { useElementPlus } from './plugins/element-plus';
import appComponent from '@/components/index';
// 引入pinia配置
import { setupStore } from '@/store';
// 引入mock模拟请求
import '@/mock';
// vue i18n
import I18n from '@/language/index';
// 引入vxe-table
import 'xe-utils';
import VxeTable from 'vxe-table';
import 'vxe-table/lib/style.css';
// 引入项目样式配置
import './styles/index.scss';
// 引入全局阿里图标库
import '@/assets/fonts/iconfont.css';

// vxe-table 解决 tooltip 被弹出框遮挡
VxeTable.setup({
	// version: 0,
	zIndex: 9999
	// table: {
	//   autoResize: true
	// }
});

const app = createApp(App);
setupStore(app);
app
	.use(router)
	.use(useElementPlus)
	.use(appComponent)
	.use(I18n)
	.use(VxeTable)
	.mount('#app');
