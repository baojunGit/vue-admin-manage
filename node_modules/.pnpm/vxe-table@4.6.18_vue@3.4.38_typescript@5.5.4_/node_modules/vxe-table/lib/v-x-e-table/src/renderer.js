"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderer = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _conf = _interopRequireDefault(require("./conf"));
var _util = require("../../table/src/util");
var _utils = require("../../tools/utils");
var _log = require("../../tools/log");
var _vn = require("../../tools/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const componentDefaultModelProp = 'modelValue';
const defaultCompProps = {
  transfer: true
};
function getModelEvent(renderOpts) {
  switch (renderOpts.name) {
    case 'input':
    case 'textarea':
      return 'input';
  }
  return 'update:modelValue';
}
function getChangeEvent(renderOpts) {
  switch (renderOpts.name) {
    case 'input':
    case 'textarea':
    case 'VxeInput':
    case 'VxeTextarea':
    case '$input':
    case '$textarea':
      return 'input';
  }
  return 'change';
}
function parseDate(value, props) {
  return value && props.valueFormat ? _xeUtils.default.toStringDate(value, props.valueFormat) : value;
}
function getFormatDate(value, props, defaultFormat) {
  const {
    dateConfig = {}
  } = props;
  return _xeUtils.default.toDateString(parseDate(value, props), dateConfig.labelFormat || defaultFormat);
}
function getLabelFormatDate(value, props) {
  return getFormatDate(value, props, _conf.default.i18n(`vxe.input.date.labelFormat.${props.type}`));
}
/**
 * 已废弃
 * @deprecated
 */
function getOldComponentName(name) {
  return `vxe-${name.replace('$', '')}`;
}
function getDefaultComponent({
  name
}) {
  return (0, _vue.resolveComponent)(name);
}
/**
 * 已废弃
 * @deprecated
 */
function getOldComponent({
  name
}) {
  return (0, _vue.resolveComponent)(getOldComponentName(name));
}
function handleConfirmFilter(params, checked, option) {
  const {
    $panel
  } = params;
  $panel.changeOption({}, checked, option);
}
function getNativeAttrs(renderOpts) {
  let {
    name,
    attrs
  } = renderOpts;
  if (name === 'input') {
    attrs = Object.assign({
      type: 'text'
    }, attrs);
  }
  return attrs;
}
function getInputImmediateModel(renderOpts) {
  const {
    name,
    immediate,
    props
  } = renderOpts;
  if (!immediate) {
    if (name === 'VxeInput' || name === '$input') {
      const {
        type
      } = props || {};
      return !(!type || type === 'text' || type === 'number' || type === 'integer' || type === 'float');
    }
    if (name === 'input' || name === 'textarea' || name === '$textarea') {
      return false;
    }
    return true;
  }
  return immediate;
}
function getCellEditProps(renderOpts, params, value, defaultProps) {
  return _xeUtils.default.assign({
    immediate: getInputImmediateModel(renderOpts)
  }, defaultCompProps, defaultProps, renderOpts.props, {
    [componentDefaultModelProp]: value
  });
}
function getCellEditFilterProps(renderOpts, params, value, defaultProps) {
  return _xeUtils.default.assign({}, defaultCompProps, defaultProps, renderOpts.props, {
    [componentDefaultModelProp]: value
  });
}
function getComponentFormItemProps(renderOpts, params, value, defaultProps) {
  return _xeUtils.default.assign({}, defaultCompProps, defaultProps, renderOpts.props, {
    [componentDefaultModelProp]: value
  });
}
function isImmediateCell(renderOpts, params) {
  return params.$type === 'cell' || getInputImmediateModel(renderOpts);
}
function getCellLabelVNs(renderOpts, params, cellLabel) {
  const {
    placeholder
  } = renderOpts;
  return [(0, _vue.h)('span', {
    class: 'vxe-cell--label'
  }, placeholder && (0, _utils.isEmptyValue)(cellLabel) ? [(0, _vue.h)('span', {
    class: 'vxe-cell--placeholder'
  }, (0, _utils.formatText)((0, _utils.getFuncText)(placeholder), 1))] : (0, _utils.formatText)(cellLabel, 1))];
}
/**
 * 原生事件处理
 * @param renderOpts
 * @param params
 * @param modelFunc
 * @param changeFunc
 */
function getElementOns(renderOpts, params, modelFunc, changeFunc) {
  const {
    events
  } = renderOpts;
  const modelEvent = getModelEvent(renderOpts);
  const changeEvent = getChangeEvent(renderOpts);
  const isSameEvent = changeEvent === modelEvent;
  const ons = {};
  if (events) {
    _xeUtils.default.objectEach(events, (func, key) => {
      ons[(0, _vn.getOnName)(key)] = function (...args) {
        func(params, ...args);
      };
    });
  }
  if (modelFunc) {
    ons[(0, _vn.getOnName)(modelEvent)] = function (targetEvnt) {
      modelFunc(targetEvnt);
      if (isSameEvent && changeFunc) {
        changeFunc(targetEvnt);
      }
      if (events && events[modelEvent]) {
        events[modelEvent](params, targetEvnt);
      }
    };
  }
  if (!isSameEvent && changeFunc) {
    ons[(0, _vn.getOnName)(changeEvent)] = function (...args) {
      changeFunc(...args);
      if (events && events[changeEvent]) {
        events[changeEvent](params, ...args);
      }
    };
  }
  return ons;
}
/**
 * 组件事件处理
 * @param renderOpts
 * @param params
 * @param modelFunc
 * @param changeFunc
 */
function getComponentOns(renderOpts, params, modelFunc, changeFunc) {
  const {
    events
  } = renderOpts;
  const modelEvent = getModelEvent(renderOpts);
  const changeEvent = getChangeEvent(renderOpts);
  const ons = {};
  _xeUtils.default.objectEach(events, (func, key) => {
    ons[(0, _vn.getOnName)(key)] = function (...args) {
      if (process.env.NODE_ENV === 'development') {
        if (!_xeUtils.default.isFunction(func)) {
          (0, _log.errLog)('vxe.error.errFunc', [func]);
        }
      }
      func(params, ...args);
    };
  });
  if (modelFunc) {
    ons[(0, _vn.getOnName)(modelEvent)] = function (targetEvnt) {
      modelFunc(targetEvnt);
      if (events && events[modelEvent]) {
        events[modelEvent](params, targetEvnt);
      }
    };
  }
  if (changeFunc) {
    ons[(0, _vn.getOnName)(changeEvent)] = function (...args) {
      changeFunc(...args);
      if (events && events[changeEvent]) {
        events[changeEvent](params, ...args);
      }
    };
  }
  return ons;
}
function getEditOns(renderOpts, params) {
  const {
    $table,
    row,
    column
  } = params;
  const {
    name
  } = renderOpts;
  const {
    model
  } = column;
  const isImmediate = isImmediateCell(renderOpts, params);
  return getComponentOns(renderOpts, params, cellValue => {
    // 处理 model 值双向绑定
    if (isImmediate) {
      (0, _util.setCellValue)(row, column, cellValue);
    } else {
      model.update = true;
      model.value = cellValue;
    }
  }, eventParams => {
    // 处理 change 事件相关逻辑
    if (!isImmediate && ['VxeInput', 'VxeTextarea', '$input', '$textarea'].includes(name)) {
      const cellValue = eventParams.value;
      model.update = true;
      model.value = cellValue;
      $table.updateStatus(params, cellValue);
    } else {
      $table.updateStatus(params);
    }
  });
}
function getFilterOns(renderOpts, params, option) {
  return getComponentOns(renderOpts, params, value => {
    // 处理 model 值双向绑定
    option.data = value;
  }, () => {
    handleConfirmFilter(params, !_xeUtils.default.eqNull(option.data), option);
  });
}
function getItemOns(renderOpts, params) {
  const {
    $form,
    data,
    property
  } = params;
  return getComponentOns(renderOpts, params, value => {
    // 处理 model 值双向绑定
    _xeUtils.default.set(data, property, value);
  }, () => {
    // 处理 change 事件相关逻辑
    $form.updateStatus(params);
  });
}
function getNativeEditOns(renderOpts, params) {
  const {
    $table,
    row,
    column
  } = params;
  const {
    model
  } = column;
  return getElementOns(renderOpts, params, evnt => {
    // 处理 model 值双向绑定
    const cellValue = evnt.target.value;
    if (isImmediateCell(renderOpts, params)) {
      (0, _util.setCellValue)(row, column, cellValue);
    } else {
      model.update = true;
      model.value = cellValue;
    }
  }, evnt => {
    // 处理 change 事件相关逻辑
    const cellValue = evnt.target.value;
    $table.updateStatus(params, cellValue);
  });
}
function getNativeFilterOns(renderOpts, params, option) {
  return getElementOns(renderOpts, params, evnt => {
    // 处理 model 值双向绑定
    option.data = evnt.target.value;
  }, () => {
    handleConfirmFilter(params, !_xeUtils.default.eqNull(option.data), option);
  });
}
function getNativeItemOns(renderOpts, params) {
  const {
    $form,
    data,
    property
  } = params;
  return getElementOns(renderOpts, params, evnt => {
    // 处理 model 值双向绑定
    const itemValue = evnt.target.value;
    _xeUtils.default.set(data, property, itemValue);
  }, () => {
    // 处理 change 事件相关逻辑
    $form.updateStatus(params);
  });
}
/**
 * 单元格可编辑渲染-原生的标签
 * input、textarea、select
 */
function nativeEditRender(renderOpts, params) {
  const {
    row,
    column
  } = params;
  const {
    name
  } = renderOpts;
  const cellValue = isImmediateCell(renderOpts, params) ? (0, _util.getCellValue)(row, column) : column.model.value;
  return [(0, _vue.h)(name, Object.assign(Object.assign(Object.assign({
    class: `vxe-default-${name}`
  }, getNativeAttrs(renderOpts)), {
    value: cellValue
  }), getNativeEditOns(renderOpts, params)))];
}
function defaultCellRender(renderOpts, params) {
  return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getCellEditProps(renderOpts, params, null)), getComponentOns(renderOpts, params)))];
}
function defaultEditRender(renderOpts, params) {
  const {
    row,
    column
  } = params;
  const cellValue = (0, _util.getCellValue)(row, column);
  return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getCellEditProps(renderOpts, params, cellValue)), getEditOns(renderOpts, params)))];
}
/**
 * 已废弃
 * @deprecated
 */
