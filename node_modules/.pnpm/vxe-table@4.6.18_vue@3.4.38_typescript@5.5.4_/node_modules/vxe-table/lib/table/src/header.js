"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _util = require("./util");
var _dom = require("../../tools/dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const renderType = 'header';
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeTableHeader',
  props: {
    tableData: Array,
    tableColumn: Array,
    tableGroupColumn: Array,
    fixedColumn: Array,
    fixedType: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const $xetable = (0, _vue.inject)('$xetable', {});
    const {
      xID,
      props: tableProps,
      reactData: tableReactData,
      internalData: tableInternalData
    } = $xetable;
    const {
      refElem: tableRefElem,
      refTableBody,
      refLeftContainer,
      refRightContainer,
      refCellResizeBar
    } = $xetable.getRefMaps();
    const {
      computeColumnOpts
    } = $xetable.getComputeMaps();
    const headerColumn = (0, _vue.ref)([]);
    const refElem = (0, _vue.ref)();
    const refHeaderTable = (0, _vue.ref)();
    const refHeaderColgroup = (0, _vue.ref)();
    const refHeaderTHead = (0, _vue.ref)();
    const refHeaderXSpace = (0, _vue.ref)();
    const refHeaderBorderRepair = (0, _vue.ref)();
    const uploadColumn = () => {
      const {
        isGroup
      } = tableReactData;
      headerColumn.value = isGroup ? (0, _util.convertHeaderColumnToRows)(props.tableGroupColumn) : [];
    };
    const resizeMousedown = (evnt, params) => {
      const {
        column
      } = params;
      const {
        fixedType
      } = props;
      const tableBody = refTableBody.value;
      const leftContainerElem = refLeftContainer.value;
      const rightContainerElem = refRightContainer.value;
      const resizeBarElem = refCellResizeBar.value;
      const {
        clientX: dragClientX
      } = evnt;
      const wrapperElem = refElem.value;
      const dragBtnElem = evnt.target;
      const cell = params.cell = dragBtnElem.parentNode;
      let dragLeft = 0;
      const tableBodyElem = tableBody.$el;
      const pos = (0, _dom.getOffsetPos)(dragBtnElem, wrapperElem);
      const dragBtnWidth = dragBtnElem.clientWidth;
      const dragBtnOffsetWidth = Math.floor(dragBtnWidth / 2);
      const minInterval = (0, _util.getColReMinWidth)(params) - dragBtnOffsetWidth; // 列之间的最小间距
      let dragMinLeft = pos.left - cell.clientWidth + dragBtnWidth + minInterval;
      let dragPosLeft = pos.left + dragBtnOffsetWidth;
      const domMousemove = document.onmousemove;
      const domMouseup = document.onmouseup;
      const isLeftFixed = fixedType === 'left';
      const isRightFixed = fixedType === 'right';
      const tableEl = tableRefElem.value;
      // 计算左右侧固定列偏移量
      let fixedOffsetWidth = 0;
      if (isLeftFixed || isRightFixed) {
        const siblingProp = isLeftFixed ? 'nextElementSibling' : 'previousElementSibling';
        let tempCellElem = cell[siblingProp];
        while (tempCellElem) {
          if ((0, _dom.hasClass)(tempCellElem, 'fixed--hidden')) {
            break;
          } else if (!(0, _dom.hasClass)(tempCellElem, 'col--group')) {
            fixedOffsetWidth += tempCellElem.offsetWidth;
          }
          tempCellElem = tempCellElem[siblingProp];
        }
        if (isRightFixed && rightContainerElem) {
          dragPosLeft = rightContainerElem.offsetLeft + fixedOffsetWidth;
        }
      }
      // 处理拖动事件
      const updateEvent = function (evnt) {
        evnt.stopPropagation();
        evnt.preventDefault();
        const offsetX = evnt.clientX - dragClientX;
        let left = dragPosLeft + offsetX;
        const scrollLeft = fixedType ? 0 : tableBodyElem.scrollLeft;
        if (isLeftFixed) {
          // 左固定列（不允许超过右侧固定列、不允许超过右边距）
          left = Math.min(left, (rightContainerElem ? rightContainerElem.offsetLeft : tableBodyElem.clientWidth) - fixedOffsetWidth - minInterval);
        } else if (isRightFixed) {
          // 右侧固定列（不允许超过左侧固定列、不允许超过左边距）
          dragMinLeft = (leftContainerElem ? leftContainerElem.clientWidth : 0) + fixedOffsetWidth + minInterval;
          left = Math.min(left, dragPosLeft + cell.clientWidth - minInterval);
        } else {
          dragMinLeft = Math.max(tableBodyElem.scrollLeft, dragMinLeft);
          // left = Math.min(left, tableBodyElem.clientWidth + tableBodyElem.scrollLeft - 40)
        }
        dragLeft = Math.max(left, dragMinLeft);
        resizeBarElem.style.left = `${dragLeft - scrollLeft}px`;
      };
      tableReactData._isResize = true;
      (0, _dom.addClass)(tableEl, 'drag--resize');
      resizeBarElem.style.display = 'block';
      document.onmousemove = updateEvent;
      document.onmouseup = function (evnt) {
        document.onmousemove = domMousemove;
        document.onmouseup = domMouseup;
        const resizeWidth = column.renderWidth + (isRightFixed ? dragPosLeft - dragLeft : dragLeft - dragPosLeft);
        column.resizeWidth = resizeWidth;
        resizeBarElem.style.display = 'none';
        tableReactData._isResize = false;
        tableInternalData._lastResizeTime = Date.now();
        $xetable.analyColumnWidth();
        $xetable.recalculate(true).then(() => {
          $xetable.saveCustomResizable();
          $xetable.updateCellAreas();
          $xetable.dispatchEvent('resizable-change', Object.assign(Object.assign({}, params), {
            resizeWidth
          }), evnt);
        });
        (0, _dom.removeClass)(tableEl, 'drag--resize');
      };
      updateEvent(evnt);
      if ($xetable.closeMenu) {
        $xetable.closeMenu();
      }
    };
    (0, _vue.watch)(() => props.tableColumn, uploadColumn);
    (0, _vue.onMounted)(() => {
      (0, _vue.nextTick)(() => {
        const {
          fixedType
        } = props;
        const {
          internalData
        } = $xetable;
        const {
          elemStore
        } = internalData;
        const prefix = `${fixedType || 'main'}-header-`;
        elemStore[`${prefix}wrapper`] = refElem;
        elemStore[`${prefix}table`] = refHeaderTable;
        elemStore[`${prefix}colgroup`] = refHeaderColgroup;
        elemStore[`${prefix}list`] = refHeaderTHead;
        elemStore[`${prefix}xSpace`] = refHeaderXSpace;
        elemStore[`${prefix}repair`] = refHeaderBorderRepair;
        uploadColumn();
      });
    });
    (0, _vue.onUnmounted)(() => {
      const {
        fixedType
      } = props;
      const {
        internalData
      } = $xetable;
      const {
        elemStore
      } = internalData;
      const prefix = `${fixedType || 'main'}-header-`;
      elemStore[`${prefix}wrapper`] = null;
      elemStore[`${prefix}table`] = null;
      elemStore[`${prefix}colgroup`] = null;
      elemStore[`${prefix}list`] = null;
      elemStore[`${prefix}xSpace`] = null;
      elemStore[`${prefix}repair`] = null;
    });
    const renderVN = () => {
      const {
        fixedType,
        fixedColumn,
        tableColumn
      } = props;
      const {
        resizable,
        border,
        columnKey,
        headerRowClassName,
        headerCellClassName,
        headerRowStyle,
        headerCellStyle,
        showHeaderOverflow: allColumnHeaderOverflow,
        headerAlign: allHeaderAlign,
        align: allAlign,
        mouseConfig
      } = tableProps;
      const {
        isGroup,
        currentColumn,
        scrollXLoad,
        overflowX,
        scrollbarWidth
      } = tableReactData;
      const {
        visibleColumn
      } = tableInternalData;
      const columnOpts = computeColumnOpts.value;
      let headerGroups = headerColumn.value;
      let renderColumnList = tableColumn;
      if (isGroup) {
        renderColumnList = visibleColumn;
      } else {
        // 如果是使用优化模式
        if (fixedType) {
          if (scrollXLoad || allColumnHeaderOverflow) {
            renderColumnList = fixedColumn;
          }
        }
        headerGroups = [renderColumnList];
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-table--header-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
        xid: xID
      }, [fixedType ? (0, _vue.createCommentVNode)() : (0, _vue.h)('div', {
        ref: refHeaderXSpace,
        class: 'vxe-body--x-space'
      }), (0, _vue.h)('table', {
        ref: refHeaderTable,
        class: 'vxe-table--header',
        xid: xID,
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }, [
      /**
       * 列宽
       */
      (0, _vue.h)('colgroup', {
        ref: refHeaderColgroup
      }, renderColumnList.map((column, $columnIndex) => {
        return (0, _vue.h)('col', {
          name: column.id,
          key: $columnIndex
        });
      }).concat(scrollbarWidth ? [(0, _vue.h)('col', {
        name: 'col_gutter'
      })] : [])),
      /**
       * 头部
       */
      (0, _vue.h)('thead', {
        ref: refHeaderTHead
      }, headerGroups.map((cols, $rowIndex) => {
        return (0, _vue.h)('tr', {
          class: ['vxe-header--row', headerRowClassName ? _xeUtils.default.isFunction(headerRowClassName) ? headerRowClassName({
            $table: $xetable,
            $rowIndex,
            fixed: fixedType,
            type: renderType
          }) : headerRowClassName : ''],
          style: headerRowStyle ? _xeUtils.default.isFunction(headerRowStyle) ? headerRowStyle({
            $table: $xetable,
            $rowIndex,
            fixed: fixedType,
            type: renderType
          }) : headerRowStyle : null
        }, cols.map((column, $columnIndex) => {
          const {
            type,
            showHeaderOverflow,
            headerAlign,
            align,
            headerClassName
          } = column;
          const isColGroup = column.children && column.children.length;
          const fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : !!column.fixed && overflowX;
          const headOverflow = _xeUtils.default.isUndefined(showHeaderOverflow) || _xeUtils.default.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
          const headAlign = headerAlign || align || allHeaderAlign || allAlign;
          let showEllipsis = headOverflow === 'ellipsis';
          const showTitle = headOverflow === 'title';
          const showTooltip = headOverflow === true || headOverflow === 'tooltip';
          let hasEllipsis = showTitle || showTooltip || showEllipsis;
          const hasFilter = column.filters && column.filters.some(item => item.checked);
          const columnIndex = $xetable.getColumnIndex(column);
          const _columnIndex = $xetable.getVTColumnIndex(column);
          const params = {
            $table: $xetable,
            $grid: $xetable.xegrid,
            $rowIndex,
            column,
            columnIndex,
            $columnIndex,
            _columnIndex,
            fixed: fixedType,
            type: renderType,
            isHidden: fixedHiddenColumn,
            hasFilter
          };
          const thOns = {
            onClick: evnt => $xetable.triggerHeaderCellClickEvent(evnt, params),
            onDblclick: evnt => $xetable.triggerHeaderCellDblclickEvent(evnt, params)
          };
          // 横向虚拟滚动不支持动态行高
          if (scrollXLoad && !hasEllipsis) {
            showEllipsis = hasEllipsis = true;
          }
          // 按下事件处理
          if (mouseConfig) {
            thOns.onMousedown = evnt => $xetable.triggerHeaderCellMousedownEvent(evnt, params);
          }
          return (0, _vue.h)('th', Object.assign(Object.assign({
            class: ['vxe-header--column', column.id, {
              [`col--${headAlign}`]: headAlign,
              [`col--${type}`]: type,
              'col--last': $columnIndex === cols.length - 1,
              'col--fixed': column.fixed,
              'col--group': isColGroup,
              'col--ellipsis': hasEllipsis,
              'fixed--hidden': fixedHiddenColumn,
              'is--sortable': column.sortable,
              'col--filter': !!column.filters,
              'is--filter-active': hasFilter,
              'col--current': currentColumn === column
            }, headerClassName ? _xeUtils.default.isFunction(headerClassName) ? headerClassName(params) : headerClassName : '', headerCellClassName ? _xeUtils.default.isFunction(headerCellClassName) ? headerCellClassName(params) : headerCellClassName : ''],
            colid: column.id,
            colspan: column.colSpan > 1 ? column.colSpan : null,
            rowspan: column.rowSpan > 1 ? column.rowSpan : null,
            style: headerCellStyle ? _xeUtils.default.isFunction(headerCellStyle) ? headerCellStyle(params) : headerCellStyle : null
          }, thOns), {
            key: columnKey || columnOpts.useKey || isColGroup ? column.id : $columnIndex
          }), [(0, _vue.h)('div', {
            class: ['vxe-cell', {
              'c--title': showTitle,
              'c--tooltip': showTooltip,
              'c--ellipsis': showEllipsis
            }]
          }, column.renderHeader(params)),
          /**
           * 列宽拖动
           */
          !fixedHiddenColumn && !isColGroup && (_xeUtils.default.isBoolean(column.resizable) ? column.resizable : columnOpts.resizable || resizable) ? (0, _vue.h)('div', {
            class: ['vxe-resizable', {
              'is--line': !border || border === 'none'
            }],
            onMousedown: evnt => resizeMousedown(evnt, params)
          }) : null]);
        }).concat(scrollbarWidth ? [(0, _vue.h)('th', {
          class: 'vxe-header--gutter col--gutter'
        })] : []));
      }))]),
      /**
       * 其他
       */
      (0, _vue.h)('div', {
        ref: refHeaderBorderRepair,
        class: 'vxe-table--header-border-line'
      })]);
    };
    return renderVN;
  }
});