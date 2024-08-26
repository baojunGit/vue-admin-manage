"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasEventKey = exports.GlobalEvent = exports.EVENT_KEYS = void 0;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _dom = require("./dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const EVENT_KEYS = exports.EVENT_KEYS = {
  F2: 'F2',
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  TAB: 'Tab',
  DELETE: 'Delete',
  BACKSPACE: 'Backspace',
  SPACEBAR: ' ',
  CONTEXT_MENU: 'ContextMenu',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown'
};
const convertEventKeys = {
  ' ': 'Spacebar',
  Apps: EVENT_KEYS.CONTEXT_MENU,
  Del: EVENT_KEYS.DELETE,
  Up: EVENT_KEYS.ARROW_UP,
  Down: EVENT_KEYS.ARROW_DOWN,
  Left: EVENT_KEYS.ARROW_LEFT,
  Right: EVENT_KEYS.ARROW_RIGHT
};
// 监听全局事件
const wheelName = _dom.browse.firefox ? 'DOMMouseScroll' : 'mousewheel';
const eventStore = [];
const hasEventKey = (evnt, targetKey) => {
  const {
    key
  } = evnt;
  targetKey = targetKey.toLowerCase();
  return key ? targetKey === key.toLowerCase() || !!(convertEventKeys[key] && convertEventKeys[key].toLowerCase() === targetKey) : false;
};
exports.hasEventKey = hasEventKey;
function triggerEvent(evnt) {
  const isWheel = evnt.type === wheelName;
  eventStore.forEach(({
    type,
    cb
  }) => {
    // 如果被取消冒泡，不再执行
    if (!evnt.cancelBubble) {
      if (type === evnt.type || isWheel && type === 'mousewheel') {
        cb(evnt);
      }
    }
  });
}
const GlobalEvent = exports.GlobalEvent = {
  on(comp, type, cb) {
    eventStore.push({
      comp,
      type,
      cb
    });
  },
  off(comp, type) {
    _xeUtils.default.remove(eventStore, item => item.comp === comp && item.type === type);
  },
  trigger: triggerEvent,
  eqKeypad(evnt, keyVal) {
    const {
      key
    } = evnt;
    if (keyVal.toLowerCase() === key.toLowerCase()) {
      return true;
    }
    return false;
  }
};
if (_dom.browse.isDoc) {
  if (!_dom.browse.msie) {
    window.addEventListener('copy', triggerEvent, false);
    window.addEventListener('cut', triggerEvent, false);
    window.addEventListener('paste', triggerEvent, false);
  }
  document.addEventListener('keydown', triggerEvent, false);
  document.addEventListener('contextmenu', triggerEvent, false);
  window.addEventListener('mousedown', triggerEvent, false);
  window.addEventListener('blur', triggerEvent, false);
  window.addEventListener('resize', triggerEvent, false);
  window.addEventListener(wheelName, _xeUtils.default.throttle(triggerEvent, 100, {
    leading: true,
    trailing: false
  }), {
    passive: true,
    capture: false
  });
}