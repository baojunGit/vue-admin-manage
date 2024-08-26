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
  name: 'VxeButton',
  props: {
    /**
     * 按钮类型
     */
    type: String,
    mode: String,
    className: [String, Function],
    popupClassName: [String, Function],
    /**
     * 按钮尺寸
     */
    size: {
      type: String,
      default: () => _conf.default.button.size || _conf.default.size
    },
    /**
     * 用来标识这一项
     */
    name: [String, Number],
    /**
     * 按钮内容
     */
    content: String,
    /**
     * 固定显示下拉面板的方向
     */
    placement: String,
    /**
     * 按钮状态
     */
    status: String,
    /**
     * 标题
     */
    title: String,
    /**
     * 按钮的图标
     */
    icon: String,
    /**
     * 圆角边框
     */
    round: Boolean,
    /**
     * 圆角按钮
     */
    circle: Boolean,
    /**
     * 是否禁用
     */
    disabled: Boolean,
    /**
     * 是否加载中
     */
    loading: Boolean,
    /**
     * 在下拉面板关闭时销毁内容
     */
    destroyOnClose: Boolean,
    /**
     * 是否将弹框容器插入于 body 内
     */
    transfer: {
      type: Boolean,
      default: () => _conf.default.button.transfer
    }
  },
  emits: ['click', 'mouseenter', 'mouseleave', 'dropdown-click'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const computeSize = (0, _size.useSize)(props);
    const reactData = (0, _vue.reactive)({
      inited: false,
      showPanel: false,
      animatVisible: false,
      panelIndex: 0,
      panelStyle: {},
      panelPlacement: ''
    });
    const internalData = {
      showTime: null
    };
    const refElem = (0, _vue.ref)();
    const refButton = (0, _vue.ref)();
    const refBtnPanel = (0, _vue.ref)();
    const refMaps = {
      refElem
    };
    const $xebutton = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps
    };
    const $xebuttonggroup = (0, _vue.inject)('$xebuttongroup', null);
    let buttonMethods = {};
    const computeIsFormBtn = (0, _vue.computed)(() => {
      const {
        type
      } = props;
      if (type) {
        return ['submit', 'reset', 'button'].indexOf(type) > -1;
      }
      return false;
    });
    const computeBtnMode = (0, _vue.computed)(() => {
      const {
        type,
        mode
      } = props;
      if (mode === 'text' || type === 'text' || $xebuttonggroup && $xebuttonggroup.props.mode === 'text') {
        return 'text';
      }
      return 'button';
    });
    const computeBtnStatus = (0, _vue.computed)(() => {
      const {
        status
      } = props;
      if (status) {
        return status;
      }
      if ($xebuttonggroup) {
        return $xebuttonggroup.props.status;
      }
      return '';
    });
    const computeBtnRound = (0, _vue.computed)(() => {
      const {
        round
      } = props;
      if (round) {
        return round;
      }
      if ($xebuttonggroup) {
        return $xebuttonggroup.props.round;
      }
      return false;
    });
    const computeBtnCircle = (0, _vue.computed)(() => {
      const {
        circle
      } = props;
      if (circle) {
        return circle;
      }
      if ($xebuttonggroup) {
        return $xebuttonggroup.props.circle;
      }
      return false;
    });
    const updateZindex = () => {
      if (reactData.panelIndex < (0, _utils.getLastZIndex)()) {
        reactData.panelIndex = (0, _utils.nextZIndex)();
      }
    };
    const updatePlacement = () => {
      return (0, _vue.nextTick)().then(() => {
        const {
          transfer,
          placement
        } = props;
        const {
          panelIndex
        } = reactData;
        const targetElem = refButton.value;
        const panelElem = refBtnPanel.value;
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
            top,
            left,
            boundingTop,
            visibleHeight,
            visibleWidth
          } = (0, _dom.getAbsolutePos)(targetElem);
          let panelPlacement = 'bottom';
          if (transfer) {
            let btnLeft = left + targetWidth - panelWidth;
            let btnTop = top + targetHeight;
            if (placement === 'top') {
              panelPlacement = 'top';
              btnTop = top - panelHeight;
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (boundingTop + targetHeight + panelHeight + marginSize > visibleHeight) {
                panelPlacement = 'top';
                btnTop = top - panelHeight;
              }
              // 如果上面不够放，则向下（优先）
              if (btnTop < marginSize) {
                panelPlacement = 'bottom';
                btnTop = top + targetHeight;
              }
            }
            // 如果溢出右边
            if (btnLeft + panelWidth + marginSize > visibleWidth) {
              btnLeft -= btnLeft + panelWidth + marginSize - visibleWidth;
            }
            // 如果溢出左边
            if (btnLeft < marginSize) {
              btnLeft = marginSize;
            }
            Object.assign(panelStyle, {
              left: `${btnLeft}px`,
              right: 'auto',
              top: `${btnTop}px`,
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
          return (0, _vue.nextTick)();
        }
      });
    };
    const clickEvent = evnt => {
      if ($xebuttonggroup) {
        $xebuttonggroup.handleClick({
          name: props.name
        }, evnt);
      } else {
        buttonMethods.dispatchEvent('click', {
          $event: evnt
        }, evnt);
      }
    };
    const mousedownDropdownEvent = evnt => {
      const isLeftBtn = evnt.button === 0;
      if (isLeftBtn) {
        evnt.stopPropagation();
      }
    };
    const clickDropdownEvent = evnt => {
      const dropdownElem = evnt.currentTarget;
      const panelElem = refBtnPanel.value;
      const {
        flag,
        targetElem
      } = (0, _dom.getEventTargetNode)(evnt, dropdownElem, 'vxe-button');
      if (flag) {
        if (panelElem) {
          panelElem.dataset.active = 'N';
        }
        reactData.showPanel = false;
        setTimeout(() => {
          if (!panelElem || panelElem.dataset.active !== 'Y') {
            reactData.animatVisible = false;
          }
        }, 350);
        buttonMethods.dispatchEvent('dropdown-click', {
          name: targetElem.getAttribute('name'),
          $event: evnt
        }, evnt);
      }
    };
    const mouseenterDropdownEvent = () => {
      const panelElem = refBtnPanel.value;
      if (panelElem) {
        panelElem.dataset.active = 'Y';
        reactData.animatVisible = true;
        setTimeout(() => {
          if (panelElem.dataset.active === 'Y') {
            reactData.showPanel = true;
            updateZindex();
            updatePlacement();
            setTimeout(() => {
              if (reactData.showPanel) {
                updatePlacement();
              }
            }, 50);
          }
        }, 20);
      }
    };
    const mouseenterTargetEvent = evnt => {
      const panelElem = refBtnPanel.value;
      if (panelElem) {
        panelElem.dataset.active = 'Y';
        if (!reactData.inited) {
          reactData.inited = true;
        }
        internalData.showTime = setTimeout(() => {
          if (panelElem.dataset.active === 'Y') {
            mouseenterDropdownEvent();
          } else {
            reactData.animatVisible = false;
          }
        }, 250);
      }
      mouseenterEvent(evnt);
    };
    const mouseleaveTargetEvent = evnt => {
      closePanel();
      mouseleaveEvent(evnt);
    };
    const mouseenterEvent = evnt => {
      emit('mouseenter', {
        $event: evnt
      });
    };
    const mouseleaveEvent = evnt => {
      emit('mouseleave', {
        $event: evnt
      });
    };
    const closePanel = () => {
      const panelElem = refBtnPanel.value;
      clearTimeout(internalData.showTime);
      if (panelElem) {
        panelElem.dataset.active = 'N';
        setTimeout(() => {
          if (panelElem.dataset.active !== 'Y') {
            reactData.showPanel = false;
            setTimeout(() => {
              if (panelElem.dataset.active !== 'Y') {
                reactData.animatVisible = false;
              }
            }, 350);
          }
        }, 100);
      } else {
        reactData.animatVisible = false;
        reactData.showPanel = false;
      }
    };
    const mouseleaveDropdownEvent = () => {
      closePanel();
    };
    const renderContent = () => {
      const {
        content,
        icon,
        loading
      } = props;
      const contVNs = [];
      if (loading) {
        contVNs.push((0, _vue.h)('i', {
          class: ['vxe-button--loading-icon', _conf.default.icon.BUTTON_LOADING]
        }));
      } else if (slots.icon) {
        contVNs.push((0, _vue.h)('span', {
          class: 'vxe-button--custom-icon'
        }, slots.icon({})));
      } else if (icon) {
        contVNs.push((0, _vue.h)('i', {
          class: ['vxe-button--icon', icon]
        }));
      }
      if (slots.default) {
        contVNs.push((0, _vue.h)('span', {
          class: 'vxe-button--content'
        }, slots.default({})));
      } else if (content) {
        contVNs.push((0, _vue.h)('span', {
          class: 'vxe-button--content'
        }, (0, _utils.getFuncText)(content)));
      }
      return contVNs;
    };
    buttonMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, Object.assign({
          $button: $xebutton,
          $event: evnt
        }, params));
      },
      focus() {
        const btnElem = refButton.value;
        btnElem.focus();
        return (0, _vue.nextTick)();
      },
      blur() {
        const btnElem = refButton.value;
        btnElem.blur();
        return (0, _vue.nextTick)();
      }
    };
    Object.assign($xebutton, buttonMethods);
    (0, _vue.onMounted)(() => {
      // if (process.env.NODE_ENV === 'development') {
      //   if (props.type === 'text') {
      //     warnLog('vxe.error.delProp', ['type=text', 'mode=text'])
      //   }
      // }
      _event.GlobalEvent.on($xebutton, 'mousewheel', evnt => {
        const panelElem = refBtnPanel.value;
        if (reactData.showPanel && !(0, _dom.getEventTargetNode)(evnt, panelElem).flag) {
          closePanel();
        }
      });
    });
    (0, _vue.onUnmounted)(() => {
      _event.GlobalEvent.off($xebutton, 'mousewheel');
    });
    const renderVN = () => {
      const {
        className,
        popupClassName,
        transfer,
        title,
        type,
        destroyOnClose,
        name,
        disabled,
        loading
      } = props;
      const {
        inited,
        showPanel
      } = reactData;
      const isFormBtn = computeIsFormBtn.value;
      const btnMode = computeBtnMode.value;
      const btnStatus = computeBtnStatus.value;
      const btnRound = computeBtnRound.value;
      const btnCircle = computeBtnCircle.value;
      const vSize = computeSize.value;
      if (slots.dropdowns) {
        return (0, _vue.h)('div', {
          ref: refElem,
          class: ['vxe-button--dropdown', className ? _xeUtils.default.isFunction(className) ? className({
            $button: $xebutton
          }) : className : '', {
            [`size--${vSize}`]: vSize,
            'is--active': showPanel
          }]
        }, [(0, _vue.h)('button', {
          ref: refButton,
          class: ['vxe-button', `type--${btnMode}`, {
            [`size--${vSize}`]: vSize,
            [`theme--${btnStatus}`]: btnStatus,
            'is--round': btnRound,
            'is--circle': btnCircle,
            'is--disabled': disabled || loading,
            'is--loading': loading
          }],
          title,
          name,
          type: isFormBtn ? type : 'button',
          disabled: disabled || loading,
          onMouseenter: mouseenterTargetEvent,
          onMouseleave: mouseleaveTargetEvent,
          onClick: clickEvent
        }, renderContent().concat([(0, _vue.h)('i', {
          class: `vxe-button--dropdown-arrow ${_conf.default.icon.BUTTON_DROPDOWN}`
        })])), (0, _vue.h)(_vue.Teleport, {
          to: 'body',
          disabled: transfer ? !inited : true
        }, [(0, _vue.h)('div', {
          ref: refBtnPanel,
          class: ['vxe-button--dropdown-panel', popupClassName ? _xeUtils.default.isFunction(popupClassName) ? popupClassName({
            $button: $xebutton
          }) : popupClassName : '', {
            [`size--${vSize}`]: vSize,
            'animat--leave': reactData.animatVisible,
            'animat--enter': showPanel
          }],
          placement: reactData.panelPlacement,
          style: reactData.panelStyle
        }, inited ? [(0, _vue.h)('div', {
          class: 'vxe-button--dropdown-wrapper',
          onMousedown: mousedownDropdownEvent,
          onClick: clickDropdownEvent,
          onMouseenter: mouseenterDropdownEvent,
          onMouseleave: mouseleaveDropdownEvent
        }, destroyOnClose && !showPanel ? [] : slots.dropdowns({}))] : [])])]);
      }
      return (0, _vue.h)('button', {
        ref: refButton,
        class: ['vxe-button', `type--${btnMode}`, className ? _xeUtils.default.isFunction(className) ? className({
          $button: $xebutton
        }) : className : '', {
          [`size--${vSize}`]: vSize,
          [`theme--${btnStatus}`]: btnStatus,
          'is--round': btnRound,
          'is--circle': btnCircle,
          'is--disabled': disabled || loading,
          'is--loading': loading
        }],
        title,
        name,
        type: isFormBtn ? type : 'button',
        disabled: disabled || loading,
        onClick: clickEvent,
        onMouseenter: mouseenterEvent,
        onMouseleave: mouseleaveEvent
      }, renderContent());
    };
    $xebutton.renderVN = renderVN;
    return $xebutton;
  },
  render() {
    return this.renderVN();
  }
});