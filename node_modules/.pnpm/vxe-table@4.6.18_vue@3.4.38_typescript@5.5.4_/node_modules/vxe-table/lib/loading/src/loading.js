"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeLoading',
  props: {
    modelValue: Boolean,
    icon: String,
    text: String
  },
  setup(props, {
    slots
  }) {
    const computeLoadingIcon = (0, _vue.computed)(() => {
      return props.icon || _conf.default.icon.LOADING;
    });
    const computeLoadingText = (0, _vue.computed)(() => {
      const loadingText = _conf.default.loadingText;
      return props.text || (loadingText === null ? loadingText : _conf.default.i18n('vxe.loading.text'));
    });
    return () => {
      const loadingIcon = computeLoadingIcon.value;
      const loadingText = computeLoadingText.value;
      return (0, _vue.h)('div', {
        class: ['vxe-loading', {
          'is--visible': props.modelValue
        }]
      }, slots.default ? [(0, _vue.h)('div', {
        class: 'vxe-loading--wrapper'
      }, slots.default({}))] : [(0, _vue.h)('div', {
        class: 'vxe-loading--chunk'
      }, [loadingIcon ? (0, _vue.h)('i', {
        class: loadingIcon
      }) : (0, _vue.h)('div', {
        class: 'vxe-loading--spinner'
      }), loadingText ? (0, _vue.h)('div', {
        class: 'vxe-loading--text'
      }, `${loadingText}`) : null])]);
    };
  }
});