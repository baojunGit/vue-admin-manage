/** @see: https://www.prettier.cn */

module.exports = {
    /*
     * "off" 或 0    ==>  关闭规则
     * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
     * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
     */
  
    // 一行最多 80个字符
    printWidth: 80,
    // tab缩进字节数
    tabWidth: 2,
    // 结尾使用分号(true有，false没有)
    semi: true,
    // 使用单引号(true单引号，false双引号)
    singleQuote: true,
    // 箭头函数单一参数省略括号, (x) => {}。avoid：省略括号 ,always：不省略括号
    arrowParens: 'avoid',
    // 对象或数组末尾加逗号
    trailingComma: 'none',
    // 对象，数组括号与文字之间加空格 { foo: bar }
    bracketSpacing: true,
    // 使用制表符而不是空格缩进
    useTabs: true,
    // 更改引用对象属性的时间 可选值"<as-needed|consistent|preserve>"
    quoteProps: 'as-needed',
    // 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
    trailingComma: 'none',
    // 在JSX中使用单引号而不是双引号
    jsxSingleQuote: false,
    // 如果文件顶部已经有一个 doclock，这个选项将新建一行注释，并打上@format标记。
    insertPragma: false,
    // 指定要使用的解析器，不需要写文件开头的 @prettier
    requirePragma: false,
    // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
    proseWrap: 'preserve',
    // 在html中空格是否是敏感的 "css" - 遵守CSS显示属性的默认值， "strict" - 空格被认为是敏感的 ，"ignore" - 空格被认为是不敏感的
    htmlWhitespaceSensitivity: 'css',
    // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
    endOfLine: 'auto',
    // 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
    rangeStart: 0,
    rangeEnd: Infinity,
    // Vue文件脚本和样式标签缩进
    vueIndentScriptAndStyle: false
  };
  