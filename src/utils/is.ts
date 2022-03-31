/* eslint-disable */

/**
 * @description 判断字符串是否一个url链接
 * @param
 * @returns
 */

export function isUrl(path: any): boolean {
  const reg = /(((^(http|https)?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

const toString = Object.prototype.toString
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

/**
 * @description 判断是否为一个数字
 */

export function isNumber(val: unknown): val is number {
  return is(val, 'Number')
}
