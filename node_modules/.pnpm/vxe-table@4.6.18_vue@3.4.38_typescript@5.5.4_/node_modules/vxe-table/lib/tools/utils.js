"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eqEmptyValue = eqEmptyValue;
exports.formatText = formatText;
exports.getFuncText = getFuncText;
exports.getLastZIndex = getLastZIndex;
exports.hasChildrenList = hasChildrenList;
exports.isEmptyValue = isEmptyValue;
exports.isEnableConf = isEnableConf;
exports.nextZIndex = nextZIndex;
exports.parseFile = parseFile;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _conf = _interopRequireDefault(require("../v-x-e-table/src/conf"));
var _domZindex = _interopRequireDefault(require("dom-zindex"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function isEnableConf(conf) {
  return conf && conf.enabled !== false;
}
function isEmptyValue(cellValue) {
  return cellValue === null || cellValue === undefined || cellValue === '';
}
function parseFile(file) {
  const name = file.name;
  const tIndex = _xeUtils.default.lastIndexOf(name, '.');
  const type = name.substring(tIndex + 1, name.length).toLowerCase();
  const filename = name.substring(0, tIndex);
  return {
    filename,
    type
  };
}
function nextZIndex() {
  return _domZindex.default.getNext();
}
function getLastZIndex() {
  return _domZindex.default.getCurrent();
}
function hasChildrenList(item) {
  return item && item.children && item.children.length > 0;
}
function getFuncText(content) {
  return content ? _xeUtils.default.toValueString(_conf.default.translate ? _conf.default.translate('' + content) : content) : '';
}
function formatText(value, placeholder) {
  return '' + (isEmptyValue(value) ? placeholder ? _conf.default.emptyCell : '' : value);
}
/**
 * 判断值为：'' | null | undefined 时都属于空值
 */
function eqEmptyValue(cellValue) {
  return cellValue === '' || _xeUtils.default.eqNull(cellValue);
}