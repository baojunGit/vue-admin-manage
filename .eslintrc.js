module.exports = {
  /* 当前配置为根目录，不再从上级文件夹匹配 */
  root: true,
  /* 执行环境 */
  env: {
    node: true
  },
  /* 默认继承规则 */
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parser: 'vue-eslint-parser',
  /* 语法解析配置 */
  parserOptions: {
    ecmaVersion: 2020
  },
  /* 校验规则: 0等价off  1等价warn 2等价error */
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: 'off', // 关闭引号提示
    semi: 'off', // 关闭结尾没有分号提示
    '@typescript-eslint/no-explicit-any': ['off'], // 关闭any类型的警告
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 关闭明确返回值类型，允许类型推导
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'comma-dangle': ['error', 'never'], // 对象字面量项尾不能有逗号
    'vue/comment-directive': 'off' // 关闭只能在模版里面注释（也能在标签注释）
  },
  /* 特定类型的文件指定处理器 */
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
