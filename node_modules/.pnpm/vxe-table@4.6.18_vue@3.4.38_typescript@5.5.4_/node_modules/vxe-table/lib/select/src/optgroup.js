"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _util = require("./util");
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeOptgroup',
  props: {
    label: {
      type: [String, Number, Boolean],
      default: ''
    },
    visible: {
      type: Boolean,
      default: null
    },
    className: [String, Function],
    disabled: Boolean
  },
  setup(props, {
    slots
  }) {
    const elem = (0, _vue.ref)();
    const $xeselect = (0, _vue.inject)('$xeselect', {});
    const option = (0, _util.createOption)($xeselect, props);
    const xeoption = {
      option
    };
    option.options = [];
    (0, _vue.provide)('xeoptgroup', xeoption);
    (0, _util.watchOption)(props, option);
    (0, _vue.onMounted)(() => {
      (0, _util.assemOption)($xeselect, elem.value, option);
    });
    (0, _vue.onUnmounted)(() => {
      (0, _util.destroyOption)($xeselect, option);
    });
    return () => {
      return (0, _vue.h)('div', {
        ref: elem
      }, slots.default ? slots.default() : []);
    };
  }
});