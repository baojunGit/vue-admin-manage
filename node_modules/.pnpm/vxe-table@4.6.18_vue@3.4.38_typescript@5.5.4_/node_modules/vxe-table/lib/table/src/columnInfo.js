"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnInfo = void 0;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _formats = require("../../v-x-e-table/src/formats");
var _util = require("./util");
var _utils = require("../../tools/utils");
var _log = require("../../tools/log");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ColumnInfo {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  constructor($xetable, _vm, {
    renderHeader,
    renderCell,
    renderFooter,
    renderData
  } = {}) {
    const $xegrid = $xetable.xegrid;
    const formatter = _vm.formatter;
    const visible = _xeUtils.default.isBoolean(_vm.visible) ? _vm.visible : true;
    if (process.env.NODE_ENV === 'development') {
      const types = ['seq', 'checkbox', 'radio', 'expand', 'html'];
      if (_vm.type && types.indexOf(_vm.type) === -1) {
        (0, _log.warnLog)('vxe.error.errProp', [`type=${_vm.type}`, types.join(', ')]);
      }
      if (_xeUtils.default.isBoolean(_vm.cellRender) || _vm.cellRender && !_xeUtils.default.isObject(_vm.cellRender)) {
        (0, _log.warnLog)('vxe.error.errProp', [`column.cell-render=${_vm.cellRender}`, 'column.cell-render={}']);
      }
      if (_xeUtils.default.isBoolean(_vm.editRender) || _vm.editRender && !_xeUtils.default.isObject(_vm.editRender)) {
        (0, _log.warnLog)('vxe.error.errProp', [`column.edit-render=${_vm.editRender}`, 'column.edit-render={}']);
      }
      if (_vm.cellRender && _vm.editRender) {
        (0, _log.warnLog)('vxe.error.errConflicts', ['column.cell-render', 'column.edit-render']);
      }
      if (_vm.type === 'expand') {
        const {
          props: tableProps
        } = $xetable;
        const {
          treeConfig
        } = tableProps;
        const {
          computeTreeOpts
        } = $xetable.getComputeMaps();
        const treeOpts = computeTreeOpts.value;
        if (treeConfig && (treeOpts.showLine || treeOpts.line)) {
          (0, _log.errLog)('vxe.error.errConflicts', ['tree-config.showLine', 'column.type=expand']);
        }
      }
      if (formatter) {
        if (_xeUtils.default.isString(formatter)) {
          const gFormatOpts = _formats.formats.get(formatter) || _xeUtils.default[formatter];
          if (!gFormatOpts || !_xeUtils.default.isFunction(gFormatOpts.cellFormatMethod)) {
            (0, _log.errLog)('vxe.error.notFormats', [formatter]);
          }
        } else if (_xeUtils.default.isArray(formatter)) {
          const gFormatOpts = _formats.formats.get(formatter[0]) || _xeUtils.default[formatter[0]];
          if (!gFormatOpts || !_xeUtils.default.isFunction(gFormatOpts.cellFormatMethod)) {
            (0, _log.errLog)('vxe.error.notFormats', [formatter[0]]);
          }
        }
      }
    }
    Object.assign(this, {
      // 基本属性
      type: _vm.type,
      property: _vm.field,
      field: _vm.field,
      title: _vm.title,
      width: _vm.width,
      minWidth: _vm.minWidth,
      maxWidth: _vm.maxWidth,
      resizable: _vm.resizable,
      fixed: _vm.fixed,
      align: _vm.align,
      headerAlign: _vm.headerAlign,
      footerAlign: _vm.footerAlign,
      showOverflow: _vm.showOverflow,
      showHeaderOverflow: _vm.showHeaderOverflow,
      showFooterOverflow: _vm.showFooterOverflow,
      className: _vm.className,
      headerClassName: _vm.headerClassName,
      footerClassName: _vm.footerClassName,
      formatter: formatter,
      sortable: _vm.sortable,
      sortBy: _vm.sortBy,
      sortType: _vm.sortType,
      filters: (0, _util.toFilters)(_vm.filters),
      filterMultiple: _xeUtils.default.isBoolean(_vm.filterMultiple) ? _vm.filterMultiple : true,
      filterMethod: _vm.filterMethod,
      filterResetMethod: _vm.filterResetMethod,
      filterRecoverMethod: _vm.filterRecoverMethod,
      filterRender: _vm.filterRender,
      treeNode: _vm.treeNode,
      cellType: _vm.cellType,
      cellRender: _vm.cellRender,
      editRender: _vm.editRender,
      contentRender: _vm.contentRender,
      headerExportMethod: _vm.headerExportMethod,
      exportMethod: _vm.exportMethod,
      footerExportMethod: _vm.footerExportMethod,
      titleHelp: _vm.titleHelp,
      titlePrefix: _vm.titlePrefix,
      titleSuffix: _vm.titleSuffix,
      // 自定义参数
      params: _vm.params,
      // 渲染属性
      id: _vm.colId || _xeUtils.default.uniqueId('col_'),
      parentId: null,
      visible,
      // 内部属性（一旦被使用，将导致不可升级版本）
      halfVisible: false,
      defaultVisible: visible,
      defaultFixed: _vm.fixed,
      checked: false,
      halfChecked: false,
      disabled: false,
      // 分组层级
      level: 1,
      // 跨行
      rowSpan: 1,
      // 跨列
      colSpan: 1,
      // 数据排序
      order: null,
      sortTime: 0,
      // 列排序
      sortNumber: 0,
      renderSortNumber: 0,
      renderWidth: 0,
      renderHeight: 0,
      resizeWidth: 0,
      renderLeft: 0,
      renderArgs: [],
      model: {},
      renderHeader: renderHeader || _vm.renderHeader,
      renderCell: renderCell || _vm.renderCell,
      renderFooter: renderFooter || _vm.renderFooter,
      renderData: renderData,
      // 单元格插槽，只对 grid 有效
      slots: _vm.slots
    });
    if ($xegrid) {
      const {
        computeProxyOpts
      } = $xegrid.getComputeMaps();
      const proxyOpts = computeProxyOpts.value;
      if (proxyOpts.beforeColumn) {
        proxyOpts.beforeColumn({
          $grid: $xegrid,
          column: this
        });
      }
    }
  }
  getTitle() {
    return (0, _utils.getFuncText)(this.title || (this.type === 'seq' ? _conf.default.i18n('vxe.table.seqTitle') : ''));
  }
  getKey() {
    return this.field || (this.type ? `type=${this.type}` : null);
  }
  update(name, value) {
    // 不支持直接修改的属性
    if (name !== 'filters') {
      if (name === 'field') {
        // 兼容旧属性
        this.property = value;
      }
      this[name] = value;
    }
  }
}
exports.ColumnInfo = ColumnInfo;