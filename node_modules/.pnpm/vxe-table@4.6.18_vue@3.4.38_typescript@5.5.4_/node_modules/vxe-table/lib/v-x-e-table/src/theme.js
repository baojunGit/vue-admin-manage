"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTheme = getTheme;
exports.setTheme = setTheme;
var _conf = _interopRequireDefault(require("./conf"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function setTheme(name) {
  let theme = name || _conf.default.theme;
  if (!theme || theme === 'default') {
    theme = 'light';
  }
  _conf.default.theme = theme;
  if (typeof document !== 'undefined') {
    const documentElement = document.documentElement;
    if (documentElement) {
      documentElement.setAttribute('data-vxe-ui-theme', theme);
    }
  }
}
function getTheme() {
  return _conf.default.theme;
}