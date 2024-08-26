"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeList = exports.List = void 0;
var _list = _interopRequireDefault(require("./src/list"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeList = exports.VxeList = Object.assign(_list.default, {
  install(app) {
    app.component(_list.default.name, _list.default);
  }
});
const List = exports.List = VxeList;
_dynamics.dynamicApp.component(_list.default.name, _list.default);
var _default = exports.default = VxeList;