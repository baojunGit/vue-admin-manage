"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTableMenuModule = exports.Menu = void 0;
var _vXETable = require("../v-x-e-table");
var _panel = _interopRequireDefault(require("./src/panel"));
var _hooks = _interopRequireDefault(require("./src/hooks"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTableMenuModule = exports.VxeTableMenuModule = {
  Panel: _panel.default,
  install(app) {
    _vXETable.VXETable.hooks.add('$tableMenu', _hooks.default);
    app.component(_panel.default.name, _panel.default);
  }
};
const Menu = exports.Menu = VxeTableMenuModule;
_dynamics.dynamicApp.component(_panel.default.name, _panel.default);
var _default = exports.default = VxeTableMenuModule;