// Vue3.x推荐使用mitt.js进行组件间通信
import mitt from 'mitt'
// Lodash是一个意在提高开发者效率,提高JS原生方法性能的JS库
/**
 * @description _.toArray(value) 转换value为一个数组
 * @description _.head(array) 返回数组array的第一个元素
 */
import _ from 'lodash'

// export function setup(app) {
//   const _emitter = mitt()
//   // vue3.x的全局实例，要挂载在config.globalProperties上
//   app.config.globalProperties.$pub = (...args) => {
//     _emitter.emit(_.head(args), args.slice(1))
//   }
//   app.config.globalProperties.$sub = function () {
//     /**
//      * @description Javascrip中每个函数都会有一个Arguments对象实例arguments，
//      * 它引用着函数的实参，可以用数组下标的方式"[]"引用arguments的元素。
//      * arguments.length为函数实参个数，arguments.callee引用函数自身。
//      * arguments不能用于箭头函数，箭头函数会把它转化成一个普通的变量
//      */
//     Reflect.apply(_emitter.on, _emitter, _.toArray(arguments))
//   }
//   app.config.globalProperties.$unsub = function () {
//     Reflect.apply(_emitter.off, _emitter, _.toArray(arguments))
//   }
// }

export function setup(app) {
  const _emitter = mitt()
  // vue3.x的全局实例，要挂载在config.globalProperties上
  app.config.globalProperties.$pub = (...args) => {
    _emitter.emit(_.head(args), args.slice(1))
  }
  /**
   * @description ES6中引入了一个新功能 — Rest数组参数来代替arguments对象参数
   */
  app.config.globalProperties.$sub = (...rest) => {
    Reflect.apply(_emitter.on, _emitter, _.toArray(rest))
  }
  app.config.globalProperties.$unsub = (...rest) => {
    Reflect.apply(_emitter.off, _emitter, _.toArray(rest))
  }
}

/**
 * @description ES6 新增了一个全局、内建、不可构造的 Reflect 对象
 * 1.其下有一系列操作方法。其中一个便是 Reflect.apply()
 * 2.Reflect.apply()方法是JavaScript中的标准build-in对象，该对象用于使用指定的参数调用函数
 * 3.Reflect.apply(target, thisArgument, argumentsList)
 * @target 此参数是将要调用的目标函数
 * @thisArgument 此参数具有this调用目标函数所需的值
 * @argumentsList 此参数是一个array-like对象，用于指定应调用目标的参数
 * @returns 调用给定的Target函数导致指定的this值和参数
 * 4.要求所有参数都必传，如果希望不传参数给被调用的函数，则必须填一个空数组或者空的类数组对象
 * 5.Vue3 也在其响应式系统中大量使用 Reflect
 *
 */
