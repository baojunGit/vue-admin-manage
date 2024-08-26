"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _utils = require("../../tools/utils");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeTableMenuPanel',
  setup(props, context) {
    const xID = _xeUtils.default.uniqueId();
    const $xetable = (0, _vue.inject)('$xetable', {});
    const {
      reactData: tableReactData
    } = $xetable;
    const refElem = (0, _vue.ref)();
    const refMaps = {
      refElem
    };
    const $xemenupanel = {
      xID,
      props,
      context,
      getRefMaps: () => refMaps
    };
    const renderVN = () => {
      const {
        ctxMenuStore
      } = tableReactData;
      const {
        computeMenuOpts
      } = $xetable.getComputeMaps();
      const menuOpts = computeMenuOpts.value;
      return (0, _vue.h)(_vue.Teleport, {
        to: 'body',
        disabled: false
      }, [(0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-table--context-menu-wrapper', menuOpts.className, {
          'is--visible': ctxMenuStore.visible
        }],
        style: ctxMenuStore.style
      }, ctxMenuStore.list.map((options, gIndex) => {
        return options.every(item => item.visible === false) ? (0, _vue.createCommentVNode)() : (0, _vue.h)('ul', {
          class: 'vxe-context-menu--option-wrapper',
          key: gIndex
        }, options.map((item, index) => {
          const hasChildMenus = item.children && item.children.some(child => child.visible !== false);
          return item.visible === false ? null : (0, _vue.h)('li', {
            class: [item.className, {
              'link--disabled': item.disabled,
              'link--active': item === ctxMenuStore.selected
            }],
            key: `${gIndex}_${index}`
          }, [(0, _vue.h)('a', {
            class: 'vxe-context-menu--link',
            onClick(evnt) {
              $xetable.ctxMenuLinkEvent(evnt, item);
            },
            onMouseover(evnt) {
              $xetable.ctxMenuMouseoverEvent(evnt, item);
            },
            onMouseout(evnt) {
              $xetable.ctxMenuMouseoutEvent(evnt, item);
            }
          }, [(0, _vue.h)('i', {
            class: ['vxe-context-menu--link-prefix', item.prefixIcon]
          }), (0, _vue.h)('span', {
            class: 'vxe-context-menu--link-content'
          }, (0, _utils.getFuncText)(item.name)), (0, _vue.h)('i', {
            class: ['vxe-context-menu--link-suffix', hasChildMenus ? item.suffixIcon || 'suffix--haschild' : item.suffixIcon]
          })]), hasChildMenus ? (0, _vue.h)('ul', {
            class: ['vxe-table--context-menu-clild-wrapper', {
              'is--show': item === ctxMenuStore.selected && ctxMenuStore.showChild
            }]
          }, item.children.map((child, cIndex) => {
            return child.visible === false ? null : (0, _vue.h)('li', {
              class: [child.className, {
                'link--disabled': child.disabled,
                'link--active': child === ctxMenuStore.selectChild
              }],
              key: `${gIndex}_${index}_${cIndex}`
            }, [(0, _vue.h)('a', {
              class: 'vxe-context-menu--link',
              onClick(evnt) {
                $xetable.ctxMenuLinkEvent(evnt, child);
              },
              onMouseover(evnt) {
                $xetable.ctxMenuMouseoverEvent(evnt, item, child);
              },
              onMouseout(evnt) {
                $xetable.ctxMenuMouseoutEvent(evnt, item);
              }
            }, [(0, _vue.h)('i', {
              class: ['vxe-context-menu--link-prefix', child.prefixIcon]
            }), (0, _vue.h)('span', {
              class: 'vxe-context-menu--link-content'
            }, (0, _utils.getFuncText)(child.name))])]);
          })) : null]);
        }));
      }))]);
    };
    $xemenupanel.renderVN = renderVN;
    return $xemenupanel;
  },
  render() {
    return this.renderVN();
  }
});