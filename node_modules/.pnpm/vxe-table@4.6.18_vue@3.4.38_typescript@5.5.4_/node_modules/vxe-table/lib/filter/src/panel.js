"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _vXETable = require("../../v-x-e-table");
var _utils = require("../../tools/utils");
var _dom = require("../../tools/dom");
var _vn = require("../../tools/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeTableFilterPanel',
  props: {
    filterStore: Object
  },
  setup(props) {
    const $xetable = (0, _vue.inject)('$xetable', {});
    const {
      reactData: tableReactData,
      internalData: tableInternalData,
      getComputeMaps
    } = $xetable;
    const {
      computeFilterOpts
    } = getComputeMaps();
    const computeHasCheckOption = (0, _vue.computed)(() => {
      const {
        filterStore
      } = props;
      return filterStore && filterStore.options.some(option => option.checked);
    });
    // 全部筛选事件
    const filterCheckAllEvent = (evnt, value) => {
      const {
        filterStore
      } = props;
      filterStore.options.forEach(option => {
        option._checked = value;
        option.checked = value;
      });
      filterStore.isAllSelected = value;
      filterStore.isIndeterminate = false;
    };
    /*************************
     * Publish methods
     *************************/
    // 确认筛选
    const confirmFilter = evnt => {
      const {
        filterStore
      } = props;
      filterStore.options.forEach(option => {
        option.checked = option._checked;
      });
      $xetable.confirmFilterEvent(evnt);
    };
    // （单选）筛选发生改变
    const changeRadioOption = (evnt, checked, item) => {
      const {
        filterStore
      } = props;
      filterStore.options.forEach(option => {
        option._checked = false;
      });
      item._checked = checked;
      $xetable.checkFilterOptions();
      confirmFilter(evnt);
    };
    /**
     * 重置筛选
     * 当筛选面板中的重置按钮被按下时触发
     * @param {Event} evnt 事件
     */
    const resetFilter = evnt => {
      const {
        filterStore
      } = props;
      $xetable.handleClearFilter(filterStore.column);
      $xetable.confirmFilterEvent(evnt);
    };
    // （多选）筛选发生改变
    const changeMultipleOption = (evnt, checked, item) => {
      item._checked = checked;
      $xetable.checkFilterOptions();
    };
    // 筛选发生改变
    const changeOption = (evnt, checked, item) => {
      const {
        filterStore
      } = props;
      if (filterStore.multiple) {
        changeMultipleOption(evnt, checked, item);
      } else {
        changeRadioOption(evnt, checked, item);
      }
    };
    const changeAllOption = (evnt, checked) => {
      const {
        filterStore
      } = props;
      if (filterStore.multiple) {
        filterCheckAllEvent(evnt, checked);
      } else {
        resetFilter(evnt);
      }
    };
    /*************************
     * Publish methods
     *************************/
    const $panel = {
      changeRadioOption,
      changeMultipleOption,
      changeAllOption,
      changeOption,
      confirmFilter,
      resetFilter
    };
    const renderOptions = (filterRender, compConf) => {
      const {
        filterStore
      } = props;
      const {
        column,
        multiple,
        maxHeight
      } = filterStore;
      const {
        slots
      } = column;
      const filterSlot = slots ? slots.filter : null;
      const params = Object.assign({}, tableInternalData._currFilterParams, {
        $panel,
        $table: $xetable
      });
      if (filterSlot) {
        return [(0, _vue.h)('div', {
          class: 'vxe-table--filter-template'
        }, $xetable.callSlot(filterSlot, params))];
      } else if (compConf && compConf.renderFilter) {
        return [(0, _vue.h)('div', {
          class: 'vxe-table--filter-template'
        }, (0, _vn.getSlotVNs)(compConf.renderFilter(filterRender, params)))];
      }
      const isAllChecked = multiple ? filterStore.isAllSelected : !filterStore.options.some(item => item._checked);
      const isAllIndeterminate = multiple && filterStore.isIndeterminate;
      return [(0, _vue.h)('ul', {
        class: 'vxe-table--filter-header'
      }, [(0, _vue.h)('li', {
        class: ['vxe-table--filter-option', {
          'is--checked': isAllChecked,
          'is--indeterminate': isAllIndeterminate
        }],
        title: _conf.default.i18n(multiple ? 'vxe.table.allTitle' : 'vxe.table.allFilter'),
        onClick: evnt => {
          changeAllOption(evnt, !filterStore.isAllSelected);
        }
      }, (multiple ? [(0, _vue.h)('span', {
        class: ['vxe-checkbox--icon', isAllIndeterminate ? _conf.default.icon.TABLE_CHECKBOX_INDETERMINATE : isAllChecked ? _conf.default.icon.TABLE_CHECKBOX_CHECKED : _conf.default.icon.TABLE_CHECKBOX_UNCHECKED]
      })] : []).concat([(0, _vue.h)('span', {
        class: 'vxe-checkbox--label'
      }, _conf.default.i18n('vxe.table.allFilter'))]))]), (0, _vue.h)('ul', {
        class: 'vxe-table--filter-body',
        style: maxHeight ? {
          maxHeight: `${maxHeight}px`
        } : {}
      }, filterStore.options.map(item => {
        const isChecked = item._checked;
        const isIndeterminate = false;
        return (0, _vue.h)('li', {
          class: ['vxe-table--filter-option', {
            'is--checked': item._checked
          }],
          title: item.label,
          onClick: evnt => {
            changeOption(evnt, !item._checked, item);
          }
        }, (multiple ? [(0, _vue.h)('span', {
          class: ['vxe-checkbox--icon', isIndeterminate ? _conf.default.icon.TABLE_CHECKBOX_INDETERMINATE : isChecked ? _conf.default.icon.TABLE_CHECKBOX_CHECKED : _conf.default.icon.TABLE_CHECKBOX_UNCHECKED]
        })] : []).concat([(0, _vue.h)('span', {
          class: 'vxe-checkbox--label'
        }, (0, _utils.formatText)(item.label, 1))]));
      }))];
    };
    const renderFooters = () => {
      const {
        filterStore
      } = props;
      const {
        column,
        multiple
      } = filterStore;
      const filterOpts = computeFilterOpts.value;
      const hasCheckOption = computeHasCheckOption.value;
      const filterRender = column.filterRender;
      const compConf = filterRender ? _vXETable.VXETable.renderer.get(filterRender.name) : null;
      const isDisabled = !hasCheckOption && !filterStore.isAllSelected && !filterStore.isIndeterminate;
      return multiple && (!compConf || compConf.showFilterFooter !== false) ? [(0, _vue.h)('div', {
        class: 'vxe-table--filter-footer'
      }, [(0, _vue.h)('button', {
        class: {
          'is--disabled': isDisabled
        },
        disabled: isDisabled,
        onClick: confirmFilter
      }, filterOpts.confirmButtonText || _conf.default.i18n('vxe.table.confirmFilter')), (0, _vue.h)('button', {
        onClick: resetFilter
      }, filterOpts.resetButtonText || _conf.default.i18n('vxe.table.resetFilter'))])] : [];
    };
    const renderVN = () => {
      const {
        filterStore
      } = props;
      const {
        initStore
      } = tableReactData;
      const {
        column
      } = filterStore;
      const filterRender = column ? column.filterRender : null;
      const compConf = filterRender ? _vXETable.VXETable.renderer.get(filterRender.name) : null;
      const filterClassName = compConf ? compConf.filterClassName : '';
      const params = Object.assign({}, tableInternalData._currFilterParams, {
        $panel,
        $table: $xetable
      });
      return (0, _vue.h)('div', {
        class: ['vxe-table--filter-wrapper', 'filter--prevent-default', (0, _dom.getPropClass)(filterClassName, params), {
          'is--animat': $xetable.props.animat,
          'is--multiple': filterStore.multiple,
          'is--active': filterStore.visible
        }],
        style: filterStore.style
      }, initStore.filter && filterStore.visible ? renderOptions(filterRender, compConf).concat(renderFooters()) : []);
    };
    return renderVN;
  }
});