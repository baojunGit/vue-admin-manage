"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawer = exports.default = exports.VxeDrawer = exports.Drawer = void 0;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _modal = _interopRequireWildcard(require("./src/modal"));
var _vXETable = require("../v-x-e-table");
var _dynamics = require("../dynamics");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function openDrawer(options) {
  // 使用动态组件渲染动态弹框
  (0, _dynamics.checkDynamic)();
  return new Promise(resolve => {
    if (options && options.id && _modal.allActiveDrawers.some(comp => comp.props.id === options.id)) {
      resolve('exist');
    } else {
      const _onHide = options.onHide;
      const drawerOpts = Object.assign(options, {
        key: _xeUtils.default.uniqueId(),
        modelValue: true,
        onHide(params) {
          const drawerList = _dynamics.dynamicStore.drawers;
          if (_onHide) {
            _onHide(params);
          }
          _dynamics.dynamicStore.drawers = drawerList.filter(item => item.key !== drawerOpts.key);
          resolve(params.type);
        }
      });
      _dynamics.dynamicStore.drawers.push(drawerOpts);
    }
  });
}
function getDrawer(id) {
  return _xeUtils.default.find(_modal.allActiveDrawers, $drawer => $drawer.props.id === id);
}
/**
 * 全局关闭动态的活动窗口（只能用于关闭动态的创建的活动窗口）
 * 如果传 id 则关闭指定的窗口
 * 如果不传则关闭所有窗口
 */
function closeDrawer(id) {
  const drawers = id ? [getDrawer(id)] : _modal.allActiveDrawers;
  const restPromises = [];
  drawers.forEach($drawer => {
    if ($drawer) {
      restPromises.push($drawer.close());
    }
  });
  return Promise.all(restPromises);
}
const DrawerController = {
  get: getDrawer,
  close: closeDrawer,
  open: openDrawer
};
const drawer = exports.drawer = DrawerController;
const VxeDrawer = exports.VxeDrawer = Object.assign(_modal.default, {
  install: function (app) {
    app.component(_modal.default.name, _modal.default);
    _vXETable.VXETable.drawer = DrawerController;
  }
});
_dynamics.dynamicApp.component(_modal.default.name, _modal.default);
const Drawer = exports.Drawer = VxeDrawer;
var _default = exports.default = VxeDrawer;