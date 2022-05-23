// 颜色工具类文件

import formula from '@/constants/formula.json'
import color from 'css-color-function'
import rgbHex from 'rgb-hex'
// import axios from 'axios'

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
  // const version = require('element-plus/package.json').version
  // const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  // const { data } = await axios(url)
  // style.scss 是样式文件，不是一个模块。这个文件里根本没有说明导出什么内容，既然没有导出，你怎么导入呢？
  // 所以 import styled from "./styled.scss" 会报错,这是从styled.scss这个文件里导入一个叫styled的导出内容，
  // 而文件里没有，所以肯定报错。
  // import "./styled.scss" 不会报错，这只是导入一个文件而已。
  // 那个文件里需要定义了导出(export)的变量/方法 等等，import xxx from xxx才会正常工作。
  const data = require('element-plus/dist/index.css')
  console.log(data)
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

export const generateNewStyle = async primaryColor => {
  // 1.根据主色生成色值表
  const colors = generateColors(primaryColor)
  // 2.获取当前element-plus的默认样式表，并把需要进行替换的色值打上标记
  let cssText = await getOriginalStyle()
  // console.log(cssText)
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

export const themeTypes = {
  light: {
    'color-scheme': 'light',
    '--el-color-white': '#ffffff',
    '--el-color-black': '#000000',
    '--el-color-primary': '#409eff',
    '--el-color-primary-light-3': '#79bbff',
    '--el-color-primary-light-5': '#a0cfff',
    '--el-color-primary-light-7': '#c6e2ff',
    '--el-color-primary-light-8': '#d9ecff',
    '--el-color-primary-light-9': '#ecf5ff',
    '--el-color-primary-dark-2': '#337ecc',
    '--el-color-success': '#67c23a',
    '--el-color-success-light-3': '#95d475',
    '--el-color-success-light-5': '#b3e19d',
    '--el-color-success-light-7': '#d1edc4',
    '--el-color-success-light-8': '#e1f3d8',
    '--el-color-success-light-9': '#f0f9eb',
    '--el-color-success-dark-2': '#529b2e',
    '--el-color-warning': '#e6a23c',
    '--el-color-warning-light-3': '#eebe77',
    '--el-color-warning-light-5': '#f3d19e',
    '--el-color-warning-light-7': '#f8e3c5',
    '--el-color-warning-light-8': '#faecd8',
    '--el-color-warning-light-9': '#fdf6ec',
    '--el-color-warning-dark-2': '#b88230',
    '--el-color-danger': '#f56c6c',
    '--el-color-danger-light-3': '#f89898',
    '--el-color-danger-light-5': '#fab6b6',
    '--el-color-danger-light-7': '#fcd3d3',
    '--el-color-danger-light-8': '#fde2e2',
    '--el-color-danger-light-9': '#fef0f0',
    '--el-color-danger-dark-2': '#c45656',
    '--el-color-error': '#f56c6c',
    '--el-color-error-light-3': '#f89898',
    '--el-color-error-light-5': '#fab6b6',
    '--el-color-error-light-7': '#fcd3d3',
    '--el-color-error-light-8': '#fde2e2',
    '--el-color-error-light-9': '#fef0f0',
    '--el-color-error-dark-2': '#c45656',
    '--el-color-info': '#909399',
    '--el-color-info-light-3': '#b1b3b8',
    '--el-color-info-light-5': '#c8c9cc',
    '--el-color-info-light-7': '#dedfe0',
    '--el-color-info-light-8': '#e9e9eb',
    '--el-color-info-light-9': '#f4f4f5',
    '--el-color-info-dark-2': '#73767a',
    '--el-bg-color': '#ffffff',
    '--el-bg-color-page': '#f2f3f5',
    '--el-bg-color-overlay': '#ffffff',
    '--el-bg-color-hover': '#f0f0f0',
    '--el-text-color-primary': '#303133',
    '--el-text-color-regular': '#606266',
    '--el-text-color-secondary': '#909399',
    '--el-text-color-placeholder': '#a8abb2',
    '--el-text-color-disabled': '#c0c4cc',
    '--el-border-color': '#dcdfe6',
    '--el-border-color-light': '#e4e7ed',
    '--el-border-color-lighter': '#ebeef5',
    '--el-border-color-extra-light': '#f2f6fc',
    '--el-border-color-dark': '#d4d7de',
    '--el-border-color-darker': '#cdd0d6',
    '--el-fill-color': '#f0f2f5',
    '--el-fill-color-light': '#f5f7fa',
    '--el-fill-color-lighter': '#fafafa',
    '--el-fill-color-extra-light': '#fafcff',
    '--el-fill-color-dark': '#ebedf0',
    '--el-fill-color-darker': '#e6e8eb',
    '--el-fill-color-blank': '#ffffff',
    '--el-box-shadow':
      '0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08)',
    '--el-box-shadow-light': '0px 0px 12px rgba(0, 0, 0, .12)',
    '--el-box-shadow-lighter': '0px 0px 6px rgba(0, 0, 0, .12)',
    '--el-box-shadow-dark':
      '0px 16px 48px 16px rgba(0, 0, 0, .08), 0px 12px 32px rgba(0, 0, 0, .12), 0px 8px 16px -8px rgba(0, 0, 0, .16)',
    '--el-disabled-bg-color': 'var(--el-fill-color-light)',
    '--el-disabled-text-color': 'var(--el-text-color-placeholder)',
    '--el-disabled-border-color': 'var(--el-border-color-light)',
    '--el-overlay-color': 'rgba(0, 0, 0, .8)',
    '--el-overlay-color-light': 'rgba(0, 0, 0, .7)',
    '--el-overlay-color-lighter': 'rgba(0, 0, 0, .5)',
    '--el-mask-color': 'rgba(255, 255, 255, .9)',
    '--el-mask-color-extra-light': 'rgba(255, 255, 255, .3)',
    '--el-border-width': '1px',
    '--el-border-style': 'solid',
    '--el-border-color-hover': 'var(--el-text-color-disabled)',
    '--el-border':
      'var(--el-border-width) var(--el-border-style) var(--el-border-color)',
    '--el-svg-monochrome-grey': 'var(--el-border-color)'
  },
  dark: {
    'color-scheme': 'dark',
    '--el-color-white': '#1B3651', // 基础浅色
    '--el-color-black': '#012447', // 基础深色
    '--el-color-primary': '#409eff',
    '--el-color-primary-light-3': '#79bbff',
    '--el-color-primary-light-5': '#a0cfff',
    '--el-color-primary-light-7': '#c6e2ff',
    '--el-color-primary-light-8': '#d9ecff',
    '--el-color-primary-light-9': '#ecf5ff',
    '--el-color-primary-dark-2': '#337ecc',
    '--el-color-success': '#67c23a',
    '--el-color-success-light-3': '#95d475',
    '--el-color-success-light-5': '#b3e19d',
    '--el-color-success-light-7': '#d1edc4',
    '--el-color-success-light-8': '#e1f3d8',
    '--el-color-success-light-9': '#f0f9eb',
    '--el-color-success-dark-2': '#529b2e',
    '--el-color-warning': '#e6a23c',
    '--el-color-warning-light-3': '#eebe77',
    '--el-color-warning-light-5': '#f3d19e',
    '--el-color-warning-light-7': '#f8e3c5',
    '--el-color-warning-light-8': '#faecd8',
    '--el-color-warning-light-9': '#fdf6ec',
    '--el-color-warning-dark-2': '#b88230',
    '--el-color-danger': '#f56c6c',
    '--el-color-danger-light-3': '#f89898',
    '--el-color-danger-light-5': '#fab6b6',
    '--el-color-danger-light-7': '#fcd3d3',
    '--el-color-danger-light-8': '#fde2e2',
    '--el-color-danger-light-9': '#fef0f0',
    '--el-color-danger-dark-2': '#c45656',
    '--el-color-error': '#f56c6c',
    '--el-color-error-light-3': '#f89898',
    '--el-color-error-light-5': '#fab6b6',
    '--el-color-error-light-7': '#fcd3d3',
    '--el-color-error-light-8': '#fde2e2',
    '--el-color-error-light-9': '#fef0f0',
    '--el-color-error-dark-2': '#c45656',
    '--el-color-info': '#909399',
    '--el-color-info-light-3': '#b1b3b8',
    '--el-color-info-light-5': '#c8c9cc',
    '--el-color-info-light-7': '#dedfe0',
    '--el-color-info-light-8': '#e9e9eb',
    '--el-color-info-light-9': '#f4f4f5',
    '--el-color-info-dark-2': '#73767a',
    '--el-bg-color': '#1B3651',
    '--el-bg-color-page': '#1B3651',
    '--el-bg-color-overlay': '#1B3651',
    '--el-bg-color-hover': 'rgba(255,255,255,8%)',
    '--el-text-color-primary': '#FFFFFF', // 主要文字颜色
    '--el-text-color-regular': '#FFFFFF', // 常规文字颜色
    '--el-text-color-placeholder': '#c0c4cc', // 占位文字颜色
    '--el-text-color-secondary': '#FFFFFF', // 次要文字颜色
    '--el-text-color-disabled': '#c0c4cc',
    '--el-border-color': '#388DE0',
    '--el-border-color-light': '#388DE0', // 二级边框颜色
    '--el-border-color-lighter': '#58A9F5', // 三级边框颜色
    '--el-border-color-extra-light': '#86B3F9', // 四级边框颜色
    '--el-border-color-dark': '#d4d7de',
    '--el-border-color-darker': '#cdd0d6',
    '--el-fill-color': '#012447',
    '--el-fill-color-light': '#1B3651',
    '--el-fill-color-lighter': '#1B3651',
    '--el-fill-color-extra-light': '#1B3651',
    '--el-fill-color-dark': '#1B3651',
    '--el-fill-color-darker': '#1B3651',
    '--el-fill-color-blank': '#1B3651',
    '--el-box-shadow':
      '0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08)',
    '--el-box-shadow-light': '0px 0px 12px rgba(0, 0, 0, .12)',
    '--el-box-shadow-lighter': '0px 0px 6px rgba(0, 0, 0, .12)',
    '--el-box-shadow-dark':
      '0px 16px 48px 16px rgba(0, 0, 0, .08), 0px 12px 32px rgba(0, 0, 0, .12), 0px 8px 16px -8px rgba(0, 0, 0, .16)',
    '--el-disabled-bg-color': 'var(--el-fill-color-light)',
    '--el-disabled-text-color': 'var(--el-text-color-placeholder)',
    '--el-disabled-border-color': 'var(--el-border-color-light)',
    '--el-overlay-color': 'rgba(0, 0, 0, .8)',
    '--el-overlay-color-light': 'rgba(0, 0, 0, .7)',
    '--el-overlay-color-lighter': 'rgba(0, 0, 0, .5)',
    '--el-mask-color': 'rgba(255, 255, 255, .9)',
    '--el-mask-color-extra-light': 'rgba(255, 255, 255, .3)',
    '--el-border-width': '1px',
    '--el-border-style': 'solid',
    '--el-border-color-hover': 'var(--el-text-color-disabled)',
    '--el-border':
      'var(--el-border-width) var(--el-border-style) var(--el-border-color)',
    '--el-svg-monochrome-grey': 'var(--el-border-color)'
  }
}
