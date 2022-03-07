// 引入mockjs，官方文档： http://mockjs.com/0.1/
import Mock from 'mockjs'

// 设置全局延时，没有延时的话会检测不到数据的变化
Mock.setup({
  timeout: '300'
})

// vite2.0 提供了 glob 模式的模块导入
// const modules = import.meta.globEager('./modules/*.js')
// console.log(modules);
// console.log(Object.values(modules)); //["./login.js"]
// Object.values(modules).map(v => {
//   key表示每个引入的模块文件路径，如./login.js
//   获取组件配置
//   console.log(v.default)
//   let arr = v.default
//   for (let i = 0; i < arr.length; i++) {
//     let el = arr[i]
//     Mock.mock(el.path, el.methods, el.template)
//   }
// })

/* Webpack require.context() 批量导入模块 */
const requireComponent = require.context('./modules', true, /.ts$/)
// 获取引入的mock模块，分别执行Mock.mock
for (const key of requireComponent.keys()) {
  const componentConfig = requireComponent(key)
  // 数组的 for... of 遍历本身获取不了 index, 需要借助另一个es6遍历数组的方法
  // entries()用于遍历数组，返回一个遍历器对象
  // var fruits = ['Banana', 'Orange', 'Apple', 'Mango']
  // fruits.entries() //[(0, 'Banana')][(1, 'Orange')][(2, 'Apple')][(3, 'Mango')]
  // 也可以用for循环，但是用for of比较简单
  for (const [index] of componentConfig.default.entries()) {
    const el = componentConfig.default[index]
    // mock实例化，有四个参数 依次是 1.要拦截的url 2.要拦截的ajax请求方式  3.数据返回模板  4.生成响应数据的函数
    // 使用正则匹配带参数的get请求，.* 的方式在极端情况下可以会有问题，出现冲突的话，就写一个严格点的正则替换
    Mock.mock(
      RegExp(`${process.env.VUE_APP_BASE_API}${el.url}.*`),
      el.method,
      el.template
    )
  }
}
export default Mock
