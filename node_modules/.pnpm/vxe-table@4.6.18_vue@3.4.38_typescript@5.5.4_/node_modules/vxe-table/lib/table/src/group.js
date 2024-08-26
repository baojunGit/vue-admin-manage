"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _column = require("./column");
var _util = require("../../table/src/util");
var _cell = _interopRequireDefault(require("../../table/src/cell"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeColgroup',
  props: _column.columnProps,
  setup(props, {
    slots
  }) {
    const refElem = (0, _vue.ref)();
    const $xetable = (0, _vue.inject)('$xetable', {});
    const colgroup = (0, _vue.inject)('xecolgroup', null);
    const column = _cell.default.createColumn($xetable, props);
    const columnSlots = {};
    if (slots.header) {
      columnSlots.header = slots.header;
    }
    const xecolumn = {
      column
    };
    column.slots = columnSlots;
    column.children = [];
    (0, _vue.provide)('xecolgroup', xecolumn);
    (0, _vue.provide)('$xegrid', null);
    (0, _util.watchColumn)($xetable, props, column);
    (0, _vue.onMounted)(() => {
      (0, _util.assemColumn)($xetable, refElem.value, column, colgroup);
    });
    (0, _vue.onUnmounted)(() => {
      (0, _util.destroyColumn)($xetable, column);
    });
    const renderVN = () => {
      return (0, _vue.h)('div', {
        ref: refElem
      }, slots.default ? slots.default() : []);
    };
    return renderVN;
  }
});