"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTableEditModule = exports.Edit = void 0;
var _hook = _interopRequireDefault(require("./src/hook"));
var _vXETable = require("../v-x-e-table");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTableEditModule = exports.VxeTableEditModule = {
  install() {
    _vXETable.VXETable.hooks.add('$tableEdit', _hook.default);
  }
};
const Edit = exports.Edit = VxeTableEditModule;
var _default = exports.default = VxeTableEditModule;