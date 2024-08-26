"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _size = require("../../hooks/size");
var _dom = require("../../tools/dom");
var _utils = require("../../tools/utils");
var _event = require("../../tools/event");
var _input = _interopRequireDefault(require("../../input/src/input"));
var _vn = require("../../tools/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function isOptionVisible(option) {
  return option.visible !== false;
}
function getOptUniqueId() {
  return _xeUtils.default.uniqueId('opt_');
}
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeSelect',
  props: {
    modelValue: null,
    clearable: Boolean,
    placeholder: {
      type: String,
      default: () => _xeUtils.default.eqNull(_conf.default.select.placeholder) ? _conf.default.i18n('vxe.base.pleaseSelect') : _conf.default.select.placeholder
    },
    loading: Boolean,
    disabled: Boolean,
    multiple: Boolean,
    multiCharOverflow: {
      type: [Number, String],
      default: () => _conf.default.select.multiCharOverflow
    },
    prefixIcon: String,
    placement: String,
    options: Array,
    optionProps: Object,
    optionGroups: Array,
    optionGroupProps: Object,
    optionConfig: Object,
    className: [String, Function],
    popupClassName: [String, Function],
    max: {
      type: [String, Number],
      default: null
    },
    size: {
      type: String,
      default: () => _conf.default.select.size || _conf.default.size
    },
    filterable: Boolean,
    filterMethod: Function,
    remote: Boolean,
    remoteMethod: Function,
    emptyText: String,
    // 已废弃，被 option-config.keyField 替换
    optionId: {
      type: String,
      default: () => _conf.default.select.optionId
    },
    // 已废弃，被 option-config.useKey 替换
    optionKey: Boolean,
    transfer: {
      type: Boolean,
      default: () => _conf.default.select.transfer
    }
  },
  emits: ['update:modelValue', 'change', 'clear', 'blur', 'focus'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const $xeform = (0, _vue.inject)('$xeform', null);
    const $xeformiteminfo = (0, _vue.inject)('$xeformiteminfo', null);
    const xID = _xeUtils.default.uniqueId();
    const computeSize = (0, _size.useSize)(props);
    const reactData = (0, _vue.reactive)({
      inited: false,
      staticOptions: [],
      fullGroupList: [],
      fullOptionList: [],
      visibleGroupList: [],
      visibleOptionList: [],
      remoteValueList: [],
      panelIndex: 0,
      panelStyle: {},
      panelPlacement: null,
      currentOption: null,
      currentValue: null,
      visiblePanel: false,
      animatVisible: false,
      isActivated: false,
      searchValue: '',
      searchLoading: false
    });
    const refElem = (0, _vue.ref)();
    const refInput = (0, _vue.ref)();
    const refInpSearch = (0, _vue.ref)();
    const refOptionWrapper = (0, _vue.ref)();
    const refOptionPanel = (0, _vue.ref)();
    const refMaps = {
      refElem
    };
    const $xeselect = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps
    };
    let selectMethods = {};
    const computePropsOpts = (0, _vue.computed)(() => {
      return props.optionProps || {};
    });
    const computeGroupPropsOpts = (0, _vue.computed)(() => {
      return props.optionGroupProps || {};
    });
    const computeLabelField = (0, _vue.computed)(() => {
      const propsOpts = computePropsOpts.value;
      return propsOpts.label || 'label';
    });
    const computeValueField = (0, _vue.computed)(() => {
      const propsOpts = computePropsOpts.value;
      return propsOpts.value || 'value';
    });
    const computeGroupLabelField = (0, _vue.computed)(() => {
      const groupPropsOpts = computeGroupPropsOpts.value;
      return groupPropsOpts.label || 'label';
    });
    const computeGroupOptionsField = (0, _vue.computed)(() => {
      const groupPropsOpts = computeGroupPropsOpts.value;
      return groupPropsOpts.options || 'options';
    });
    const computeIsMaximize = (0, _vue.computed)(() => {
      const {
        modelValue,
        multiple,
        max
      } = props;
      if (multiple && max) {
        return (modelValue ? modelValue.length : 0) >= _xeUtils.default.toNumber(max);
      }
      return false;
    });
    const computeOptionOpts = (0, _vue.computed)(() => {
      return Object.assign({}, _conf.default.select.optionConfig, props.optionConfig);
    });
    const computeIsGroup = (0, _vue.computed)(() => {
      return reactData.fullGroupList.some(item => item.options && item.options.length);
    });
    const computeMultiMaxCharNum = (0, _vue.computed)(() => {
      return _xeUtils.default.toNumber(props.multiCharOverflow);
    });
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
    const findOption = optionValue => {
      const {
        fullOptionList,
        fullGroupList
      } = reactData;
      const isGroup = computeIsGroup.value;
      const valueField = computeValueField.value;
      if (isGroup) {
        for (let gIndex = 0; gIndex < fullGroupList.length; gIndex++) {
          const group = fullGroupList[gIndex];
          if (group.options) {
            for (let index = 0; index < group.options.length; index++) {
              const option = group.options[index];
              if (optionValue === option[valueField]) {
                return option;
              }
            }
          }
        }
      }
      return fullOptionList.find(item => optionValue === item[valueField]);
    };
    const getRemoteSelectLabel = value => {
      const {
        remoteValueList
      } = reactData;
      const labelField = computeLabelField.value;
      const remoteItem = remoteValueList.find(item => value === item.key);
      const item = remoteItem ? remoteItem.result : null;
      return _xeUtils.default.toValueString(item ? item[labelField] : value);
    };
    const getSelectLabel = value => {
      const labelField = computeLabelField.value;
      const item = findOption(value);
      return _xeUtils.default.toValueString(item ? item[labelField] : value);
    };
    const computeSelectLabel = (0, _vue.computed)(() => {
      const {
        modelValue,
        multiple,
        remote
      } = props;
      const multiMaxCharNum = computeMultiMaxCharNum.value;
      if (modelValue && multiple) {
        const vals = _xeUtils.default.isArray(modelValue) ? modelValue : [modelValue];
        if (remote) {
          return vals.map(val => getRemoteSelectLabel(val)).join(', ');
        }
        return vals.map(val => {
          const label = getSelectLabel(val);
          if (multiMaxCharNum > 0 && label.length > multiMaxCharNum) {
            return `${label.substring(0, multiMaxCharNum)}...`;
          }
          return label;
        }).join(', ');
      }
      if (remote) {
        return getRemoteSelectLabel(modelValue);
      }
      return getSelectLabel(modelValue);
    });
    const getOptkey = () => {
      const optionOpts = computeOptionOpts.value;
      return optionOpts.keyField || props.optionId || '_X_OPTION_KEY';
    };
    const getOptid = option => {
      const optid = option[getOptkey()];
      return optid ? encodeURIComponent(optid) : '';
    };
    /**
     * 刷新选项，当选项被动态显示/隐藏时可能会用到
     */
    const refreshOption = () => {
      const {
        filterable,
        filterMethod
      } = props;
      const {
        fullOptionList,
        fullGroupList,
        searchValue
      } = reactData;
      const isGroup = computeIsGroup.value;
      const groupLabelField = computeGroupLabelField.value;
      const labelField = computeLabelField.value;
      if (isGroup) {
        if (filterable && filterMethod) {
          reactData.visibleGroupList = fullGroupList.filter(group => isOptionVisible(group) && filterMethod({
            group,
            option: null,
            searchValue
          }));
        } else if (filterable) {
          reactData.visibleGroupList = fullGroupList.filter(group => isOptionVisible(group) && (!searchValue || `${group[groupLabelField]}`.indexOf(searchValue) > -1));
        } else {
          reactData.visibleGroupList = fullGroupList.filter(isOptionVisible);
        }
      } else {
        if (filterable && filterMethod) {
          reactData.visibleOptionList = fullOptionList.filter(option => isOptionVisible(option) && filterMethod({
            group: null,
            option,
            searchValue
          }));
        } else if (filterable) {
          reactData.visibleOptionList = fullOptionList.filter(option => isOptionVisible(option) && (!searchValue || `${option[labelField]}`.indexOf(searchValue) > -1));
        } else {
          reactData.visibleOptionList = fullOptionList.filter(isOptionVisible);
        }
      }
      return (0, _vue.nextTick)();
    };
    const cacheItemMap = () => {
      const {
        fullOptionList,
        fullGroupList
      } = reactData;
      const groupOptionsField = computeGroupOptionsField.value;
      const key = getOptkey();
      const handleOptis = item => {
        if (!getOptid(item)) {
          item[key] = getOptUniqueId();
        }
      };
      if (fullGroupList.length) {
        fullGroupList.forEach(group => {
          handleOptis(group);
          if (group[groupOptionsField]) {
            group[groupOptionsField].forEach(handleOptis);
          }
        });
      } else if (fullOptionList.length) {
        fullOptionList.forEach(handleOptis);
      }
      refreshOption();
    };
    const setCurrentOption = option => {
      const valueField = computeValueField.value;
      if (option) {
        reactData.currentOption = option;
        reactData.currentValue = option[valueField];
      }
    };
    const scrollToOption = (option, isAlignBottom) => {
      return (0, _vue.nextTick)().then(() => {
        if (option) {
          const optWrapperElem = refOptionWrapper.value;
          const panelElem = refOptionPanel.value;
          const optElem = panelElem.querySelector(`[optid='${getOptid(option)}']`);
          if (optWrapperElem && optElem) {
            const wrapperHeight = optWrapperElem.offsetHeight;
            const offsetPadding = 5;
            if (isAlignBottom) {
              if (optElem.offsetTop + optElem.offsetHeight - optWrapperElem.scrollTop > wrapperHeight) {
                optWrapperElem.scrollTop = optElem.offsetTop + optElem.offsetHeight - wrapperHeight;
              }
            } else {
              if (optElem.offsetTop + offsetPadding < optWrapperElem.scrollTop || optElem.offsetTop + offsetPadding > optWrapperElem.scrollTop + optWrapperElem.clientHeight) {
                optWrapperElem.scrollTop = optElem.offsetTop - offsetPadding;
              }
            }
          }
        }
      });
    };
    const updateZindex = () => {
      if (reactData.panelIndex < (0, _utils.getLastZIndex)()) {
        reactData.panelIndex = (0, _utils.nextZIndex)();
      }
    };
    const updatePlacement = () => {
      return (0, _vue.nextTick)().then(() => {
        const {
          transfer,
          placement
        } = props;
        const {
          panelIndex
        } = reactData;
        const el = refElem.value;
        const panelElem = refOptionPanel.value;
        if (panelElem && el) {
          const targetHeight = el.offsetHeight;
          const targetWidth = el.offsetWidth;
          const panelHeight = panelElem.offsetHeight;
          const panelWidth = panelElem.offsetWidth;
          const marginSize = 5;
          const panelStyle = {
            zIndex: panelIndex
          };
          const {
            boundingTop,
            boundingLeft,
            visibleHeight,
            visibleWidth
          } = (0, _dom.getAbsolutePos)(el);
          let panelPlacement = 'bottom';
          if (transfer) {
            let left = boundingLeft;
            let top = boundingTop + targetHeight;
            if (placement === 'top') {
              panelPlacement = 'top';
              top = boundingTop - panelHeight;
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (top + panelHeight + marginSize > visibleHeight) {
                panelPlacement = 'top';
                top = boundingTop - panelHeight;
              }
              // 如果上面不够放，则向下（优先）
              if (top < marginSize) {
                panelPlacement = 'bottom';
                top = boundingTop + targetHeight;
              }
            }
            // 如果溢出右边
            if (left + panelWidth + marginSize > visibleWidth) {
              left -= left + panelWidth + marginSize - visibleWidth;
            }
            // 如果溢出左边
            if (left < marginSize) {
              left = marginSize;
            }
            Object.assign(panelStyle, {
              left: `${left}px`,
              top: `${top}px`,
              minWidth: `${targetWidth}px`
            });
          } else {
            if (placement === 'top') {
              panelPlacement = 'top';
              panelStyle.bottom = `${targetHeight}px`;
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                // 如果上面不够放，则向下（优先）
                if (boundingTop - targetHeight - panelHeight > marginSize) {
                  panelPlacement = 'top';
                  panelStyle.bottom = `${targetHeight}px`;
                }
              }
            }
          }
          reactData.panelStyle = panelStyle;
          reactData.panelPlacement = panelPlacement;
          return (0, _vue.nextTick)();
        }
      });
    };
    let hidePanelTimeout;
    const showOptionPanel = () => {
      const {
        loading,
        disabled,
        filterable
      } = props;
      if (!loading && !disabled) {
        clearTimeout(hidePanelTimeout);
        if (!reactData.inited) {
          reactData.inited = true;
        }
        reactData.isActivated = true;
        reactData.animatVisible = true;
        if (filterable) {
          refreshOption();
        }
        setTimeout(() => {
          const {
            modelValue,
            multiple
          } = props;
          const currOption = findOption(multiple && modelValue ? modelValue[0] : modelValue);
          reactData.visiblePanel = true;
          if (currOption) {
            setCurrentOption(currOption);
            scrollToOption(currOption);
          }
          handleFocusSearch();
        }, 10);
        updateZindex();
        updatePlacement();
      }
    };
    const hideOptionPanel = () => {
      reactData.searchValue = '';
      reactData.searchLoading = false;
      reactData.visiblePanel = false;
      hidePanelTimeout = window.setTimeout(() => {
        reactData.animatVisible = false;
      }, 350);
    };
    const changeEvent = (evnt, selectValue) => {
      if (selectValue !== props.modelValue) {
        emit('update:modelValue', selectValue);
        selectMethods.dispatchEvent('change', {
          value: selectValue
        }, evnt);
        // 自动更新校验状态
        if ($xeform && $xeformiteminfo) {
          $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, selectValue);
        }
      }
    };
    const clearValueEvent = (evnt, selectValue) => {
      reactData.remoteValueList = [];
      changeEvent(evnt, selectValue);
      selectMethods.dispatchEvent('clear', {
        value: selectValue
      }, evnt);
    };
    const clearEvent = (params, evnt) => {
      clearValueEvent(evnt, null);
      hideOptionPanel();
    };
    const changeOptionEvent = (evnt, selectValue, option) => {
      const {
        modelValue,
        multiple
      } = props;
      const {
        remoteValueList
      } = reactData;
      if (multiple) {
        let multipleValue;
        if (modelValue) {
          if (modelValue.indexOf(selectValue) === -1) {
            multipleValue = modelValue.concat([selectValue]);
          } else {
            multipleValue = modelValue.filter(val => val !== selectValue);
          }
        } else {
          multipleValue = [selectValue];
        }
        const remoteItem = remoteValueList.find(item => item.key === selectValue);
        if (remoteItem) {
          remoteItem.result = option;
        } else {
          remoteValueList.push({
            key: selectValue,
            result: option
          });
        }
        changeEvent(evnt, multipleValue);
      } else {
        reactData.remoteValueList = [{
          key: selectValue,
          result: option
        }];
        changeEvent(evnt, selectValue);
        hideOptionPanel();
      }
    };
    const handleGlobalMousewheelEvent = evnt => {
      const {
        disabled
      } = props;
      const {
        visiblePanel
      } = reactData;
      if (!disabled) {
        if (visiblePanel) {
          const panelElem = refOptionPanel.value;
          if ((0, _dom.getEventTargetNode)(evnt, panelElem).flag) {
            updatePlacement();
          } else {
            hideOptionPanel();
          }
        }
      }
    };
    const handleGlobalMousedownEvent = evnt => {
      const {
        disabled
      } = props;
      const {
        visiblePanel
      } = reactData;
      if (!disabled) {
        const el = refElem.value;
        const panelElem = refOptionPanel.value;
        reactData.isActivated = (0, _dom.getEventTargetNode)(evnt, el).flag || (0, _dom.getEventTargetNode)(evnt, panelElem).flag;
        if (visiblePanel && !reactData.isActivated) {
          hideOptionPanel();
        }
      }
    };
    const findOffsetOption = (optionValue, isUpArrow) => {
      const {
        visibleOptionList,
        visibleGroupList
      } = reactData;
      const isGroup = computeIsGroup.value;
      const valueField = computeValueField.value;
      const groupOptionsField = computeGroupOptionsField.value;
      let firstOption;
      let prevOption;
      let nextOption;
      let currOption;
      if (isGroup) {
        for (let gIndex = 0; gIndex < visibleGroupList.length; gIndex++) {
          const group = visibleGroupList[gIndex];
          const groupOptionList = group[groupOptionsField];
          const isGroupDisabled = group.disabled;
          if (groupOptionList) {
            for (let index = 0; index < groupOptionList.length; index++) {
              const option = groupOptionList[index];
              const isVisible = isOptionVisible(option);
              const isDisabled = isGroupDisabled || option.disabled;
              if (!firstOption && !isDisabled) {
                firstOption = option;
              }
              if (currOption) {
                if (isVisible && !isDisabled) {
                  nextOption = option;
                  if (!isUpArrow) {
                    return {
                      offsetOption: nextOption
                    };
                  }
                }
              }
              if (optionValue === option[valueField]) {
                currOption = option;
                if (isUpArrow) {
                  return {
                    offsetOption: prevOption
                  };
                }
              } else {
                if (isVisible && !isDisabled) {
                  prevOption = option;
                }
              }
            }
          }
        }
      } else {
        for (let index = 0; index < visibleOptionList.length; index++) {
          const option = visibleOptionList[index];
          const isDisabled = option.disabled;
          if (!firstOption && !isDisabled) {
            firstOption = option;
          }
          if (currOption) {
            if (!isDisabled) {
              nextOption = option;
              if (!isUpArrow) {
                return {
                  offsetOption: nextOption
                };
              }
            }
          }
          if (optionValue === option[valueField]) {
            currOption = option;
            if (isUpArrow) {
              return {
                offsetOption: prevOption
              };
            }
          } else {
            if (!isDisabled) {
              prevOption = option;
            }
          }
        }
      }
      return {
        firstOption
      };
    };
    const handleGlobalKeydownEvent = evnt => {
      const {
        clearable,
        disabled
      } = props;
      const {
        visiblePanel,
        currentValue,
        currentOption
      } = reactData;
      if (!disabled) {
        const isTab = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.TAB);
        const isEnter = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ENTER);
        const isEsc = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ESCAPE);
        const isUpArrow = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ARROW_UP);
        const isDwArrow = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ARROW_DOWN);
        const isDel = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.DELETE);
        const isSpacebar = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.SPACEBAR);
        if (isTab) {
          reactData.isActivated = false;
        }
        if (visiblePanel) {
          if (isEsc || isTab) {
            hideOptionPanel();
          } else if (isEnter) {
            evnt.preventDefault();
            evnt.stopPropagation();
            changeOptionEvent(evnt, currentValue, currentOption);
          } else if (isUpArrow || isDwArrow) {
            evnt.preventDefault();
            let {
              firstOption,
              offsetOption
            } = findOffsetOption(currentValue, isUpArrow);
            if (!offsetOption && !findOption(currentValue)) {
              offsetOption = firstOption;
            }
            setCurrentOption(offsetOption);
            scrollToOption(offsetOption, isDwArrow);
          } else if (isSpacebar) {
            evnt.preventDefault();
          }
        } else if ((isUpArrow || isDwArrow || isEnter || isSpacebar) && reactData.isActivated) {
          evnt.preventDefault();
          showOptionPanel();
        }
        if (reactData.isActivated) {
          if (isDel && clearable) {
            clearValueEvent(evnt, null);
          }
        }
      }
    };
    const handleGlobalBlurEvent = () => {
      hideOptionPanel();
    };
    const handleFocusSearch = () => {
      if (props.filterable) {
        (0, _vue.nextTick)(() => {
          const inpSearch = refInpSearch.value;
          if (inpSearch) {
            inpSearch.focus();
          }
        });
      }
    };
    const focusEvent = evnt => {
      if (!props.disabled) {
        reactData.isActivated = true;
      }
      selectMethods.dispatchEvent('focus', {}, evnt);
    };
    const blurEvent = evnt => {
      reactData.isActivated = false;
      selectMethods.dispatchEvent('blur', {}, evnt);
    };
    const modelSearchEvent = value => {
      reactData.searchValue = value;
    };
    const focusSearchEvent = () => {
      reactData.isActivated = true;
    };
    const keydownSearchEvent = params => {
      const {
        $event
      } = params;
      const isEnter = (0, _event.hasEventKey)($event, _event.EVENT_KEYS.ENTER);
      if (isEnter) {
        $event.preventDefault();
        $event.stopPropagation();
      }
    };
    const triggerSearchEvent = _xeUtils.default.debounce(function () {
      const {
        remote,
        remoteMethod
      } = props;
      const {
        searchValue
      } = reactData;
      if (remote && remoteMethod) {
        reactData.searchLoading = true;
        Promise.resolve(remoteMethod({
          searchValue
        })).then(() => (0, _vue.nextTick)()).catch(() => (0, _vue.nextTick)()).finally(() => {
          reactData.searchLoading = false;
          refreshOption();
        });
      } else {
        refreshOption();
      }
    }, 350, {
      trailing: true
    });
    const togglePanelEvent = params => {
      const {
        $event
      } = params;
      $event.preventDefault();
      if (reactData.visiblePanel) {
        hideOptionPanel();
      } else {
        showOptionPanel();
      }
    };
    const checkOptionDisabled = (isSelected, option, group) => {
      if (option.disabled) {
        return true;
      }
      if (group && group.disabled) {
        return true;
      }
      const isMaximize = computeIsMaximize.value;
      if (isMaximize && !isSelected) {
        return true;
      }
      return false;
    };
    const renderOption = (list, group) => {
      const {
        optionKey,
        modelValue,
        multiple
      } = props;
      const {
        currentValue
      } = reactData;
      const optionOpts = computeOptionOpts.value;
      const labelField = computeLabelField.value;
      const valueField = computeValueField.value;
      const isGroup = computeIsGroup.value;
      const {
        useKey
      } = optionOpts;
      const optionSlot = slots.option;
      return list.map((option, cIndex) => {
        const {
          slots,
          className
        } = option;
        const optionValue = option[valueField];
        const isSelected = multiple ? modelValue && modelValue.indexOf(optionValue) > -1 : modelValue === optionValue;
        const isVisible = !isGroup || isOptionVisible(option);
        const isDisabled = checkOptionDisabled(isSelected, option, group);
        const optid = getOptid(option);
        const defaultSlot = slots ? slots.default : null;
        const optParams = {
          option,
          group: null,
          $select: $xeselect
        };
        return isVisible ? (0, _vue.h)('div', {
          key: useKey || optionKey ? optid : cIndex,
          class: ['vxe-select-option', className ? _xeUtils.default.isFunction(className) ? className(optParams) : className : '', {
            'is--disabled': isDisabled,
            'is--selected': isSelected,
            'is--hover': currentValue === optionValue
          }],
          // attrs
          optid: optid,
          // event
          onMousedown: evnt => {
            const isLeftBtn = evnt.button === 0;
            if (isLeftBtn) {
              evnt.stopPropagation();
            }
          },
          onClick: evnt => {
            if (!isDisabled) {
              changeOptionEvent(evnt, optionValue, option);
            }
          },
          onMouseenter: () => {
            if (!isDisabled) {
              setCurrentOption(option);
            }
          }
        }, optionSlot ? callSlot(optionSlot, optParams) : defaultSlot ? callSlot(defaultSlot, optParams) : (0, _utils.formatText)((0, _utils.getFuncText)(option[labelField]))) : null;
      });
    };
    const renderOptgroup = () => {
      const {
        optionKey
      } = props;
      const {
        visibleGroupList
      } = reactData;
      const optionOpts = computeOptionOpts.value;
      const groupLabelField = computeGroupLabelField.value;
      const groupOptionsField = computeGroupOptionsField.value;
      const {
        useKey
      } = optionOpts;
      const optionSlot = slots.option;
      return visibleGroupList.map((group, gIndex) => {
        const {
          slots,
          className
        } = group;
        const optid = getOptid(group);
        const isGroupDisabled = group.disabled;
        const defaultSlot = slots ? slots.default : null;
        const optParams = {
          option: group,
          group,
          $select: $xeselect
        };
        return (0, _vue.h)('div', {
          key: useKey || optionKey ? optid : gIndex,
          class: ['vxe-optgroup', className ? _xeUtils.default.isFunction(className) ? className(optParams) : className : '', {
            'is--disabled': isGroupDisabled
          }],
          // attrs
          optid: optid
        }, [(0, _vue.h)('div', {
          class: 'vxe-optgroup--title'
        }, optionSlot ? callSlot(optionSlot, optParams) : defaultSlot ? callSlot(defaultSlot, optParams) : (0, _utils.getFuncText)(group[groupLabelField])), (0, _vue.h)('div', {
          class: 'vxe-optgroup--wrapper'
        }, renderOption(group[groupOptionsField] || [], group))]);
      });
    };
    const renderOpts = () => {
      const {
        visibleGroupList,
        visibleOptionList,
        searchLoading
      } = reactData;
      const isGroup = computeIsGroup.value;
      if (searchLoading) {
        return [(0, _vue.h)('div', {
          class: 'vxe-select--search-loading'
        }, [(0, _vue.h)('i', {
          class: ['vxe-select--search-icon', _conf.default.icon.SELECT_LOADED]
        }), (0, _vue.h)('span', {
          class: 'vxe-select--search-text'
        }, _conf.default.i18n('vxe.select.loadingText'))])];
      }
      if (isGroup) {
        if (visibleGroupList.length) {
          return renderOptgroup();
        }
      } else {
        if (visibleOptionList.length) {
          return renderOption(visibleOptionList);
        }
      }
      return [(0, _vue.h)('div', {
        class: 'vxe-select--empty-placeholder'
      }, props.emptyText || _conf.default.i18n('vxe.select.emptyText'))];
    };
    selectMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, Object.assign({
          $select: $xeselect,
          $event: evnt
        }, params));
      },
      isPanelVisible() {
        return reactData.visiblePanel;
      },
      togglePanel() {
        if (reactData.visiblePanel) {
          hideOptionPanel();
        } else {
          showOptionPanel();
        }
        return (0, _vue.nextTick)();
      },
      hidePanel() {
        if (reactData.visiblePanel) {
          hideOptionPanel();
        }
        return (0, _vue.nextTick)();
      },
      showPanel() {
        if (!reactData.visiblePanel) {
          showOptionPanel();
        }
        return (0, _vue.nextTick)();
      },
      refreshOption,
      focus() {
        const $input = refInput.value;
        reactData.isActivated = true;
        $input.blur();
        return (0, _vue.nextTick)();
      },
      blur() {
        const $input = refInput.value;
        $input.blur();
        reactData.isActivated = false;
        return (0, _vue.nextTick)();
      }
    };
    Object.assign($xeselect, selectMethods);
    (0, _vue.watch)(() => reactData.staticOptions, value => {
      if (value.some(item => item.options && item.options.length)) {
        reactData.fullOptionList = [];
        reactData.fullGroupList = value;
      } else {
        reactData.fullGroupList = [];
        reactData.fullOptionList = value || [];
      }
      cacheItemMap();
    });
    (0, _vue.watch)(() => props.options, value => {
      reactData.fullGroupList = [];
      reactData.fullOptionList = value || [];
      cacheItemMap();
    });
    (0, _vue.watch)(() => props.optionGroups, value => {
      reactData.fullOptionList = [];
      reactData.fullGroupList = value || [];
      cacheItemMap();
    });
    (0, _vue.onMounted)(() => {
      (0, _vue.nextTick)(() => {
        const {
          options,
          optionGroups
        } = props;
        if (optionGroups) {
          reactData.fullGroupList = optionGroups;
        } else if (options) {
          reactData.fullOptionList = options;
        }
        cacheItemMap();
      });
      _event.GlobalEvent.on($xeselect, 'mousewheel', handleGlobalMousewheelEvent);
      _event.GlobalEvent.on($xeselect, 'mousedown', handleGlobalMousedownEvent);
      _event.GlobalEvent.on($xeselect, 'keydown', handleGlobalKeydownEvent);
      _event.GlobalEvent.on($xeselect, 'blur', handleGlobalBlurEvent);
    });
    (0, _vue.onUnmounted)(() => {
      _event.GlobalEvent.off($xeselect, 'mousewheel');
      _event.GlobalEvent.off($xeselect, 'mousedown');
      _event.GlobalEvent.off($xeselect, 'keydown');
      _event.GlobalEvent.off($xeselect, 'blur');
    });
    const renderVN = () => {
      const {
        className,
        popupClassName,
        transfer,
        disabled,
        loading,
        filterable
      } = props;
      const {
        inited,
        isActivated,
        visiblePanel
      } = reactData;
      const vSize = computeSize.value;
      const selectLabel = computeSelectLabel.value;
      const defaultSlot = slots.default;
      const headerSlot = slots.header;
      const footerSlot = slots.footer;
      const prefixSlot = slots.prefix;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-select', className ? _xeUtils.default.isFunction(className) ? className({
          $select: $xeselect
        }) : className : '', {
          [`size--${vSize}`]: vSize,
          'is--visivle': visiblePanel,
          'is--disabled': disabled,
          'is--filter': filterable,
          'is--loading': loading,
          'is--active': isActivated
        }]
      }, [(0, _vue.h)('div', {
        class: 'vxe-select-slots',
        ref: 'hideOption'
      }, defaultSlot ? defaultSlot({}) : []), (0, _vue.h)(_input.default, {
        ref: refInput,
        clearable: props.clearable,
        placeholder: props.placeholder,
        readonly: true,
        disabled: disabled,
        type: 'text',
        prefixIcon: props.prefixIcon,
        suffixIcon: loading ? _conf.default.icon.SELECT_LOADED : visiblePanel ? _conf.default.icon.SELECT_OPEN : _conf.default.icon.SELECT_CLOSE,
        modelValue: selectLabel,
        onClear: clearEvent,
        onClick: togglePanelEvent,
        onFocus: focusEvent,
        onBlur: blurEvent,
        onSuffixClick: togglePanelEvent
      }, prefixSlot ? {
        prefix: () => prefixSlot({})
      } : {}), (0, _vue.h)(_vue.Teleport, {
        to: 'body',
        disabled: transfer ? !inited : true
      }, [(0, _vue.h)('div', {
        ref: refOptionPanel,
        class: ['vxe-table--ignore-clear vxe-select--panel', popupClassName ? _xeUtils.default.isFunction(popupClassName) ? popupClassName({
          $select: $xeselect
        }) : popupClassName : '', {
          [`size--${vSize}`]: vSize,
          'is--transfer': transfer,
          'animat--leave': !loading && reactData.animatVisible,
          'animat--enter': !loading && visiblePanel
        }],
        placement: reactData.panelPlacement,
        style: reactData.panelStyle
      }, inited ? [filterable ? (0, _vue.h)('div', {
        class: 'vxe-select--panel-search'
      }, [(0, _vue.h)(_input.default, {
        ref: refInpSearch,
        class: 'vxe-select-search--input',
        modelValue: reactData.searchValue,
        clearable: true,
        placeholder: _conf.default.i18n('vxe.select.search'),
        prefixIcon: _conf.default.icon.INPUT_SEARCH,
        'onUpdate:modelValue': modelSearchEvent,
        onFocus: focusSearchEvent,
        onKeydown: keydownSearchEvent,
        onChange: triggerSearchEvent,
        onSearch: triggerSearchEvent
      })]) : (0, _vue.createCommentVNode)(), (0, _vue.h)('div', {
        class: 'vxe-select--panel-wrapper'
      }, [headerSlot ? (0, _vue.h)('div', {
        class: 'vxe-select--panel-header'
      }, headerSlot({})) : (0, _vue.createCommentVNode)(), (0, _vue.h)('div', {
        class: 'vxe-select--panel-body'
      }, [(0, _vue.h)('div', {
        ref: refOptionWrapper,
        class: 'vxe-select-option--wrapper'
      }, renderOpts())]), footerSlot ? (0, _vue.h)('div', {
        class: 'vxe-select--panel-footer'
      }, footerSlot({})) : (0, _vue.createCommentVNode)()])] : [])])]);
    };
    $xeselect.renderVN = renderVN;
    (0, _vue.provide)('$xeselect', $xeselect);
    return $xeselect;
  },
  render() {
    return this.renderVN();
  }
});