"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _utils = require("../../tools/utils");
var _modal = _interopRequireDefault(require("../../modal/src/modal"));
var _input = _interopRequireDefault(require("../../input/src/input"));
var _checkbox = _interopRequireDefault(require("../../checkbox/src/checkbox"));
var _select = _interopRequireDefault(require("../../select/src/select"));
var _button = _interopRequireDefault(require("../../button/src/button"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeTableExportPanel',
  props: {
    defaultOptions: Object,
    storeData: Object
  },
  setup(props) {
    const $xetable = (0, _vue.inject)('$xetable', {});
    const {
      computeExportOpts,
      computePrintOpts
    } = $xetable.getComputeMaps();
    const reactData = (0, _vue.reactive)({
      isAll: false,
      isIndeterminate: false,
      loading: false
    });
    const xButtonConfirm = (0, _vue.ref)();
    const xInputFilename = (0, _vue.ref)();
    const xInputSheetname = (0, _vue.ref)();
    const computeCheckedAll = (0, _vue.computed)(() => {
      const {
        storeData
      } = props;
      return storeData.columns.every(column => column.checked);
    });
    const computeShowSheet = (0, _vue.computed)(() => {
      const {
        defaultOptions
      } = props;
      return ['html', 'xml', 'xlsx', 'pdf'].indexOf(defaultOptions.type) > -1;
    });
    const computeSupportMerge = (0, _vue.computed)(() => {
      const {
        storeData,
        defaultOptions
      } = props;
      return !defaultOptions.original && defaultOptions.mode === 'current' && (storeData.isPrint || ['html', 'xlsx'].indexOf(defaultOptions.type) > -1);
    });
    const computeSupportStyle = (0, _vue.computed)(() => {
      const {
        defaultOptions
      } = props;
      return !defaultOptions.original && ['xlsx'].indexOf(defaultOptions.type) > -1;
    });
    const handleOptionCheck = column => {
      const {
        storeData
      } = props;
      const matchObj = _xeUtils.default.findTree(storeData.columns, item => item === column);
      if (matchObj && matchObj.parent) {
        const {
          parent
        } = matchObj;
        if (parent.children && parent.children.length) {
          parent.checked = parent.children.every(column => column.checked);
          parent.halfChecked = !parent.checked && parent.children.some(column => column.checked || column.halfChecked);
          handleOptionCheck(parent);
        }
      }
    };
    const checkStatus = () => {
      const {
        storeData
      } = props;
      const columns = storeData.columns;
      reactData.isAll = columns.every(column => column.disabled || column.checked);
      reactData.isIndeterminate = !reactData.isAll && columns.some(column => !column.disabled && (column.checked || column.halfChecked));
    };
    const changeOption = column => {
      const isChecked = !column.checked;
      _xeUtils.default.eachTree([column], item => {
        item.checked = isChecked;
        item.halfChecked = false;
      });
      handleOptionCheck(column);
      checkStatus();
    };
    const allColumnEvent = () => {
      const {
        storeData
      } = props;
      const isAll = !reactData.isAll;
      _xeUtils.default.eachTree(storeData.columns, column => {
        if (!column.disabled) {
          column.checked = isAll;
          column.halfChecked = false;
        }
      });
      reactData.isAll = isAll;
      checkStatus();
    };
    const showEvent = () => {
      (0, _vue.nextTick)(() => {
        const filenameInp = xInputFilename.value;
        const sheetnameInp = xInputSheetname.value;
        const confirmBtn = xButtonConfirm.value;
        const targetElem = filenameInp || sheetnameInp || confirmBtn;
        if (targetElem) {
          targetElem.focus();
        }
      });
      checkStatus();
    };
    const getExportOption = () => {
      const {
        storeData,
        defaultOptions
      } = props;
      const {
        hasMerge,
        columns
      } = storeData;
      const checkedAll = computeCheckedAll.value;
      const supportMerge = computeSupportMerge.value;
      const expColumns = _xeUtils.default.searchTree(columns, column => column.checked, {
        children: 'children',
        mapChildren: 'childNodes',
        original: true
      });
      return Object.assign({}, defaultOptions, {
        columns: expColumns,
        isMerge: hasMerge && supportMerge && checkedAll ? defaultOptions.isMerge : false
      });
    };
    const printEvent = () => {
      const {
        storeData
      } = props;
      const printOpts = computePrintOpts.value;
      storeData.visible = false;
      $xetable.print(Object.assign({}, printOpts, getExportOption()));
    };
    const exportEvent = () => {
      const {
        storeData
      } = props;
      const exportOpts = computeExportOpts.value;
      reactData.loading = true;
      $xetable.exportData(Object.assign({}, exportOpts, getExportOption())).then(() => {
        reactData.loading = false;
        storeData.visible = false;
      }).catch(() => {
        reactData.loading = false;
      });
    };
    const cancelEvent = () => {
      const {
        storeData
      } = props;
      storeData.visible = false;
    };
    const confirmEvent = () => {
      const {
        storeData
      } = props;
      if (storeData.isPrint) {
        printEvent();
      } else {
        exportEvent();
      }
    };
    const renderVN = () => {
      const {
        defaultOptions,
        storeData
      } = props;
      const {
        isAll: isAllChecked,
        isIndeterminate: isAllIndeterminate
      } = reactData;
      const {
        hasTree,
        hasMerge,
        isPrint,
        hasColgroup
      } = storeData;
      const {
        isHeader
      } = defaultOptions;
      const cols = [];
      const checkedAll = computeCheckedAll.value;
      const showSheet = computeShowSheet.value;
      const supportMerge = computeSupportMerge.value;
      const supportStyle = computeSupportStyle.value;
      _xeUtils.default.eachTree(storeData.columns, column => {
        const colTitle = (0, _utils.formatText)(column.getTitle(), 1);
        const isColGroup = column.children && column.children.length;
        const isChecked = column.checked;
        const indeterminate = column.halfChecked;
        cols.push((0, _vue.h)('li', {
          class: ['vxe-export--panel-column-option', `level--${column.level}`, {
            'is--group': isColGroup,
            'is--checked': isChecked,
            'is--indeterminate': indeterminate,
            'is--disabled': column.disabled
          }],
          title: colTitle,
          onClick: () => {
            if (!column.disabled) {
              changeOption(column);
            }
          }
        }, [(0, _vue.h)('span', {
          class: ['vxe-checkbox--icon', indeterminate ? _conf.default.icon.TABLE_CHECKBOX_INDETERMINATE : isChecked ? _conf.default.icon.TABLE_CHECKBOX_CHECKED : _conf.default.icon.TABLE_CHECKBOX_UNCHECKED]
        }), (0, _vue.h)('span', {
          class: 'vxe-checkbox--label'
        }, colTitle)]));
      });
      return (0, _vue.h)(_modal.default, {
        modelValue: storeData.visible,
        title: _conf.default.i18n(isPrint ? 'vxe.export.printTitle' : 'vxe.export.expTitle'),
        className: 'vxe-table-export-popup-wrapper',
        width: 660,
        mask: true,
        lockView: true,
        showFooter: false,
        escClosable: true,
        maskClosable: true,
        loading: reactData.loading,
        'onUpdate:modelValue'(value) {
          storeData.visible = value;
        },
        onShow: showEvent
      }, {
        default: () => {
          return (0, _vue.h)('div', {
            class: 'vxe-export--panel'
          }, [(0, _vue.h)('table', {
            cellspacing: 0,
            cellpadding: 0,
            border: 0
          }, [(0, _vue.h)('tbody', [[isPrint ? (0, _vue.createCommentVNode)() : (0, _vue.h)('tr', [(0, _vue.h)('td', _conf.default.i18n('vxe.export.expName')), (0, _vue.h)('td', [(0, _vue.h)(_input.default, {
            ref: xInputFilename,
            modelValue: defaultOptions.filename,
            type: 'text',
            clearable: true,
            placeholder: _conf.default.i18n('vxe.export.expNamePlaceholder'),
            'onUpdate:modelValue'(value) {
              defaultOptions.filename = value;
            }
          })])]), isPrint ? (0, _vue.createCommentVNode)() : (0, _vue.h)('tr', [(0, _vue.h)('td', _conf.default.i18n('vxe.export.expType')), (0, _vue.h)('td', [(0, _vue.h)(_select.default, {
            modelValue: defaultOptions.type,
            options: storeData.typeList.map(item => {
              return {
                value: item.value,
                label: _conf.default.i18n(item.label)
              };
            }),
            'onUpdate:modelValue'(value) {
              defaultOptions.type = value;
            }
          })])]), isPrint || showSheet ? (0, _vue.h)('tr', [(0, _vue.h)('td', _conf.default.i18n('vxe.export.expSheetName')), (0, _vue.h)('td', [(0, _vue.h)(_input.default, {
            ref: xInputSheetname,
            modelValue: defaultOptions.sheetName,
            type: 'text',
            clearable: true,
            placeholder: _conf.default.i18n('vxe.export.expSheetNamePlaceholder'),
            'onUpdate:modelValue'(value) {
              defaultOptions.sheetName = value;
            }
          })])]) : (0, _vue.createCommentVNode)(), (0, _vue.h)('tr', [(0, _vue.h)('td', _conf.default.i18n('vxe.export.expMode')), (0, _vue.h)('td', [(0, _vue.h)(_select.default, {
            modelValue: defaultOptions.mode,
            options: storeData.modeList.map(item => {
              return {
                value: item.value,
                label: _conf.default.i18n(item.label)
              };
            }),
            'onUpdate:modelValue'(value) {
              defaultOptions.mode = value;
            }
          })])]), (0, _vue.h)('tr', [(0, _vue.h)('td', [_conf.default.i18n('vxe.export.expColumn')]), (0, _vue.h)('td', [(0, _vue.h)('div', {
            class: 'vxe-export--panel-column'
          }, [(0, _vue.h)('ul', {
            class: 'vxe-export--panel-column-header'
          }, [(0, _vue.h)('li', {
            class: ['vxe-export--panel-column-option', {
              'is--checked': isAllChecked,
              'is--indeterminate': isAllIndeterminate
            }],
            title: _conf.default.i18n('vxe.table.allTitle'),
            onClick: allColumnEvent
          }, [(0, _vue.h)('span', {
            class: ['vxe-checkbox--icon', isAllIndeterminate ? _conf.default.icon.TABLE_CHECKBOX_INDETERMINATE : isAllChecked ? _conf.default.icon.TABLE_CHECKBOX_CHECKED : _conf.default.icon.TABLE_CHECKBOX_UNCHECKED]
          }), (0, _vue.h)('span', {
            class: 'vxe-checkbox--label'
          }, _conf.default.i18n('vxe.export.expCurrentColumn'))])]), (0, _vue.h)('ul', {
            class: 'vxe-export--panel-column-body'
          }, cols)])])]), (0, _vue.h)('tr', [(0, _vue.h)('td', _conf.default.i18n('vxe.export.expOpts')), (0, _vue.h)('td', [(0, _vue.h)('div', {
            class: 'vxe-export--panel-option-row'
          }, [(0, _vue.h)(_checkbox.default, {
            modelValue: defaultOptions.isHeader,
            title: _conf.default.i18n('vxe.export.expHeaderTitle'),
            content: _conf.default.i18n('vxe.export.expOptHeader'),
            'onUpdate:modelValue'(value) {
              defaultOptions.isHeader = value;
            }
          }), (0, _vue.h)(_checkbox.default, {
            modelValue: defaultOptions.isFooter,
            disabled: !storeData.hasFooter,
            title: _conf.default.i18n('vxe.export.expFooterTitle'),
            content: _conf.default.i18n('vxe.export.expOptFooter'),
            'onUpdate:modelValue'(value) {
              defaultOptions.isFooter = value;
            }
          }), (0, _vue.h)(_checkbox.default, {
            modelValue: defaultOptions.original,
            title: _conf.default.i18n('vxe.export.expOriginalTitle'),
            content: _conf.default.i18n('vxe.export.expOptOriginal'),
            'onUpdate:modelValue'(value) {
              defaultOptions.original = value;
            }
          })]), (0, _vue.h)('div', {
            class: 'vxe-export--panel-option-row'
          }, [(0, _vue.h)(_checkbox.default, {
            modelValue: isHeader && hasColgroup && supportMerge ? defaultOptions.isColgroup : false,
            title: _conf.default.i18n('vxe.export.expColgroupTitle'),
            disabled: !isHeader || !hasColgroup || !supportMerge,
            content: _conf.default.i18n('vxe.export.expOptColgroup'),
            'onUpdate:modelValue'(value) {
              defaultOptions.isColgroup = value;
            }
          }), (0, _vue.h)(_checkbox.default, {
            modelValue: hasMerge && supportMerge && checkedAll ? defaultOptions.isMerge : false,
            title: _conf.default.i18n('vxe.export.expMergeTitle'),
            disabled: !hasMerge || !supportMerge || !checkedAll,
            content: _conf.default.i18n('vxe.export.expOptMerge'),
            'onUpdate:modelValue'(value) {
              defaultOptions.isMerge = value;
            }
          }), isPrint ? (0, _vue.createCommentVNode)() : (0, _vue.h)(_checkbox.default, {
            modelValue: supportStyle ? defaultOptions.useStyle : false,
            disabled: !supportStyle,
            title: _conf.default.i18n('vxe.export.expUseStyleTitle'),
            content: _conf.default.i18n('vxe.export.expOptUseStyle'),
            'onUpdate:modelValue'(value) {
              defaultOptions.useStyle = value;
            }
          }), (0, _vue.h)(_checkbox.default, {
            modelValue: hasTree ? defaultOptions.isAllExpand : false,
            disabled: !hasTree,
            title: _conf.default.i18n('vxe.export.expAllExpandTitle'),
            content: _conf.default.i18n('vxe.export.expOptAllExpand'),
            'onUpdate:modelValue'(value) {
              defaultOptions.isAllExpand = value;
            }
          })])])])]])]), (0, _vue.h)('div', {
            class: 'vxe-export--panel-btns'
          }, [(0, _vue.h)(_button.default, {
            content: _conf.default.i18n('vxe.export.expCancel'),
            onClick: cancelEvent
          }), (0, _vue.h)(_button.default, {
            ref: xButtonConfirm,
            status: 'primary',
            content: _conf.default.i18n(isPrint ? 'vxe.export.expPrint' : 'vxe.export.expConfirm'),
            onClick: confirmEvent
          })])]);
        }
      });
    };
    return renderVN;
  }
});