"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.allActiveDrawers = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _size = require("../../hooks/size");
var _utils = require("../../tools/utils");
var _event = require("../../tools/event");
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _button = _interopRequireDefault(require("../../button/src/button"));
var _index = _interopRequireDefault(require("../../loading/index"));
var _vn = require("../../tools/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const allActiveDrawers = exports.allActiveDrawers = [];
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeDrawer',
  props: {
    modelValue: Boolean,
    id: String,
    title: String,
    loading: {
      type: Boolean,
      default: null
    },
    className: String,
    position: [String, Object],
    lockView: {
      type: Boolean,
      default: () => _conf.default.drawer.lockView
    },
    lockScroll: Boolean,
    mask: {
      type: Boolean,
      default: () => _conf.default.drawer.mask
    },
    maskClosable: {
      type: Boolean,
      default: () => _conf.default.drawer.maskClosable
    },
    escClosable: {
      type: Boolean,
      default: () => _conf.default.drawer.escClosable
    },
    showHeader: {
      type: Boolean,
      default: () => _conf.default.drawer.showHeader
    },
    showFooter: {
      type: Boolean,
      default: () => _conf.default.drawer.showFooter
    },
    showClose: {
      type: Boolean,
      default: () => _conf.default.drawer.showClose
    },
    content: [Number, String],
    showCancelButton: {
      type: Boolean,
      default: null
    },
    cancelButtonText: {
      type: String,
      default: () => _conf.default.drawer.cancelButtonText
    },
    showConfirmButton: {
      type: Boolean,
      default: () => _conf.default.drawer.showConfirmButton
    },
    confirmButtonText: {
      type: String,
      default: () => _conf.default.drawer.confirmButtonText
    },
    destroyOnClose: {
      type: Boolean,
      default: () => _conf.default.drawer.destroyOnClose
    },
    showTitleOverflow: {
      type: Boolean,
      default: () => _conf.default.drawer.showTitleOverflow
    },
    width: [Number, String],
    height: [Number, String],
    zIndex: Number,
    transfer: {
      type: Boolean,
      default: () => _conf.default.drawer.transfer
    },
    size: {
      type: String,
      default: () => _conf.default.drawer.size || _conf.default.size
    },
    beforeHideMethod: {
      type: Function,
      default: () => _conf.default.drawer.beforeHideMethod
    },
    slots: Number
  },
  emits: ['update:modelValue', 'show', 'hide', 'before-hide', 'close', 'confirm', 'cancel'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const computeSize = (0, _size.useSize)(props);
    const refElem = (0, _vue.ref)();
    const refDrawerBox = (0, _vue.ref)();
    const refConfirmBtn = (0, _vue.ref)();
    const refCancelBtn = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({
      inited: false,
      visible: false,
      contentVisible: false,
      drawerZIndex: 0,
      firstOpen: true
    });
    const refMaps = {
      refElem
    };
    const computeMaps = {};
    const $xeDrawer = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const getBox = () => {
      const boxElem = refDrawerBox.value;
      return boxElem;
    };
    const recalculate = () => {
      const {
        width,
        height
      } = props;
      const boxElem = getBox();
      boxElem.style.width = `${width ? isNaN(width) ? width : `${width}px` : ''}`;
      boxElem.style.height = `${height ? isNaN(height) ? height : `${height}px` : ''}`;
      return (0, _vue.nextTick)();
    };
    const updateZindex = () => {
      const {
        zIndex
      } = props;
      const {
        drawerZIndex
      } = reactData;
      if (zIndex) {
        reactData.drawerZIndex = zIndex;
      } else if (drawerZIndex < (0, _utils.getLastZIndex)()) {
        reactData.drawerZIndex = (0, _utils.nextZIndex)();
      }
    };
    const updatePosition = () => {
      return (0, _vue.nextTick)().then(() => {});
    };
    const closeDrawer = type => {
      const {
        beforeHideMethod
      } = props;
      const {
        visible
      } = reactData;
      const params = {
        type
      };
      if (visible) {
        Promise.resolve(beforeHideMethod ? beforeHideMethod(params) : null).then(rest => {
          if (!_xeUtils.default.isError(rest)) {
            reactData.contentVisible = false;
            _xeUtils.default.remove(allActiveDrawers, item => item === $xeDrawer);
            drawerMethods.dispatchEvent('before-hide', params);
            setTimeout(() => {
              reactData.visible = false;
              emit('update:modelValue', false);
              drawerMethods.dispatchEvent('hide', params);
            }, 200);
          }
        }).catch(e => e);
      }
      return (0, _vue.nextTick)();
    };
    const closeEvent = evnt => {
      const type = 'close';
      drawerMethods.dispatchEvent(type, {
        type
      }, evnt);
      closeDrawer(type);
    };
    const confirmEvent = evnt => {
      const type = 'confirm';
      drawerMethods.dispatchEvent(type, {
        type
      }, evnt);
      closeDrawer(type);
    };
    const cancelEvent = evnt => {
      const type = 'cancel';
      drawerMethods.dispatchEvent(type, {
        type
      }, evnt);
      closeDrawer(type);
    };
    const openDrawer = () => {
      const {
        showFooter
      } = props;
      const {
        inited,
        visible
      } = reactData;
      if (!inited) {
        reactData.inited = true;
      }
      if (!visible) {
        recalculate();
        reactData.visible = true;
        reactData.contentVisible = false;
        updateZindex();
        allActiveDrawers.push($xeDrawer);
        setTimeout(() => {
          reactData.contentVisible = true;
          (0, _vue.nextTick)(() => {
            if (showFooter) {
              const confirmBtn = refConfirmBtn.value;
              const cancelBtn = refCancelBtn.value;
              const operBtn = confirmBtn || cancelBtn;
              if (operBtn) {
                operBtn.focus();
              }
            }
            const type = '';
            const params = {
              type
            };
            emit('update:modelValue', true);
            drawerMethods.dispatchEvent('show', params);
          });
        }, 10);
        (0, _vue.nextTick)(() => {
          const {
            firstOpen
          } = reactData;
          if (firstOpen) {
            updatePosition().then(() => {
              setTimeout(() => updatePosition(), 20);
            });
          }
          if (firstOpen) {
            reactData.firstOpen = false;
          }
        });
      }
      return (0, _vue.nextTick)();
    };
    const drawerMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, Object.assign({
          $drawer: $xeDrawer,
          $event: evnt
        }, params));
      },
      open: openDrawer,
      close() {
        return closeDrawer('close');
      },
      getBox
    };
    const selfClickEvent = evnt => {
      const el = refElem.value;
      if (props.maskClosable && evnt.target === el) {
        const type = 'mask';
        closeDrawer(type);
      }
    };
    const handleGlobalKeydownEvent = evnt => {
      const isEsc = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ESCAPE);
      if (isEsc) {
        const lastDrawer = _xeUtils.default.max(allActiveDrawers, item => item.reactData.drawerZIndex);
        // 多个时，只关掉最上层的窗口
        if (lastDrawer) {
          setTimeout(() => {
            if (lastDrawer === $xeDrawer && lastDrawer.props.escClosable) {
              closeDrawer('exit');
            }
          }, 10);
        }
      }
    };
    const boxMousedownEvent = () => {
      const {
        drawerZIndex
      } = reactData;
      if (allActiveDrawers.some(comp => comp.reactData.visible && comp.reactData.drawerZIndex > drawerZIndex)) {
        updateZindex();
      }
    };
    const formDesignPrivateMethods = {};
    Object.assign($xeDrawer, drawerMethods, formDesignPrivateMethods);
    const renderTitles = () => {
      const {
        slots: propSlots = {},
        showClose,
        title
      } = props;
      const titleSlot = slots.title || propSlots.title;
      const cornerSlot = slots.corner || propSlots.corner;
      const titVNs = [(0, _vue.h)('div', {
        class: 'vxe-drawer--header-title'
      }, titleSlot ? (0, _vn.getSlotVNs)(titleSlot({
        $drawer: $xeDrawer
      })) : title ? (0, _utils.getFuncText)(title) : _conf.default.i18n('vxe.alert.title'))];
      const rightVNs = [];
      if (cornerSlot) {
        rightVNs.push((0, _vue.h)('span', {
          class: 'vxe-drawer--corner-wrapper'
        }, (0, _vn.getSlotVNs)(cornerSlot({
          $drawer: $xeDrawer
        }))));
      }
      if (showClose) {
        rightVNs.push((0, _vue.h)('i', {
          class: ['vxe-drawer--close-btn', 'trigger--btn', _conf.default.icon.MODAL_CLOSE],
          title: _conf.default.i18n('vxe.drawer.close'),
          onClick: closeEvent
        }));
      }
      titVNs.push((0, _vue.h)('div', {
        class: 'vxe-drawer--header-right'
      }, rightVNs));
      return titVNs;
    };
    const renderHeader = () => {
      const {
        slots: propSlots = {},
        showTitleOverflow
      } = props;
      const headerSlot = slots.header || propSlots.header;
      const headVNs = [];
      if (props.showHeader) {
        headVNs.push((0, _vue.h)('div', {
          class: ['vxe-drawer--header', {
            'is--ellipsis': showTitleOverflow
          }]
        }, headerSlot ? !reactData.inited || props.destroyOnClose && !reactData.visible ? [] : (0, _vn.getSlotVNs)(headerSlot({
          $drawer: $xeDrawer
        })) : renderTitles()));
      }
      return headVNs;
    };
    const renderBody = () => {
      const {
        slots: propSlots = {},
        content
      } = props;
      const defaultSlot = slots.default || propSlots.default;
      return [(0, _vue.h)('div', {
        class: 'vxe-drawer--body'
      }, [(0, _vue.h)('div', {
        class: 'vxe-drawer--content'
      }, defaultSlot ? !reactData.inited || props.destroyOnClose && !reactData.visible ? [] : (0, _vn.getSlotVNs)(defaultSlot({
        $drawer: $xeDrawer
      })) : (0, _utils.getFuncText)(content)), (0, _vue.h)(_index.default, {
        class: 'vxe-drawer--loading',
        modelValue: props.loading
      })])];
    };
    const renderBtns = () => {
      const {
        showCancelButton,
        showConfirmButton
      } = props;
      const btnVNs = [];
      if (showCancelButton) {
        btnVNs.push((0, _vue.h)(_button.default, {
          key: 1,
          ref: refCancelBtn,
          content: props.cancelButtonText || _conf.default.i18n('vxe.button.cancel'),
          onClick: cancelEvent
        }));
      }
      if (showConfirmButton) {
        btnVNs.push((0, _vue.h)(_button.default, {
          key: 2,
          ref: refConfirmBtn,
          status: 'primary',
          content: props.confirmButtonText || _conf.default.i18n('vxe.button.confirm'),
          onClick: confirmEvent
        }));
      }
      return btnVNs;
    };
    const renderFooter = () => {
      const {
        slots: propSlots = {}
      } = props;
      const footerSlot = slots.footer || propSlots.footer;
      const footVNs = [];
      if (props.showFooter) {
        footVNs.push((0, _vue.h)('div', {
          class: 'vxe-drawer--footer'
        }, footerSlot ? !reactData.inited || props.destroyOnClose && !reactData.visible ? [] : (0, _vn.getSlotVNs)(footerSlot({
          $drawer: $xeDrawer
        })) : renderBtns()));
      }
      return footVNs;
    };
    const renderVN = () => {
      const {
        className,
        position,
        loading,
        lockScroll,
        lockView,
        mask
      } = props;
      const {
        inited,
        contentVisible,
        visible
      } = reactData;
      const vSize = computeSize.value;
      return (0, _vue.h)(_vue.Teleport, {
        to: 'body',
        disabled: props.transfer ? !inited : true
      }, [(0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-drawer--wrapper', `pos--${position}`, className || '', {
          [`size--${vSize}`]: vSize,
          'lock--scroll': lockScroll,
          'lock--view': lockView,
          'is--mask': mask,
          'is--visible': contentVisible,
          'is--active': visible,
          'is--loading': loading
        }],
        style: {
          zIndex: reactData.drawerZIndex
        },
        onClick: selfClickEvent
      }, [(0, _vue.h)('div', {
        ref: refDrawerBox,
        class: 'vxe-drawer--box',
        onMousedown: boxMousedownEvent
      }, renderHeader().concat(renderBody(), renderFooter()))])]);
    };
    $xeDrawer.renderVN = renderVN;
    (0, _vue.watch)(() => props.width, recalculate);
    (0, _vue.watch)(() => props.height, recalculate);
    (0, _vue.watch)(() => props.modelValue, value => {
      if (value) {
        openDrawer();
      } else {
        closeDrawer('model');
      }
    });
    (0, _vue.onMounted)(() => {
      (0, _vue.nextTick)(() => {
        if (props.modelValue) {
          openDrawer();
        }
        recalculate();
      });
      if (props.escClosable) {
        _event.GlobalEvent.on($xeDrawer, 'keydown', handleGlobalKeydownEvent);
      }
    });
    (0, _vue.onUnmounted)(() => {
      _event.GlobalEvent.off($xeDrawer, 'keydown');
    });
    return $xeDrawer;
  },
  render() {
    return this.renderVN();
  }
});