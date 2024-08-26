"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addClass = addClass;
exports.browse = void 0;
exports.getAbsolutePos = getAbsolutePos;
exports.getDomNode = getDomNode;
exports.getEventTargetNode = getEventTargetNode;
exports.getOffsetHeight = getOffsetHeight;
exports.getOffsetPos = getOffsetPos;
exports.getPaddingTopBottomSize = getPaddingTopBottomSize;
exports.getPropClass = getPropClass;
exports.hasClass = hasClass;
exports.isNodeElement = isNodeElement;
exports.isPx = isPx;
exports.isScale = isScale;
exports.removeClass = removeClass;
exports.scrollToView = scrollToView;
exports.setScrollLeft = setScrollLeft;
exports.setScrollTop = setScrollTop;
exports.triggerEvent = triggerEvent;
exports.updateCellTitle = updateCellTitle;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const reClsMap = {};
const browse = exports.browse = _xeUtils.default.browse();
function getPropClass(property, params) {
  return property ? _xeUtils.default.isFunction(property) ? property(params) : property : '';
}
function getClsRE(cls) {
  if (!reClsMap[cls]) {
    reClsMap[cls] = new RegExp(`(?:^|\\s)${cls}(?!\\S)`, 'g');
  }
  return reClsMap[cls];
}
function getNodeOffset(elem, container, rest) {
  if (elem) {
    const parentElem = elem.parentNode;
    rest.top += elem.offsetTop;
    rest.left += elem.offsetLeft;
    if (parentElem && parentElem !== document.documentElement && parentElem !== document.body) {
      rest.top -= parentElem.scrollTop;
      rest.left -= parentElem.scrollLeft;
    }
    if (container && (elem === container || elem.offsetParent === container) ? 0 : elem.offsetParent) {
      return getNodeOffset(elem.offsetParent, container, rest);
    }
  }
  return rest;
}
function isPx(val) {
  return val && /^\d+(px)?$/.test(val);
}
function isScale(val) {
  return val && /^\d+%$/.test(val);
}
function hasClass(elem, cls) {
  return elem && elem.className && elem.className.match && elem.className.match(getClsRE(cls));
}
function removeClass(elem, cls) {
  if (elem && hasClass(elem, cls)) {
    elem.className = elem.className.replace(getClsRE(cls), '');
  }
}
function addClass(elem, cls) {
  if (elem && !hasClass(elem, cls)) {
    removeClass(elem, cls);
    elem.className = `${elem.className} ${cls}`;
  }
}
function getDomNode() {
  const documentElement = document.documentElement;
  const bodyElem = document.body;
  return {
    scrollTop: documentElement.scrollTop || bodyElem.scrollTop,
    scrollLeft: documentElement.scrollLeft || bodyElem.scrollLeft,
    visibleHeight: documentElement.clientHeight || bodyElem.clientHeight,
    visibleWidth: documentElement.clientWidth || bodyElem.clientWidth
  };
}
function getOffsetHeight(elem) {
  return elem ? elem.offsetHeight : 0;
}
function getPaddingTopBottomSize(elem) {
  if (elem) {
    const computedStyle = getComputedStyle(elem);
    const paddingTop = _xeUtils.default.toNumber(computedStyle.paddingTop);
    const paddingBottom = _xeUtils.default.toNumber(computedStyle.paddingBottom);
    return paddingTop + paddingBottom;
  }
  return 0;
}
function setScrollTop(elem, scrollTop) {
  if (elem) {
    elem.scrollTop = scrollTop;
  }
}
function setScrollLeft(elem, scrollLeft) {
  if (elem) {
    elem.scrollLeft = scrollLeft;
  }
}
// export function setScrollLeftAndTop (elem: HTMLElement | null, scrollLeft: number, scrollTop: number) {
//   if (elem) {
//     elem.scrollLeft = scrollLeft
//     elem.scrollTop = scrollTop
//   }
// }
function updateCellTitle(overflowElem, column) {
  const content = column.type === 'html' ? overflowElem.innerText : overflowElem.textContent;
  if (overflowElem.getAttribute('title') !== content) {
    overflowElem.setAttribute('title', content);
  }
}
/**
 * 检查触发源是否属于目标节点
 */
function getEventTargetNode(evnt, container, queryCls, queryMethod) {
  let targetElem;
  let target = evnt.target.shadowRoot && evnt.composed ? evnt.composedPath()[0] || evnt.target : evnt.target;
  while (target && target.nodeType && target !== document) {
    if (queryCls && hasClass(target, queryCls) && (!queryMethod || queryMethod(target))) {
      targetElem = target;
    } else if (target === container) {
      return {
        flag: queryCls ? !!targetElem : true,
        container,
        targetElem: targetElem
      };
    }
    target = target.parentNode;
  }
  return {
    flag: false
  };
}
/**
 * 获取元素相对于 document 的位置
 */
function getOffsetPos(elem, container) {
  return getNodeOffset(elem, container, {
    left: 0,
    top: 0
  });
}
function getAbsolutePos(elem) {
  const bounding = elem.getBoundingClientRect();
  const boundingTop = bounding.top;
  const boundingLeft = bounding.left;
  const {
    scrollTop,
    scrollLeft,
    visibleHeight,
    visibleWidth
  } = getDomNode();
  return {
    boundingTop,
    top: scrollTop + boundingTop,
    boundingLeft,
    left: scrollLeft + boundingLeft,
    visibleHeight,
    visibleWidth
  };
}
const scrollIntoViewIfNeeded = 'scrollIntoViewIfNeeded';
const scrollIntoView = 'scrollIntoView';
function scrollToView(elem) {
  if (elem) {
    if (elem[scrollIntoViewIfNeeded]) {
      elem[scrollIntoViewIfNeeded]();
    } else if (elem[scrollIntoView]) {
      elem[scrollIntoView]();
    }
  }
}
function triggerEvent(targetElem, type) {
  if (targetElem) {
    targetElem.dispatchEvent(new Event(type));
  }
}
function isNodeElement(elem) {
  return elem && elem.nodeType === 1;
}