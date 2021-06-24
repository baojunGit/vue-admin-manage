module.exports = {
    /* 当前配置为根目录，不再从上级文件夹匹配 */
    'root': true,
    /* 执行环境 */
    'env': {
        'browser': true, // 所需检查的代码是在浏览器环境运行的
        'es2021': true,
        'node': true
    },
    /* 扩展使用插件 */
    'extends': [
        'eslint:recommended', // 使用eslint推荐规则
        'plugin:vue/essential', // 使用vue检测规则
        'plugin:@typescript-eslint/recommended'
    ],
    /* 指定如何解析语法。可以为空，但若不为空，只能配该值，原因见下文。*/
    parser: 'vue-eslint-parser',
    /* 语法解析配置 */
    'parserOptions': {
        'ecmaVersion': 12, // 指定es的支持版本，12为ES12
        'parser': '@typescript-eslint/parser', // 解析ts语法
        'sourceType': 'module' // 指定来源的类型，有两种script或module
    },
    /* 扩展配置，加一些插件 */
    'plugins': [
        'vue',
        '@typescript-eslint'
    ],
    /* 校验规则 */
    'rules': {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 检测没有注释掉的console函数
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 使用debugger
        '@typescript-eslint/ban-types': [ // typescript不能使用{}作为类型
            'error',
            {
                'extendDefaults': true,
                'types': {
                    '{}': false
                }
            }
        ],
        '@typescript-eslint/no-explicit-any': ['off'], // 关闭any类型的警告
        'no-plusplus': [ // 取消禁止一元运算符++和--的使用（由于一元++和--运算符都受自动分号插入的影响，因此空格的差异可能会改变源代码的语义）
            'off',
            {
                allowForLoopAfterthoughts: true // 允许一元运算符++和循环--的后缀（最终表达式）
            }
        ],
        '@typescript-eslint/no-inferrable-types': 'off', // 关闭类型推断
        '@typescript-eslint/explicit-module-boundary-types': 'off', // ts每个函数都要显式声明返回值
        'vue/no-multiple-template-root': 'off', // vue不使用根标签报错提示
        // 'eqeqeq':'warn'                  // 要求使用 === 和 !== 
    }
};