function oldEditRender(renderOpts, params) {
  const {
    row,
    column
  } = params;
  const cellValue = (0, _util.getCellValue)(row, column);
  return [(0, _vue.h)(getOldComponent(renderOpts), Object.assign(Object.assign({}, getCellEditProps(renderOpts, params, cellValue)), getEditOns(renderOpts, params)))];
}
/**
 * 已废弃
 * @deprecated
 */
function oldButtonEditRender(renderOpts, params) {
  return [(0, _vue.h)((0, _vue.resolveComponent)('vxe-button'), Object.assign(Object.assign({}, getCellEditProps(renderOpts, params, null)), getComponentOns(renderOpts, params)))];
}
/**
 * 已废弃
 * @deprecated
 */
function oldButtonsEditRender(renderOpts, params) {
  return renderOpts.children.map(childRenderOpts => oldButtonEditRender(childRenderOpts, params)[0]);
}
function renderNativeOptgroups(renderOpts, params, renderOptionsMethods) {
  const {
    optionGroups,
    optionGroupProps = {}
  } = renderOpts;
  const groupOptions = optionGroupProps.options || 'options';
  const groupLabel = optionGroupProps.label || 'label';
  return optionGroups.map((group, gIndex) => {
    return (0, _vue.h)('optgroup', {
      key: gIndex,
      label: group[groupLabel]
    }, renderOptionsMethods(group[groupOptions], renderOpts, params));
  });
}
/**
 * 渲染原生的 option 标签
 */
