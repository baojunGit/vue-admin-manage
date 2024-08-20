import { defineConfig } from 'vite'
import { type UserConfigExport, type ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// VueSetupExtend扩展 <script setup> 语法的功能, 如直接定义组件的名称
// 如：<script setup name="MyComponent">
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { resolve } from 'path'
import dayjs from 'dayjs';
import pkg from './package.json';

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
	dependencies,
	devDependencies,
	name,
	version,
	// 每次编译或者打包都会更新时间
	updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
};

// https://vitejs.dev/config/
export default (({ mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd());
  // console.log(env)
  return {
    plugins: [vue(), vueSetupExtend()],
    base: './',
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src')
        }
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/global.scss";`
        }
      }
    },
    server: {
      // 服务器主机名，如果允许局域网访问，可设置为 "0.0.0.0"
      host: '0.0.0.0',
      port: Number(env.VITE_PORT),
      // 启动后是否自动打开浏览器页面
			open: Boolean(env.VITE_OPEN)
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
    // define定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。
		define: {
			// string 值会以原始表达式形式使用，所以如果定义了一个字符串常量，
			// 它需要被显式地打引号。（例如使用 JSON.stringify）
			__APP_INFO__: JSON.stringify(__APP_INFO__)
		},
  }
})
