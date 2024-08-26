"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOnName = getOnName;
exports.getSlotVNs = getSlotVNs;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function getOnName(type) {
  return 'on' + type.substring(0, 1).toLocaleUpperCase() + type.substring(1);
}
function getSlotVNs(vns) {
  if (_xeUtils.default.isArray(vns)) {
    return vns;
  }
  return [vns];
}