function renderNativeOptions(options, renderOpts, params) {
  const {
    optionProps = {}
  } = renderOpts;
  const {
    row,
    column
  } = params;
  const labelProp = optionProps.label || 'label';
  const valueProp = optionProps.value || 'value';
  const disabledProp = optionProps.disabled || 'disabled';
  const cellValue = isImmediateCell(renderOpts, params) ? (0, _util.getCellValue)(row, column) : column.model.value;
  return options.map((option, oIndex) => {
    return (0, _vue.h)('option', {
      key: oIndex,
      value: option[valueProp],
      disabled: option[disabledProp],
      /* eslint-disable eqeqeq */
      selected: option[valueProp] == cellValue
    }, option[labelProp]);
  });
}
function nativeFilterRender(renderOpts, params) {
  const {
    column
  } = params;
  const {
    name
  } = renderOpts;
  const attrs = getNativeAttrs(renderOpts);
  return column.filters.map((option, oIndex) => {
    return (0, _vue.h)(name, Object.assign(Object.assign(Object.assign({
      key: oIndex,
      class: `vxe-default-${name}`
    }, attrs), {
      value: option.data
    }), getNativeFilterOns(renderOpts, params, option)));
  });
}
function defaultFilterRender(renderOpts, params) {
  const {
    column
  } = params;
  return column.filters.map((option, oIndex) => {
    const optionValue = option.data;
    return (0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({
      key: oIndex
    }, getCellEditFilterProps(renderOpts, renderOpts, optionValue)), getFilterOns(renderOpts, params, option)));
  });
}
/**
 * 已废弃
 * @deprecated
 */
