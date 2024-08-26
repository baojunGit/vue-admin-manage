"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.msgQueue = exports.default = exports.allActiveModals = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _size = require("../../hooks/size");
var _dom = require("../../tools/dom");
var _utils = require("../../tools/utils");
var _log = require("../../tools/log");
var _event = require("../../tools/event");
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _button = _interopRequireDefault(require("../../button/src/button"));
var _index = _interopRequireDefault(require("../../loading/index"));
var _vn = require("../../tools/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const allActiveModals = exports.allActiveModals = [];
const msgQueue = exports.msgQueue = [];
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeModal',
  props: {
    modelValue: Boolean,
    id: String,
    type: {
      type: String,
      default: 'modal'
    },
    loading: {
      type: Boolean,
      default: null
    },
    status: String,
    iconStatus: String,
    className: String,
    top: {
      type: [Number, String],
      default: () => _conf.default.modal.top
    },
    position: [String, Object],
    title: String,
    duration: {
      type: [Number, String],
      default: () => _conf.default.modal.duration
    },
    message: [Number, String],
    content: [Number, String],
    showCancelButton: {
      type: Boolean,
      default: null
    },
    cancelButtonText: {
      type: String,
      default: () => _conf.default.modal.cancelButtonText
    },
    showConfirmButton: {
      type: Boolean,
      default: () => _conf.default.modal.showConfirmButton
    },
    confirmButtonText: {
      type: String,
      default: () => _conf.default.modal.confirmButtonText
    },
    lockView: {
      type: Boolean,
      default: () => _conf.default.modal.lockView
    },
    lockScroll: Boolean,
    mask: {
      type: Boolean,
      default: () => _conf.default.modal.mask
    },
    maskClosable: {
      type: Boolean,
      default: () => _conf.default.modal.maskClosable
    },
    escClosable: {
      type: Boolean,
      default: () => _conf.default.modal.escClosable
    },
    resize: Boolean,
    showHeader: {
      type: Boolean,
      default: () => _conf.default.modal.showHeader
    },
    showFooter: {
      type: Boolean,
      default: () => _conf.default.modal.showFooter
    },
    showZoom: Boolean,
    showClose: {
      type: Boolean,
      default: () => _conf.default.modal.showClose
    },
    dblclickZoom: {
      type: Boolean,
      default: () => _conf.default.modal.dblclickZoom
    },
    width: [Number, String],
    height: [Number, String],
    minWidth: {
      type: [Number, String],
      default: () => _conf.default.modal.minWidth
    },
    minHeight: {
      type: [Number, String],
      default: () => _conf.default.modal.minHeight
    },
    zIndex: Number,
    marginSize: {
      type: [Number, String],
      default: () => _conf.default.modal.marginSize
    },
    fullscreen: Boolean,
    draggable: {
      type: Boolean,
      default: () => _conf.default.modal.draggable
    },
    remember: {
      type: Boolean,
      default: () => _conf.default.modal.remember
    },
    destroyOnClose: {
      type: Boolean,
      default: () => _conf.default.modal.destroyOnClose
    },
    showTitleOverflow: {
      type: Boolean,
      default: () => _conf.default.modal.showTitleOverflow
    },
    transfer: {
      type: Boolean,
      default: () => _conf.default.modal.transfer
    },
    storage: {
      type: Boolean,
      default: () => _conf.default.modal.storage
    },
    storageKey: {
      type: String,
      default: () => _conf.default.modal.storageKey
    },
    animat: {
      type: Boolean,
      default: () => _conf.default.modal.animat
    },
    size: {
      type: String,
      default: () => _conf.default.modal.size || _conf.default.size
    },
    beforeHideMethod: {
      type: Function,
      default: () => _conf.default.modal.beforeHideMethod
    },
    slots: Object
  },
  emits: ['update:modelValue', 'show', 'hide', 'before-hide', 'close', 'confirm', 'cancel', 'zoom', 'resize', 'move'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const computeSize = (0, _size.useSize)(props);
    const reactData = (0, _vue.reactive)({
      inited: false,
      visible: false,
      contentVisible: false,
      modalTop: 0,
      modalZindex: 0,
      zoomLocat: null,
      firstOpen: true
    });
    const refElem = (0, _vue.ref)();
    const refModalBox = (0, _vue.ref)();
    const refConfirmBtn = (0, _vue.ref)();
    const refCancelBtn = (0, _vue.ref)();
    const refMaps = {
      refElem
    };
    const $xemodal = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps
    };
    let modalMethods = {};
    const computeIsMsg = (0, _vue.computed)(() => {
      return props.type === 'message';
    });
    const getBox = () => {
      const boxElem = refModalBox.value;
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
        modalZindex
      } = reactData;
      if (zIndex) {
        reactData.modalZindex = zIndex;
      } else if (modalZindex < (0, _utils.getLastZIndex)()) {
        reactData.modalZindex = (0, _utils.nextZIndex)();
      }
    };
    const updatePosition = () => {
      return (0, _vue.nextTick)().then(() => {
        const {
          position
        } = props;
        const marginSize = _xeUtils.default.toNumber(props.marginSize);
        const boxElem = getBox();
        const clientVisibleWidth = document.documentElement.clientWidth || document.body.clientWidth;
        const clientVisibleHeight = document.documentElement.clientHeight || document.body.clientHeight;
        const isPosCenter = position === 'center';
        const {
          top,
          left
        } = _xeUtils.default.isString(position) ? {
          top: position,
          left: position
        } : Object.assign({}, position);
        const topCenter = isPosCenter || top === 'center';
        const leftCenter = isPosCenter || left === 'center';
        let posTop = '';
        let posLeft = '';
        if (left && !leftCenter) {
          posLeft = isNaN(left) ? left : `${left}px`;
        } else {
          posLeft = `${Math.max(marginSize, clientVisibleWidth / 2 - boxElem.offsetWidth / 2)}px`;
        }
        if (top && !topCenter) {
          posTop = isNaN(top) ? top : `${top}px`;
        } else {
          posTop = `${Math.max(marginSize, clientVisibleHeight / 2 - boxElem.offsetHeight / 2)}px`;
        }
        boxElem.style.top = posTop;
        boxElem.style.left = posLeft;
      });
    };
    const updateStyle = () => {
      (0, _vue.nextTick)(() => {
        let offsetTop = 0;
        msgQueue.forEach(comp => {
          const boxElem = comp.getBox();
          offsetTop += _xeUtils.default.toNumber(comp.props.top);
          comp.reactData.modalTop = offsetTop;
          offsetTop += boxElem.clientHeight;
        });
      });
    };
    const removeMsgQueue = () => {
      if (msgQueue.indexOf($xemodal) > -1) {
        _xeUtils.default.remove(msgQueue, comp => comp === $xemodal);
      }
      updateStyle();
    };
    const closeModal = type => {
      const {
        remember,
        beforeHideMethod
      } = props;
      const {
        visible
      } = reactData;
      const isMsg = computeIsMsg.value;
      const params = {
        type
      };
      if (visible) {
        Promise.resolve(beforeHideMethod ? beforeHideMethod(params) : null).then(rest => {
          if (!_xeUtils.default.isError(rest)) {
            if (isMsg) {
              removeMsgQueue();
            }
            reactData.contentVisible = false;
            if (!remember) {
              reactData.zoomLocat = null;
            }
            _xeUtils.default.remove(allActiveModals, item => item === $xemodal);
            modalMethods.dispatchEvent('before-hide', params);
            setTimeout(() => {
              reactData.visible = false;
              emit('update:modelValue', false);
              modalMethods.dispatchEvent('hide', params);
            }, 200);
          }
        }).catch(e => e);
      }
      return (0, _vue.nextTick)();
    };
    const closeEvent = evnt => {
      const type = 'close';
      modalMethods.dispatchEvent(type, {
        type
      }, evnt);
      closeModal(type);
    };
    const confirmEvent = evnt => {
      const type = 'confirm';
      modalMethods.dispatchEvent(type, {
        type
      }, evnt);
      closeModal(type);
    };
    const cancelEvent = evnt => {
      const type = 'cancel';
      modalMethods.dispatchEvent(type, {
        type
      }, evnt);
      closeModal(type);
    };
    const getStorageMap = key => {
      const version = _conf.default.version;
      const rest = _xeUtils.default.toStringJSON(localStorage.getItem(key) || '');
      return rest && rest._v === version ? rest : {
        _v: version
      };
    };
    const hasPosStorage = () => {
      const {
        id,
        remember,
        storage,
        storageKey
      } = props;
      return !!(id && remember && storage && getStorageMap(storageKey)[id]);
    };
    const restorePosStorage = () => {
      const {
        id,
        remember,
        storage,
        storageKey
      } = props;
      if (id && remember && storage) {
        const posStorage = getStorageMap(storageKey)[id];
        if (posStorage) {
          const boxElem = getBox();
          const [left, top, width, height, zoomLeft, zoomTop, zoomWidth, zoomHeight] = posStorage.split(',');
          if (left) {
            boxElem.style.left = `${left}px`;
          }
          if (top) {
            boxElem.style.top = `${top}px`;
          }
          if (width) {
            boxElem.style.width = `${width}px`;
          }
          if (height) {
            boxElem.style.height = `${height}px`;
          }
          if (zoomLeft && zoomTop) {
            reactData.zoomLocat = {
              left: zoomLeft,
              top: zoomTop,
              width: zoomWidth,
              height: zoomHeight
            };
          }
        }
      }
    };
    const addMsgQueue = () => {
      if (msgQueue.indexOf($xemodal) === -1) {
        msgQueue.push($xemodal);
      }
      updateStyle();
    };
    const savePosStorage = () => {
      const {
        id,
        remember,
        storage,
        storageKey
      } = props;
      const {
        zoomLocat
      } = reactData;
      if (id && remember && storage) {
        const boxElem = getBox();
        const posStorageMap = getStorageMap(storageKey);
        posStorageMap[id] = [boxElem.style.left, boxElem.style.top, boxElem.style.width, boxElem.style.height].concat(zoomLocat ? [zoomLocat.left, zoomLocat.top, zoomLocat.width, zoomLocat.height] : []).map(val => val ? _xeUtils.default.toNumber(val) : '').join(',');
        localStorage.setItem(storageKey, _xeUtils.default.toJSONString(posStorageMap));
      }
    };
    const maximize = () => {
      return (0, _vue.nextTick)().then(() => {
        if (!reactData.zoomLocat) {
          const marginSize = Math.max(0, _xeUtils.default.toNumber(props.marginSize));
          const boxElem = getBox();
          const {
            visibleHeight,
            visibleWidth
          } = (0, _dom.getDomNode)();
          reactData.zoomLocat = {
            top: boxElem.offsetTop,
            left: boxElem.offsetLeft,
            width: boxElem.offsetWidth + (boxElem.style.width ? 0 : 1),
            height: boxElem.offsetHeight + (boxElem.style.height ? 0 : 1)
          };
          Object.assign(boxElem.style, {
            top: `${marginSize}px`,
            left: `${marginSize}px`,
            width: `${visibleWidth - marginSize * 2}px`,
            height: `${visibleHeight - marginSize * 2}px`
          });
          savePosStorage();
        }
      });
    };
    const openModal = () => {
      const {
        duration,
        remember,
        showFooter
      } = props;
      const {
        inited,
        visible
      } = reactData;
      const isMsg = computeIsMsg.value;
      if (!inited) {
        reactData.inited = true;
      }
      if (!visible) {
        if (!remember) {
          recalculate();
        }
        reactData.visible = true;
        reactData.contentVisible = false;
        updateZindex();
        allActiveModals.push($xemodal);
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
            modalMethods.dispatchEvent('show', params);
          });
        }, 10);
        if (isMsg) {
          addMsgQueue();
          if (duration !== -1) {
            setTimeout(() => closeModal('close'), _xeUtils.default.toNumber(duration));
          }
        } else {
          (0, _vue.nextTick)(() => {
            const {
              fullscreen
            } = props;
            const {
              firstOpen
            } = reactData;
            if (!remember || firstOpen) {
              updatePosition().then(() => {
                setTimeout(() => updatePosition(), 20);
              });
            }
            if (firstOpen) {
              reactData.firstOpen = false;
              if (hasPosStorage()) {
                restorePosStorage();
              } else if (fullscreen) {
                (0, _vue.nextTick)(() => maximize());
              }
            } else {
              if (fullscreen) {
                (0, _vue.nextTick)(() => maximize());
              }
            }
          });
        }
      }
      return (0, _vue.nextTick)();
    };
    const selfClickEvent = evnt => {
      const el = refElem.value;
      if (props.maskClosable && evnt.target === el) {
        const type = 'mask';
        closeModal(type);
      }
    };
    const handleGlobalKeydownEvent = evnt => {
      const isEsc = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ESCAPE);
      if (isEsc) {
        const lastModal = _xeUtils.default.max(allActiveModals, item => item.reactData.modalZindex);
        // 多个时，只关掉最上层的窗口
        if (lastModal) {
          setTimeout(() => {
            if (lastModal === $xemodal && lastModal.props.escClosable) {
              closeModal('exit');
            }
          }, 10);
        }
      }
    };
    const isMaximized = () => {
      return !!reactData.zoomLocat;
    };
    const revert = () => {
      return (0, _vue.nextTick)().then(() => {
        const {
          zoomLocat
        } = reactData;
        if (zoomLocat) {
          const boxElem = getBox();
          reactData.zoomLocat = null;
          Object.assign(boxElem.style, {
            top: `${zoomLocat.top}px`,
            left: `${zoomLocat.left}px`,
            width: `${zoomLocat.width}px`,
            height: `${zoomLocat.height}px`
          });
          savePosStorage();
        }
      });
    };
    const zoom = () => {
      if (reactData.zoomLocat) {
        return revert().then(() => isMaximized());
      }
      return maximize().then(() => isMaximized());
    };
    const toggleZoomEvent = evnt => {
      const {
        zoomLocat
      } = reactData;
      const params = {
        type: zoomLocat ? 'revert' : 'max'
      };
      return zoom().then(() => {
        modalMethods.dispatchEvent('zoom', params, evnt);
      });
    };
    const getPosition = () => {
      const isMsg = computeIsMsg.value;
      if (!isMsg) {
        const boxElem = getBox();
        if (boxElem) {
          return {
            top: boxElem.offsetTop,
            left: boxElem.offsetLeft
          };
        }
      }
      return null;
    };
    const setPosition = (top, left) => {
      const isMsg = computeIsMsg.value;
      if (!isMsg) {
        const boxElem = getBox();
        if (_xeUtils.default.isNumber(top)) {
          boxElem.style.top = `${top}px`;
        }
        if (_xeUtils.default.isNumber(left)) {
          boxElem.style.left = `${left}px`;
        }
      }
      return (0, _vue.nextTick)();
    };
    const boxMousedownEvent = () => {
      const {
        modalZindex
      } = reactData;
      if (allActiveModals.some(comp => comp.reactData.visible && comp.reactData.modalZindex > modalZindex)) {
        updateZindex();
      }
    };
    const mousedownEvent = evnt => {
      const {
        remember,
        storage
      } = props;
      const {
        zoomLocat
      } = reactData;
      const marginSize = _xeUtils.default.toNumber(props.marginSize);
      const boxElem = getBox();
      if (!zoomLocat && evnt.button === 0 && !(0, _dom.getEventTargetNode)(evnt, boxElem, 'trigger--btn').flag) {
        evnt.preventDefault();
        const domMousemove = document.onmousemove;
        const domMouseup = document.onmouseup;
        const disX = evnt.clientX - boxElem.offsetLeft;
        const disY = evnt.clientY - boxElem.offsetTop;
        const {
          visibleHeight,
          visibleWidth
        } = (0, _dom.getDomNode)();
        document.onmousemove = evnt => {
          evnt.preventDefault();
          const offsetWidth = boxElem.offsetWidth;
          const offsetHeight = boxElem.offsetHeight;
          const minX = marginSize;
          const maxX = visibleWidth - offsetWidth - marginSize - 1;
          const minY = marginSize;
          const maxY = visibleHeight - offsetHeight - marginSize - 1;
          let left = evnt.clientX - disX;
          let top = evnt.clientY - disY;
          if (left > maxX) {
            left = maxX;
          }
          if (left < minX) {
            left = minX;
          }
          if (top > maxY) {
            top = maxY;
          }
          if (top < minY) {
            top = minY;
          }
          boxElem.style.left = `${left}px`;
          boxElem.style.top = `${top}px`;
          boxElem.className = boxElem.className.replace(/\s?is--drag/, '') + ' is--drag';
          emit('move', {
            type: 'move',
            $event: evnt
          });
        };
        document.onmouseup = () => {
          document.onmousemove = domMousemove;
          document.onmouseup = domMouseup;
          if (remember && storage) {
            (0, _vue.nextTick)(() => {
              savePosStorage();
            });
          }
          setTimeout(() => {
            boxElem.className = boxElem.className.replace(/\s?is--drag/, '');
          }, 50);
        };
      }
    };
    const dragEvent = evnt => {
      evnt.preventDefault();
      const {
        remember,
        storage
      } = props;
      const {
        visibleHeight,
        visibleWidth
      } = (0, _dom.getDomNode)();
      const marginSize = _xeUtils.default.toNumber(props.marginSize);
      const targetElem = evnt.target;
      const type = targetElem.getAttribute('type');
      const minWidth = _xeUtils.default.toNumber(props.minWidth);
      const minHeight = _xeUtils.default.toNumber(props.minHeight);
      const maxWidth = visibleWidth;
      const maxHeight = visibleHeight;
      const boxElem = getBox();
      const domMousemove = document.onmousemove;
      const domMouseup = document.onmouseup;
      const clientWidth = boxElem.clientWidth;
      const clientHeight = boxElem.clientHeight;
      const disX = evnt.clientX;
      const disY = evnt.clientY;
      const offsetTop = boxElem.offsetTop;
      const offsetLeft = boxElem.offsetLeft;
      const params = {
        type: 'resize'
      };
      document.onmousemove = evnt => {
        evnt.preventDefault();
        let dragLeft;
        let dragTop;
        let width;
        let height;
        switch (type) {
          case 'wl':
            dragLeft = disX - evnt.clientX;
            width = dragLeft + clientWidth;
            if (offsetLeft - dragLeft > marginSize) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`;
                boxElem.style.left = `${offsetLeft - dragLeft}px`;
              }
            }
            break;
          case 'swst':
            dragLeft = disX - evnt.clientX;
            dragTop = disY - evnt.clientY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;
            if (offsetLeft - dragLeft > marginSize) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`;
                boxElem.style.left = `${offsetLeft - dragLeft}px`;
              }
            }
            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`;
                boxElem.style.top = `${offsetTop - dragTop}px`;
              }
            }
            break;
          case 'swlb':
            dragLeft = disX - evnt.clientX;
            dragTop = evnt.clientY - disY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;
            if (offsetLeft - dragLeft > marginSize) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`;
                boxElem.style.left = `${offsetLeft - dragLeft}px`;
              }
            }
            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`;
              }
            }
            break;
          case 'st':
            dragTop = disY - evnt.clientY;
            height = clientHeight + dragTop;
            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`;
                boxElem.style.top = `${offsetTop - dragTop}px`;
              }
            }
            break;
          case 'wr':
            dragLeft = evnt.clientX - disX;
            width = dragLeft + clientWidth;
            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`;
              }
            }
            break;
          case 'sest':
            dragLeft = evnt.clientX - disX;
            dragTop = disY - evnt.clientY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;
            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`;
              }
            }
            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`;
                boxElem.style.top = `${offsetTop - dragTop}px`;
              }
            }
            break;
          case 'selb':
            dragLeft = evnt.clientX - disX;
            dragTop = evnt.clientY - disY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;
            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`;
              }
            }
            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`;
              }
            }
            break;
          case 'sb':
            dragTop = evnt.clientY - disY;
            height = dragTop + clientHeight;
            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`;
              }
            }
            break;
        }
        boxElem.className = boxElem.className.replace(/\s?is--drag/, '') + ' is--drag';
        if (remember && storage) {
          savePosStorage();
        }
        modalMethods.dispatchEvent('resize', params, evnt);
      };
      document.onmouseup = () => {
        reactData.zoomLocat = null;
        document.onmousemove = domMousemove;
        document.onmouseup = domMouseup;
        setTimeout(() => {
          boxElem.className = boxElem.className.replace(/\s?is--drag/, '');
        }, 50);
      };
    };
    modalMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, Object.assign({
          $modal: $xemodal,
          $event: evnt
        }, params));
      },
      open: openModal,
      close() {
        return closeModal('close');
      },
      getBox,
      getPosition,
      setPosition,
      isMaximized,
      zoom,
      maximize,
      revert
    };
    Object.assign($xemodal, modalMethods);
    const renderTitles = () => {
      const {
        slots: propSlots = {},
        showClose,
        showZoom,
        title
      } = props;
      const {
        zoomLocat
      } = reactData;
      const titleSlot = slots.title || propSlots.title;
      const cornerSlot = slots.corner || propSlots.corner;
      const titVNs = [(0, _vue.h)('div', {
        class: 'vxe-modal--header-title'
      }, titleSlot ? (0, _vn.getSlotVNs)(titleSlot({
        $modal: $xemodal
      })) : title ? (0, _utils.getFuncText)(title) : _conf.default.i18n('vxe.alert.title'))];
      const rightVNs = [];
      if (cornerSlot) {
        rightVNs.push((0, _vue.h)('span', {
          class: 'vxe-modal--corner-wrapper'
        }, (0, _vn.getSlotVNs)(cornerSlot({
          $modal: $xemodal
        }))));
      }
      if (showZoom) {
        rightVNs.push((0, _vue.h)('i', {
          class: ['vxe-modal--zoom-btn', 'trigger--btn', zoomLocat ? _conf.default.icon.MODAL_ZOOM_OUT : _conf.default.icon.MODAL_ZOOM_IN],
          title: _conf.default.i18n(`vxe.modal.zoom${zoomLocat ? 'Out' : 'In'}`),
          onClick: toggleZoomEvent
        }));
      }
      if (showClose) {
        rightVNs.push((0, _vue.h)('i', {
          class: ['vxe-modal--close-btn', 'trigger--btn', _conf.default.icon.MODAL_CLOSE],
          title: _conf.default.i18n('vxe.modal.close'),
          onClick: closeEvent
        }));
      }
      titVNs.push((0, _vue.h)('div', {
        class: 'vxe-modal--header-right'
      }, rightVNs));
      return titVNs;
    };
    const renderHeaders = () => {
      const {
        slots: propSlots = {},
        showZoom,
        draggable
      } = props;
      const isMsg = computeIsMsg.value;
      const headerSlot = slots.header || propSlots.header;
      const headVNs = [];
      if (props.showHeader) {
        const headerOns = {};
        if (draggable) {
          headerOns.onMousedown = mousedownEvent;
        }
        if (showZoom && props.dblclickZoom && props.type === 'modal') {
          headerOns.onDblclick = toggleZoomEvent;
        }
        headVNs.push((0, _vue.h)('div', Object.assign({
          class: ['vxe-modal--header', {
            'is--draggable': draggable,
            'is--ellipsis': !isMsg && props.showTitleOverflow
          }]
        }, headerOns), headerSlot ? !reactData.inited || props.destroyOnClose && !reactData.visible ? [] : (0, _vn.getSlotVNs)(headerSlot({
          $modal: $xemodal
        })) : renderTitles()));
      }
      return headVNs;
    };
    const renderBodys = () => {
      const {
        slots: propSlots = {},
        status,
        message
      } = props;
      const content = props.content || message;
      const isMsg = computeIsMsg.value;
      const defaultSlot = slots.default || propSlots.default;
      const contVNs = [];
      if (status) {
        contVNs.push((0, _vue.h)('div', {
          class: 'vxe-modal--status-wrapper'
        }, [(0, _vue.h)('i', {
          class: ['vxe-modal--status-icon', props.iconStatus || _conf.default.icon[`MODAL_${status}`.toLocaleUpperCase()]]
        })]));
      }
      contVNs.push((0, _vue.h)('div', {
        class: 'vxe-modal--content'
      }, defaultSlot ? !reactData.inited || props.destroyOnClose && !reactData.visible ? [] : (0, _vn.getSlotVNs)(defaultSlot({
        $modal: $xemodal
      })) : (0, _utils.getFuncText)(content)));
      if (!isMsg) {
        /**
         * 加载中
         */
        contVNs.push((0, _vue.h)(_index.default, {
          class: 'vxe-modal--loading',
          modelValue: props.loading
        }));
      }
      return [(0, _vue.h)('div', {
        class: 'vxe-modal--body'
      }, contVNs)];
    };
    const renderBtns = () => {
      const {
        showCancelButton,
        showConfirmButton,
        type
      } = props;
      const btnVNs = [];
      if (_xeUtils.default.isBoolean(showCancelButton) ? showCancelButton : type === 'confirm') {
        btnVNs.push((0, _vue.h)(_button.default, {
          key: 1,
          ref: refCancelBtn,
          content: props.cancelButtonText || _conf.default.i18n('vxe.button.cancel'),
          onClick: cancelEvent
        }));
      }
      if (_xeUtils.default.isBoolean(showConfirmButton) ? showConfirmButton : type === 'confirm' || type === 'alert') {
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
    const renderFooters = () => {
      const {
        slots: propSlots = {}
      } = props;
      const isMsg = computeIsMsg.value;
      const footerSlot = slots.footer || propSlots.footer;
      const footVNs = [];
      if (props.showFooter) {
        footVNs.push((0, _vue.h)('div', {
          class: 'vxe-modal--footer'
        }, footerSlot ? !reactData.inited || props.destroyOnClose && !reactData.visible ? [] : (0, _vn.getSlotVNs)(footerSlot({
          $modal: $xemodal
        })) : renderBtns()));
      }
      if (!isMsg && props.resize) {
        footVNs.push((0, _vue.h)('span', {
          class: 'vxe-modal--resize'
        }, ['wl', 'wr', 'swst', 'sest', 'st', 'swlb', 'selb', 'sb'].map(type => {
          return (0, _vue.h)('span', {
            class: `${type}-resize`,
            type: type,
            onMousedown: dragEvent
          });
        })));
      }
      return footVNs;
    };
    const renderVN = () => {
      const {
        className,
        type,
        animat,
        loading,
        status,
        lockScroll,
        lockView,
        mask,
        resize
      } = props;
      const {
        inited,
        zoomLocat,
        modalTop,
        contentVisible,
        visible
      } = reactData;
      const vSize = computeSize.value;
      return (0, _vue.h)(_vue.Teleport, {
        to: 'body',
        disabled: props.transfer ? !inited : true
      }, [(0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-modal--wrapper', `type--${type}`, className || '', {
          [`size--${vSize}`]: vSize,
          [`status--${status}`]: status,
          'is--animat': animat,
          'lock--scroll': lockScroll,
          'lock--view': lockView,
          'is--resize': resize,
          'is--mask': mask,
          'is--maximize': zoomLocat,
          'is--visible': contentVisible,
          'is--active': visible,
          'is--loading': loading
        }],
        style: {
          zIndex: reactData.modalZindex,
          top: modalTop ? `${modalTop}px` : null
        },
        onClick: selfClickEvent
      }, [(0, _vue.h)('div', {
        ref: refModalBox,
        class: 'vxe-modal--box',
        onMousedown: boxMousedownEvent
      }, renderHeaders().concat(renderBodys(), renderFooters()))])]);
    };
    $xemodal.renderVN = renderVN;
    (0, _vue.watch)(() => props.width, recalculate);
    (0, _vue.watch)(() => props.height, recalculate);
    (0, _vue.watch)(() => props.modelValue, value => {
      if (value) {
        openModal();
      } else {
        closeModal('model');
      }
    });
    (0, _vue.onMounted)(() => {
      (0, _vue.nextTick)(() => {
        if (props.storage && !props.id) {
          (0, _log.errLog)('vxe.error.reqProp', ['modal.id']);
        }
        if (props.modelValue) {
          openModal();
        }
        recalculate();
      });
      if (props.escClosable) {
        _event.GlobalEvent.on($xemodal, 'keydown', handleGlobalKeydownEvent);
      }
    });
    (0, _vue.onUnmounted)(() => {
      _event.GlobalEvent.off($xemodal, 'keydown');
      removeMsgQueue();
    });
    return $xemodal;
  },
  render() {
    return this.renderVN();
  }
});