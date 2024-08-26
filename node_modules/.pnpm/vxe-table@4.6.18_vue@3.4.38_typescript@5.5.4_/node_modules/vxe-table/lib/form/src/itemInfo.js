"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemInfo = void 0;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ItemInfo {
  constructor($xeform, item) {
    Object.assign(this, {
      id: _xeUtils.default.uniqueId('item_'),
      title: item.title,
      field: item.field,
      span: item.span,
      align: item.align,
      titleAlign: item.titleAlign,
      titleWidth: item.titleWidth,
      titleColon: item.titleColon,
      titleAsterisk: item.titleAsterisk,
      titlePrefix: item.titlePrefix,
      titleSuffix: item.titleSuffix,
      titleOverflow: item.titleOverflow,
      showTitle: item.showTitle,
      resetValue: item.resetValue,
      visibleMethod: item.visibleMethod,
      visible: item.visible,
      folding: item.folding,
      collapseNode: item.collapseNode,
      className: item.className,
      contentClassName: item.contentClassName,
      contentStyle: item.contentStyle,
      titleClassName: item.titleClassName,
      titleStyle: item.titleStyle,
      itemRender: item.itemRender,
      rules: item.rules,
      // 渲染属性
      showError: false,
      errRule: null,
      slots: item.slots,
      children: []
    });
  }
  update(name, value) {
    this[name] = value;
  }
}
exports.ItemInfo = ItemInfo;