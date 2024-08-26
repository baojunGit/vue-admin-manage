"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _vXETable = require("../../v-x-e-table");
var _utils = require("../../tools/utils");
var _log = require("../../tools/log");
var _dom = require("../../tools/dom");
var _util = require("./util");
var _size = require("../../hooks/size");
var _tooltip = _interopRequireDefault(require("../../tooltip"));
var _formConfigItem = _interopRequireDefault(require("./form-config-item"));
var _index = _interopRequireDefault(require("../../loading/index"));
var _vn = require("../../tools/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Rule {
  constructor(rule) {
    Object.assign(this, {
      $options: rule,
      required: rule.required,
      min: rule.min,
      max: rule.min,
      type: rule.type,
      pattern: rule.pattern,
      validator: rule.validator,
      trigger: rule.trigger,
      maxWidth: rule.maxWidth
    });
  }
  get content() {
    return (0, _utils.getFuncText)(this.$options.content || this.$options.message);
  }
  get message() {
    return this.content;
  }
}
const validErrorRuleValue = (rule, val) => {
  const {
    type,
    min,
    max,
    pattern
  } = rule;
  const isNumType = type === 'number';
  const numVal = isNumType ? _xeUtils.default.toNumber(val) : _xeUtils.default.getSize(val);
  // 判断数值
  if (isNumType && isNaN(val)) {
    return true;
  }
  // 如果存在 min，判断最小值
  if (!_xeUtils.default.eqNull(min) && numVal < _xeUtils.default.toNumber(min)) {
    return true;
  }
  // 如果存在 max，判断最大值
  if (!_xeUtils.default.eqNull(max) && numVal > _xeUtils.default.toNumber(max)) {
    return true;
  }
  // 如果存在 pattern，正则校验
  if (pattern && !(_xeUtils.default.isRegExp(pattern) ? pattern : new RegExp(pattern)).test(val)) {
    return true;
  }
  return false;
};
function getResetValue(value, resetValue) {
  if (_xeUtils.default.isArray(value)) {
    resetValue = [];
  }
  return resetValue;
}
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeForm',
  props: {
    collapseStatus: {
      type: Boolean,
      default: true
    },
    loading: Boolean,
    data: Object,
    size: {
      type: String,
      default: () => _conf.default.form.size || _conf.default.size
    },
    span: {
      type: [String, Number],
      default: () => _conf.default.form.span
    },
    align: {
      type: String,
      default: () => _conf.default.form.align
    },
    titleAlign: {
      type: String,
      default: () => _conf.default.form.titleAlign
    },
    titleWidth: {
      type: [String, Number],
      default: () => _conf.default.form.titleWidth
    },
    titleColon: {
      type: Boolean,
      default: () => _conf.default.form.titleColon
    },
    titleAsterisk: {
      type: Boolean,
      default: () => _conf.default.form.titleAsterisk
    },
    titleOverflow: {
      type: [Boolean, String],
      default: null
    },
    vertical: {
      type: Boolean,
      default: null
    },
    className: [String, Function],
    readonly: Boolean,
    items: Array,
    rules: Object,
    preventSubmit: {
      type: Boolean,
      default: () => _conf.default.form.preventSubmit
    },
    validConfig: Object,
    tooltipConfig: Object,
    customLayout: {
      type: Boolean,
      default: () => _conf.default.form.customLayout
    }
  },
  emits: ['update:collapseStatus', 'collapse', 'toggle-collapse', 'submit', 'submit-invalid', 'reset'],
  setup(props, context) {
    const hasUseTooltip = _vXETable.VXETable.tooltip;
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const computeSize = (0, _size.useSize)(props);
    const reactData = (0, _vue.reactive)({
      collapseAll: props.collapseStatus,
      staticItems: [],
      formItems: []
    });
    const internalData = (0, _vue.reactive)({
      tooltipTimeout: null,
      tooltipStore: {
        item: null,
        visible: false
      }
    });
    const $xegrid = (0, _vue.inject)('$xegrid', null);
    const refElem = (0, _vue.ref)();
    const refTooltip = (0, _vue.ref)();
    let formMethods = {};
    const computeValidOpts = (0, _vue.computed)(() => {
      return Object.assign({}, _conf.default.form.validConfig, props.validConfig);
    });
    const computeTooltipOpts = (0, _vue.computed)(() => {
      return Object.assign({}, _conf.default.tooltip, _conf.default.form.tooltipConfig, props.tooltipConfig);
    });
    const refMaps = {
      refElem
    };
    const computeMaps = {
      computeSize,
      computeValidOpts,
      computeTooltipOpts
    };
    const $xeform = {
      xID,
      props,
      context,
      reactData,
      xegrid: $xegrid,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const callSlot = (slotFunc, params) => {
      if (slotFunc) {
        if (_xeUtils.default.isString(slotFunc)) {
          slotFunc = slots[slotFunc] || null;
        }
        if (_xeUtils.default.isFunction(slotFunc)) {
          return (0, _vn.getSlotVNs)(slotFunc(params));
        }
      }
      return [];
    };
    const loadItem = list => {
      if (list.length) {
        if (process.env.NODE_ENV === 'development') {
          list.forEach(item => {
            if (item.slots) {
              _xeUtils.default.each(item.slots, func => {
                if (!_xeUtils.default.isFunction(func)) {
                  if (!slots[func]) {
                    (0, _log.errLog)('vxe.error.notSlot', [func]);
                  }
                }
              });
            }
          });
        }
      }
      reactData.staticItems = _xeUtils.default.mapTree(list, item => (0, _util.createItem)($xeform, item), {
        children: 'children'
      });
      return (0, _vue.nextTick)();
    };
    const getItems = () => {
      const itemList = [];
      _xeUtils.default.eachTree(reactData.formItems, item => {
        itemList.push(item);
      }, {
        children: 'children'
      });
      return itemList;
    };
    const getItemByField = field => {
      const rest = _xeUtils.default.findTree(reactData.formItems, item => item.field === field, {
        children: 'children'
      });
      return rest ? rest.item : null;
    };
    const getCollapseStatus = () => {
      return reactData.collapseAll;
    };
    const toggleCollapse = () => {
      const status = !getCollapseStatus();
      reactData.collapseAll = status;
      emit('update:collapseStatus', status);
      return (0, _vue.nextTick)();
    };
    const toggleCollapseEvent = evnt => {
      toggleCollapse();
      const status = getCollapseStatus();
      formMethods.dispatchEvent('toggle-collapse', {
        status,
        collapse: status,
        data: props.data
      }, evnt);
      formMethods.dispatchEvent('collapse', {
        status,
        collapse: status,
        data: props.data
      }, evnt);
    };
    const clearValidate = fieldOrItem => {
      if (fieldOrItem) {
        let fields = fieldOrItem;
        if (!_xeUtils.default.isArray(fieldOrItem)) {
          fields = [fieldOrItem];
        }
        fields.forEach(field => {
          if (field) {
            const item = (0, _util.handleFieldOrItem)($xeform, field);
            if (item) {
              item.showError = false;
            }
          }
        });
      } else {
        getItems().forEach(item => {
          item.showError = false;
        });
      }
      return (0, _vue.nextTick)();
    };
    const reset = () => {
      const {
        data
      } = props;
      const itemList = getItems();
      if (data) {
        itemList.forEach(item => {
          const {
            field,
            resetValue,
            itemRender
          } = item;
          if ((0, _utils.isEnableConf)(itemRender)) {
            const compConf = _vXETable.VXETable.renderer.get(itemRender.name);
            if (compConf && compConf.itemResetMethod) {
              compConf.itemResetMethod({
                data,
                field,
                property: field,
                item,
                $form: $xeform,
                $grid: $xeform.xegrid
              });
            } else if (field) {
              _xeUtils.default.set(data, field, resetValue === null ? getResetValue(_xeUtils.default.get(data, field), undefined) : _xeUtils.default.clone(resetValue, true));
            }
          }
        });
      }
      return clearValidate();
    };
    const resetEvent = evnt => {
      evnt.preventDefault();
      reset();
      formMethods.dispatchEvent('reset', {
        data: props.data
      }, evnt);
    };
    const handleFocus = fields => {
      const el = refElem.value;
      for (let i = 0; i < fields.length; i++) {
        const property = fields[i];
        const item = getItemByField(property);
        if (item && (0, _utils.isEnableConf)(item.itemRender)) {
          const {
            itemRender
          } = item;
          const compConf = _vXETable.VXETable.renderer.get(itemRender.name);
          let inputElem = null;
          // 定位到第一个
          if (!i) {
            (0, _dom.scrollToView)(el.querySelector(`.${item.id}`));
          }
          // 如果指定了聚焦 class
          if (itemRender.autofocus) {
            inputElem = el.querySelector(`.${item.id} ${itemRender.autofocus}`);
          }
          // 渲染器的聚焦处理
          if (!inputElem && compConf && compConf.autofocus) {
            inputElem = el.querySelector(`.${item.id} ${compConf.autofocus}`);
          }
          if (inputElem) {
            inputElem.focus();
            break;
          }
        }
      }
    };
    /**
     * 校验数据
     * 按表格行、列顺序依次校验（同步或异步）
     * 校验规则根据索引顺序依次校验，如果是异步则会等待校验完成才会继续校验下一列
     * 如果校验失败则，触发回调或者 Promise<(ErrMap 校验不通过列的信息)>
     * 如果是传回调方式这返回一个 (ErrMap 校验不通过列的信息)
     *
     * rule 配置：
     *  required=Boolean 是否必填
     *  min=Number 最小长度
     *  max=Number 最大长度
     *  validator=Function({ itemValue, rule, rules, data, property }) 自定义校验，接收一个 Promise
     *  trigger=change 触发方式
     */
    const validItemRules = (validType, fields, val) => {
      const {
        data,
        rules: formRules
      } = props;
      const errorMaps = {};
      if (!_xeUtils.default.isArray(fields)) {
        fields = [fields];
      }
      return Promise.all(fields.map(property => {
        const errorRules = [];
        const syncVailds = [];
        if (property && formRules) {
          const rules = _xeUtils.default.get(formRules, property);
          if (rules) {
            const itemValue = _xeUtils.default.isUndefined(val) ? _xeUtils.default.get(data, property) : val;
            rules.forEach(rule => {
              const {
                type,
                trigger,
                required,
                validator
              } = rule;
              if (validType === 'all' || !trigger || validType === trigger) {
                if (validator) {
                  const validParams = {
                    itemValue,
                    rule,
                    rules,
                    data,
                    field: property,
                    property,
                    $form: $xeform
                  };
                  let customValid;
                  if (_xeUtils.default.isString(validator)) {
                    const gvItem = _vXETable.VXETable.validators.get(validator);
                    if (gvItem) {
                      if (gvItem.itemValidatorMethod) {
                        customValid = gvItem.itemValidatorMethod(validParams);
                      } else {
                        if (process.env.NODE_ENV === 'development') {
                          (0, _log.warnLog)('vxe.error.notValidators', [validator]);
                        }
                      }
                    } else {
                      if (process.env.NODE_ENV === 'development') {
                        (0, _log.errLog)('vxe.error.notValidators', [validator]);
                      }
                    }
                  } else {
                    customValid = validator(validParams);
                  }
                  if (customValid) {
                    if (_xeUtils.default.isError(customValid)) {
                      errorRules.push(new Rule({
                        type: 'custom',
                        trigger,
                        content: customValid.message,
                        rule: new Rule(rule)
                      }));
                    } else if (customValid.catch) {
                      // 如果为异步校验（注：异步校验是并发无序的）
                      syncVailds.push(customValid.catch(e => {
                        errorRules.push(new Rule({
                          type: 'custom',
                          trigger,
                          content: e ? e.message : rule.content || rule.message,
                          rule: new Rule(rule)
                        }));
                      }));
                    }
                  }
                } else {
                  const isArrType = type === 'array';
                  const isArrVal = _xeUtils.default.isArray(itemValue);
                  let hasEmpty = true;
                  if (isArrType || isArrVal) {
                    hasEmpty = !isArrVal || !itemValue.length;
                  } else if (_xeUtils.default.isString(itemValue)) {
                    hasEmpty = (0, _utils.eqEmptyValue)(itemValue.trim());
                  } else {
                    hasEmpty = (0, _utils.eqEmptyValue)(itemValue);
                  }
                  if (required ? hasEmpty || validErrorRuleValue(rule, itemValue) : !hasEmpty && validErrorRuleValue(rule, itemValue)) {
                    errorRules.push(new Rule(rule));
                  }
                }
              }
            });
          }
        }
        return Promise.all(syncVailds).then(() => {
          if (errorRules.length) {
            errorMaps[property] = errorRules.map(rule => {
              return {
                $form: $xeform,
                rule,
                data,
                field: property,
                property
              };
            });
          }
        });
      })).then(() => {
        if (!_xeUtils.default.isEmpty(errorMaps)) {
          return Promise.reject(errorMaps);
        }
      });
    };
    let showErrTime;
    const beginValidate = (itemList, type, callback) => {
      const {
        data,
        rules: formRules
      } = props;
      const validOpts = computeValidOpts.value;
      const validRest = {};
      const validFields = [];
      const itemValids = [];
      clearTimeout(showErrTime);
      if (data && formRules) {
        itemList.forEach(item => {
          const {
            field
          } = item;
          if (field && !(0, _util.isHiddenItem)($xeform, item) && (0, _util.isActivetem)($xeform, item)) {
            itemValids.push(validItemRules(type || 'all', field).then(() => {
              item.errRule = null;
            }).catch(errorMaps => {
              const rest = errorMaps[field];
              if (!validRest[field]) {
                validRest[field] = [];
              }
              validRest[field].push(rest);
              validFields.push(field);
              item.errRule = rest[0].rule;
              return Promise.reject(rest);
            }));
          }
        });
        return Promise.all(itemValids).then(() => {
          if (callback) {
            callback();
          }
        }).catch(() => {
          return new Promise(resolve => {
            showErrTime = window.setTimeout(() => {
              itemList.forEach(item => {
                if (item.errRule) {
                  item.showError = true;
                }
              });
            }, 20);
            if (validOpts.autoPos !== false) {
              (0, _vue.nextTick)(() => {
                handleFocus(validFields);
              });
            }
            if (callback) {
              callback(validRest);
              resolve();
            } else {
              resolve(validRest);
            }
          });
        });
      }
      if (callback) {
        callback();
      }
      return Promise.resolve();
    };
    const validate = callback => {
      clearValidate();
      return beginValidate(getItems(), '', callback);
    };
    const validateField = (fieldOrItem, callback) => {
      let fields = [];
      if (_xeUtils.default.isArray(fieldOrItem)) {
        fields = fieldOrItem;
      } else {
        fields = [fieldOrItem];
      }
      return beginValidate(fields.map(field => (0, _util.handleFieldOrItem)($xeform, field)), '', callback);
    };
    const submitEvent = evnt => {
      evnt.preventDefault();
      if (!props.preventSubmit) {
        clearValidate();
        beginValidate(getItems()).then(errMap => {
          if (errMap) {
            formMethods.dispatchEvent('submit-invalid', {
              data: props.data,
              errMap
            }, evnt);
          } else {
            formMethods.dispatchEvent('submit', {
              data: props.data
            }, evnt);
          }
        });
      }
    };
    const closeTooltip = () => {
      const {
        tooltipStore
      } = internalData;
      const $tooltip = refTooltip.value;
      if (tooltipStore.visible) {
        Object.assign(tooltipStore, {
          item: null,
          visible: false
        });
        if ($tooltip) {
          $tooltip.close();
        }
      }
      return (0, _vue.nextTick)();
    };
    const triggerTitleTipEvent = (evnt, params) => {
      const {
        item
      } = params;
      const {
        tooltipStore
      } = internalData;
      const $tooltip = refTooltip.value;
      const overflowElem = evnt.currentTarget.children[0];
      const content = (overflowElem.textContent || '').trim();
      const isCellOverflow = overflowElem.scrollWidth > overflowElem.clientWidth;
      clearTimeout(internalData.tooltipTimeout);
      if (tooltipStore.item !== item) {
        closeTooltip();
      }
      if (content && isCellOverflow) {
        Object.assign(tooltipStore, {
          item,
          visible: true
        });
        if ($tooltip) {
          $tooltip.open(overflowElem, content);
        }
      }
    };
    const handleTitleTipLeaveEvent = () => {
      const tooltipOpts = computeTooltipOpts.value;
      let $tooltip = refTooltip.value;
      if ($tooltip) {
        $tooltip.setActived(false);
      }
      if (tooltipOpts.enterable) {
        internalData.tooltipTimeout = setTimeout(() => {
          $tooltip = refTooltip.value;
          if ($tooltip && !$tooltip.isActived()) {
            closeTooltip();
          }
        }, tooltipOpts.leaveDelay);
      } else {
        closeTooltip();
      }
    };
    const triggerItemEvent = (evnt, field, itemValue) => {
      if (field) {
        return validItemRules(evnt ? ['blur'].includes(evnt.type) ? 'blur' : 'change' : 'all', field, itemValue).then(() => {
          clearValidate(field);
        }).catch(errorMaps => {
          const rest = errorMaps[field];
          const item = getItemByField(field);
          if (rest && item) {
            item.showError = true;
            item.errRule = rest[0].rule;
          }
        });
      }
      return (0, _vue.nextTick)();
    };
    /**
     * 更新项状态
     * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一项编辑状态
     * 如果单元格配置了校验规则，则会进行校验
     */
    const updateStatus = (scope, itemValue) => {
      const {
        field
      } = scope;
      return triggerItemEvent(new Event('change'), field, itemValue);
    };
    formMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, Object.assign({
          $form: $xeform,
          $grid: $xegrid,
          $event: evnt
        }, params));
      },
      reset,
      validate,
      validateField,
      clearValidate,
      updateStatus,
      toggleCollapse,
      getItems,
      getItemByField,
      closeTooltip
    };
    const formPrivateMethods = {
      callSlot,
      triggerItemEvent,
      toggleCollapseEvent,
      triggerTitleTipEvent,
      handleTitleTipLeaveEvent
    };
    Object.assign($xeform, formMethods, formPrivateMethods);
    const staticItemFlag = (0, _vue.ref)(0);
    (0, _vue.watch)(() => reactData.staticItems.length, () => {
      staticItemFlag.value++;
    });
    (0, _vue.watch)(() => reactData.staticItems, () => {
      staticItemFlag.value++;
    });
    (0, _vue.watch)(staticItemFlag, () => {
      reactData.formItems = reactData.staticItems;
    });
    const itemFlag = (0, _vue.ref)(0);
    (0, _vue.watch)(() => props.items ? props.items.length : -1, () => {
      itemFlag.value++;
    });
    (0, _vue.watch)(() => props.items, () => {
      itemFlag.value++;
    });
    (0, _vue.watch)(itemFlag, () => {
      loadItem(props.items || []);
    });
    (0, _vue.watch)(() => props.collapseStatus, value => {
      reactData.collapseAll = !!value;
    });
    const renderVN = () => {
      const {
        loading,
        className,
        data,
        customLayout
      } = props;
      const {
        formItems
      } = reactData;
      // const formItems: any[] = []
      const vSize = computeSize.value;
      const tooltipOpts = computeTooltipOpts.value;
      const defaultSlot = slots.default;
      return (0, _vue.h)('form', {
        ref: refElem,
        class: ['vxe-form', className ? _xeUtils.default.isFunction(className) ? className({
          items: formItems,
          data,
          $form: $xeform
        }) : className : '', {
          [`size--${vSize}`]: vSize,
          'is--loading': loading
        }],
        onSubmit: submitEvent,
        onReset: resetEvent
      }, [(0, _vue.h)('div', {
        class: 'vxe-form--wrapper vxe-form--item-row'
      }, customLayout ? defaultSlot ? defaultSlot({}) : [] : formItems.map((item, index) => {
        return (0, _vue.h)(_formConfigItem.default, {
          key: index,
          itemConfig: item
        });
      })), (0, _vue.h)('div', {
        class: 'vxe-form-slots',
        ref: 'hideItem'
      }, customLayout ? [] : defaultSlot ? defaultSlot({}) : []),
      /**
       * 加载中
       */
      (0, _vue.h)(_index.default, {
        class: 'vxe-form--loading',
        modelValue: loading
      }),
      /**
       * 工具提示
       */
      hasUseTooltip ? (0, _vue.h)(_tooltip.default, Object.assign({
        ref: refTooltip
      }, tooltipOpts)) : (0, _vue.createCommentVNode)()]);
    };
    $xeform.renderVN = renderVN;
    if (props.items) {
      loadItem(props.items);
    }
    (0, _vue.provide)('$xeform', $xeform);
    (0, _vue.provide)('$xeformgather', null);
    (0, _vue.provide)('$xeformitem', null);
    (0, _vue.provide)('$xeformiteminfo', null);
    return $xeform;
  },
  render() {
    return this.renderVN();
  }
});