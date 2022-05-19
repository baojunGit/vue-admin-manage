/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/*
 解决找不到模块“../lib/pca-code.json”。请考虑使用 "--resolveJsonModule" 
 导入带 ".json" 扩展的模块。ts(2732)
 */
declare module '*.json' {
  const value: any
  export default value
}

/*
 解决找不到模块“@/styles/variables/var.scss”。
 导入带 ".scss" 扩展的模块。ts(2732)
*/
declare module '*.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}
