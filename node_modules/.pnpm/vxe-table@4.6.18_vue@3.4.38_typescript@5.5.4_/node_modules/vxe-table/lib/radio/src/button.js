"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _utils = require("../../tools/utils");
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _size = require("../../hooks/size");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeRadioButton',
  props: {
    modelValue: [String, Number, Boolean],
    label: {
      type: [String, Number, Boolean],
      default: null
    },
    title: [String, Number],
    content: [String, Number],
    disabled: Boolean,
    strict: {
      type: Boolean,
      default: () => _conf.default.radioButton.strict
    },
    size: {
      type: String,
      default: () => _conf.default.radioButton.size || _conf.default.size
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
    const computeSize = (0, _size.useSize)(props);
    const $xeradiobutton = {
      xID,
      props,
      context
    };
    let radioButtonMethods = {};
    const $xeradiogroup = (0, _vue.inject)('$xeradiogroup', null);
    const computeDisabled = (0, _vue.computed)(() => {
      return props.disabled || $xeradiogroup && $xeradiogroup.props.disabled;
    });
    const computeName = (0, _vue.computed)(() => {
      return $xeradiogroup ? $xeradiogroup.name : null;
    });
    const computeStrict = (0, _vue.computed)(() => {
      return $xeradiogroup ? $xeradiogroup.props.strict : props.strict;
    });
    const computeChecked = (0, _vue.computed)(() => {
      const {
        modelValue,
        label
      } = props;
      return $xeradiogroup ? $xeradiogroup.props.modelValue === label : modelValue === label;
    });
    radioButtonMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, Object.assign({
          $radioButton: $xeradiobutton,
          $event: evnt
        }, params));
      }
    };
    Object.assign($xeradiobutton, radioButtonMethods);
    const handleValue = (label, evnt) => {
      if ($xeradiogroup) {
        $xeradiogroup.handleChecked({
          label
        }, evnt);
      } else {
        emit('update:modelValue', label);
        radioButtonMethods.dispatchEvent('change', {
          label
        }, evnt);
        // 自动更新校验状态
        if ($xeform && $xeformiteminfo) {
          $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, label);
        }
      }
    };
    const changeEvent = evnt => {
      const isDisabled = computeDisabled.value;
      if (!isDisabled) {
        handleValue(props.label, evnt);
      }
    };
    const clickEvent = evnt => {
      const isDisabled = computeDisabled.value;
      const isStrict = computeStrict.value;
      if (!isDisabled && !isStrict) {
        if (props.label === ($xeradiogroup ? $xeradiogroup.props.modelValue : props.modelValue)) {
          handleValue(null, evnt);
        }
      }
    };
    const renderVN = () => {
      const vSize = computeSize.value;
      const isDisabled = computeDisabled.value;
      const name = computeName.value;
      const checked = computeChecked.value;
      return (0, _vue.h)('label', {
        class: ['vxe-radio', 'vxe-radio-button', {
          [`size--${vSize}`]: vSize,
          'is--disabled': isDisabled
        }],
        title: props.title
      }, [(0, _vue.h)('input', {
        class: 'vxe-radio--input',
        type: 'radio',
        name,
        checked,
        disabled: isDisabled,
        onChange: changeEvent,
        onClick: clickEvent
      }), (0, _vue.h)('span', {
        class: 'vxe-radio--label'
      }, slots.default ? slots.default({}) : (0, _utils.getFuncText)(props.content))]);
    };
    Object.assign($xeradiobutton, {
      renderVN,
      dispatchEvent
    });
    return renderVN;
  }
});