/* eslint-disable @typescript-eslint/no-var-requires */
// 注释取消使用require引入的提示
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const pkg = require('./package.json')
const dayjs = require('dayjs')

const appInfo = {
  ...pkg,
  // 每次编译或者打包都会更新时间
  updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

// 存进环境变量会自动转为字符串，要自己做转换
process.env.VUE_APP_INFO = JSON.stringify(appInfo)

module.exports = {
  /* 项目部署生产环境和开发环境下相对根目录的地址 */
  // publicPath: process.env.NODE_ENV === 'production' ? '/public/' : '/',
  publicPath: '/',

  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: 'dist',

  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: 'assets',

  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,

  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: true,

  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: true,

  // css全局配置：sass中的mixin和function不是纯样式，配置在这里才能全局使用
  css: {
    loaderOptions: {
      scss: {
        sassOptions: { outputStyle: 'expanded' },
        /**
         * 早期版本用的是prependData
         * 在 scss 中除以要使用 math.div 而不是 /，或者用* 0.5代替
         * scss使用 math.div() math.floor 等方法必须引入  @use 'sass:math', 否则报错
         * There is no module with the namespace “math“.
         * @use 规则必须在任何其他规则如import等之前引入
         */
        additionalData: `
        @use 'sass:math';
        @import "@/styles/global.scss";
        `
      }
    }
  },

  devServer: {
    open: true, // 运行时自动打开浏览器窗口
    port: '9099', // 设置启动端口
    // 关于0.0.0.0：当你想用非本机访问项目进行测试时，由ip地址构建的url可以对项目进行访问，同时本地还可以用localhost进行访问。
    // 也可以直接设置'0.0.0.0'
    host: 'localhost',
    // 测试环境开启热更新，只刷新修改的模块，其他保持原状，节省修改代码的的重构时间
    hot: true
    // webpack解决跨域的设置：proxy
    // proxy:{
    //     '/api':{
    //         target:'http://55.11.20.142:8088',//需要跨域的接口地址(ip或者域名),最后的/可加可不加
    //         changeOrigin:true,//是否跨域
    //         pathRewrite: {//重写接口
    //             '^/api/': ''//这里就是用空代替http://172.81.239.102/,比如接口的地址是‘http://172.81.239.102/user/info’，我们就可以使用‘user/info’
    //         }
    //     }
    // }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '~': resolve('.')
      }
    },
    // 以下性能提示设置二选一
    // 关闭webpack的性能提示
    // performance: {
    //   hints: false
    // }
    // 警告 webpack 的性能提示
    performance: {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  },
  // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置, 就要使用chainWebpack高级配置
  chainWebpack(config) {
    // 解决开发环境下的警告 You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
    // 注意，生产不能添加该配置，不然会报错__INTLIFY_PROD_DEVTOOLS__ is not defined，导致程序异常
    config.when(process.env.NODE_ENV === 'development', config => {
      config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
      config.devtool('eval-cheap-module-source-map')
    })
    config.when(process.env.NODE_ENV === 'production', config => {
      config.devtool(false)
    })
  }
}
