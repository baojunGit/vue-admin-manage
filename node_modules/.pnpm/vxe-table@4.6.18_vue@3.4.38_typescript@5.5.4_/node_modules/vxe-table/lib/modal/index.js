"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modal = exports.default = exports.VxeModal = exports.Modal = void 0;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _modal = _interopRequireWildcard(require("./src/modal"));
var _vXETable = require("../v-x-e-table");
var _dynamics = require("../dynamics");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function openModal(options) {
  // 使用动态组件渲染动态弹框
  (0, _dynamics.checkDynamic)();
  return new Promise(resolve => {
    if (options && options.id && _modal.allActiveModals.some(comp => comp.props.id === options.id)) {
      resolve('exist');
    } else {
      const _onHide = options.onHide;
      const modalOpts = Object.assign(options, {
        key: _xeUtils.default.uniqueId(),
        modelValue: true,
        onHide(params) {
          const modalList = _dynamics.dynamicStore.modals;
          if (_onHide) {
            _onHide(params);
          }
          _dynamics.dynamicStore.modals = modalList.filter(item => item.key !== modalOpts.key);
          resolve(params.type);
        }
      });
      _dynamics.dynamicStore.modals.push(modalOpts);
    }
  });
}
function getModal(id) {
  return _xeUtils.default.find(_modal.allActiveModals, $modal => $modal.props.id === id);
}
/**
 * 全局关闭动态的活动窗口（只能用于关闭动态的创建的活动窗口）
 * 如果传 id 则关闭指定的窗口
 * 如果不传则关闭所有窗口
 */
function closeModal(id) {
  const modals = id ? [getModal(id)] : _modal.allActiveModals;
  const restPromises = [];
  modals.forEach($modal => {
    if ($modal) {
      restPromises.push($modal.close());
    }
  });
  return Promise.all(restPromises);
}
function handleOpen(defOpts, content, title, options) {
  let opts;
  if (_xeUtils.default.isObject(content)) {
    opts = content;
  } else {
    opts = {
      content: _xeUtils.default.toValueString(content),
      title
    };
  }
  return openModal(Object.assign(Object.assign(Object.assign({}, defOpts), options), opts));
}
function openAlert(content, title, options) {
  return handleOpen({
    type: 'alert',
    showFooter: true
  }, content, title, options);
}
function openConfirm(content, title, options) {
  return handleOpen({
    type: 'confirm',
    status: 'question',
    showFooter: true
  }, content, title, options);
}
function openMessage(content, options) {
  return handleOpen({
    type: 'message',
    mask: false,
    lockView: false,
    showHeader: false
  }, content, '', options);
}
const ModalController = {
  get: getModal,
  close: closeModal,
  open: openModal,
  alert: openAlert,
  confirm: openConfirm,
  message: openMessage
};
const modal = exports.modal = ModalController;
const VxeModal = exports.VxeModal = Object.assign(_modal.default, {
  install: function (app) {
    app.component(_modal.default.name, _modal.default);
    _vXETable.VXETable.modal = ModalController;
  }
});
const Modal = exports.Modal = VxeModal;
_dynamics.dynamicApp.component(_modal.default.name, _modal.default);
var _default = exports.default = VxeModal;