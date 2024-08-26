"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTableValidatorModule = exports.Validator = void 0;
var _hook = _interopRequireDefault(require("./src/hook"));
var _vXETable = require("../v-x-e-table");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTableValidatorModule = exports.VxeTableValidatorModule = {
  install() {
    _vXETable.VXETable.hooks.add('$tableValidator', _hook.default);
  }
};
const Validator = exports.Validator = VxeTableValidatorModule;
var _default = exports.default = VxeTableValidatorModule;