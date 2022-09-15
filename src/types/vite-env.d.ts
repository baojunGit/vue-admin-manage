/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

// 增加自定义环境变量的类型提示
declare interface ViteEnv {
	VITE_API_PREFIX: string;
	VITE_PORT: string;
	VITE_OPEN: string;
	VITE_MOCK: string;
}

// Vite内置环境变量类型继承自定义类型
interface ImportMetaEnv extends ViteEnv {
	__: unknown;
}

type Recordable<T = any> = Record<string, T>;

// 新增vite全局常量
declare const __APP_INFO__: {
	name: string;
	version: string;
	dependencies: Recordable<string>;
	devDependencies: Recordable<string>;
	updateTime: string;
};
