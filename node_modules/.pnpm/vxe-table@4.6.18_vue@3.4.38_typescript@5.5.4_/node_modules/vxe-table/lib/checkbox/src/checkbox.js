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
  name: 'VxeCheckbox',
  props: {
    modelValue: [String, Number, Boolean],
    label: {
      type: [String, Number],
      default: null
    },
    indeterminate: Boolean,
    title: [String, Number],
    checkedValue: {
      type: [String, Number, Boolean],
      default: true
    },
    uncheckedValue: {
      type: [String, Number, Boolean],
      default: false
    },
    content: [String, Number],
    disabled: Boolean,
    size: {
      type: String,
      default: () => _conf.default.checkbox.size || _conf.default.size
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
    const $xecheckbox = {
      xID,
      props,
      context
    };
    let checkboxMethods = {};
    const computeSize = (0, _size.useSize)(props);
    const $xecheckboxgroup = (0, _vue.inject)('$xecheckboxgroup', null);
    const computeIsChecked = (0, _vue.computed)(() => {
      if ($xecheckboxgroup) {
        return _xeUtils.default.includes($xecheckboxgroup.props.modelValue, props.label);
      }
      return props.modelValue === props.checkedValue;
    });
    const computeIsDisabled = (0, _vue.computed)(() => {
      if (props.disabled) {
        return true;
      }
      if ($xecheckboxgroup) {
        const {
          props: groupProps
        } = $xecheckboxgroup;
        const {
          computeIsMaximize
        } = $xecheckboxgroup.getComputeMaps();
        const isMaximize = computeIsMaximize.value;
        const isChecked = computeIsChecked.value;
        return groupProps.disabled || isMaximize && !isChecked;
      }
      return false;
    });
    const changeEvent = evnt => {
      const {
        checkedValue,
        uncheckedValue
      } = props;
      const isDisabled = computeIsDisabled.value;
      if (!isDisabled) {
        const checked = evnt.target.checked;
        const value = checked ? checkedValue : uncheckedValue;
        const params = {
          checked,
          value,
          label: props.label
        };
        if ($xecheckboxgroup) {
          $xecheckboxgroup.handleChecked(params, evnt);
        } else {
          emit('update:modelValue', value);
          checkboxMethods.dispatchEvent('change', params, evnt);
          // 自动更新校验状态
          if ($xeform && $xeformiteminfo) {
            $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, value);
          }
        }
      }
    };
    checkboxMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, Object.assign({
          $checkbox: $xecheckbox,
          $event: evnt
        }, params));
      }
    };
    Object.assign($xecheckbox, checkboxMethods);
    const renderVN = () => {
      const vSize = computeSize.value;
      const isDisabled = computeIsDisabled.value;
      const isChecked = computeIsChecked.value;
      const indeterminate = props.indeterminate;
      return (0, _vue.h)('label', {
        class: ['vxe-checkbox', {
          [`size--${vSize}`]: vSize,
          'is--indeterminate': indeterminate,
          'is--disabled': isDisabled,
          'is--checked': isChecked
        }],
        title: props.title
      }, [(0, _vue.h)('input', {
        class: 'vxe-checkbox--input',
        type: 'checkbox',
        disabled: isDisabled,
        checked: isChecked,
        onChange: changeEvent
      }), (0, _vue.h)('span', {
        class: ['vxe-checkbox--icon', indeterminate ? 'vxe-icon-checkbox-indeterminate' : isChecked ? 'vxe-icon-checkbox-checked' : 'vxe-icon-checkbox-unchecked']
      }), (0, _vue.h)('span', {
        class: 'vxe-checkbox--label'
      }, slots.default ? slots.default({}) : (0, _utils.getFuncText)(props.content))]);
    };
    $xecheckbox.renderVN = renderVN;
    return $xecheckbox;
  },
  render() {
    return this.renderVN();
  }
});