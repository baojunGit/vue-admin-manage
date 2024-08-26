/** @prettier
 * 每次修改这个文件时 需要重启vscode 否则有时候格式会有缓存
 */

export default {
  printWidth: 120, // 一行的字符数换行
  tabWidth: 2, // 一个tab代表几个空格数
  useTabs: false, // 是否使用tab进行缩进
  singleQuote: true, // 字符串是否使用单引号
  semi: false, // 行尾是否使用分号，默认为true
  trailingComma: 'none', // 对象或数组末尾加逗号
  arrowParens: 'avoid', // 箭头函数单变量省略括号
  bracketSpacing: true, // 对象，数组括号与文字之间是否加空格 { foo: bar }
  endOfLine: 'auto' // 保留在 Windows 和 Unix 下的换行符
}
