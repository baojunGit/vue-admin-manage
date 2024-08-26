"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTooltip = exports.Tooltip = void 0;
var _vXETable = require("../v-x-e-table");
var _tooltip = _interopRequireDefault(require("./src/tooltip"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTooltip = exports.VxeTooltip = Object.assign(_tooltip.default, {
  install: function (app) {
    _vXETable.VXETable.tooltip = true;
    app.component(_tooltip.default.name, _tooltip.default);
  }
});
const Tooltip = exports.Tooltip = VxeTooltip;
_dynamics.dynamicApp.component(_tooltip.default.name, _tooltip.default);
var _default = exports.default = VxeTooltip;