// @see: http://mockjs.com/0.1/
import Mock from 'mockjs';
import { API_PREFIX } from '@/config/envConfig';

// 设置全局延时，没有延时的话会检测不到数据的变化
Mock.setup({
	timeout: '300'
});

/** vite 提供的glob文件批量导入功能
 *  @description 不是JS的语法，是个定制的语法糖，只能在vite中使用
 */

interface ItemType {
	url: string;
	method: string;
	template: string;
}

type MockType = ItemType[];

const flies = import.meta.glob('./modules/*.ts', {
	import: 'default',
	eager: true
});

// console.log(Object.values(files)); // ["./login.js"]
Object.values(flies).map((arr: MockType) => {
	//   key表示每个引入的模块文件路径，如./login.js
	//   获取组件配置
	for (let i = 0; i < arr.length; i++) {
		let el = arr[i];
		Mock.mock(RegExp(`${API_PREFIX}${el.url}.*`), el.method, el.template);
	}
});

export default Mock;
