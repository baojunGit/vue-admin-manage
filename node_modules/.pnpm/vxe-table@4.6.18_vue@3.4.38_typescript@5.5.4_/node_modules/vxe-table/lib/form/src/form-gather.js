"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _util = require("./util");
var _formItem = require("./form-item");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeFormGather',
  props: _formItem.formItemProps,
  setup(props, {
    slots
  }) {
    const refElem = (0, _vue.ref)();
    const $xeform = (0, _vue.inject)('$xeform', {});
    const formGather = (0, _vue.inject)('$xeformgather', null);
    const formItem = (0, _vue.reactive)((0, _util.createItem)($xeform, props));
    const xeformitem = {
      formItem
    };
    const xeformiteminfo = {
      itemConfig: formItem
    };
    formItem.children = [];
    (0, _vue.provide)('$xeformiteminfo', xeformiteminfo);
    (0, _vue.provide)('$xeformgather', xeformitem);
    (0, _vue.provide)('$xeformitem', null);
    (0, _util.watchItem)(props, formItem);
    (0, _vue.onMounted)(() => {
      (0, _util.assemItem)($xeform, refElem.value, formItem, formGather);
    });
    (0, _vue.onUnmounted)(() => {
      (0, _util.destroyItem)($xeform, formItem);
    });
    const renderVN = () => {
      const {
        className,
        field
      } = props;
      const span = props.span || ($xeform ? $xeform.props.span : null);
      const defaultSlot = slots.default;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-form--gather vxe-form--item-row', formItem.id, span ? `vxe-form--item-col_${span} is--span` : '', className ? _xeUtils.default.isFunction(className) ? className({
          $form: $xeform,
          data: $xeform ? $xeform.props.data : {},
          item: formItem,
          field: field,
          property: field
        }) : className : '']
      }, defaultSlot ? defaultSlot() : []);
    };
    const $xeformgather = {
      renderVN
    };
    return $xeformgather;
  },
  render() {
    return this.renderVN();
  }
});