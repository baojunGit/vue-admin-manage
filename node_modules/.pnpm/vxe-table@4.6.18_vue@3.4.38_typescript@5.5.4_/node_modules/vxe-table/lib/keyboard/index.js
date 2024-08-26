"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTableKeyboardModule = exports.Keyboard = void 0;
var _hook = _interopRequireDefault(require("./src/hook"));
var _vXETable = require("../v-x-e-table");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTableKeyboardModule = exports.VxeTableKeyboardModule = {
  install() {
    _vXETable.VXETable.hooks.add('$tableKeyboard', _hook.default);
  }
};
const Keyboard = exports.Keyboard = VxeTableKeyboardModule;
var _default = exports.default = VxeTableKeyboardModule;