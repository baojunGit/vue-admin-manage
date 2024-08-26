"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeGrid = exports.Grid = void 0;
var _grid = _interopRequireDefault(require("./src/grid"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeGrid = exports.VxeGrid = Object.assign(_grid.default, {
  install(app) {
    app.component(_grid.default.name, _grid.default);
  }
});
const Grid = exports.Grid = VxeGrid;
_dynamics.dynamicApp.component(_grid.default.name, _grid.default);
var _default = exports.default = VxeGrid;