"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderTitle = renderTitle;
var _vue = require("vue");
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _tooltip = _interopRequireDefault(require("../../tooltip"));
var _vXETable = require("../../v-x-e-table");
var _utils = require("../../tools/utils");
var _vn = require("../../tools/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function renderPrefixIcon(titlePrefix) {
  return (0, _vue.h)('span', {
    class: 'vxe-form--item-title-prefix'
  }, [(0, _vue.h)('i', {
    class: titlePrefix.icon || _conf.default.icon.FORM_PREFIX
  })]);
}
function renderSuffixIcon(titleSuffix) {
  return (0, _vue.h)('span', {
    class: 'vxe-form--item-title-suffix'
  }, [(0, _vue.h)('i', {
    class: titleSuffix.icon || _conf.default.icon.FORM_SUFFIX
  })]);
}
function renderTitle($xeform, item) {
  const {
    data
  } = $xeform.props;
  const {
    computeTooltipOpts
  } = $xeform.getComputeMaps();
  const {
    slots,
    field,
    itemRender,
    titlePrefix,
    titleSuffix
  } = item;
  const tooltipOpts = computeTooltipOpts.value;
  const compConf = (0, _utils.isEnableConf)(itemRender) ? _vXETable.VXETable.renderer.get(itemRender.name) : null;
  const params = {
    data,
    field,
    property: field,
    item,
    $form: $xeform,
    $grid: $xeform.xegrid
  };
  const titleSlot = slots ? slots.title : null;
  const contVNs = [];
  const titVNs = [];
  if (titlePrefix) {
    titVNs.push(titlePrefix.content || titlePrefix.message ? (0, _vue.h)(_tooltip.default, Object.assign(Object.assign(Object.assign({}, tooltipOpts), titlePrefix), {
      content: (0, _utils.getFuncText)(titlePrefix.content || titlePrefix.message)
    }), {
      default: () => renderPrefixIcon(titlePrefix)
    }) : renderPrefixIcon(titlePrefix));
  }
  titVNs.push((0, _vue.h)('span', {
    class: 'vxe-form--item-title-label'
  }, compConf && compConf.renderItemTitle ? (0, _vn.getSlotVNs)(compConf.renderItemTitle(itemRender, params)) : titleSlot ? $xeform.callSlot(titleSlot, params) : (0, _utils.getFuncText)(item.title)));
  contVNs.push((0, _vue.h)('div', {
    class: 'vxe-form--item-title-content'
  }, titVNs));
  const fixVNs = [];
  if (titleSuffix) {
    fixVNs.push(titleSuffix.content || titleSuffix.message ? (0, _vue.h)(_tooltip.default, Object.assign(Object.assign(Object.assign({}, tooltipOpts), titleSuffix), {
      content: (0, _utils.getFuncText)(titleSuffix.content || titleSuffix.message)
    }), {
      default: () => renderSuffixIcon(titleSuffix)
    }) : renderSuffixIcon(titleSuffix));
  }
  contVNs.push((0, _vue.h)('div', {
    class: 'vxe-form--item-title-postfix'
  }, fixVNs));
  return contVNs;
}