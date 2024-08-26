"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkDynamic = checkDynamic;
exports.dynamicStore = exports.dynamicApp = void 0;
var _vue = require("vue");
let dynamicContainerElem;
const dynamicStore = exports.dynamicStore = (0, _vue.reactive)({
  modals: [],
  drawers: []
});
/**
 * 动态组件
 */
const VxeDynamics = (0, _vue.defineComponent)({
  setup() {
    return () => {
      const {
        modals,
        drawers
      } = dynamicStore;
      return [modals.length ? (0, _vue.h)('div', {
        class: 'vxe-dynamics--modal'
      }, modals.map(item => (0, _vue.h)((0, _vue.resolveComponent)('vxe-modal'), item))) : (0, _vue.createCommentVNode)(), drawers.length ? (0, _vue.h)('div', {
        class: 'vxe-dynamics--drawer'
      }, drawers.map(item => (0, _vue.h)((0, _vue.resolveComponent)('vxe-drawer'), item))) : (0, _vue.createCommentVNode)()];
    };
  }
});
const dynamicApp = exports.dynamicApp = (0, _vue.createApp)(VxeDynamics);
function checkDynamic() {
  if (!dynamicContainerElem) {
    dynamicContainerElem = document.createElement('div');
    dynamicContainerElem.className = 'vxe-dynamics';
    document.body.appendChild(dynamicContainerElem);
    dynamicApp.mount(dynamicContainerElem);
  }
}