// 颜色工具类文件

import formula from '@/constants/formula.json'
import color from 'css-color-function'
import rgbHex from 'rgb-hex'
import axios from 'axios'

export const generateColors = primary => {
  if (!primary) return
  // key一定要是primary的key
  const colors = {
    primary
  }

  Object.keys(formula).forEach(key => {
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = '#' + rgbHex(color.convert(value))
  })

  return colors
}

export const getOriginalStyle = async () => {
  // https://unpkg.com/element-plus@2.2.0/dist/index.css
  // 只有element-plus@2.2.0这个版本号是会变的
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  return getStyleTemplate(data)
}

const getStyleTemplate = data => {
  // element-plus默认色值
  const colorMap = {
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }

  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })

  return data
}

/**
 * @description 根据主题色，生成最新的样式表
 * 实现功能需要安装两个工具类
 * 1.rgb-hex: 转换RGB(A)颜色为十六进制
 * 2.css-color-function: 在CSS中提出的颜色函数的解析器和转换器
 * 最后还需要写入一个颜色转化计算器formula.json
 * 创建constants/formula.json (参照https://gist.github.com/benfrain/7545629)
 */

export const generateNewStyle = async parimaryColor => {
  // 1.根据主色生成色值表
  const colors = generateColors(parimaryColor)
  // 2.获取当前element-plus的默认样式表，并把需要进行替换的色值打上标记
  let cssText = await getOriginalStyle()
  console.log(cssText)
  // 3.遍历生成的色值表，在默认样式表进行全局替换
  Object.keys(colors).forEach(key => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })
  return cssText
}

/**
 * @description 把生成的样式表写入到style中
 */

export const writeNewStyle = newStyle => {
  const style = document.createElement('style')
  style.innerText = newStyle
  document.head.appendChild(style)
}
