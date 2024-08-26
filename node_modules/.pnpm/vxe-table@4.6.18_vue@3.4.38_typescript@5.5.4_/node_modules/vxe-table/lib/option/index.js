"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeOption = exports.Option = void 0;
var _option = _interopRequireDefault(require("../select/src/option"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeOption = exports.VxeOption = Object.assign(_option.default, {
  install: function (app) {
    app.component(_option.default.name, _option.default);
  }
});
const Option = exports.Option = VxeOption;
_dynamics.dynamicApp.component(_option.default.name, _option.default);
var _default = exports.default = VxeOption;