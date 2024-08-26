"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assemOption = assemOption;
exports.createOption = createOption;
exports.destroyOption = destroyOption;
exports.isOption = isOption;
exports.watchOption = watchOption;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _optionInfo = require("./optionInfo");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function isOption(option) {
  return option instanceof _optionInfo.OptionInfo;
}
function createOption($xeselect, _vm) {
  return isOption(_vm) ? _vm : new _optionInfo.OptionInfo($xeselect, _vm);
}
function watchOption(props, option) {
  Object.keys(props).forEach(name => {
    (0, _vue.watch)(() => props[name], value => {
      option.update(name, value);
    });
  });
}
function assemOption($xeselect, el, option, optgroup) {
  const {
    reactData
  } = $xeselect;
  const {
    staticOptions
  } = reactData;
  const parentElem = el.parentNode;
  const parentOption = optgroup ? optgroup.option : null;
  const parentCols = parentOption ? parentOption.options : staticOptions;
  if (parentElem && parentCols) {
    parentCols.splice(_xeUtils.default.arrayIndexOf(parentElem.children, el), 0, option);
    reactData.staticOptions = staticOptions.slice(0);
  }
}
function destroyOption($xeselect, option) {
  const {
    reactData
  } = $xeselect;
  const {
    staticOptions
  } = reactData;
  const matchObj = _xeUtils.default.findTree(staticOptions, item => item.id === option.id, {
    children: 'options'
  });
  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1);
  }
  reactData.staticOptions = staticOptions.slice(0);
}