"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeFormGather = exports.FormGather = void 0;
var _formGather = _interopRequireDefault(require("../form/src/form-gather"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeFormGather = exports.VxeFormGather = Object.assign(_formGather.default, {
  install(app) {
    app.component(_formGather.default.name, _formGather.default);
  }
});
const FormGather = exports.FormGather = VxeFormGather;
_dynamics.dynamicApp.component(_formGather.default.name, _formGather.default);
var _default = exports.default = VxeFormGather;