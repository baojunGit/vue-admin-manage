"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeButtonGroup = exports.ButtonGroup = void 0;
var _group = _interopRequireDefault(require("../button/src/group"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeButtonGroup = exports.VxeButtonGroup = Object.assign(_group.default, {
  install(app) {
    app.component(_group.default.name, _group.default);
  }
});
const ButtonGroup = exports.ButtonGroup = VxeButtonGroup;
_dynamics.dynamicApp.component(_group.default.name, _group.default);
var _default = exports.default = VxeButtonGroup;