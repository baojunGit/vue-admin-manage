"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTableFilterModule = exports.Filter = void 0;
var _vXETable = require("../v-x-e-table");
var _panel = _interopRequireDefault(require("./src/panel"));
var _hook = _interopRequireDefault(require("./src/hook"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTableFilterModule = exports.VxeTableFilterModule = {
  Panel: _panel.default,
  install(app) {
    _vXETable.VXETable.hooks.add('$tableFilter', _hook.default);
    app.component(_panel.default.name, _panel.default);
  }
};
const Filter = exports.Filter = VxeTableFilterModule;
_dynamics.dynamicApp.component(_panel.default.name, _panel.default);
var _default = exports.default = VxeTableFilterModule;