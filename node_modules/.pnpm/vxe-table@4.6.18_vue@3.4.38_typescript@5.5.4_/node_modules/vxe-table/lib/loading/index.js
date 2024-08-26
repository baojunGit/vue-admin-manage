"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeLoading = exports.Loading = void 0;
var _loading = _interopRequireDefault(require("./src/loading"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeLoading = exports.VxeLoading = Object.assign(_loading.default, {
  install(app) {
    app.component(_loading.default.name, _loading.default);
  }
});
const Loading = exports.Loading = VxeLoading;
var _default = exports.default = VxeLoading;