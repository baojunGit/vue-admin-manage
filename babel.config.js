module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  // 安装依赖  npm install  @babel/plugin-proposal-optional-chaining --save-dev
  // 解决使用 es2020 中的可选链运算符 页面报错问题
  // 安装依赖  npm install  @babel/plugin-proposal-nullish-coalescing-operator --save-dev
  // 解决使用es2020空值合并运算符 页面报错问题
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator'
  ]
}
