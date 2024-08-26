"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _utils = require("../../tools/utils");
var _size = require("../../hooks/size");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let autoTxtElem;
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeTextarea',
  props: {
    modelValue: [String, Number],
    className: String,
    immediate: {
      type: Boolean,
      default: true
    },
    name: String,
    readonly: Boolean,
    disabled: Boolean,
    placeholder: {
      type: String,
      default: () => _xeUtils.default.eqNull(_conf.default.textarea.placeholder) ? _conf.default.i18n('vxe.base.pleaseInput') : _conf.default.textarea.placeholder
    },
    maxlength: [String, Number],
    rows: {
      type: [String, Number],
      default: 2
    },
    cols: {
      type: [String, Number],
      default: null
    },
    showWordCount: Boolean,
    countMethod: Function,
    autosize: [Boolean, Object],
    form: String,
    resize: {
      type: String,
      default: () => _conf.default.textarea.resize
    },
    size: {
      type: String,
      default: () => _conf.default.textarea.size || _conf.default.size
    }
  },
  emits: ['update:modelValue', 'input', 'keydown', 'keyup', 'click', 'change', 'focus', 'blur'],
  setup(props, context) {
    const {
      emit
    } = context;
    const $xeform = (0, _vue.inject)('$xeform', null);
    const $xeformiteminfo = (0, _vue.inject)('$xeformiteminfo', null);
    const xID = _xeUtils.default.uniqueId();
    const computeSize = (0, _size.useSize)(props);
    const reactData = (0, _vue.reactive)({
      inputValue: props.modelValue
    });
    const refElem = (0, _vue.ref)();
    const refTextarea = (0, _vue.ref)();
    const refMaps = {
      refElem,
      refTextarea
    };
    const $xetextarea = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps
    };
    let textareaMethods = {};
    const computeInputCount = (0, _vue.computed)(() => {
      return _xeUtils.default.getSize(reactData.inputValue);
    });
    const computeIsCountError = (0, _vue.computed)(() => {
      const inputCount = computeInputCount.value;
      return props.maxlength && inputCount > _xeUtils.default.toNumber(props.maxlength);
    });
    const computeSizeOpts = (0, _vue.computed)(() => {
      return Object.assign({
        minRows: 1,
        maxRows: 10
      }, _conf.default.textarea.autosize, props.autosize);
    });
    const updateAutoTxt = () => {
      const {
        size,
        autosize
      } = props;
      const {
        inputValue
      } = reactData;
      if (autosize) {
        if (!autoTxtElem) {
          autoTxtElem = document.createElement('div');
        }
        if (!autoTxtElem.parentNode) {
          document.body.appendChild(autoTxtElem);
        }
        const textElem = refTextarea.value;
        const textStyle = getComputedStyle(textElem);
        autoTxtElem.className = ['vxe-textarea--autosize', size ? `size--${size}` : ''].join(' ');
        autoTxtElem.style.width = `${textElem.clientWidth}px`;
        autoTxtElem.style.padding = textStyle.padding;
        autoTxtElem.innerText = ('' + (inputValue || '　')).replace(/\n$/, '\n　');
      }
    };
    const handleResize = () => {
      if (props.autosize) {
        (0, _vue.nextTick)(() => {
          const sizeOpts = computeSizeOpts.value;
          const {
            minRows,
            maxRows
          } = sizeOpts;
          const textElem = refTextarea.value;
          const sizeHeight = autoTxtElem.clientHeight;
          const textStyle = getComputedStyle(textElem);
          const lineHeight = _xeUtils.default.toNumber(textStyle.lineHeight);
          const paddingTop = _xeUtils.default.toNumber(textStyle.paddingTop);
          const paddingBottom = _xeUtils.default.toNumber(textStyle.paddingBottom);
          const borderTopWidth = _xeUtils.default.toNumber(textStyle.borderTopWidth);
          const borderBottomWidth = _xeUtils.default.toNumber(textStyle.borderBottomWidth);
          const intervalHeight = paddingTop + paddingBottom + borderTopWidth + borderBottomWidth;
          const rowNum = (sizeHeight - intervalHeight) / lineHeight;
          const textRows = rowNum && /[0-9]/.test('' + rowNum) ? rowNum : Math.floor(rowNum) + 1;
          let vaildRows = textRows;
          if (textRows < minRows) {
            vaildRows = minRows;
          } else if (textRows > maxRows) {
            vaildRows = maxRows;
          }
          textElem.style.height = `${vaildRows * lineHeight + intervalHeight}px`;
        });
      }
    };
    const triggerEvent = evnt => {
      const value = reactData.inputValue;
      $xetextarea.dispatchEvent(evnt.type, {
        value
      }, evnt);
    };
    const emitUpdate = (value, evnt) => {
      reactData.inputValue = value;
      emit('update:modelValue', value);
      if (_xeUtils.default.toValueString(props.modelValue) !== value) {
        textareaMethods.dispatchEvent('change', {
          value
        }, evnt);
        // 自动更新校验状态
        if ($xeform && $xeformiteminfo) {
          $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, value);
        }
      }
    };
    const inputEvent = evnt => {
      const {
        immediate
      } = props;
      const textElem = evnt.target;
      const value = textElem.value;
      reactData.inputValue = value;
      if (immediate) {
        emitUpdate(value, evnt);
      }
      $xetextarea.dispatchEvent('input', {
        value
      }, evnt);
      handleResize();
    };
    const changeEvent = evnt => {
      const {
        immediate
      } = props;
      if (immediate) {
        triggerEvent(evnt);
      } else {
        emitUpdate(reactData.inputValue, evnt);
      }
    };
    const blurEvent = evnt => {
      const {
        immediate
      } = props;
      const {
        inputValue
      } = reactData;
      if (!immediate) {
        emitUpdate(inputValue, evnt);
      }
      $xetextarea.dispatchEvent('blur', {
        value: inputValue
      }, evnt);
    };
    textareaMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, Object.assign({
          $textarea: $xetextarea,
          $event: evnt
        }, params));
      },
      focus() {
        const textElem = refTextarea.value;
        textElem.focus();
        return (0, _vue.nextTick)();
      },
      blur() {
        const textElem = refTextarea.value;
        textElem.blur();
        return (0, _vue.nextTick)();
      }
    };
    Object.assign($xetextarea, textareaMethods);
    (0, _vue.watch)(() => props.modelValue, val => {
      reactData.inputValue = val;
      updateAutoTxt();
    });
    (0, _vue.nextTick)(() => {
      const {
        autosize
      } = props;
      if (autosize) {
        updateAutoTxt();
        handleResize();
      }
    });
    const renderVN = () => {
      const {
        className,
        resize,
        placeholder,
        disabled,
        maxlength,
        autosize,
        showWordCount,
        countMethod,
        rows,
        cols
      } = props;
      const {
        inputValue
      } = reactData;
      const vSize = computeSize.value;
      const isCountError = computeIsCountError.value;
      const inputCount = computeInputCount.value;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-textarea', className, {
          [`size--${vSize}`]: vSize,
          'is--autosize': autosize,
          'is--count': showWordCount,
          'is--disabled': disabled,
          'def--rows': !_xeUtils.default.eqNull(rows),
          'def--cols': !_xeUtils.default.eqNull(cols)
        }]
      }, [(0, _vue.h)('textarea', {
        ref: refTextarea,
        class: 'vxe-textarea--inner',
        value: inputValue,
        name: props.name,
        placeholder: placeholder ? (0, _utils.getFuncText)(placeholder) : null,
        maxlength,
        readonly: props.readonly,
        disabled,
        rows,
        cols,
        style: resize ? {
          resize
        } : null,
        onInput: inputEvent,
        onChange: changeEvent,
        onKeydown: triggerEvent,
        onKeyup: triggerEvent,
        onClick: triggerEvent,
        onFocus: triggerEvent,
        onBlur: blurEvent
      }), showWordCount ? (0, _vue.h)('span', {
        class: ['vxe-textarea--count', {
          'is--error': isCountError
        }]
      }, countMethod ? `${countMethod({
        value: inputValue
      })}` : `${inputCount}${maxlength ? `/${maxlength}` : ''}`) : null]);
    };
    $xetextarea.renderVN = renderVN;
    return $xetextarea;
  },
  render() {
    return this.renderVN();
  }
});