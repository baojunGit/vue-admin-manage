"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxePager = exports.Pager = void 0;
var _pager = _interopRequireDefault(require("./src/pager"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxePager = exports.VxePager = Object.assign(_pager.default, {
  install: function (app) {
    app.component(_pager.default.name, _pager.default);
  }
});
const Pager = exports.Pager = VxePager;
_dynamics.dynamicApp.component(_pager.default.name, _pager.default);
var _default = exports.default = VxePager;