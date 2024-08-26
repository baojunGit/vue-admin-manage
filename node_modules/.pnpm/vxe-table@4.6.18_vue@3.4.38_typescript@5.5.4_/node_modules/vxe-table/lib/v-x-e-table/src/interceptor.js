"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interceptor = void 0;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _log = require("../../tools/log");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const storeMap = {};
const interceptor = exports.interceptor = {
  mixin(options) {
    _xeUtils.default.each(options, (callback, type) => interceptor.add(type, callback));
    return interceptor;
  },
  get(type) {
    return storeMap[type] || [];
  },
  add(type, callback) {
    // 检测类型
    if (process.env.NODE_ENV === 'development') {
      const eventTypes = ['created', 'mounted', 'activated', 'beforeUnmount', 'unmounted', 'event.clearEdit', 'event.clearActived', 'event.clearFilter', 'event.clearAreas', 'event.showMenu', 'event.keydown', 'event.export', 'event.import'];
      if (eventTypes.indexOf(type) === -1) {
        (0, _log.warnLog)('vxe.error.errProp', [`Interceptor.${type}`, eventTypes.join('|')]);
      }
    }
    if (callback) {
      let eList = storeMap[type];
      if (!eList) {
        eList = storeMap[type] = [];
      }
      // 检测重复
      if (process.env.NODE_ENV === 'development') {
        if (eList.indexOf(callback) > -1) {
          (0, _log.warnLog)('vxe.error.coverProp', ['Interceptor', type]);
        }
      }
      eList.push(callback);
    }
    return interceptor;
  },
  delete(type, callback) {
    const eList = storeMap[type];
    if (eList) {
      if (callback) {
        _xeUtils.default.remove(eList, fn => fn === callback);
      } else {
        delete storeMap[type];
      }
    }
  }
};