function oldFilterRender(renderOpts, params) {
  const {
    column
  } = params;
  return column.filters.map((option, oIndex) => {
    const optionValue = option.data;
    return (0, _vue.h)(getOldComponent(renderOpts), Object.assign(Object.assign({
      key: oIndex
    }, getCellEditFilterProps(renderOpts, renderOpts, optionValue)), getFilterOns(renderOpts, params, option)));
  });
}
function handleFilterMethod({
  option,
  row,
  column
}) {
  const {
    data
  } = option;
  const cellValue = _xeUtils.default.get(row, column.property);
  /* eslint-disable eqeqeq */
  return cellValue == data;
}
function nativeSelectEditRender(renderOpts, params) {
  return [(0, _vue.h)('select', Object.assign(Object.assign({
    class: 'vxe-default-select'
  }, getNativeAttrs(renderOpts)), getNativeEditOns(renderOpts, params)), renderOpts.optionGroups ? renderNativeOptgroups(renderOpts, params, renderNativeOptions) : renderNativeOptions(renderOpts.options, renderOpts, params))];
}
function defaultSelectEditRender(renderOpts, params) {
  const {
    row,
    column
  } = params;
  const {
    options,
    optionProps,
    optionGroups,
    optionGroupProps
  } = renderOpts;
  const cellValue = (0, _util.getCellValue)(row, column);
  return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getCellEditProps(renderOpts, params, cellValue, {
    options,
    optionProps,
    optionGroups,
    optionGroupProps
  })), getEditOns(renderOpts, params)))];
}
/**
 * 已废弃
 * @deprecated
 */
function oldSelectEditRender(renderOpts, params) {
  const {
    row,
    column
  } = params;
  const {
    options,
    optionProps,
    optionGroups,
    optionGroupProps
  } = renderOpts;
  const cellValue = (0, _util.getCellValue)(row, column);
  return [(0, _vue.h)(getOldComponent(renderOpts), Object.assign(Object.assign({}, getCellEditProps(renderOpts, params, cellValue, {
    options,
    optionProps,
    optionGroups,
    optionGroupProps
  })), getEditOns(renderOpts, params)))];
}
function getSelectCellValue(renderOpts, {
  row,
  column
}) {
  const {
    props = {},
    options,
    optionGroups,
    optionProps = {},
    optionGroupProps = {}
  } = renderOpts;
  const cellValue = _xeUtils.default.get(row, column.property);
  let selectItem;
  const labelProp = optionProps.label || 'label';
  const valueProp = optionProps.value || 'value';
  if (!(0, _utils.isEmptyValue)(cellValue)) {
    return _xeUtils.default.map(props.multiple ? cellValue : [cellValue], optionGroups ? value => {
      const groupOptions = optionGroupProps.options || 'options';
      for (let index = 0; index < optionGroups.length; index++) {
        /* eslint-disable eqeqeq */
        selectItem = _xeUtils.default.find(optionGroups[index][groupOptions], item => item[valueProp] == value);
        if (selectItem) {
          break;
        }
      }
      return selectItem ? selectItem[labelProp] : value;
    } : value => {
      /* eslint-disable eqeqeq */
      selectItem = _xeUtils.default.find(options, item => item[valueProp] == value);
      return selectItem ? selectItem[labelProp] : value;
    }).join(', ');
  }
  return '';
}
/**
 * 渲染表单-项
 * 用于渲染原生的标签
 */
function nativeItemRender(renderOpts, params) {
  const {
    data,
    property
  } = params;
  const {
    name
  } = renderOpts;
  const attrs = getNativeAttrs(renderOpts);
  const itemValue = _xeUtils.default.get(data, property);
  return [(0, _vue.h)(name, Object.assign(Object.assign(Object.assign({
    class: `vxe-default-${name}`
  }, attrs), {
    value: attrs && name === 'input' && (attrs.type === 'submit' || attrs.type === 'reset') ? null : itemValue
  }), getNativeItemOns(renderOpts, params)))];
}
function defaultItemRender(renderOpts, params) {
  const {
    data,
    property
  } = params;
  const itemValue = _xeUtils.default.get(data, property);
  return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)))];
}
/**
 * 已废弃
 * @deprecated
 */
