/**
 * @eslint9
 * 初始化eslint配置：npx eslint --init
 * 1.eslint.config.js: ESLint 引入的一个新的配置文件名。允许使用 ES Modules 语法（如 import 和 export）
 * 2.eslint-config-prettier在eslint9.0可以去掉了，eslint9已经没有格式化相关的规则
 * 3.引入插件或者修改配置后可能需要关闭项目再打开才能生效
 */

import globals from 'globals'
// 导入ESLint 的核心插件，提供了核心规则
import pluginJs from '@eslint/js'
// Vue.js 的官方 ESLint 插件
import pluginVue from 'eslint-plugin-vue'
// 专门为 TypeScript 语法设计的解析器
import tsEslint from 'typescript-eslint'
// 通过使用 eslint-define-config，你可以利用 TypeScript 的类型检查和自动补全功能，从而减少配置错误并提高开发效率
import { defineConfig } from 'eslint-define-config'
// 将 Prettier 的格式化规则整合到 ESLint 中，使你可以通过 ESLint 来报错不符合Prettier规则的代码，比较直观
import pluginPrettier from 'eslint-plugin-prettier'
// Vue.js 单文件组件（SFC）的 ESLint 解析器
import * as parserVue from 'vue-eslint-parser'

export default defineConfig([
  // 定义全局变量。具体来说，它将浏览器和 Node.js 环境中的全局变量合并，并将其应用于所有文件
  // languageOptions 字段用于指定与语言相关的选项，例如全局变量、解析器和解析器选项
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    ...pluginJs.configs.recommended,
    ignores: ['**/.*', 'dist/*', '*.d.ts', 'public/*', 'src/assets/**', 'src/**/iconfont/**'],
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      ...pluginPrettier.configs.recommended.rules,
      'no-debugger': 'off',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto'
        }
      ]
    }
  },
  /** 扩展名为 .ts、.cts、.mts、.tsx、.ctsx 或 .mtsx 文件的规则设置 */
  {
    files: ['**/*.?([cm])ts', '**/*.?([cm])tsx'],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tsEslint.plugin
    },
    rules: {
      ...pluginTypeScript.configs.strict.rules, // 继承 @typescript-eslint 插件的严格规则配置，符合 TypeScript 的最佳实践
      '@typescript-eslint/ban-types': 'off', // 允许使用某些类型（如 Object、String 等）
      '@typescript-eslint/no-redeclare': 'error', // 禁止重复声明变量
      '@typescript-eslint/ban-ts-comment': 'off', // 允许使用 @ts- 注释（如 @ts-ignore）
      '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any 类型
      '@typescript-eslint/prefer-as-const': 'warn', // 建议使用 as const 断言
      '@typescript-eslint/no-empty-function': 'off', // 允许空函数
      '@typescript-eslint/no-non-null-assertion': 'off', // 允许使用非空断言操作符
      '@typescript-eslint/no-import-type-side-effects': 'error', // 禁止导入类型时产生副作用
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 不强制要求返回类型声明
      '@typescript-eslint/consistent-type-imports': [ // 强制一致的类型导入风格
        'error',
        { disallowTypeAnnotations: false, fixStyle: 'inline-type-imports' }
      ],
      // 建议使用字面量枚举成员
      '@typescript-eslint/prefer-literal-enum-member': ['error', { allowBitwiseExpressions: true }],
      // 禁止定义但未使用的变量
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // 忽略以 _ 开头的参数
          varsIgnorePattern: '^_' // 忽略以 _ 开头的变量
        }
      ]
    }
  },
  /** .d.ts类型文件的规则设置 */
  {
    files: ['**/*.d.ts'],
    rules: {
      'eslint-comments/no-unlimited-disable': 'off', // 允许使用无限制的 eslint-disable 指令
      'import/no-duplicates': 'off', // 允许重复导入相同的模块
      'unused-imports/no-unused-vars': 'off' // 不检查未使用的变量
    }
  },
  /** .js、.cjs 或 .mjs 文件的规则设置 */
  {
    files: ['**/*.?([cm])js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off', // 允许使用 require 语句进行模块导入
      '@typescript-eslint/no-var-requires': 'off' // 允许在声明变量时使用 require 语句
    }
  },
  /** .vue文件的规则设置 */
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        extraFileExtensions: ['.vue'],
        parser: tsEslint.parser,
        sourceType: 'module'
      }
    },
    plugins: {
      vue: pluginVue
    },
    processor: pluginVue.processors['.vue'],
    rules: {
      ...pluginVue.configs.base.rules,
      ...pluginVue.configs['vue3-essential'].rules,
      ...pluginVue.configs['vue3-recommended'].rules,
      // 测试用属性
      // semi: ["error", "never"], // 语句末尾不加分号
      // quotes: ["error", "single"], // 使用单引号
      'no-undef': 'off', // 不检查未声明的变量
      'no-unused-vars': 'off', // 不检查未使用的变量
      'vue/no-v-html': 'off', // v-html 指令，可能会导致 XSS 攻击，默认禁止，off表示允许使用
      'vue/require-default-prop': 'off', // 不强制要求 prop 有默认值
      'vue/require-explicit-emits': 'off', // 不强制要求显式声明 emits
      'vue/multi-word-component-names': 'off', // 允许使用单个单词的组件名称
      'vue/no-setup-props-reactivity-loss': 'off', // 不检查 props 的响应性丢失问题
      'vue/html-self-closing': [ // 不同类型的标签应始终自闭合
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }
      ]
    }
  }
])
