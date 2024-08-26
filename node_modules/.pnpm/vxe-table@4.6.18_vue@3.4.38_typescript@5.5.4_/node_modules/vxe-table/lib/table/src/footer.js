"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _dom = require("../../tools/dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const renderType = 'footer';
function mergeFooterMethod(mergeFooterList, _rowIndex, _columnIndex) {
  for (let mIndex = 0; mIndex < mergeFooterList.length; mIndex++) {
    const {
      row: mergeRowIndex,
      col: mergeColIndex,
      rowspan: mergeRowspan,
      colspan: mergeColspan
    } = mergeFooterList[mIndex];
    if (mergeColIndex > -1 && mergeRowIndex > -1 && mergeRowspan && mergeColspan) {
      if (mergeRowIndex === _rowIndex && mergeColIndex === _columnIndex) {
        return {
          rowspan: mergeRowspan,
          colspan: mergeColspan
        };
      }
      if (_rowIndex >= mergeRowIndex && _rowIndex < mergeRowIndex + mergeRowspan && _columnIndex >= mergeColIndex && _columnIndex < mergeColIndex + mergeColspan) {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    }
  }
}
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeTableFooter',
  props: {
    footerTableData: {
      type: Array,
      default: () => []
    },
    tableColumn: {
      type: Array,
      default: () => []
    },
    fixedColumn: {
      type: Array,
      default: () => []
    },
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
      refTableHeader,
      refTableBody,
      refValidTooltip
    } = $xetable.getRefMaps();
    const {
      computeTooltipOpts,
      computeColumnOpts
    } = $xetable.getComputeMaps();
    const refElem = (0, _vue.ref)();
    const refFooterTable = (0, _vue.ref)();
    const refFooterColgroup = (0, _vue.ref)();
    const refFooterTFoot = (0, _vue.ref)();
    const refFooterXSpace = (0, _vue.ref)();
    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    const scrollEvent = evnt => {
      const {
        fixedType
      } = props;
      const {
        scrollXLoad
      } = tableReactData;
      const {
        lastScrollLeft
      } = tableInternalData;
      const validTip = refValidTooltip.value;
      const tableHeader = refTableHeader.value;
      const tableBody = refTableBody.value;
      const headerElem = tableHeader ? tableHeader.$el : null;
      const footerElem = refElem.value;
      const bodyElem = tableBody.$el;
      const scrollLeft = footerElem.scrollLeft;
      const isX = scrollLeft !== lastScrollLeft;
      tableInternalData.lastScrollLeft = scrollLeft;
      tableReactData.lastScrollTime = Date.now();
      if (headerElem) {
        headerElem.scrollLeft = scrollLeft;
      }
      if (bodyElem) {
        bodyElem.scrollLeft = scrollLeft;
      }
      if (scrollXLoad && isX) {
        $xetable.triggerScrollXEvent(evnt);
      }
      if (isX && validTip && validTip.reactData.visible) {
        validTip.updatePlacement();
      }
      $xetable.dispatchEvent('scroll', {
        type: renderType,
        fixed: fixedType,
        scrollTop: bodyElem.scrollTop,
        scrollLeft,
        isX,
        isY: false
      }, evnt);
    };
    (0, _vue.onMounted)(() => {
      (0, _vue.nextTick)(() => {
        const {
          fixedType
        } = props;
        const {
          elemStore
        } = tableInternalData;
        const prefix = `${fixedType || 'main'}-footer-`;
        elemStore[`${prefix}wrapper`] = refElem;
        elemStore[`${prefix}table`] = refFooterTable;
        elemStore[`${prefix}colgroup`] = refFooterColgroup;
        elemStore[`${prefix}list`] = refFooterTFoot;
        elemStore[`${prefix}xSpace`] = refFooterXSpace;
      });
    });
    (0, _vue.onUnmounted)(() => {
      const {
        fixedType
      } = props;
      const {
        elemStore
      } = tableInternalData;
      const prefix = `${fixedType || 'main'}-footer-`;
      elemStore[`${prefix}wrapper`] = null;
      elemStore[`${prefix}table`] = null;
      elemStore[`${prefix}colgroup`] = null;
      elemStore[`${prefix}list`] = null;
      elemStore[`${prefix}xSpace`] = null;
    });
    const renderVN = () => {
      let {
        fixedType,
        fixedColumn,
        tableColumn,
        footerTableData
      } = props;
      const {
        footerRowClassName,
        footerCellClassName,
        footerRowStyle,
        footerCellStyle,
        footerAlign: allFooterAlign,
        footerSpanMethod,
        align: allAlign,
        columnKey,
        showFooterOverflow: allColumnFooterOverflow
      } = tableProps;
      const {
        visibleColumn
      } = tableInternalData;
      const {
        scrollXLoad,
        overflowX,
        scrollbarWidth,
        currentColumn,
        mergeFooterList
      } = tableReactData;
      const tooltipOpts = computeTooltipOpts.value;
      const columnOpts = computeColumnOpts.value;
      // 如果是使用优化模式
      if (fixedType) {
        // 如果存在展开行使用全量渲染
        if (!tableReactData.expandColumn && (scrollXLoad || allColumnFooterOverflow)) {
          if (!mergeFooterList.length || !footerSpanMethod) {
            tableColumn = fixedColumn;
          } else {
            tableColumn = visibleColumn;
          }
        } else {
          tableColumn = visibleColumn;
        }
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-table--footer-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
        xid: xID,
        onScroll: scrollEvent
      }, [fixedType ? (0, _vue.createCommentVNode)() : (0, _vue.h)('div', {
        ref: refFooterXSpace,
        class: 'vxe-body--x-space'
      }), (0, _vue.h)('table', {
        ref: refFooterTable,
        class: 'vxe-table--footer',
        xid: xID,
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }, [
      /**
       * 列宽
       */
      (0, _vue.h)('colgroup', {
        ref: refFooterColgroup
      }, tableColumn.map((column, $columnIndex) => {
        return (0, _vue.h)('col', {
          name: column.id,
          key: $columnIndex
        });
      }).concat(scrollbarWidth ? [(0, _vue.h)('col', {
        name: 'col_gutter'
      })] : [])),
      /**
       * 底部
       */
      (0, _vue.h)('tfoot', {
        ref: refFooterTFoot
      }, footerTableData.map((list, _rowIndex) => {
        const $rowIndex = _rowIndex;
        const rowParams = {
          $table: $xetable,
          row: list,
          _rowIndex,
          $rowIndex,
          fixed: fixedType,
          type: renderType
        };
        return (0, _vue.h)('tr', {
          class: ['vxe-footer--row', footerRowClassName ? _xeUtils.default.isFunction(footerRowClassName) ? footerRowClassName(rowParams) : footerRowClassName : ''],
          style: footerRowStyle ? _xeUtils.default.isFunction(footerRowStyle) ? footerRowStyle(rowParams) : footerRowStyle : null
        }, tableColumn.map((column, $columnIndex) => {
          const {
            type,
            showFooterOverflow,
            footerAlign,
            align,
            footerClassName
          } = column;
          const showAllTip = tooltipOpts.showAll;
          const isColGroup = column.children && column.children.length;
          const fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX;
          const footOverflow = _xeUtils.default.isUndefined(showFooterOverflow) || _xeUtils.default.isNull(showFooterOverflow) ? allColumnFooterOverflow : showFooterOverflow;
          const footAlign = footerAlign || align || allFooterAlign || allAlign;
          let showEllipsis = footOverflow === 'ellipsis';
          const showTitle = footOverflow === 'title';
          const showTooltip = footOverflow === true || footOverflow === 'tooltip';
          let hasEllipsis = showTitle || showTooltip || showEllipsis;
          const attrs = {
            colid: column.id
          };
          const tfOns = {};
          const columnIndex = $xetable.getColumnIndex(column);
          const _columnIndex = $xetable.getVTColumnIndex(column);
          const itemIndex = _columnIndex;
          const cellParams = {
            $table: $xetable,
            $grid: $xetable.xegrid,
            row: list,
            rowIndex: _rowIndex,
            _rowIndex,
            $rowIndex,
            column,
            columnIndex,
            $columnIndex,
            _columnIndex,
            itemIndex,
            items: list,
            fixed: fixedType,
            type: renderType,
            data: footerTableData
          };
          // 纵向虚拟滚动不支持动态行高
          if (scrollXLoad && !hasEllipsis) {
            showEllipsis = hasEllipsis = true;
          }
          if (showTitle || showTooltip || showAllTip) {
            tfOns.onMouseenter = evnt => {
              if (showTitle) {
                (0, _dom.updateCellTitle)(evnt.currentTarget, column);
              } else if (showTooltip || showAllTip) {
                $xetable.triggerFooterTooltipEvent(evnt, cellParams);
              }
            };
          }
          if (showTooltip || showAllTip) {
            tfOns.onMouseleave = evnt => {
              if (showTooltip || showAllTip) {
                $xetable.handleTargetLeaveEvent(evnt);
              }
            };
          }
          tfOns.onClick = evnt => {
            $xetable.dispatchEvent('footer-cell-click', Object.assign({
              cell: evnt.currentTarget
            }, cellParams), evnt);
          };
          tfOns.onDblclick = evnt => {
            $xetable.dispatchEvent('footer-cell-dblclick', Object.assign({
              cell: evnt.currentTarget
            }, cellParams), evnt);
          };
          // 合并行或列
          if (mergeFooterList.length) {
            const spanRest = mergeFooterMethod(mergeFooterList, _rowIndex, _columnIndex);
            if (spanRest) {
              const {
                rowspan,
                colspan
              } = spanRest;
              if (!rowspan || !colspan) {
                return null;
              }
              if (rowspan > 1) {
                attrs.rowspan = rowspan;
              }
              if (colspan > 1) {
                attrs.colspan = colspan;
              }
            }
          } else if (footerSpanMethod) {
            // 自定义合并方法
            const {
              rowspan = 1,
              colspan = 1
            } = footerSpanMethod(cellParams) || {};
            if (!rowspan || !colspan) {
              return null;
            }
            if (rowspan > 1) {
              attrs.rowspan = rowspan;
            }
            if (colspan > 1) {
              attrs.colspan = colspan;
            }
          }
          return (0, _vue.h)('td', Object.assign(Object.assign(Object.assign(Object.assign({
            class: ['vxe-footer--column', column.id, {
              [`col--${footAlign}`]: footAlign,
              [`col--${type}`]: type,
              'col--last': $columnIndex === tableColumn.length - 1,
              'fixed--hidden': fixedHiddenColumn,
              'col--ellipsis': hasEllipsis,
              'col--current': currentColumn === column
            }, (0, _dom.getPropClass)(footerClassName, cellParams), (0, _dom.getPropClass)(footerCellClassName, cellParams)]
          }, attrs), {
            style: footerCellStyle ? _xeUtils.default.isFunction(footerCellStyle) ? footerCellStyle(cellParams) : footerCellStyle : null
          }), tfOns), {
            key: columnKey || columnOpts.useKey ? column.id : $columnIndex
          }), [(0, _vue.h)('div', {
            class: ['vxe-cell', {
              'c--title': showTitle,
              'c--tooltip': showTooltip,
              'c--ellipsis': showEllipsis
            }]
          }, column.renderFooter(cellParams))]);
        }).concat(scrollbarWidth ? [(0, _vue.h)('td', {
          class: 'vxe-footer--gutter col--gutter'
        })] : []));
      }))])]);
    };
    return renderVN;
  }
});