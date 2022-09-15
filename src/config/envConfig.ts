/**
 * 环境变量通过import.meta.env使用，太麻烦了
 * 在常量配置文件里声明常量再导出，比较简单，也可以做逻辑处理
 *
 */

/** 常规代码里使用 */
// 最后加的感叹号是非空断言
export const API_PREFIX: string = import.meta.env.VITE_API_PREFIX!;
export const APP_PORT: string = import.meta.env.VITE_PORT!;
export const APP_OPEN: string = import.meta.env.VITE_OPEN!;
export const APP_MOCK: string = import.meta.env.VITE_MOCK!;
export const BASE_URL: string = import.meta.env.BASE_URL!;
