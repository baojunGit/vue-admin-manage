"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeToolbar = exports.Toolbar = void 0;
var _toolbar = _interopRequireDefault(require("./src/toolbar"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeToolbar = exports.VxeToolbar = Object.assign(_toolbar.default, {
  install: function (app) {
    app.component(_toolbar.default.name, _toolbar.default);
  }
});
const Toolbar = exports.Toolbar = VxeToolbar;
_dynamics.dynamicApp.component(_toolbar.default.name, _toolbar.default);
var _default = exports.default = VxeToolbar;