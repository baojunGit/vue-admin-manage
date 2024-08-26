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
var _dom = require("../../tools/dom");
var _vn = require("../../tools/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeTooltip',
  props: {
    modelValue: Boolean,
    size: {
      type: String,
      default: () => _conf.default.tooltip.size || _conf.default.size
    },
    trigger: {
      type: String,
      default: () => _conf.default.tooltip.trigger || 'hover'
    },
    theme: {
      type: String,
      default: () => _conf.default.tooltip.theme || 'dark'
    },
    content: {
      type: [String, Number],
      default: null
    },
    useHTML: Boolean,
    zIndex: [String, Number],
    popupClassName: [String, Function],
    isArrow: {
      type: Boolean,
      default: true
    },
    enterable: Boolean,
    enterDelay: {
      type: Number,
      default: () => _conf.default.tooltip.enterDelay
    },
    leaveDelay: {
      type: Number,
      default: () => _conf.default.tooltip.leaveDelay
    }
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const computeSize = (0, _size.useSize)(props);
    const reactData = (0, _vue.reactive)({
      target: null,
      isUpdate: false,
      visible: false,
      tipContent: '',
      tipActive: false,
      tipTarget: null,
      tipZindex: 0,
      tipStore: {
        style: {},
        placement: '',
        arrowStyle: {}
      }
    });
    const refElem = (0, _vue.ref)();
    const refMaps = {
      refElem
    };
    const $xetooltip = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps
    };
    let tooltipMethods = {};
    const updateTipStyle = () => {
      const {
        tipTarget,
        tipStore
      } = reactData;
      if (tipTarget) {
        const {
          scrollTop,
          scrollLeft,
          visibleWidth
        } = (0, _dom.getDomNode)();
        const {
          top,
          left
        } = (0, _dom.getAbsolutePos)(tipTarget);
        const el = refElem.value;
        const marginSize = 6;
        const offsetHeight = el.offsetHeight;
        const offsetWidth = el.offsetWidth;
        let tipLeft = left;
        let tipTop = top - offsetHeight - marginSize;
        tipLeft = Math.max(marginSize, left + Math.floor((tipTarget.offsetWidth - offsetWidth) / 2));
        if (tipLeft + offsetWidth + marginSize > scrollLeft + visibleWidth) {
          tipLeft = scrollLeft + visibleWidth - offsetWidth - marginSize;
        }
        if (top - offsetHeight < scrollTop + marginSize) {
          tipStore.placement = 'bottom';
          tipTop = top + tipTarget.offsetHeight + marginSize;
        }
        tipStore.style.top = `${tipTop}px`;
        tipStore.style.left = `${tipLeft}px`;
        tipStore.arrowStyle.left = `${left - tipLeft + tipTarget.offsetWidth / 2}px`;
      }
    };
    const updateValue = value => {
      if (value !== reactData.visible) {
        reactData.visible = value;
        reactData.isUpdate = true;
        emit('update:modelValue', value);
      }
    };
    const updateZindex = () => {
      if (reactData.tipZindex < (0, _utils.getLastZIndex)()) {
        reactData.tipZindex = (0, _utils.nextZIndex)();
      }
    };
    const clickEvent = () => {
      if (reactData.visible) {
        tooltipMethods.close();
      } else {
        tooltipMethods.open();
      }
    };
    const targetMouseenterEvent = () => {
      tooltipMethods.open();
    };
    const targetMouseleaveEvent = () => {
      const {
        trigger,
        enterable,
        leaveDelay
      } = props;
      reactData.tipActive = false;
      if (enterable && trigger === 'hover') {
        setTimeout(() => {
          if (!reactData.tipActive) {
            tooltipMethods.close();
          }
        }, leaveDelay);
      } else {
        tooltipMethods.close();
      }
    };
    const wrapperMouseenterEvent = () => {
      reactData.tipActive = true;
    };
    const wrapperMouseleaveEvent = () => {
      const {
        trigger,
        enterable,
        leaveDelay
      } = props;
      reactData.tipActive = false;
      if (enterable && trigger === 'hover') {
        setTimeout(() => {
          if (!reactData.tipActive) {
            tooltipMethods.close();
          }
        }, leaveDelay);
      }
    };
    const showTip = () => {
      const {
        tipStore
      } = reactData;
      const el = refElem.value;
      if (el) {
        const parentNode = el.parentNode;
        if (!parentNode) {
          document.body.appendChild(el);
        }
      }
      updateValue(true);
      updateZindex();
      tipStore.placement = 'top';
      tipStore.style = {
        width: 'auto',
        left: 0,
        top: 0,
        zIndex: props.zIndex || reactData.tipZindex
      };
      tipStore.arrowStyle = {
        left: '50%'
      };
      return tooltipMethods.updatePlacement();
    };
    const showDelayTip = _xeUtils.default.debounce(() => {
      if (reactData.tipActive) {
        showTip();
      }
    }, props.enterDelay, {
      leading: false,
      trailing: true
    });
    tooltipMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, Object.assign({
          $tooltip: $xetooltip,
          $event: evnt
        }, params));
      },
      open(target, content) {
        return tooltipMethods.toVisible(target || reactData.target, content);
      },
      close() {
        reactData.tipTarget = null;
        reactData.tipActive = false;
        Object.assign(reactData.tipStore, {
          style: {},
          placement: '',
          arrowStyle: null
        });
        updateValue(false);
        return (0, _vue.nextTick)();
      },
      toVisible(target, content) {
        if (target) {
          const {
            trigger,
            enterDelay
          } = props;
          reactData.tipActive = true;
          reactData.tipTarget = target;
          if (content) {
            reactData.tipContent = content;
          }
          if (enterDelay && trigger === 'hover') {
            showDelayTip();
          } else {
            return showTip();
          }
        }
        return (0, _vue.nextTick)();
      },
      updatePlacement() {
        return (0, _vue.nextTick)().then(() => {
          const {
            tipTarget
          } = reactData;
          const el = refElem.value;
          if (tipTarget && el) {
            updateTipStyle();
            return (0, _vue.nextTick)().then(updateTipStyle);
          }
        });
      },
      isActived() {
        return reactData.tipActive;
      },
      setActived(actived) {
        reactData.tipActive = !!actived;
      }
    };
    Object.assign($xetooltip, tooltipMethods);
    (0, _vue.watch)(() => props.content, () => {
      reactData.tipContent = props.content;
    });
    (0, _vue.watch)(() => props.modelValue, () => {
      if (!reactData.isUpdate) {
        if (props.modelValue) {
          tooltipMethods.open();
        } else {
          tooltipMethods.close();
        }
      }
      reactData.isUpdate = false;
    });
    (0, _vue.onMounted)(() => {
      (0, _vue.nextTick)(() => {
        const {
          trigger,
          content,
          modelValue
        } = props;
        const wrapperElem = refElem.value;
        if (wrapperElem) {
          const parentNode = wrapperElem.parentNode;
          if (parentNode) {
            reactData.tipContent = content;
            reactData.tipZindex = (0, _utils.nextZIndex)();
            _xeUtils.default.arrayEach(wrapperElem.children, (elem, index) => {
              if (index > 1) {
                parentNode.insertBefore(elem, wrapperElem);
                if (!reactData.target) {
                  reactData.target = elem;
                }
              }
            });
            parentNode.removeChild(wrapperElem);
            const {
              target
            } = reactData;
            if (target) {
              if (trigger === 'hover') {
                target.onmouseenter = targetMouseenterEvent;
                target.onmouseleave = targetMouseleaveEvent;
              } else if (trigger === 'click') {
                target.onclick = clickEvent;
              }
            }
            if (modelValue) {
              tooltipMethods.open();
            }
          }
        }
      });
    });
    (0, _vue.onBeforeUnmount)(() => {
      const {
        trigger
      } = props;
      const {
        target
      } = reactData;
      const wrapperElem = refElem.value;
      if (target) {
        if (trigger === 'hover') {
          target.onmouseenter = null;
          target.onmouseleave = null;
        } else if (trigger === 'click') {
          target.onclick = null;
        }
      }
      if (wrapperElem) {
        const parentNode = wrapperElem.parentNode;
        if (parentNode) {
          parentNode.removeChild(wrapperElem);
        }
      }
    });
    const renderContent = () => {
      const {
        useHTML
      } = props;
      const {
        tipContent
      } = reactData;
      const contentSlot = slots.content;
      if (contentSlot) {
        return (0, _vue.h)('div', {
          key: 1,
          class: 'vxe-table--tooltip-content'
        }, (0, _vn.getSlotVNs)(contentSlot({})));
      }
      if (useHTML) {
        return (0, _vue.h)('div', {
          key: 2,
          class: 'vxe-table--tooltip-content',
          innerHTML: tipContent
        });
      }
      return (0, _vue.h)('div', {
        key: 3,
        class: 'vxe-table--tooltip-content'
      }, (0, _utils.formatText)(tipContent));
    };
    const renderVN = () => {
      const {
        popupClassName,
        theme,
        isArrow,
        enterable
      } = props;
      const {
        tipActive,
        visible,
        tipStore
      } = reactData;
      const defaultSlot = slots.default;
      const vSize = computeSize.value;
      let ons;
      if (enterable) {
        ons = {
          onMouseenter: wrapperMouseenterEvent,
          onMouseleave: wrapperMouseleaveEvent
        };
      }
      return (0, _vue.h)('div', Object.assign({
        ref: refElem,
        class: ['vxe-table--tooltip-wrapper', `theme--${theme}`, popupClassName ? _xeUtils.default.isFunction(popupClassName) ? popupClassName({
          $tooltip: $xetooltip
        }) : popupClassName : '', {
          [`size--${vSize}`]: vSize,
          [`placement--${tipStore.placement}`]: tipStore.placement,
          'is--enterable': enterable,
          'is--visible': visible,
          'is--arrow': isArrow,
          'is--active': tipActive
        }],
        style: tipStore.style
      }, ons), [renderContent(), (0, _vue.h)('div', {
        class: 'vxe-table--tooltip-arrow',
        style: tipStore.arrowStyle
      }), ...(defaultSlot ? (0, _vn.getSlotVNs)(defaultSlot({})) : [])]);
    };
    $xetooltip.renderVN = renderVN;
    return $xetooltip;
  },
  render() {
    return this.renderVN();
  }
});