function oldItemRender(renderOpts, params) {
  const {
    data,
    property
  } = params;
  const itemValue = _xeUtils.default.get(data, property);
  return [(0, _vue.h)(getOldComponent(renderOpts), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)))];
}
/**
 * 已废弃
 * @deprecated
 */
function oldButtonItemRender(renderOpts, params) {
  return [(0, _vue.h)((0, _vue.resolveComponent)('vxe-button'), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, null)), getComponentOns(renderOpts, params)))];
}
/**
 * 已废弃
 * @deprecated
 */
function oldButtonsItemRender(renderOpts, params) {
  return renderOpts.children.map(childRenderOpts => oldButtonItemRender(childRenderOpts, params)[0]);
}
/**
 * 渲染原生的 select 标签
 */
function renderNativeFormOptions(options, renderOpts, params) {
  const {
    data,
    property
  } = params;
  const {
    optionProps = {}
  } = renderOpts;
  const labelProp = optionProps.label || 'label';
  const valueProp = optionProps.value || 'value';
  const disabledProp = optionProps.disabled || 'disabled';
  const cellValue = _xeUtils.default.get(data, property);
  return options.map((item, oIndex) => {
    return (0, _vue.h)('option', {
      key: oIndex,
      value: item[valueProp],
      disabled: item[disabledProp],
      /* eslint-disable eqeqeq */
      selected: item[valueProp] == cellValue
    }, item[labelProp]);
  });
}
function handleExportSelectMethod(params) {
  const {
    row,
    column,
    options
  } = params;
  return options.original ? (0, _util.getCellValue)(row, column) : getSelectCellValue(column.editRender || column.cellRender, params);
}
/**
 * 渲染表单-项
 */
function defaultFormItemRender(renderOpts, params) {
  const {
    data,
    property
  } = params;
  const itemValue = _xeUtils.default.get(data, property);
  return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)))];
}
function formItemRadioAndCheckboxRender(renderOpts, params) {
  const {
    options,
    optionProps
  } = renderOpts;
  const {
    data,
    property
  } = params;
  const itemValue = _xeUtils.default.get(data, property);
  return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({
    options,
    optionProps
  }, getComponentFormItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)))];
}
/**
 * 已废弃
 * @deprecated
 */
function oldFormItemRadioAndCheckboxRender(renderOpts, params) {
  const {
    name,
    options,
    optionProps = {}
  } = renderOpts;
  const {
    data,
    property
  } = params;
  const labelProp = optionProps.label || 'label';
  const valueProp = optionProps.value || 'value';
  const disabledProp = optionProps.disabled || 'disabled';
  const itemValue = _xeUtils.default.get(data, property);
  const compName = getOldComponentName(name);
  // 如果是分组
  if (options) {
    return [(0, _vue.h)((0, _vue.resolveComponent)(`${compName}-group`), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)), {
      default: () => {
        return options.map((item, index) => {
          return (0, _vue.h)((0, _vue.resolveComponent)(compName), {
            key: index,
            label: item[valueProp],
            content: item[labelProp],
            disabled: item[disabledProp]
          });
        });
      }
    })];
  }
  return [(0, _vue.h)((0, _vue.resolveComponent)(compName), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)))];
}
/**
 * 内置的组件渲染
 */
