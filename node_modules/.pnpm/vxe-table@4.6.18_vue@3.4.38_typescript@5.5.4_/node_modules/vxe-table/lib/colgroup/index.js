"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeColgroup = exports.Colgroup = void 0;
var _group = _interopRequireDefault(require("../table/src/group"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeColgroup = exports.VxeColgroup = Object.assign(_group.default, {
  install(app) {
    app.component(_group.default.name, _group.default);
    // 兼容旧用法
    app.component('VxeTableColgroup', _group.default);
  }
});
const Colgroup = exports.Colgroup = VxeColgroup;
_dynamics.dynamicApp.component(_group.default.name, _group.default);
// 兼容旧用法
_dynamics.dynamicApp.component('VxeTableColgroup', _group.default);
var _default = exports.default = VxeColgroup;