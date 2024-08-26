"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeButton = exports.Button = void 0;
var _button = _interopRequireDefault(require("./src/button"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeButton = exports.VxeButton = Object.assign(_button.default, {
  install(app) {
    app.component(_button.default.name, _button.default);
  }
});
const Button = exports.Button = VxeButton;
_dynamics.dynamicApp.component(_button.default.name, _button.default);
var _default = exports.default = VxeButton;