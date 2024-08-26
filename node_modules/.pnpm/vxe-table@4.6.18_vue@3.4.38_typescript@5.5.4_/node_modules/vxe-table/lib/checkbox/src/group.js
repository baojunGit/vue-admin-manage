"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _checkbox = _interopRequireDefault(require("./checkbox"));
var _size = require("../../hooks/size");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeCheckboxGroup',
  props: {
    modelValue: Array,
    options: Array,
    optionProps: Object,
    disabled: Boolean,
    max: {
      type: [String, Number],
      default: null
    },
    size: {
      type: String,
      default: () => _conf.default.checkboxGroup.size || _conf.default.size
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
    const computeIsMaximize = (0, _vue.computed)(() => {
      const {
        modelValue,
        max
      } = props;
      if (max) {
        return (modelValue ? modelValue.length : 0) >= _xeUtils.default.toNumber(max);
      }
      return false;
    });
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
    const computeMaps = {
      computeIsMaximize
    };
    const $xecheckboxgroup = {
      xID,
      props,
      context,
      getComputeMaps: () => computeMaps
    };
    (0, _size.useSize)(props);
    const checkboxGroupMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, Object.assign({
          $checkboxGroup: $xecheckboxgroup,
          $event: evnt
        }, params));
      }
    };
    const checkboxGroupPrivateMethods = {
      handleChecked(params, evnt) {
        const {
          checked,
          label
        } = params;
        const checklist = props.modelValue || [];
        const checkIndex = checklist.indexOf(label);
        if (checked) {
          if (checkIndex === -1) {
            checklist.push(label);
          }
        } else {
          checklist.splice(checkIndex, 1);
        }
        emit('update:modelValue', checklist);
        $xecheckboxgroup.dispatchEvent('change', Object.assign({
          checklist
        }, params), evnt);
        // 自动更新校验状态
        if ($xeform && $xeformiteminfo) {
          $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, checklist);
        }
      }
    };
    Object.assign($xecheckboxgroup, checkboxGroupMethods, checkboxGroupPrivateMethods);
    const renderVN = () => {
      const {
        options
      } = props;
      const defaultSlot = slots.default;
      const valueField = computeValueField.value;
      const labelField = computeLabelField.value;
      const disabledField = computeDisabledField.value;
      return (0, _vue.h)('div', {
        class: 'vxe-checkbox-group'
      }, defaultSlot ? defaultSlot({}) : options ? options.map(item => {
        return (0, _vue.h)(_checkbox.default, {
          label: item[valueField],
          content: item[labelField],
          disabled: item[disabledField]
        });
      }) : []);
    };
    $xecheckboxgroup.renderVN = renderVN;
    (0, _vue.provide)('$xecheckboxgroup', $xecheckboxgroup);
    return renderVN;
  }
});