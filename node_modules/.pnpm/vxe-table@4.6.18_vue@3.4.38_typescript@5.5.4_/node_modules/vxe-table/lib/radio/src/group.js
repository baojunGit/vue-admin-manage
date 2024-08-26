"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _radio = _interopRequireDefault(require("./radio"));
var _button = _interopRequireDefault(require("./button"));
var _size = require("../../hooks/size");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeRadioGroup',
  props: {
    modelValue: [String, Number, Boolean],
    disabled: Boolean,
    type: String,
    options: Array,
    optionProps: Object,
    strict: {
      type: Boolean,
      default: () => _conf.default.radioGroup.strict
    },
    size: {
      type: String,
      default: () => _conf.default.radioGroup.size || _conf.default.size
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const $xeform = (0, _vue.inject)('$xeform', null);
    const $xeformiteminfo = (0, _vue.inject)('$xeformiteminfo', null);
    const xID = _xeUtils.default.uniqueId();
    const $xeradiogroup = {
      xID,
      props,
      context,
      name: _xeUtils.default.uniqueId('xegroup_')
    };
    const computePropsOpts = (0, _vue.computed)(() => {
      return props.optionProps || {};
    });
    const computeLabelField = (0, _vue.computed)(() => {
      const propsOpts = computePropsOpts.value;
      return propsOpts.label || 'label';
    });
    const computeValueField = (0, _vue.computed)(() => {
      const propsOpts = computePropsOpts.value;
      return propsOpts.value || 'value';
    });
    const computeDisabledField = (0, _vue.computed)(() => {
      const propsOpts = computePropsOpts.value;
      return propsOpts.disabled || 'disabled';
    });
    let radioGroupMethods = {};
    (0, _size.useSize)(props);
    const radioGroupPrivateMethods = {
      handleChecked(params, evnt) {
        emit('update:modelValue', params.label);
        radioGroupMethods.dispatchEvent('change', params);
        // 自动更新校验状态
        if ($xeform && $xeformiteminfo) {
          $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, params.label);
        }
      }
    };
    radioGroupMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, Object.assign({
          $radioGroup: $xeradiogroup,
          $event: evnt
        }, params));
      }
    };
    const renderVN = () => {
      const {
        options,
        type
      } = props;
      const defaultSlot = slots.default;
      const valueField = computeValueField.value;
      const labelField = computeLabelField.value;
      const disabledField = computeDisabledField.value;
      const btnComp = type === 'button' ? _button.default : _radio.default;
      return (0, _vue.h)('div', {
        class: 'vxe-radio-group'
      }, defaultSlot ? defaultSlot({}) : options ? options.map(item => {
        return (0, _vue.h)(btnComp, {
          label: item[valueField],
          content: item[labelField],
          disabled: item[disabledField]
        });
      }) : []);
    };
    Object.assign($xeradiogroup, radioGroupPrivateMethods, {
      renderVN,
      dispatchEvent
    });
    (0, _vue.provide)('$xeradiogroup', $xeradiogroup);
    return renderVN;
  }
});