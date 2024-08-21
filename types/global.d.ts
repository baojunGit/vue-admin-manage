// 新增vite全局常量
declare const __APP_INFO__: {
	name: string;
	version: string;
	dependencies: Recordable<string>;
	devDependencies: Recordable<string>;
	updateTime: string;
};