"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeColumn = exports.Column = void 0;
var _column = _interopRequireDefault(require("../table/src/column"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeColumn = exports.VxeColumn = Object.assign(_column.default, {
  install(app) {
    app.component(_column.default.name, _column.default);
    // 兼容旧用法
    app.component('VxeTableColumn', _column.default);
  }
});
const Column = exports.Column = VxeColumn;
_dynamics.dynamicApp.component(_column.default.name, _column.default);
// 兼容旧用法
_dynamics.dynamicApp.component('VxeTableColumn', _column.default);
var _default = exports.default = VxeColumn;