"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assemItem = assemItem;
exports.createItem = createItem;
exports.destroyItem = destroyItem;
exports.handleFieldOrItem = handleFieldOrItem;
exports.isActivetem = isActivetem;
exports.isFormItem = isFormItem;
exports.isHiddenItem = isHiddenItem;
exports.watchItem = watchItem;
var _vue = require("vue");
var _vXETable = require("../../v-x-e-table");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _itemInfo = require("./itemInfo");
var _utils = require("../../tools/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function isFormItem(item) {
  return item instanceof _itemInfo.ItemInfo;
}
function createItem($xeform, _vm) {
  return isFormItem(_vm) ? _vm : new _itemInfo.ItemInfo($xeform, _vm);
}
function handleFieldOrItem($xeform, fieldOrItem) {
  if (fieldOrItem) {
    return _xeUtils.default.isString(fieldOrItem) ? $xeform.getItemByField(fieldOrItem) : fieldOrItem;
  }
  return null;
}
function isHiddenItem($xeform, formItem) {
  const {
    reactData
  } = $xeform;
  const {
    collapseAll
  } = reactData;
  const {
    folding,
    visible
  } = formItem;
  return visible === false || folding && collapseAll;
}
function isActivetem($xeform, formItem) {
  let {
    visibleMethod,
    itemRender,
    visible,
    field
  } = formItem;
  if (visible === false) {
    return visible;
  }
  const compConf = (0, _utils.isEnableConf)(itemRender) ? _vXETable.VXETable.renderer.get(itemRender.name) : null;
  if (!visibleMethod && compConf && compConf.itemVisibleMethod) {
    visibleMethod = compConf.itemVisibleMethod;
  }
  if (!visibleMethod) {
    return true;
  }
  const {
    data
  } = $xeform.props;
  return visibleMethod({
    data,
    field,
    property: field,
    item: formItem,
    $form: $xeform,
    $grid: $xeform.xegrid
  });
}
function watchItem(props, formItem) {
  Object.keys(props).forEach(name => {
    (0, _vue.watch)(() => props[name], value => {
      formItem.update(name, value);
    });
  });
}
function assemItem($xeform, el, formItem, formGather) {
  const {
    reactData
  } = $xeform;
  const {
    staticItems
  } = reactData;
  const parentElem = el.parentNode;
  const parentItem = formGather ? formGather.formItem : null;
  const parentItems = parentItem ? parentItem.children : staticItems;
  if (parentElem) {
    parentItems.splice(_xeUtils.default.arrayIndexOf(parentElem.children, el), 0, formItem);
    reactData.staticItems = staticItems.slice(0);
  }
}
function destroyItem($xeform, formItem) {
  const {
    reactData
  } = $xeform;
  const {
    staticItems
  } = reactData;
  const index = _xeUtils.default.findIndexOf(staticItems, item => item.id === formItem.id);
  if (index > -1) {
    staticItems.splice(index, 1);
  }
  reactData.staticItems = staticItems.slice(0);
}