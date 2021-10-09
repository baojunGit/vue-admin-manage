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
        // 早期版本用的是prependData
        additionalData: `
        @import "@/style/gobal.scss";
        `
      }
    }
  },

  devServer: {
    open: true, //运行时自动打开浏览器窗口
    port: '8090', //设置启动端口
    //关于0.0.0.0：当你想用非本机访问项目进行测试时，由ip地址构建的url可以对项目进行访问，同时本地还可以用localhost进行访问。
    host: '0.0.0.0'
    //webpack解决跨域的设置：proxy
    // proxy:{
    //     '/api':{
    //         target:'http://55.11.20.142:8088',//需要跨域的接口地址(ip或者域名),最后的/可加可不加
    //         changeOrigin:true,//是否跨域
    //         pathRewrite: {//重写接口
    //             '^/api/': ''//这里就是用空代替http://172.81.239.102/,比如接口的地址是‘http://172.81.239.102/user/info’，我们就可以使用‘user/info’
    //         }
    //     }
    // }
  }
}
