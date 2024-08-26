"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTable = exports.Table = void 0;
var _table = _interopRequireDefault(require("./src/table"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTable = exports.VxeTable = Object.assign(_table.default, {
  install: function (app) {
    app.component(_table.default.name, _table.default);
  }
});
const Table = exports.Table = VxeTable;
_dynamics.dynamicApp.component(_table.default.name, _table.default);
var _default = exports.default = VxeTable;