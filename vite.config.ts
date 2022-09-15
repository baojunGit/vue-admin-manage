import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuejsx from '@vitejs/plugin-vue-jsx';
// 安装@types/node，提供node的path模块类型提示
import { resolve } from 'path';
import { ConfigEnv, UserConfig, loadEnv } from 'vite';
import pkg from './package.json';
import dayjs from 'dayjs';

const { dependencies, devDependencies, name, version } = pkg;

const __APP_INFO__ = {
	dependencies,
	devDependencies,
	name,
	version,
	// 每次编译或者打包都会更新时间
	updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
};

// @see: https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd());
	// 这边打印只能在编辑器终端查看，是node服务
	// console.log(env);
	return {
		base: '/',
		resolve: {
			alias: {
				'@': resolve(__dirname, './src'),
				// vite解决vue-i18n插件报错
				// vue-i18n.esm-bundler.js:39 You are running the esm-bundler build of vue-i18n.
				// It is recommended to configure your bundler to explicitly replace feature flag
				// globals with boolean literals to get proper tree-shaking in the final bundle.
				'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
			}
		},
		// define定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。
		define: {
			// string 值会以原始表达式形式使用，所以如果定义了一个字符串常量，
			// 它需要被显式地打引号。（例如使用 JSON.stringify）
			__APP_INFO__: JSON.stringify(__APP_INFO__)
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/styles/global.scss";`
				}
			}
		},
		server: {
			// 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
			host: '0.0.0.0',
			port: Number(env.VITE_PORT),
			open: env.VITE_OPEN
			// cors: true
			// 代理跨域（mock 不需要配置跨域，直接能访问，这里只是个示例）
			// proxy: {
			// 	'/api': {
			// 		// target: "https://www.fastmock.site/mock/f81e8333c1a9276214bcdbc170d9e0a0", // fastmock
			// 		target: 'https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e', // easymock
			// 		changeOrigin: true,
			// 		rewrite: path => path.replace(/^\/api/, '')
			// 	}
			// }
		},
		plugins: [vue(), vuejsx()]
	};
});
