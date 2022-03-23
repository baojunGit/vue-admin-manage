export const hasClass = (ele: Element, cls: string): any => {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

export const addClass = (ele: Element, cls: string, extracls?: string): any => {
  if (!hasClass(ele, cls)) ele.className += '' + cls
  if (extracls) {
    if (!hasClass(ele, extracls)) ele.className += ' ' + extracls
  }
}

export const removeClass = (
  ele: Element,
  cls: string,
  extracls?: string
): any => {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ').trim()
  }
  if (extracls) {
    if (hasClass(ele, extracls)) {
      const regs = new RegExp('(\\s|^)' + extracls + '(\\s|$)')
      ele.className = ele.className.replace(regs, ' ').trim()
    }
  }
}

export const toggleClass = (
  flag: boolean,
  clsName: string,
  target?: HTMLElement
): any => {
  const targetEl = target || document.body
  // console.log(targetEl)
  let { className } = targetEl
  // 如果元素含有clsName类名，将类名清除，替换为空
  className = className.replace(clsName, '')
  // 再重新添加上类名
  targetEl.className = flag ? `${className} ${clsName} ` : className
}
