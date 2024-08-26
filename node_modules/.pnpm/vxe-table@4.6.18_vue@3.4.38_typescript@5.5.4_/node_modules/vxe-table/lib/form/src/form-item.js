"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formItemProps = exports.default = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _vXETable = require("../../v-x-e-table");
var _utils = require("../../tools/utils");
var _vn = require("../../tools/vn");
var _util = require("./util");
var _render = require("./render");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const formItemProps = exports.formItemProps = {
  title: String,
  field: String,
  span: [String, Number],
  align: String,
  titleAlign: {
    type: String,
    default: null
  },
  titleWidth: {
    type: [String, Number],
    default: null
  },
  titleColon: {
    type: Boolean,
    default: null
  },
  titleAsterisk: {
    type: Boolean,
    default: null
  },
  showTitle: {
    type: Boolean,
    default: true
  },
  vertical: {
    type: Boolean,
    default: null
  },
  className: [String, Function],
  contentClassName: [String, Function],
  contentStyle: [Object, Function],
  titleClassName: [String, Function],
  titleStyle: [Object, Function],
  titleOverflow: {
    type: [Boolean, String],
    default: null
  },
  titlePrefix: Object,
  titleSuffix: Object,
  resetValue: {
    default: null
  },
  visibleMethod: Function,
  visible: {
    type: Boolean,
    default: null
  },
  folding: Boolean,
  collapseNode: Boolean,
  itemRender: Object,
  rules: Array
};
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeFormItem',
  props: formItemProps,
  setup(props, {
    slots
  }) {
    const refElem = (0, _vue.ref)();
    const $xeform = (0, _vue.inject)('$xeform', {});
    const formGather = (0, _vue.inject)('$xeformgather', null);
    const formItem = (0, _vue.reactive)((0, _util.createItem)($xeform, props));
    const xeformitem = {
      formItem
    };
    const xeformiteminfo = {
      itemConfig: formItem
    };
    formItem.slots = slots;
    (0, _vue.provide)('$xeformiteminfo', xeformiteminfo);
    (0, _vue.provide)('$xeformitem', xeformitem);
    (0, _vue.provide)('$xeformgather', null);
    (0, _util.watchItem)(props, formItem);
    (0, _vue.onMounted)(() => {
      (0, _util.assemItem)($xeform, refElem.value, formItem, formGather);
    });
    (0, _vue.onUnmounted)(() => {
      (0, _util.destroyItem)($xeform, formItem);
    });
    const renderItem = ($xeform, item) => {
      const {
        props,
        reactData
      } = $xeform;
      const {
        data,
        rules,
        titleAlign: allTitleAlign,
        titleWidth: allTitleWidth,
        titleColon: allTitleColon,
        titleAsterisk: allTitleAsterisk,
        titleOverflow: allTitleOverflow,
        vertical: allVertical
      } = props;
      const {
        collapseAll
      } = reactData;
      const {
        computeValidOpts
      } = $xeform.getComputeMaps();
      const validOpts = computeValidOpts.value;
      const {
        slots,
        title,
        visible,
        folding,
        field,
        collapseNode,
        itemRender,
        showError,
        errRule,
        className,
        titleOverflow,
        vertical,
        showTitle,
        contentClassName,
        contentStyle,
        titleClassName,
        titleStyle
      } = item;
      const compConf = (0, _utils.isEnableConf)(itemRender) ? _vXETable.VXETable.renderer.get(itemRender.name) : null;
      const itemClassName = compConf ? compConf.itemClassName : '';
      const itemStyle = compConf ? compConf.itemStyle : null;
      const itemContentClassName = compConf ? compConf.itemContentClassName : '';
      const itemContentStyle = compConf ? compConf.itemContentStyle : null;
      const itemTitleClassName = compConf ? compConf.itemTitleClassName : '';
      const itemTitleStyle = compConf ? compConf.itemTitleStyle : null;
      const defaultSlot = slots ? slots.default : null;
      const titleSlot = slots ? slots.title : null;
      const span = item.span || props.span;
      const align = item.align || props.align;
      const titleAlign = _xeUtils.default.eqNull(item.titleAlign) ? allTitleAlign : item.titleAlign;
      const titleWidth = _xeUtils.default.eqNull(item.titleWidth) ? allTitleWidth : item.titleWidth;
      const titleColon = _xeUtils.default.eqNull(item.titleColon) ? allTitleColon : item.titleColon;
      const titleAsterisk = _xeUtils.default.eqNull(item.titleAsterisk) ? allTitleAsterisk : item.titleAsterisk;
      const itemOverflow = _xeUtils.default.isUndefined(titleOverflow) || _xeUtils.default.isNull(titleOverflow) ? allTitleOverflow : titleOverflow;
      const itemVertical = _xeUtils.default.isUndefined(vertical) || _xeUtils.default.isNull(vertical) ? allVertical : vertical;
      const ovEllipsis = itemOverflow === 'ellipsis';
      const ovTitle = itemOverflow === 'title';
      const ovTooltip = itemOverflow === true || itemOverflow === 'tooltip';
      const hasEllipsis = ovTitle || ovTooltip || ovEllipsis;
      const params = {
        data,
        field,
        property: field,
        item,
        $form: $xeform,
        $grid: $xeform.xegrid
      };
      let isRequired = false;
      if (visible === false) {
        return (0, _vue.createCommentVNode)();
      }
      if (rules) {
        const itemRules = rules[field];
        if (itemRules) {
          isRequired = itemRules.some(rule => rule.required);
        }
      }
      let contentVNs = [];
      if (defaultSlot) {
        contentVNs = $xeform.callSlot(defaultSlot, params);
      } else if (compConf && compConf.renderItemContent) {
        contentVNs = (0, _vn.getSlotVNs)(compConf.renderItemContent(itemRender, params));
      } else if (field) {
        contentVNs = [`${_xeUtils.default.get(data, field)}`];
      }
      if (collapseNode) {
        contentVNs.push((0, _vue.h)('div', {
          class: 'vxe-form--item-trigger-node',
          onClick: $xeform.toggleCollapseEvent
        }, [(0, _vue.h)('span', {
          class: 'vxe-form--item-trigger-text'
        }, collapseAll ? _conf.default.i18n('vxe.form.unfolding') : _conf.default.i18n('vxe.form.folding')), (0, _vue.h)('i', {
          class: ['vxe-form--item-trigger-icon', collapseAll ? _conf.default.icon.FORM_FOLDING : _conf.default.icon.FORM_UNFOLDING]
        })]));
      }
      if (errRule && validOpts.showMessage) {
        contentVNs.push((0, _vue.h)('div', {
          class: 'vxe-form--item-valid',
          style: errRule.maxWidth ? {
            width: `${errRule.maxWidth}px`
          } : null
        }, errRule.message));
      }
      const ons = ovTooltip ? {
        onMouseenter(evnt) {
          $xeform.triggerTitleTipEvent(evnt, params);
        },
        onMouseleave: $xeform.handleTitleTipLeaveEvent
      } : {};
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-form--item', item.id, span ? `vxe-form--item-col--${span} is--span` : '', className ? _xeUtils.default.isFunction(className) ? className(params) : className : '', itemClassName ? _xeUtils.default.isFunction(itemClassName) ? itemClassName(params) : itemClassName : '', {
          'is--title': title,
          'is--colon': titleColon,
          'is--vertical': itemVertical,
          'is--asterisk': titleAsterisk,
          'is--required': isRequired,
          'is--hidden': folding && collapseAll,
          'is--active': (0, _util.isActivetem)($xeform, item),
          'is--error': showError
        }],
        style: _xeUtils.default.isFunction(itemStyle) ? itemStyle(params) : itemStyle
      }, [(0, _vue.h)('div', {
        class: 'vxe-form--item-inner'
      }, [showTitle !== false && (title || titleSlot) ? (0, _vue.h)('div', Object.assign({
        class: ['vxe-form--item-title', titleAlign ? `align--${titleAlign}` : '', hasEllipsis ? 'is--ellipsis' : '', itemTitleClassName ? _xeUtils.default.isFunction(itemTitleClassName) ? itemTitleClassName(params) : itemTitleClassName : '', titleClassName ? _xeUtils.default.isFunction(titleClassName) ? titleClassName(params) : titleClassName : ''],
        style: Object.assign({}, _xeUtils.default.isFunction(itemTitleStyle) ? itemTitleStyle(params) : itemTitleStyle, _xeUtils.default.isFunction(titleStyle) ? titleStyle(params) : titleStyle, titleWidth ? {
          width: isNaN(titleWidth) ? titleWidth : `${titleWidth}px`
        } : null),
        title: ovTitle ? (0, _utils.getFuncText)(title) : null
      }, ons), (0, _render.renderTitle)($xeform, item)) : null, (0, _vue.h)('div', {
        class: ['vxe-form--item-content', align ? `align--${align}` : '', itemContentClassName ? _xeUtils.default.isFunction(itemContentClassName) ? itemContentClassName(params) : itemContentClassName : '', contentClassName ? _xeUtils.default.isFunction(contentClassName) ? contentClassName(params) : contentClassName : ''],
        style: Object.assign({}, _xeUtils.default.isFunction(itemContentStyle) ? itemContentStyle(params) : itemContentStyle, _xeUtils.default.isFunction(contentStyle) ? contentStyle(params) : contentStyle)
      }, contentVNs)])]);
    };
    const renderVN = () => {
      const formProps = $xeform ? $xeform.props : null;
      return formProps && formProps.customLayout ? renderItem($xeform, formItem) : (0, _vue.h)('div', {
        ref: refElem
      });
    };
    const $xeformitem = {
      renderVN
    };
    return $xeformitem;
  },
  render() {
    return this.renderVN();
  }
});