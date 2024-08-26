"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _size = require("../../hooks/size");
var _dom = require("../../tools/dom");
var _utils = require("../../tools/utils");
var _event = require("../../tools/event");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxePulldown',
  props: {
    modelValue: Boolean,
    disabled: Boolean,
    placement: String,
    size: {
      type: String,
      default: () => _conf.default.size
    },
    className: [String, Function],
    popupClassName: [String, Function],
    destroyOnClose: Boolean,
    transfer: Boolean
  },
  emits: ['update:modelValue', 'hide-panel'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const computeSize = (0, _size.useSize)(props);
    const reactData = (0, _vue.reactive)({
      inited: false,
      panelIndex: 0,
      panelStyle: null,
      panelPlacement: null,
      visiblePanel: false,
      animatVisible: false,
      isActivated: false
    });
    const refElem = (0, _vue.ref)();
    const refPulldowContent = (0, _vue.ref)();
    const refPulldowPnanel = (0, _vue.ref)();
    const refMaps = {
      refElem
    };
    const $xepulldown = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps
    };
    let pulldownMethods = {};
    const updateZindex = () => {
      if (reactData.panelIndex < (0, _utils.getLastZIndex)()) {
        reactData.panelIndex = (0, _utils.nextZIndex)();
      }
    };
    const isPanelVisible = () => {
      return reactData.visiblePanel;
    };
    /**
     * 手动更新位置
     */
    const updatePlacement = () => {
      return (0, _vue.nextTick)().then(() => {
        const {
          transfer,
          placement
        } = props;
        const {
          panelIndex,
          visiblePanel
        } = reactData;
        if (visiblePanel) {
          const targetElem = refPulldowContent.value;
          const panelElem = refPulldowPnanel.value;
          if (panelElem && targetElem) {
            const targetHeight = targetElem.offsetHeight;
            const targetWidth = targetElem.offsetWidth;
            const panelHeight = panelElem.offsetHeight;
            const panelWidth = panelElem.offsetWidth;
            const marginSize = 5;
            const panelStyle = {
              zIndex: panelIndex
            };
            const {
              boundingTop,
              boundingLeft,
              visibleHeight,
              visibleWidth
            } = (0, _dom.getAbsolutePos)(targetElem);
            let panelPlacement = 'bottom';
            if (transfer) {
              let left = boundingLeft;
              let top = boundingTop + targetHeight;
              if (placement === 'top') {
                panelPlacement = 'top';
                top = boundingTop - panelHeight;
              } else if (!placement) {
                // 如果下面不够放，则向上
                if (top + panelHeight + marginSize > visibleHeight) {
                  panelPlacement = 'top';
                  top = boundingTop - panelHeight;
                }
                // 如果上面不够放，则向下（优先）
                if (top < marginSize) {
                  panelPlacement = 'bottom';
                  top = boundingTop + targetHeight;
                }
              }
              // 如果溢出右边
              if (left + panelWidth + marginSize > visibleWidth) {
                left -= left + panelWidth + marginSize - visibleWidth;
              }
              // 如果溢出左边
              if (left < marginSize) {
                left = marginSize;
              }
              Object.assign(panelStyle, {
                left: `${left}px`,
                top: `${top}px`,
                minWidth: `${targetWidth}px`
              });
            } else {
              if (placement === 'top') {
                panelPlacement = 'top';
                panelStyle.bottom = `${targetHeight}px`;
              } else if (!placement) {
                // 如果下面不够放，则向上
                if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                  // 如果上面不够放，则向下（优先）
                  if (boundingTop - targetHeight - panelHeight > marginSize) {
                    panelPlacement = 'top';
                    panelStyle.bottom = `${targetHeight}px`;
                  }
                }
              }
            }
            reactData.panelStyle = panelStyle;
            reactData.panelPlacement = panelPlacement;
          }
        }
        return (0, _vue.nextTick)();
      });
    };
    let hidePanelTimeout;
    /**
     * 显示下拉面板
     */
    const showPanel = () => {
      if (!reactData.inited) {
        reactData.inited = true;
      }
      return new Promise(resolve => {
        if (!props.disabled) {
          clearTimeout(hidePanelTimeout);
          reactData.isActivated = true;
          reactData.animatVisible = true;
          setTimeout(() => {
            reactData.visiblePanel = true;
            emit('update:modelValue', true);
            updatePlacement();
            setTimeout(() => {
              resolve(updatePlacement());
            }, 40);
          }, 10);
          updateZindex();
        } else {
          (0, _vue.nextTick)(() => {
            resolve();
          });
        }
      });
    };
    /**
     * 隐藏下拉面板
     */
    const hidePanel = () => {
      reactData.visiblePanel = false;
      emit('update:modelValue', false);
      return new Promise(resolve => {
        if (reactData.animatVisible) {
          hidePanelTimeout = window.setTimeout(() => {
            reactData.animatVisible = false;
            (0, _vue.nextTick)(() => {
              resolve();
            });
          }, 350);
        } else {
          (0, _vue.nextTick)(() => {
            resolve();
          });
        }
      });
    };
    /**
     * 切换下拉面板
     */
    const togglePanel = () => {
      if (reactData.visiblePanel) {
        return hidePanel();
      }
      return showPanel();
    };
    const handleGlobalMousewheelEvent = evnt => {
      const {
        disabled
      } = props;
      const {
        visiblePanel
      } = reactData;
      const panelElem = refPulldowPnanel.value;
      if (!disabled) {
        if (visiblePanel) {
          if ((0, _dom.getEventTargetNode)(evnt, panelElem).flag) {
            updatePlacement();
          } else {
            hidePanel();
            pulldownMethods.dispatchEvent('hide-panel', {}, evnt);
          }
        }
      }
    };
    const handleGlobalMousedownEvent = evnt => {
      const {
        disabled
      } = props;
      const {
        visiblePanel
      } = reactData;
      const el = refElem.value;
      const panelElem = refPulldowPnanel.value;
      if (!disabled) {
        reactData.isActivated = (0, _dom.getEventTargetNode)(evnt, el).flag || (0, _dom.getEventTargetNode)(evnt, panelElem).flag;
        if (visiblePanel && !reactData.isActivated) {
          hidePanel();
          pulldownMethods.dispatchEvent('hide-panel', {}, evnt);
        }
      }
    };
    const handleGlobalBlurEvent = evnt => {
      if (reactData.visiblePanel) {
        reactData.isActivated = false;
        hidePanel();
        pulldownMethods.dispatchEvent('hide-panel', {}, evnt);
      }
    };
    pulldownMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, Object.assign({
          $pulldown: $xepulldown,
          $event: evnt
        }, params));
      },
      isPanelVisible,
      togglePanel,
      showPanel,
      hidePanel
    };
    Object.assign($xepulldown, pulldownMethods);
    (0, _vue.watch)(() => props.modelValue, value => {
      if (value) {
        showPanel();
      } else {
        hidePanel();
      }
    });
    (0, _vue.nextTick)(() => {
      _event.GlobalEvent.on($xepulldown, 'mousewheel', handleGlobalMousewheelEvent);
      _event.GlobalEvent.on($xepulldown, 'mousedown', handleGlobalMousedownEvent);
      _event.GlobalEvent.on($xepulldown, 'blur', handleGlobalBlurEvent);
    });
    (0, _vue.onUnmounted)(() => {
      _event.GlobalEvent.off($xepulldown, 'mousewheel');
      _event.GlobalEvent.off($xepulldown, 'mousedown');
      _event.GlobalEvent.off($xepulldown, 'blur');
    });
    const renderVN = () => {
      const {
        className,
        popupClassName,
        destroyOnClose,
        transfer,
        disabled
      } = props;
      const {
        inited,
        isActivated,
        animatVisible,
        visiblePanel,
        panelStyle,
        panelPlacement
      } = reactData;
      const vSize = computeSize.value;
      const defaultSlot = slots.default;
      const headerSlot = slots.header;
      const footerSlot = slots.footer;
      const dropdownSlot = slots.dropdown;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-pulldown', className ? _xeUtils.default.isFunction(className) ? className({
          $pulldown: $xepulldown
        }) : className : '', {
          [`size--${vSize}`]: vSize,
          'is--visivle': visiblePanel,
          'is--disabled': disabled,
          'is--active': isActivated
        }]
      }, [(0, _vue.h)('div', {
        ref: refPulldowContent,
        class: 'vxe-pulldown--content'
      }, defaultSlot ? defaultSlot({
        $pulldown: $xepulldown
      }) : []), (0, _vue.h)(_vue.Teleport, {
        to: 'body',
        disabled: transfer ? !inited : true
      }, [(0, _vue.h)('div', {
        ref: refPulldowPnanel,
        class: ['vxe-table--ignore-clear vxe-pulldown--panel', popupClassName ? _xeUtils.default.isFunction(popupClassName) ? popupClassName({
          $pulldown: $xepulldown
        }) : popupClassName : '', {
          [`size--${vSize}`]: vSize,
          'is--transfer': transfer,
          'animat--leave': animatVisible,
          'animat--enter': visiblePanel
        }],
        placement: panelPlacement,
        style: panelStyle
      }, dropdownSlot ? [(0, _vue.h)('div', {
        class: 'vxe-pulldown--panel-wrapper'
      }, !inited || destroyOnClose && !visiblePanel && !animatVisible ? [] : [headerSlot ? (0, _vue.h)('div', {
        class: 'vxe-pulldown--panel-header'
      }, headerSlot({
        $pulldown: $xepulldown
      })) : (0, _vue.createCommentVNode)(), (0, _vue.h)('div', {
        class: 'vxe-pulldown--panel-body'
      }, dropdownSlot({
        $pulldown: $xepulldown
      })), footerSlot ? (0, _vue.h)('div', {
        class: 'vxe-pulldown--panel-footer'
      }, footerSlot({
        $pulldown: $xepulldown
      })) : (0, _vue.createCommentVNode)()])] : [])])]);
    };
    $xepulldown.renderVN = renderVN;
    return $xepulldown;
  },
  render() {
    return this.renderVN();
  }
});