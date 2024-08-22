import { type UserConfigExport, type ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// VueSetupExtend扩展 <script setup> 语法的功能, 如直接定义组件的名称
// 如：<script setup name="MyComponent">
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// vxe-table按需加载插件
import { lazyImport, VxeResolver } from 'vite-plugin-lazy-import'
// 分析打包内容
import { visualizer } from 'rollup-plugin-visualizer'
// 使用gzip压缩是为了减少服务端向客户端所传输文件的大小
// 浏览器解压文件也需要时间，其成本可能大于传输中节约的时间，因此对于过小的文件不应该使用gzip压缩
import viteCompression from 'vite-plugin-compression'
import { resolve } from 'path'
import dayjs from 'dayjs'
import pkg from './package.json'

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  dependencies,
  devDependencies,
  name,
  version,
  // 每次编译或者打包都会更新时间
  updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd())
  // console.log(env)
  return {
    plugins: [
      vue(),
      vueSetupExtend(),
      lazyImport({
        resolvers: [
          VxeResolver({
            libraryName: 'vxe-table'
          }),
          VxeResolver({
            libraryName: 'vxe-pc-ui'
          })
        ]
      }),
      visualizer({ open: true }), // 打包完成后自动打开报告页面
      viteCompression({
        threshold: 102400 // 对大于 100kb 的文件进行压缩
      })
    ],
    base: '/', // 默认就是/
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src')
          // 另一种写法：'@': resolve(__dirname, './src')
        }
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`
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
    // 需要在global.d.ts里定义
    define: {
      // string 值会以原始表达式形式使用，所以如果定义了一个字符串常量，
      // 它需要被显式地打引号。（例如使用 JSON.stringify）
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    // 打包上线配置项
    build: {
      target: 'es2015',
      sourcemap: false,
      // 消除打包大小超过500kb警告，设置为 4000 KB（即 4 MB）
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // vue的核心库单独分包，要放在最前面
            if (
              id.includes('node_modules/vue') ||
              id.includes('node_modules/vue-router') ||
              id.includes('node_modules/pinia') ||
              id.includes('node_modules/vue-i18n')
            ) {
              return 'vue'
            } else if (
              id.includes('node_modules/element-plus') ||
              id.includes('node_modules/@element-plus/icons-vue')
            ) {
              return 'element-plus'
            } else if (id.includes('node_modules/echarts')) {
              return 'echarts'
            } else if (id.includes('node_modules/vuedraggable') || id.includes('node_modules/sortablejs')) {
              return 'drag-drop'
            } else if (
              id.includes('node_modules/@wangeditor/editor') ||
              id.includes('node_modules/@wangeditor/editor-for-vue')
            ) {
              return 'wangeditor'
            } else if (id.includes('node_modules')) {
              // 其他未匹配到的第三方依赖包统一打包为 vendors
              return 'vendors'
            } else {
              // 对于项目中的其他代码，可以根据路径或模块类型进一步分包
              return 'index'
            }
            // 下面的vxe-table无法分包抽离，报错 Cannot access 'mutableHandlers' before initialization
            // else if (
            //   id.includes('node_modules/vxe-table') ||
            //   id.includes('node_modules/xe-utils') ||
            //   id.includes('node_modules/vxe-pc-ui')
            // ) {
            //   return 'vxe-table'
            // } 
            
          }
        }
      }
    }
  }
}
