/**
 * @description 4个子配置，vue/cli配置|通用配置|主题配置|网络配置导出
 *              config中的部分配置由vue.config.js读取，本质是node，故不可使用window等浏览器对象
 */

// 这里使用的是node的引入方式
const theme = require('./theme.config')

// 这里使用的是node的导出方式，而非es6，方便实现export多个
module.exports = {
  ...theme
}
