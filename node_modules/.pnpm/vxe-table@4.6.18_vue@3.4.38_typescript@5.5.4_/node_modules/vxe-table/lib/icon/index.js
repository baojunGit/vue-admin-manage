"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeIcon = exports.Icon = void 0;
var _icon = _interopRequireDefault(require("./src/icon"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeIcon = exports.VxeIcon = Object.assign(_icon.default, {
  install(app) {
    app.component(_icon.default.name, _icon.default);
  }
});
const Icon = exports.Icon = VxeIcon;
_dynamics.dynamicApp.component(VxeIcon.name, VxeIcon);
var _default = exports.default = VxeIcon;