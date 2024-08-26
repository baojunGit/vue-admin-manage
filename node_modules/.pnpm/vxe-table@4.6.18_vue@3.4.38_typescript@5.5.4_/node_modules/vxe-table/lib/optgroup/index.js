"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeOptgroup = exports.Optgroup = void 0;
var _optgroup = _interopRequireDefault(require("../select/src/optgroup"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeOptgroup = exports.VxeOptgroup = Object.assign(_optgroup.default, {
  install: function (app) {
    app.component(_optgroup.default.name, _optgroup.default);
  }
});
const Optgroup = exports.Optgroup = VxeOptgroup;
_dynamics.dynamicApp.component(_optgroup.default.name, _optgroup.default);
var _default = exports.default = VxeOptgroup;