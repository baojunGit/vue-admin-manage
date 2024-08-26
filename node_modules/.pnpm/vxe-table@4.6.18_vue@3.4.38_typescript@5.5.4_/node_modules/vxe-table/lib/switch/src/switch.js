"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _size = require("../../hooks/size");
var _utils = require("../../tools/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeSwitch',
  props: {
    modelValue: [String, Number, Boolean],
    disabled: Boolean,
    size: {
      type: String,
      default: () => _conf.default.switch.size || _conf.default.size
    },
    openLabel: String,
    closeLabel: String,
    openValue: {
      type: [String, Number, Boolean],
      default: true
    },
    closeValue: {
      type: [String, Number, Boolean],
      default: false
    },
    openIcon: String,
    closeIcon: String,
    openActiveIcon: String,
    closeActiveIcon: String
  },
  emits: ['update:modelValue', 'change', 'focus', 'blur'],
  setup(props, context) {
    const {
      emit
    } = context;
    const $xeform = (0, _vue.inject)('$xeform', null);
    const $xeformiteminfo = (0, _vue.inject)('$xeformiteminfo', null);
    const xID = _xeUtils.default.uniqueId();
    const computeSize = (0, _size.useSize)(props);
    const reactData = (0, _vue.reactive)({
      isActivated: false,
      hasAnimat: false,
      offsetLeft: 0
    });
    const $xeswitch = {
      xID,
      props,
      context,
      reactData
    };
    const refButton = (0, _vue.ref)();
    let switchMethods = {};
    const computeOnShowLabel = (0, _vue.computed)(() => {
      return (0, _utils.getFuncText)(props.openLabel);
    });
    const computeOffShowLabel = (0, _vue.computed)(() => {
      return (0, _utils.getFuncText)(props.closeLabel);
    });
    const computeIsChecked = (0, _vue.computed)(() => {
      return props.modelValue === props.openValue;
    });
    let _atimeout;
    const clickEvent = evnt => {
      if (!props.disabled) {
        const isChecked = computeIsChecked.value;
        clearTimeout(_atimeout);
        const value = isChecked ? props.closeValue : props.openValue;
        reactData.hasAnimat = true;
        emit('update:modelValue', value);
        switchMethods.dispatchEvent('change', {
          value
        }, evnt);
        // 自动更新校验状态
        if ($xeform && $xeformiteminfo) {
          $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, value);
        }
        _atimeout = setTimeout(() => {
          reactData.hasAnimat = false;
        }, 400);
      }
    };
    const focusEvent = evnt => {
      reactData.isActivated = true;
      switchMethods.dispatchEvent('focus', {
        value: props.modelValue
      }, evnt);
    };
    const blurEvent = evnt => {
      reactData.isActivated = false;
      switchMethods.dispatchEvent('blur', {
        value: props.modelValue
      }, evnt);
    };
    switchMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, Object.assign({
          $switch: $xeswitch,
          $event: evnt
        }, params));
      },
      focus() {
        const btnElem = refButton.value;
        reactData.isActivated = true;
        btnElem.focus();
        return (0, _vue.nextTick)();
      },
      blur() {
        const btnElem = refButton.value;
        btnElem.blur();
        reactData.isActivated = false;
        return (0, _vue.nextTick)();
      }
    };
    Object.assign($xeswitch, switchMethods);
    const renderVN = () => {
      const {
        disabled,
        openIcon,
        closeIcon,
        openActiveIcon,
        closeActiveIcon
      } = props;
      const isChecked = computeIsChecked.value;
      const vSize = computeSize.value;
      const onShowLabel = computeOnShowLabel.value;
      const offShowLabel = computeOffShowLabel.value;
      return (0, _vue.h)('div', {
        class: ['vxe-switch', isChecked ? 'is--on' : 'is--off', {
          [`size--${vSize}`]: vSize,
          'is--disabled': disabled,
          'is--animat': reactData.hasAnimat
        }]
      }, [(0, _vue.h)('button', {
        ref: refButton,
        class: 'vxe-switch--button',
        type: 'button',
        disabled,
        onClick: clickEvent,
        onFocus: focusEvent,
        onBlur: blurEvent
      }, [(0, _vue.h)('span', {
        class: 'vxe-switch--label vxe-switch--label-on'
      }, [openIcon ? (0, _vue.h)('i', {
        class: ['vxe-switch--label-icon', openIcon]
      }) : (0, _vue.createCommentVNode)(), onShowLabel]), (0, _vue.h)('span', {
        class: 'vxe-switch--label vxe-switch--label-off'
      }, [closeIcon ? (0, _vue.h)('i', {
        class: ['vxe-switch--label-icon', closeIcon]
      }) : (0, _vue.createCommentVNode)(), offShowLabel]), (0, _vue.h)('span', {
        class: 'vxe-switch--icon'
      }, openActiveIcon || closeActiveIcon ? [(0, _vue.h)('i', {
        class: isChecked ? openActiveIcon : closeActiveIcon
      })] : [])])]);
    };
    $xeswitch.renderVN = renderVN;
    return $xeswitch;
  },
  render() {
    return this.renderVN();
  }
});