const renderMap = {
  input: {
    autofocus: 'input',
    renderEdit: nativeEditRender,
    renderDefault: nativeEditRender,
    renderFilter: nativeFilterRender,
    defaultFilterMethod: handleFilterMethod,
    renderItemContent: nativeItemRender
  },
  textarea: {
    autofocus: 'textarea',
    renderEdit: nativeEditRender,
    renderItemContent: nativeItemRender
  },
  select: {
    renderEdit: nativeSelectEditRender,
    renderDefault: nativeSelectEditRender,
    renderCell(renderOpts, params) {
      return getCellLabelVNs(renderOpts, params, getSelectCellValue(renderOpts, params));
    },
    renderFilter(renderOpts, params) {
      const {
        column
      } = params;
      return column.filters.map((option, oIndex) => {
        return (0, _vue.h)('select', Object.assign(Object.assign({
          key: oIndex,
          class: 'vxe-default-select'
        }, getNativeAttrs(renderOpts)), getNativeFilterOns(renderOpts, params, option)), renderOpts.optionGroups ? renderNativeOptgroups(renderOpts, params, renderNativeOptions) : renderNativeOptions(renderOpts.options, renderOpts, params));
      });
    },
    defaultFilterMethod: handleFilterMethod,
    renderItemContent(renderOpts, params) {
      return [(0, _vue.h)('select', Object.assign(Object.assign({
        class: 'vxe-default-select'
      }, getNativeAttrs(renderOpts)), getNativeItemOns(renderOpts, params)), renderOpts.optionGroups ? renderNativeOptgroups(renderOpts, params, renderNativeFormOptions) : renderNativeFormOptions(renderOpts.options, renderOpts, params))];
    },
    exportMethod: handleExportSelectMethod
  },
  VxeInput: {
    autofocus: '.vxe-input--inner',
    renderEdit: defaultEditRender,
    renderCell(renderOpts, params) {
      const {
        props = {}
      } = renderOpts;
      const {
        row,
        column
      } = params;
      const digits = props.digits || _conf.default.input.digits;
      let cellValue = _xeUtils.default.get(row, column.property);
      if (cellValue) {
        switch (props.type) {
          case 'date':
          case 'week':
          case 'month':
          case 'year':
            cellValue = getLabelFormatDate(cellValue, props);
            break;
          case 'float':
            cellValue = _xeUtils.default.toFixed(_xeUtils.default.floor(cellValue, digits), digits);
            break;
        }
      }
      return getCellLabelVNs(renderOpts, params, cellValue);
    },
    renderDefault: defaultEditRender,
    renderFilter: defaultFilterRender,
    defaultFilterMethod: handleFilterMethod,
    renderItemContent: defaultItemRender
  },
  VxeTextarea: {
    autofocus: '.vxe-textarea--inner',
    renderItemContent: defaultItemRender
  },
  VxeButton: {
    renderDefault: defaultCellRender,
    renderItemContent: defaultFormItemRender
  },
  VxeButtonGroup: {
    renderDefault: defaultCellRender,
    renderItemContent(renderOpts, params) {
      const {
        options
      } = renderOpts;
      const {
        data,
        property
      } = params;
      const itemValue = _xeUtils.default.get(data, property);
      return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({
        options
      }, getComponentFormItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)))];
    }
  },
  VxeSelect: {
    autofocus: '.vxe-input--inner',
    renderEdit: defaultSelectEditRender,
    renderDefault: defaultSelectEditRender,
    renderCell(renderOpts, params) {
      return getCellLabelVNs(renderOpts, params, getSelectCellValue(renderOpts, params));
    },
    renderFilter(renderOpts, params) {
      const {
        column
      } = params;
      const {
        options,
        optionProps,
        optionGroups,
        optionGroupProps
      } = renderOpts;
      return column.filters.map((option, oIndex) => {
        const optionValue = option.data;
        return (0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({
          key: oIndex
        }, getCellEditFilterProps(renderOpts, params, optionValue, {
          options,
          optionProps,
          optionGroups,
          optionGroupProps
        })), getFilterOns(renderOpts, params, option)));
      });
    },
    defaultFilterMethod: handleFilterMethod,
    renderItemContent(renderOpts, params) {
      const {
        data,
        property
      } = params;
      const {
        options,
        optionProps,
        optionGroups,
        optionGroupProps
      } = renderOpts;
      const itemValue = _xeUtils.default.get(data, property);
      return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, itemValue, {
        options,
        optionProps,
        optionGroups,
        optionGroupProps
      })), getItemOns(renderOpts, params)))];
    },
    exportMethod: handleExportSelectMethod
  },
  VxeRadio: {
    autofocus: '.vxe-radio--input',
    renderItemContent: defaultFormItemRender
  },
  VxeRadioGroup: {
    autofocus: '.vxe-radio--input',
    renderItemContent: formItemRadioAndCheckboxRender
  },
  VxeCheckbox: {
    autofocus: '.vxe-checkbox--input',
    renderItemContent: defaultFormItemRender
  },
  VxeCheckboxGroup: {
    autofocus: '.vxe-checkbox--input',
    renderItemContent: formItemRadioAndCheckboxRender
  },
  VxeSwitch: {
    autofocus: '.vxe-switch--button',
    renderEdit: defaultEditRender,
    renderDefault: defaultEditRender,
    renderItemContent: defaultItemRender
  },
  // 以下已废弃
  $input: {
    autofocus: '.vxe-input--inner',
    renderEdit: oldEditRender,
    renderCell(renderOpts, params) {
      const {
        props = {}
      } = renderOpts;
      const {
        row,
        column
      } = params;
      const digits = props.digits || _conf.default.input.digits;
      let cellValue = _xeUtils.default.get(row, column.property);
      if (cellValue) {
        switch (props.type) {
          case 'date':
          case 'week':
          case 'month':
          case 'year':
            cellValue = getLabelFormatDate(cellValue, props);
            break;
          case 'float':
            cellValue = _xeUtils.default.toFixed(_xeUtils.default.floor(cellValue, digits), digits);
            break;
        }
      }
      return getCellLabelVNs(renderOpts, params, cellValue);
    },
    renderDefault: oldEditRender,
    renderFilter: oldFilterRender,
    defaultFilterMethod: handleFilterMethod,
    renderItemContent: oldItemRender
  },
  $textarea: {
    autofocus: '.vxe-textarea--inner',
    renderItemContent: oldItemRender
  },
  $button: {
    renderDefault: oldButtonEditRender,
    renderItemContent: oldButtonItemRender
  },
  $buttons: {
    renderDefault: oldButtonsEditRender,
    renderItemContent: oldButtonsItemRender
  },
  $select: {
    autofocus: '.vxe-input--inner',
    renderEdit: oldSelectEditRender,
    renderDefault: oldSelectEditRender,
    renderCell(renderOpts, params) {
      return getCellLabelVNs(renderOpts, params, getSelectCellValue(renderOpts, params));
    },
    renderFilter(renderOpts, params) {
      const {
        column
      } = params;
      const {
        options,
        optionProps,
        optionGroups,
        optionGroupProps
      } = renderOpts;
      return column.filters.map((option, oIndex) => {
        const optionValue = option.data;
        return (0, _vue.h)(getOldComponent(renderOpts), Object.assign(Object.assign({
          key: oIndex
        }, getCellEditFilterProps(renderOpts, params, optionValue, {
          options,
          optionProps,
          optionGroups,
          optionGroupProps
        })), getFilterOns(renderOpts, params, option)));
      });
    },
    defaultFilterMethod: handleFilterMethod,
    renderItemContent(renderOpts, params) {
      const {
        data,
        property
      } = params;
      const {
        options,
        optionProps,
        optionGroups,
        optionGroupProps
      } = renderOpts;
      const itemValue = _xeUtils.default.get(data, property);
      return [(0, _vue.h)(getOldComponent(renderOpts), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, itemValue, {
        options,
        optionProps,
        optionGroups,
        optionGroupProps
      })), getItemOns(renderOpts, params)))];
    },
    exportMethod: handleExportSelectMethod
  },
  $radio: {
    autofocus: '.vxe-radio--input',
    renderItemContent: oldFormItemRadioAndCheckboxRender
  },
  $checkbox: {
    autofocus: '.vxe-checkbox--input',
    renderItemContent: oldFormItemRadioAndCheckboxRender
  },
  $switch: {
    autofocus: '.vxe-switch--button',
    renderEdit: oldEditRender,
    renderDefault: oldEditRender,
    renderItemContent: oldItemRender
  }
  // 以上已废弃
};
/**
 * 全局渲染器
 */
const renderer = exports.renderer = {
  mixin(opts) {
    _xeUtils.default.each(opts, (options, name) => renderer.add(name, options));
    return renderer;
  },
  get(name) {
    return renderMap[name] || null;
  },
  add(name, options) {
    if (name && options) {
      const renders = renderMap[name];
      if (renders) {
        // 检测是否覆盖
        if (process.env.NODE_ENV === 'development') {
          _xeUtils.default.each(options, (val, key) => {
            if (!_xeUtils.default.eqNull(renders[key]) && renders[key] !== val) {
              (0, _log.warnLog)('vxe.error.coverProp', [`Renderer.${name}`, key]);
            }
          });
        }
        Object.assign(renders, options);
      } else {
        renderMap[name] = options;
      }
    }
    return renderer;
  },
  delete(name) {
    delete renderMap[name];
    return renderer;
  }
};