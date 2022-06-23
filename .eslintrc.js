module.exports = {
  env: {
    browser: true,
    es2021: true,
    // 解决vue3 'defineProps' is not defined 报错
    'vue/setup-compiler-macros': true
  },
  // extends 的顺序后面会覆盖前面，prettier的配置必须放在最后
  extends: [
    'plugin:vue/vue3-strongly-recommended', // vue3代码相关配置
    'standard',
    'prettier' // 用 prettier替换了部分ESLint里冲突的规则
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    'prettier' // eslint 会使用pretter的规则对代码格式化
  ],
  rules: {
    'prettier/prettier': 'error', // 这项配置，对于不符合prettier规范的写法，eslint会提示报错
    'prefer-regex-literals': ['off', { disallowRedundantWrapping: true }], // 关闭正则校验
    'node/no-callback-literal': 'off', // 关闭回调的错误位置出现意外文字报错
    // 关闭强制使用带连字符的 v-on 事件名称，如@onChange
    'vue/v-on-event-hyphenation': [
      'off',
      'always',
      {
        autofix: false,
        ignore: []
      }
    ],
    // 关闭要求组件名称始终为多字
    'vue/multi-word-component-names': [
      'off',
      {
        ignores: []
      }
    ]

    // 关闭每行属性个性的限制
    // 'vue/max-attributes-per-line': [
    //   'off',
    //   {
    //     // 当开始标签位于单行时，每行的最大属性数。默认为1
    //     singleline: {
    //       max: 1
    //     },
    //     // 当开始标签位于多行时，每行的最大属性数
    //     multiline: {
    //       max: 1
    //     }
    //   }
    // ],
    // 关闭需要自闭合（self-closing）标签警告
    // 'vue/html-self-closing': [
    //   'off',
    //   {
    //     html: {
    //       void: 'never',
    //       normal: 'always',
    //       component: 'always'
    //     },
    //     svg: 'always',
    //     math: 'always'
    //   }
    // ]
  }
}
