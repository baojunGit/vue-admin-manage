"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assemColumn = assemColumn;
exports.clearTableAllStatus = clearTableAllStatus;
exports.clearTableDefaultStatus = clearTableDefaultStatus;
exports.colToVisible = colToVisible;
exports.convertHeaderColumnToRows = void 0;
exports.createColumn = createColumn;
exports.destroyColumn = destroyColumn;
exports.getCellValue = getCellValue;
exports.getColReMaxWidth = getColReMaxWidth;
exports.getColReMinWidth = getColReMinWidth;
exports.getRootColumn = getRootColumn;
exports.getRowUniqueId = getRowUniqueId;
exports.getRowid = getRowid;
exports.getRowkey = getRowkey;
exports.handleFieldOrColumn = void 0;
exports.isColumnInfo = isColumnInfo;
exports.mergeBodyMethod = mergeBodyMethod;
exports.removeScrollListener = removeScrollListener;
exports.restoreScrollListener = restoreScrollListener;
exports.restoreScrollLocation = restoreScrollLocation;
exports.rowToVisible = rowToVisible;
exports.setCellValue = setCellValue;
exports.toFilters = toFilters;
exports.toTreePathSeq = toTreePathSeq;
exports.watchColumn = watchColumn;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _columnInfo = require("./columnInfo");
var _dom = require("../../tools/dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getAllConvertColumns = (columns, parentColumn) => {
  const result = [];
  columns.forEach(column => {
    column.parentId = parentColumn ? parentColumn.id : null;
    if (column.visible) {
      if (column.children && column.children.length && column.children.some(column => column.visible)) {
        result.push(column);
        result.push(...getAllConvertColumns(column.children, column));
      } else {
        result.push(column);
      }
    }
  });
  return result;
};
const convertHeaderColumnToRows = originColumns => {
  let maxLevel = 1;
  const traverse = (column, parent) => {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }
    if (column.children && column.children.length && column.children.some(column => column.visible)) {
      let colSpan = 0;
      column.children.forEach(subColumn => {
        if (subColumn.visible) {
          traverse(subColumn, column);
          colSpan += subColumn.colSpan;
        }
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };
  originColumns.forEach(column => {
    column.level = 1;
    traverse(column);
  });
  const rows = [];
  for (let i = 0; i < maxLevel; i++) {
    rows.push([]);
  }
  const allColumns = getAllConvertColumns(originColumns);
  allColumns.forEach(column => {
    if (column.children && column.children.length && column.children.some(column => column.visible)) {
      column.rowSpan = 1;
    } else {
      column.rowSpan = maxLevel - column.level + 1;
    }
    rows[column.level - 1].push(column);
  });
  return rows;
};
exports.convertHeaderColumnToRows = convertHeaderColumnToRows;
function restoreScrollLocation($xetable, scrollLeft, scrollTop) {
  const {
    internalData
  } = $xetable;
  return $xetable.clearScroll().then(() => {
    if (scrollLeft || scrollTop) {
      // 重置最后滚动状态
      internalData.lastScrollLeft = 0;
      internalData.lastScrollTop = 0;
      // 还原滚动状态
      return $xetable.scrollTo(scrollLeft, scrollTop);
    }
  });
}
function removeScrollListener(scrollElem) {
  if (scrollElem && scrollElem._onscroll) {
    scrollElem.onscroll = null;
  }
}
function restoreScrollListener(scrollElem) {
  if (scrollElem && scrollElem._onscroll) {
    scrollElem.onscroll = scrollElem._onscroll;
  }
}
/**
 * 生成行的唯一主键
 */
function getRowUniqueId() {
  return _xeUtils.default.uniqueId('row_');
}
// 行主键 key
function getRowkey($xetable) {
  const {
    props
  } = $xetable;
  const {
    computeRowOpts
  } = $xetable.getComputeMaps();
  const {
    rowId
  } = props;
  const rowOpts = computeRowOpts.value;
  return rowId || rowOpts.keyField || '_X_ROW_KEY';
}
// 行主键 value
function getRowid($xetable, row) {
  const rowid = _xeUtils.default.get(row, getRowkey($xetable));
  return _xeUtils.default.eqNull(rowid) ? '' : encodeURIComponent(rowid);
}
const handleFieldOrColumn = ($xetable, fieldOrColumn) => {
  if (fieldOrColumn) {
    return _xeUtils.default.isString(fieldOrColumn) ? $xetable.getColumnByField(fieldOrColumn) : fieldOrColumn;
  }
  return null;
};
exports.handleFieldOrColumn = handleFieldOrColumn;
function getPaddingLeftRightSize(elem) {
  if (elem) {
    const computedStyle = getComputedStyle(elem);
    const paddingLeft = _xeUtils.default.toNumber(computedStyle.paddingLeft);
    const paddingRight = _xeUtils.default.toNumber(computedStyle.paddingRight);
    return paddingLeft + paddingRight;
  }
  return 0;
}
function getElemenMarginWidth(elem) {
  if (elem) {
    const computedStyle = getComputedStyle(elem);
    const marginLeft = _xeUtils.default.toNumber(computedStyle.marginLeft);
    const marginRight = _xeUtils.default.toNumber(computedStyle.marginRight);
    return elem.offsetWidth + marginLeft + marginRight;
  }
  return 0;
}
function queryCellElement(cell, selector) {
  return cell.querySelector('.vxe-cell' + selector);
}
function toFilters(filters) {
  if (filters && _xeUtils.default.isArray(filters)) {
    return filters.map(({
      label,
      value,
      data,
      resetValue,
      checked
    }) => {
      return {
        label,
        value,
        data,
        resetValue,
        checked: !!checked,
        _checked: !!checked
      };
    });
  }
  return filters;
}
function toTreePathSeq(path) {
  return path.map((num, i) => i % 2 === 0 ? Number(num) + 1 : '.').join('');
}
function getCellValue(row, column) {
  return _xeUtils.default.get(row, column.field);
}
function setCellValue(row, column, value) {
  return _xeUtils.default.set(row, column.field, value);
}
/**
 * 列宽拖动最大宽度
 * @param params
 * @returns
 */
function getColReMaxWidth(params) {
  const {
    $table
  } = params;
  const {
    computeResizableOpts
  } = $table.getComputeMaps();
  const resizableOpts = computeResizableOpts.value;
  const {
    maxWidth: reMaxWidth
  } = resizableOpts;
  // 如果自定义调整宽度逻辑
  if (reMaxWidth) {
    const customMaxWidth = _xeUtils.default.isFunction(reMaxWidth) ? reMaxWidth(params) : reMaxWidth;
    if (customMaxWidth !== 'auto') {
      return Math.max(1, _xeUtils.default.toNumber(customMaxWidth));
    }
  }
  return -1;
}
/**
 * 列宽拖动最小宽度
 * @param params
 * @returns
 */
function getColReMinWidth(params) {
  const {
    $table,
    column,
    cell
  } = params;
  const {
    props: tableProps
  } = $table;
  const {
    computeResizableOpts
  } = $table.getComputeMaps();
  const resizableOpts = computeResizableOpts.value;
  const {
    minWidth: reMinWidth
  } = resizableOpts;
  // 如果自定义调整宽度逻辑
  if (reMinWidth) {
    const customMinWidth = _xeUtils.default.isFunction(reMinWidth) ? reMinWidth(params) : reMinWidth;
    if (customMinWidth !== 'auto') {
      return Math.max(1, _xeUtils.default.toNumber(customMinWidth));
    }
  }
  const {
    showHeaderOverflow: allColumnHeaderOverflow
  } = tableProps;
  const {
    showHeaderOverflow,
    minWidth: colMinWidth
  } = column;
  const headOverflow = _xeUtils.default.isUndefined(showHeaderOverflow) || _xeUtils.default.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
  const showEllipsis = headOverflow === 'ellipsis';
  const showTitle = headOverflow === 'title';
  const showTooltip = headOverflow === true || headOverflow === 'tooltip';
  const hasEllipsis = showTitle || showTooltip || showEllipsis;
  const minTitleWidth = _xeUtils.default.floor((_xeUtils.default.toNumber(getComputedStyle(cell).fontSize) || 14) * 1.6);
  const paddingLeftRight = getPaddingLeftRightSize(cell) + getPaddingLeftRightSize(queryCellElement(cell, ''));
  let mWidth = minTitleWidth + paddingLeftRight;
  // 默认最小宽处理
  if (hasEllipsis) {
    const checkboxIconWidth = getPaddingLeftRightSize(queryCellElement(cell, '--title>.vxe-cell--checkbox'));
    const requiredIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell--required-icon'));
    const editIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell--edit-icon'));
    const prefixIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell-title-prefix-icon'));
    const suffixIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell-title-suffix-icon'));
    const sortIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell--sort'));
    const filterIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell--filter'));
    mWidth += checkboxIconWidth + requiredIconWidth + editIconWidth + prefixIconWidth + suffixIconWidth + filterIconWidth + sortIconWidth;
  }
  // 如果设置最小宽
  if (colMinWidth) {
    const {
      refTableBody
    } = $table.getRefMaps();
    const tableBody = refTableBody.value;
    const bodyElem = tableBody ? tableBody.$el : null;
    if (bodyElem) {
      if ((0, _dom.isScale)(colMinWidth)) {
        const bodyWidth = bodyElem.clientWidth - 1;
        const meanWidth = bodyWidth / 100;
        return Math.max(mWidth, Math.floor(_xeUtils.default.toInteger(colMinWidth) * meanWidth));
      } else if ((0, _dom.isPx)(colMinWidth)) {
        return Math.max(mWidth, _xeUtils.default.toInteger(colMinWidth));
      }
    }
  }
  return mWidth;
}
function isColumnInfo(column) {
  return column && (column.constructor === _columnInfo.ColumnInfo || column instanceof _columnInfo.ColumnInfo);
}
function createColumn($xetable, options, renderOptions) {
  return isColumnInfo(options) ? options : (0, _vue.reactive)(new _columnInfo.ColumnInfo($xetable, options, renderOptions));
}
function watchColumn($xetable, props, column) {
  Object.keys(props).forEach(name => {
    (0, _vue.watch)(() => props[name], value => {
      column.update(name, value);
      if ($xetable) {
        if (name === 'filters') {
          $xetable.setFilter(column, value);
          $xetable.handleUpdateDataQueue();
        } else if (['visible', 'fixed', 'width', 'minWidth', 'maxWidth'].includes(name)) {
          $xetable.handleRefreshColumnQueue();
        }
      }
    });
  });
}
function assemColumn($xetable, elem, column, colgroup) {
  const {
    reactData
  } = $xetable;
  const {
    staticColumns
  } = reactData;
  const parentElem = elem.parentNode;
  const parentColumn = colgroup ? colgroup.column : null;
  const parentCols = parentColumn ? parentColumn.children : staticColumns;
  if (parentElem && parentCols) {
    parentCols.splice(_xeUtils.default.arrayIndexOf(parentElem.children, elem), 0, column);
    reactData.staticColumns = staticColumns.slice(0);
  }
}
function destroyColumn($xetable, column) {
  const {
    reactData
  } = $xetable;
  const {
    staticColumns
  } = reactData;
  const matchObj = _xeUtils.default.findTree(staticColumns, item => item.id === column.id, {
    children: 'children'
  });
  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1);
  }
  reactData.staticColumns = staticColumns.slice(0);
}
function getRootColumn($xetable, column) {
  const {
    internalData
  } = $xetable;
  const {
    fullColumnIdData
  } = internalData;
  if (!column) {
    return null;
  }
  let parentColId = column.parentId;
  while (fullColumnIdData[parentColId]) {
    const column = fullColumnIdData[parentColId].column;
    parentColId = column.parentId;
    if (!parentColId) {
      return column;
    }
  }
  return column;
}
function mergeBodyMethod(mergeList, _rowIndex, _columnIndex) {
  for (let mIndex = 0; mIndex < mergeList.length; mIndex++) {
    const {
      row: mergeRowIndex,
      col: mergeColIndex,
      rowspan: mergeRowspan,
      colspan: mergeColspan
    } = mergeList[mIndex];
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
function clearTableDefaultStatus($xetable) {
  const {
    props,
    internalData
  } = $xetable;
  internalData.initStatus = false;
  $xetable.clearSort();
  $xetable.clearCurrentRow();
  $xetable.clearCurrentColumn();
  $xetable.clearRadioRow();
  $xetable.clearRadioReserve();
  $xetable.clearCheckboxRow();
  $xetable.clearCheckboxReserve();
  $xetable.clearRowExpand();
  $xetable.clearTreeExpand();
  $xetable.clearTreeExpandReserve();
  $xetable.clearPendingRow();
  if ($xetable.clearFilter) {
    $xetable.clearFilter();
  }
  if ($xetable.clearSelected && (props.keyboardConfig || props.mouseConfig)) {
    $xetable.clearSelected();
  }
  if ($xetable.clearCellAreas && props.mouseConfig) {
    $xetable.clearCellAreas();
    $xetable.clearCopyCellArea();
  }
  return $xetable.clearScroll();
}
function clearTableAllStatus($xetable) {
  if ($xetable.clearFilter) {
    $xetable.clearFilter();
  }
  return clearTableDefaultStatus($xetable);
}
function rowToVisible($xetable, row) {
  const {
    reactData,
    internalData
  } = $xetable;
  const {
    refTableBody
  } = $xetable.getRefMaps();
  const {
    scrollYLoad
  } = reactData;
  const {
    afterFullData,
    scrollYStore
  } = internalData;
  const tableBody = refTableBody.value;
  const bodyElem = tableBody ? tableBody.$el : null;
  if (bodyElem) {
    const trElem = bodyElem.querySelector(`[rowid="${getRowid($xetable, row)}"]`);
    if (trElem) {
      const bodyHeight = bodyElem.clientHeight;
      const bodySrcollTop = bodyElem.scrollTop;
      const trOffsetParent = trElem.offsetParent;
      const trOffsetTop = trElem.offsetTop + (trOffsetParent ? trOffsetParent.offsetTop : 0);
      const trHeight = trElem.clientHeight;
      // 检测行是否在可视区中
      if (trOffsetTop < bodySrcollTop || trOffsetTop > bodySrcollTop + bodyHeight) {
        // 向上定位
        return $xetable.scrollTo(null, trOffsetTop);
      } else if (trOffsetTop + trHeight >= bodyHeight + bodySrcollTop) {
        // 向下定位
        return $xetable.scrollTo(null, bodySrcollTop + trHeight);
      }
    } else {
      // 如果是虚拟渲染跨行滚动
      if (scrollYLoad) {
        return $xetable.scrollTo(null, (afterFullData.indexOf(row) - 1) * scrollYStore.rowHeight);
      }
    }
  }
  return Promise.resolve();
}
function colToVisible($xetable, column) {
  const {
    reactData,
    internalData
  } = $xetable;
  const {
    refTableBody
  } = $xetable.getRefMaps();
  const {
    scrollXLoad
  } = reactData;
  const {
    visibleColumn
  } = internalData;
  const tableBody = refTableBody.value;
  const bodyElem = tableBody ? tableBody.$el : null;
  if (bodyElem) {
    const tdElem = bodyElem.querySelector(`.${column.id}`);
    if (tdElem) {
      const bodyWidth = bodyElem.clientWidth;
      const bodySrcollLeft = bodyElem.scrollLeft;
      const tdOffsetParent = tdElem.offsetParent;
      const tdOffsetLeft = tdElem.offsetLeft + (tdOffsetParent ? tdOffsetParent.offsetLeft : 0);
      const tdWidth = tdElem.clientWidth;
      // 检测行是否在可视区中
      if (tdOffsetLeft < bodySrcollLeft || tdOffsetLeft > bodySrcollLeft + bodyWidth) {
        // 向左定位
        return $xetable.scrollTo(tdOffsetLeft);
      } else if (tdOffsetLeft + tdWidth >= bodyWidth + bodySrcollLeft) {
        // 向右定位
        return $xetable.scrollTo(bodySrcollLeft + tdWidth);
      }
    } else {
      // 如果是虚拟渲染跨行滚动
      if (scrollXLoad) {
        let scrollLeft = 0;
        for (let index = 0; index < visibleColumn.length; index++) {
          if (visibleColumn[index] === column) {
            break;
          }
          scrollLeft += visibleColumn[index].renderWidth;
        }
        return $xetable.scrollTo(scrollLeft);
      }
    }
  }
  return Promise.resolve();
}