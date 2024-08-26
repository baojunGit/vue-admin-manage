"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Cell = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _vXETable = require("../../v-x-e-table");
var _utils = require("../../tools/utils");
var _dom = require("../../tools/dom");
var _util = require("./util");
var _vn = require("../../tools/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function renderTitlePrefixIcon(params) {
  const {
    $table,
    column
  } = params;
  const titlePrefix = column.titlePrefix || column.titleHelp;
  return titlePrefix ? [(0, _vue.h)('i', {
    class: ['vxe-cell-title-prefix-icon', titlePrefix.icon || _conf.default.icon.TABLE_TITLE_PREFIX],
    onMouseenter(evnt) {
      $table.triggerHeaderTitleEvent(evnt, titlePrefix, params);
    },
    onMouseleave(evnt) {
      $table.handleTargetLeaveEvent(evnt);
    }
  })] : [];
}
function renderTitleSuffixIcon(params) {
  const {
    $table,
    column
  } = params;
  const titleSuffix = column.titleSuffix;
  return titleSuffix ? [(0, _vue.h)('i', {
    class: ['vxe-cell-title-suffix-icon', titleSuffix.icon || _conf.default.icon.TABLE_TITLE_SUFFIX],
    onMouseenter(evnt) {
      $table.triggerHeaderTitleEvent(evnt, titleSuffix, params);
    },
    onMouseleave(evnt) {
      $table.handleTargetLeaveEvent(evnt);
    }
  })] : [];
}
function renderTitleContent(params, content) {
  const {
    $table,
    column
  } = params;
  const {
    props,
    reactData
  } = $table;
  const {
    computeTooltipOpts
  } = $table.getComputeMaps();
  const {
    showHeaderOverflow: allColumnHeaderOverflow
  } = props;
  const {
    type,
    showHeaderOverflow
  } = column;
  const tooltipOpts = computeTooltipOpts.value;
  const showAllTip = tooltipOpts.showAll;
  const headOverflow = _xeUtils.default.isUndefined(showHeaderOverflow) || _xeUtils.default.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
  const showTitle = headOverflow === 'title';
  const showTooltip = headOverflow === true || headOverflow === 'tooltip';
  const ons = {};
  if (showTitle || showTooltip || showAllTip) {
    ons.onMouseenter = evnt => {
      if (reactData._isResize) {
        return;
      }
      if (showTitle) {
        (0, _dom.updateCellTitle)(evnt.currentTarget, column);
      } else if (showTooltip || showAllTip) {
        $table.triggerHeaderTooltipEvent(evnt, params);
      }
    };
  }
  if (showTooltip || showAllTip) {
    ons.onMouseleave = evnt => {
      if (reactData._isResize) {
        return;
      }
      if (showTooltip || showAllTip) {
        $table.handleTargetLeaveEvent(evnt);
      }
    };
  }
  return [type === 'html' && _xeUtils.default.isString(content) ? (0, _vue.h)('span', Object.assign({
    class: 'vxe-cell--title',
    innerHTML: content
  }, ons)) : (0, _vue.h)('span', Object.assign({
    class: 'vxe-cell--title'
  }, ons), (0, _vn.getSlotVNs)(content))];
}
function getFooterContent(params) {
  const {
    $table,
    column,
    _columnIndex,
    items,
    row
  } = params;
  const {
    slots,
    editRender,
    cellRender
  } = column;
  const renderOpts = editRender || cellRender;
  const footerSlot = slots ? slots.footer : null;
  if (footerSlot) {
    return $table.callSlot(footerSlot, params);
  }
  if (renderOpts) {
    const compConf = _vXETable.VXETable.renderer.get(renderOpts.name);
    if (compConf && compConf.renderFooter) {
      return (0, _vn.getSlotVNs)(compConf.renderFooter(renderOpts, params));
    }
  }
  // 兼容老模式
  if (_xeUtils.default.isArray(items)) {
    return [(0, _utils.formatText)(items[_columnIndex], 1)];
  }
  return [(0, _utils.formatText)(_xeUtils.default.get(row, column.field), 1)];
}
function getDefaultCellLabel(params) {
  const {
    $table,
    row,
    column
  } = params;
  return (0, _utils.formatText)($table.getCellLabel(row, column), 1);
}
const Cell = exports.Cell = {
  createColumn($xetable, columnOpts) {
    const {
      type,
      sortable,
      filters,
      editRender,
      treeNode
    } = columnOpts;
    const {
      props
    } = $xetable;
    const {
      editConfig
    } = props;
    const {
      computeEditOpts,
      computeCheckboxOpts
    } = $xetable.getComputeMaps();
    const checkboxOpts = computeCheckboxOpts.value;
    const editOpts = computeEditOpts.value;
    const renConfs = {
      renderHeader: Cell.renderDefaultHeader,
      renderCell: treeNode ? Cell.renderTreeCell : Cell.renderDefaultCell,
      renderFooter: Cell.renderDefaultFooter
    };
    switch (type) {
      case 'seq':
        renConfs.renderHeader = Cell.renderSeqHeader;
        renConfs.renderCell = treeNode ? Cell.renderTreeIndexCell : Cell.renderSeqCell;
        break;
      case 'radio':
        renConfs.renderHeader = Cell.renderRadioHeader;
        renConfs.renderCell = treeNode ? Cell.renderTreeRadioCell : Cell.renderRadioCell;
        break;
      case 'checkbox':
        renConfs.renderHeader = Cell.renderCheckboxHeader;
        renConfs.renderCell = checkboxOpts.checkField ? treeNode ? Cell.renderTreeSelectionCellByProp : Cell.renderCheckboxCellByProp : treeNode ? Cell.renderTreeSelectionCell : Cell.renderCheckboxCell;
        break;
      case 'expand':
        renConfs.renderCell = Cell.renderExpandCell;
        renConfs.renderData = Cell.renderExpandData;
        break;
      case 'html':
        renConfs.renderCell = treeNode ? Cell.renderTreeHTMLCell : Cell.renderHTMLCell;
        if (filters && sortable) {
          renConfs.renderHeader = Cell.renderSortAndFilterHeader;
        } else if (sortable) {
          renConfs.renderHeader = Cell.renderSortHeader;
        } else if (filters) {
          renConfs.renderHeader = Cell.renderFilterHeader;
        }
        break;
      default:
        if (editConfig && editRender) {
          renConfs.renderHeader = Cell.renderEditHeader;
          renConfs.renderCell = editOpts.mode === 'cell' ? treeNode ? Cell.renderTreeCellEdit : Cell.renderCellEdit : treeNode ? Cell.renderTreeRowEdit : Cell.renderRowEdit;
        } else if (filters && sortable) {
          renConfs.renderHeader = Cell.renderSortAndFilterHeader;
        } else if (sortable) {
          renConfs.renderHeader = Cell.renderSortHeader;
        } else if (filters) {
          renConfs.renderHeader = Cell.renderFilterHeader;
        }
    }
    return (0, _util.createColumn)($xetable, columnOpts, renConfs);
  },
  /**
   * 单元格
   */
  renderHeaderTitle(params) {
    const {
      $table,
      column
    } = params;
    const {
      slots,
      editRender,
      cellRender
    } = column;
    const renderOpts = editRender || cellRender;
    const headerSlot = slots ? slots.header : null;
    if (headerSlot) {
      return renderTitleContent(params, $table.callSlot(headerSlot, params));
    }
    if (renderOpts) {
      const compConf = _vXETable.VXETable.renderer.get(renderOpts.name);
      if (compConf && compConf.renderHeader) {
        return renderTitleContent(params, (0, _vn.getSlotVNs)(compConf.renderHeader(renderOpts, params)));
      }
    }
    return renderTitleContent(params, (0, _utils.formatText)(column.getTitle(), 1));
  },
  renderDefaultHeader(params) {
    return renderTitlePrefixIcon(params).concat(Cell.renderHeaderTitle(params)).concat(renderTitleSuffixIcon(params));
  },
  renderDefaultCell(params) {
    const {
      $table,
      row,
      column
    } = params;
    const {
      slots,
      editRender,
      cellRender
    } = column;
    const renderOpts = editRender || cellRender;
    const defaultSlot = slots ? slots.default : null;
    if (defaultSlot) {
      return $table.callSlot(defaultSlot, params);
    }
    if (renderOpts) {
      const funName = editRender ? 'renderCell' : 'renderDefault';
      const compConf = _vXETable.VXETable.renderer.get(renderOpts.name);
      const compFn = compConf ? compConf[funName] : null;
      if (compFn) {
        return (0, _vn.getSlotVNs)(compFn(renderOpts, Object.assign({
          $type: editRender ? 'edit' : 'cell'
        }, params)));
      }
    }
    const cellValue = $table.getCellLabel(row, column);
    const cellPlaceholder = editRender ? editRender.placeholder : '';
    return [(0, _vue.h)('span', {
      class: 'vxe-cell--label'
    }, editRender && (0, _utils.eqEmptyValue)(cellValue) ? [
    // 如果设置占位符
    (0, _vue.h)('span', {
      class: 'vxe-cell--placeholder'
    }, (0, _utils.formatText)((0, _utils.getFuncText)(cellPlaceholder), 1))] : (0, _utils.formatText)(cellValue, 1))];
  },
  renderTreeCell(params) {
    return Cell.renderTreeIcon(params, Cell.renderDefaultCell(params));
  },
  renderDefaultFooter(params) {
    return [(0, _vue.h)('span', {
      class: 'vxe-cell--item'
    }, getFooterContent(params))];
  },
  /**
   * 树节点
   */
  renderTreeIcon(params, cellVNodes) {
    const {
      $table,
      isHidden
    } = params;
    const {
      reactData
    } = $table;
    const {
      computeTreeOpts
    } = $table.getComputeMaps();
    const {
      treeExpandedMaps,
      treeExpandLazyLoadedMaps
    } = reactData;
    const treeOpts = computeTreeOpts.value;
    const {
      row,
      column,
      level
    } = params;
    const {
      slots
    } = column;
    const {
      indent,
      lazy,
      trigger,
      iconLoaded,
      showIcon,
      iconOpen,
      iconClose
    } = treeOpts;
    const childrenField = treeOpts.children || treeOpts.childrenField;
    const hasChildField = treeOpts.hasChild || treeOpts.hasChildField;
    const rowChilds = row[childrenField];
    const iconSlot = slots ? slots.icon : null;
    let hasLazyChilds = false;
    let isAceived = false;
    let isLazyLoaded = false;
    const ons = {};
    if (iconSlot) {
      return $table.callSlot(iconSlot, params);
    }
    if (!isHidden) {
      const rowid = (0, _util.getRowid)($table, row);
      isAceived = !!treeExpandedMaps[rowid];
      if (lazy) {
        isLazyLoaded = !!treeExpandLazyLoadedMaps[rowid];
        hasLazyChilds = row[hasChildField];
      }
    }
    if (!trigger || trigger === 'default') {
      ons.onClick = evnt => {
        evnt.stopPropagation();
        $table.triggerTreeExpandEvent(evnt, params);
      };
    }
    return [(0, _vue.h)('div', {
      class: ['vxe-cell--tree-node', {
        'is--active': isAceived
      }],
      style: {
        paddingLeft: `${level * indent}px`
      }
    }, [showIcon && (rowChilds && rowChilds.length || hasLazyChilds) ? [(0, _vue.h)('div', Object.assign({
      class: 'vxe-tree--btn-wrapper'
    }, ons), [(0, _vue.h)('i', {
      class: ['vxe-tree--node-btn', isLazyLoaded ? iconLoaded || _conf.default.icon.TABLE_TREE_LOADED : isAceived ? iconOpen || _conf.default.icon.TABLE_TREE_OPEN : iconClose || _conf.default.icon.TABLE_TREE_CLOSE]
    })])] : null, (0, _vue.h)('div', {
      class: 'vxe-tree-cell'
    }, cellVNodes)])];
  },
  /**
   * 索引
   */
  renderSeqHeader(params) {
    const {
      $table,
      column
    } = params;
    const {
      slots
    } = column;
    const headerSlot = slots ? slots.header : null;
    return renderTitleContent(params, headerSlot ? $table.callSlot(headerSlot, params) : (0, _utils.formatText)(column.getTitle(), 1));
  },
  renderSeqCell(params) {
    const {
      $table,
      column
    } = params;
    const {
      props
    } = $table;
    const {
      treeConfig
    } = props;
    const {
      computeSeqOpts
    } = $table.getComputeMaps();
    const seqOpts = computeSeqOpts.value;
    const {
      slots
    } = column;
    const defaultSlot = slots ? slots.default : null;
    if (defaultSlot) {
      return $table.callSlot(defaultSlot, params);
    }
    const {
      seq
    } = params;
    const seqMethod = seqOpts.seqMethod;
    return [(0, _utils.formatText)(seqMethod ? seqMethod(params) : treeConfig ? seq : (seqOpts.startIndex || 0) + seq, 1)];
  },
  renderTreeIndexCell(params) {
    return Cell.renderTreeIcon(params, Cell.renderSeqCell(params));
  },
  /**
   * 单选
   */
  renderRadioHeader(params) {
    const {
      $table,
      column
    } = params;
    const {
      slots
    } = column;
    const headerSlot = slots ? slots.header : null;
    const titleSlot = slots ? slots.title : null;
    return renderTitleContent(params, headerSlot ? $table.callSlot(headerSlot, params) : [(0, _vue.h)('span', {
      class: 'vxe-radio--label'
    }, titleSlot ? $table.callSlot(titleSlot, params) : (0, _utils.formatText)(column.getTitle(), 1))]);
  },
  renderRadioCell(params) {
    const {
      $table,
      column,
      isHidden
    } = params;
    const {
      reactData
    } = $table;
    const {
      computeRadioOpts
    } = $table.getComputeMaps();
    const {
      selectRadioRow
    } = reactData;
    const radioOpts = computeRadioOpts.value;
    const {
      slots
    } = column;
    const {
      labelField,
      checkMethod,
      visibleMethod
    } = radioOpts;
    const {
      row
    } = params;
    const defaultSlot = slots ? slots.default : null;
    const radioSlot = slots ? slots.radio : null;
    const isChecked = $table.eqRow(row, selectRadioRow);
    const isVisible = !visibleMethod || visibleMethod({
      row
    });
    let isDisabled = !!checkMethod;
    let ons;
    if (!isHidden) {
      ons = {
        onClick(evnt) {
          if (!isDisabled && isVisible) {
            evnt.stopPropagation();
            $table.triggerRadioRowEvent(evnt, params);
          }
        }
      };
      if (checkMethod) {
        isDisabled = !checkMethod({
          row
        });
      }
    }
    const radioParams = Object.assign(Object.assign({}, params), {
      checked: isChecked,
      disabled: isDisabled,
      visible: isVisible
    });
    if (radioSlot) {
      return $table.callSlot(radioSlot, radioParams);
    }
    const radioVNs = [];
    if (isVisible) {
      radioVNs.push((0, _vue.h)('span', {
        class: ['vxe-radio--icon', isChecked ? _conf.default.icon.TABLE_RADIO_CHECKED : _conf.default.icon.TABLE_RADIO_UNCHECKED]
      }));
    }
    if (defaultSlot || labelField) {
      radioVNs.push((0, _vue.h)('span', {
        class: 'vxe-radio--label'
      }, defaultSlot ? $table.callSlot(defaultSlot, radioParams) : _xeUtils.default.get(row, labelField)));
    }
    return [(0, _vue.h)('span', Object.assign({
      class: ['vxe-cell--radio', {
        'is--checked': isChecked,
        'is--disabled': isDisabled
      }]
    }, ons), radioVNs)];
  },
  renderTreeRadioCell(params) {
    return Cell.renderTreeIcon(params, Cell.renderRadioCell(params));
  },
  /**
   * 多选
   */
  renderCheckboxHeader(params) {
    const {
      $table,
      column,
      isHidden
    } = params;
    const {
      reactData
    } = $table;
    const {
      computeIsAllCheckboxDisabled,
      computeCheckboxOpts
    } = $table.getComputeMaps();
    const {
      isAllSelected: isAllCheckboxSelected,
      isIndeterminate: isAllCheckboxIndeterminate
    } = reactData;
    const isAllCheckboxDisabled = computeIsAllCheckboxDisabled.value;
    const {
      slots
    } = column;
    const headerSlot = slots ? slots.header : null;
    const titleSlot = slots ? slots.title : null;
    const checkboxOpts = computeCheckboxOpts.value;
    const headerTitle = column.getTitle();
    let ons;
    if (!isHidden) {
      ons = {
        onClick(evnt) {
          if (!isAllCheckboxDisabled) {
            evnt.stopPropagation();
            $table.triggerCheckAllEvent(evnt, !isAllCheckboxSelected);
          }
        }
      };
    }
    const checkboxParams = Object.assign(Object.assign({}, params), {
      checked: isAllCheckboxSelected,
      disabled: isAllCheckboxDisabled,
      indeterminate: isAllCheckboxIndeterminate
    });
    if (headerSlot) {
      return renderTitleContent(checkboxParams, $table.callSlot(headerSlot, checkboxParams));
    }
    if (checkboxOpts.checkStrictly ? !checkboxOpts.showHeader : checkboxOpts.showHeader === false) {
      return renderTitleContent(checkboxParams, [(0, _vue.h)('span', {
        class: 'vxe-checkbox--label'
      }, titleSlot ? $table.callSlot(titleSlot, checkboxParams) : headerTitle)]);
    }
    return renderTitleContent(checkboxParams, [(0, _vue.h)('span', Object.assign({
      class: ['vxe-cell--checkbox', {
        'is--checked': isAllCheckboxSelected,
        'is--disabled': isAllCheckboxDisabled,
        'is--indeterminate': isAllCheckboxIndeterminate
      }],
      title: _conf.default.i18n('vxe.table.allTitle')
    }, ons), [(0, _vue.h)('span', {
      class: ['vxe-checkbox--icon', isAllCheckboxIndeterminate ? _conf.default.icon.TABLE_CHECKBOX_INDETERMINATE : isAllCheckboxSelected ? _conf.default.icon.TABLE_CHECKBOX_CHECKED : _conf.default.icon.TABLE_CHECKBOX_UNCHECKED]
    })].concat(titleSlot || headerTitle ? [(0, _vue.h)('span', {
      class: 'vxe-checkbox--label'
    }, titleSlot ? $table.callSlot(titleSlot, checkboxParams) : headerTitle)] : []))]);
  },
  renderCheckboxCell(params) {
    const {
      $table,
      row,
      column,
      isHidden
    } = params;
    const {
      props,
      reactData
    } = $table;
    const {
      treeConfig
    } = props;
    const {
      selectCheckboxMaps,
      treeIndeterminateMaps
    } = reactData;
    const {
      computeCheckboxOpts
    } = $table.getComputeMaps();
    const checkboxOpts = computeCheckboxOpts.value;
    const {
      labelField,
      checkMethod,
      visibleMethod
    } = checkboxOpts;
    const {
      slots
    } = column;
    const defaultSlot = slots ? slots.default : null;
    const checkboxSlot = slots ? slots.checkbox : null;
    let indeterminate = false;
    let isChecked = false;
    const isVisible = !visibleMethod || visibleMethod({
      row
    });
    let isDisabled = !!checkMethod;
    let ons;
    if (!isHidden) {
      const rowid = (0, _util.getRowid)($table, row);
      isChecked = !!selectCheckboxMaps[rowid];
      ons = {
        onClick(evnt) {
          if (!isDisabled && isVisible) {
            evnt.stopPropagation();
            $table.triggerCheckRowEvent(evnt, params, !isChecked);
          }
        }
      };
      if (checkMethod) {
        isDisabled = !checkMethod({
          row
        });
      }
      if (treeConfig) {
        indeterminate = !!treeIndeterminateMaps[rowid];
      }
    }
    const checkboxParams = Object.assign(Object.assign({}, params), {
      checked: isChecked,
      disabled: isDisabled,
      visible: isVisible,
      indeterminate
    });
    if (checkboxSlot) {
      return $table.callSlot(checkboxSlot, checkboxParams);
    }
    const checkVNs = [];
    if (isVisible) {
      checkVNs.push((0, _vue.h)('span', {
        class: ['vxe-checkbox--icon', indeterminate ? _conf.default.icon.TABLE_CHECKBOX_INDETERMINATE : isChecked ? _conf.default.icon.TABLE_CHECKBOX_CHECKED : _conf.default.icon.TABLE_CHECKBOX_UNCHECKED]
      }));
    }
    if (defaultSlot || labelField) {
      checkVNs.push((0, _vue.h)('span', {
        class: 'vxe-checkbox--label'
      }, defaultSlot ? $table.callSlot(defaultSlot, checkboxParams) : _xeUtils.default.get(row, labelField)));
    }
    return [(0, _vue.h)('span', Object.assign({
      class: ['vxe-cell--checkbox', {
        'is--checked': isChecked,
        'is--disabled': isDisabled,
        'is--indeterminate': indeterminate,
        'is--hidden': !isVisible
      }]
    }, ons), checkVNs)];
  },
  renderTreeSelectionCell(params) {
    return Cell.renderTreeIcon(params, Cell.renderCheckboxCell(params));
  },
  renderCheckboxCellByProp(params) {
    const {
      $table,
      row,
      column,
      isHidden
    } = params;
    const {
      props,
      reactData
    } = $table;
    const {
      treeConfig
    } = props;
    const {
      treeIndeterminateMaps
    } = reactData;
    const {
      computeCheckboxOpts
    } = $table.getComputeMaps();
    const checkboxOpts = computeCheckboxOpts.value;
    const {
      labelField,
      checkField,
      checkMethod,
      visibleMethod
    } = checkboxOpts;
    const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField;
    const {
      slots
    } = column;
    const defaultSlot = slots ? slots.default : null;
    const checkboxSlot = slots ? slots.checkbox : null;
    let isIndeterminate = false;
    let isChecked = false;
    const isVisible = !visibleMethod || visibleMethod({
      row
    });
    let isDisabled = !!checkMethod;
    let ons;
    if (!isHidden) {
      const rowid = (0, _util.getRowid)($table, row);
      isChecked = _xeUtils.default.get(row, checkField);
      ons = {
        onClick(evnt) {
          if (!isDisabled && isVisible) {
            evnt.stopPropagation();
            $table.triggerCheckRowEvent(evnt, params, !isChecked);
          }
        }
      };
      if (checkMethod) {
        isDisabled = !checkMethod({
          row
        });
      }
      if (treeConfig) {
        isIndeterminate = !!treeIndeterminateMaps[rowid];
      }
    }
    const checkboxParams = Object.assign(Object.assign({}, params), {
      checked: isChecked,
      disabled: isDisabled,
      visible: isVisible,
      indeterminate: isIndeterminate
    });
    if (checkboxSlot) {
      return $table.callSlot(checkboxSlot, checkboxParams);
    }
    const checkVNs = [];
    if (isVisible) {
      checkVNs.push((0, _vue.h)('span', {
        class: ['vxe-checkbox--icon', isIndeterminate ? _conf.default.icon.TABLE_CHECKBOX_INDETERMINATE : isChecked ? _conf.default.icon.TABLE_CHECKBOX_CHECKED : _conf.default.icon.TABLE_CHECKBOX_UNCHECKED]
      }));
      if (defaultSlot || labelField) {
        checkVNs.push((0, _vue.h)('span', {
          class: 'vxe-checkbox--label'
        }, defaultSlot ? $table.callSlot(defaultSlot, checkboxParams) : _xeUtils.default.get(row, labelField)));
      }
    }
    return [(0, _vue.h)('span', Object.assign({
      class: ['vxe-cell--checkbox', {
        'is--checked': isChecked,
        'is--disabled': isDisabled,
        'is--indeterminate': indeterminateField && !isChecked ? row[indeterminateField] : isIndeterminate,
        'is--hidden': !isVisible
      }]
    }, ons), checkVNs)];
  },
  renderTreeSelectionCellByProp(params) {
    return Cell.renderTreeIcon(params, Cell.renderCheckboxCellByProp(params));
  },
  /**
   * 展开行
   */
  renderExpandCell(params) {
    const {
      $table,
      isHidden,
      row,
      column
    } = params;
    const {
      reactData
    } = $table;
    const {
      rowExpandedMaps,
      rowExpandLazyLoadedMaps
    } = reactData;
    const {
      computeExpandOpts
    } = $table.getComputeMaps();
    const expandOpts = computeExpandOpts.value;
    const {
      lazy,
      labelField,
      iconLoaded,
      showIcon,
      iconOpen,
      iconClose,
      visibleMethod
    } = expandOpts;
    const {
      slots
    } = column;
    const defaultSlot = slots ? slots.default : null;
    const iconSlot = slots ? slots.icon : null;
    let isAceived = false;
    let isLazyLoaded = false;
    if (iconSlot) {
      return $table.callSlot(iconSlot, params);
    }
    if (!isHidden) {
      const rowid = (0, _util.getRowid)($table, row);
      isAceived = !!rowExpandedMaps[rowid];
      if (lazy) {
        isLazyLoaded = !!rowExpandLazyLoadedMaps[rowid];
      }
    }
    return [showIcon && (!visibleMethod || visibleMethod(params)) ? (0, _vue.h)('span', {
      class: ['vxe-table--expanded', {
        'is--active': isAceived
      }],
      onClick(evnt) {
        evnt.stopPropagation();
        $table.triggerRowExpandEvent(evnt, params);
      }
    }, [(0, _vue.h)('i', {
      class: ['vxe-table--expand-btn', isLazyLoaded ? iconLoaded || _conf.default.icon.TABLE_EXPAND_LOADED : isAceived ? iconOpen || _conf.default.icon.TABLE_EXPAND_OPEN : iconClose || _conf.default.icon.TABLE_EXPAND_CLOSE]
    })]) : null, defaultSlot || labelField ? (0, _vue.h)('span', {
      class: 'vxe-table--expand-label'
    }, defaultSlot ? $table.callSlot(defaultSlot, params) : _xeUtils.default.get(row, labelField)) : null];
  },
  renderExpandData(params) {
    const {
      $table,
      column
    } = params;
    const {
      slots,
      contentRender
    } = column;
    const contentSlot = slots ? slots.content : null;
    if (contentSlot) {
      return $table.callSlot(contentSlot, params);
    }
    if (contentRender) {
      const compConf = _vXETable.VXETable.renderer.get(contentRender.name);
      if (compConf && compConf.renderExpand) {
        return (0, _vn.getSlotVNs)(compConf.renderExpand(contentRender, params));
      }
    }
    return [];
  },
  /**
   * HTML 标签
   */
  renderHTMLCell(params) {
    const {
      $table,
      column
    } = params;
    const {
      slots
    } = column;
    const defaultSlot = slots ? slots.default : null;
    if (defaultSlot) {
      return $table.callSlot(defaultSlot, params);
    }
    return [(0, _vue.h)('span', {
      class: 'vxe-cell--html',
      innerHTML: getDefaultCellLabel(params)
    })];
  },
  renderTreeHTMLCell(params) {
    return Cell.renderTreeIcon(params, Cell.renderHTMLCell(params));
  },
  /**
   * 排序和筛选
   */
  renderSortAndFilterHeader(params) {
    return Cell.renderDefaultHeader(params).concat(Cell.renderSortIcon(params)).concat(Cell.renderFilterIcon(params));
  },
  /**
   * 排序
   */
  renderSortHeader(params) {
    return Cell.renderDefaultHeader(params).concat(Cell.renderSortIcon(params));
  },
  renderSortIcon(params) {
    const {
      $table,
      column
    } = params;
    const {
      computeSortOpts
    } = $table.getComputeMaps();
    const sortOpts = computeSortOpts.value;
    const {
      showIcon,
      iconLayout,
      iconAsc,
      iconDesc
    } = sortOpts;
    const {
      order
    } = column;
    if (showIcon) {
      return [(0, _vue.h)('span', {
        class: ['vxe-cell--sort', `vxe-cell--sort-${iconLayout}-layout`]
      }, [(0, _vue.h)('i', {
        class: ['vxe-sort--asc-btn', iconAsc || _conf.default.icon.TABLE_SORT_ASC, {
          'sort--active': order === 'asc'
        }],
        title: _conf.default.i18n('vxe.table.sortAsc'),
        onClick(evnt) {
          evnt.stopPropagation();
          $table.triggerSortEvent(evnt, column, 'asc');
        }
      }), (0, _vue.h)('i', {
        class: ['vxe-sort--desc-btn', iconDesc || _conf.default.icon.TABLE_SORT_DESC, {
          'sort--active': order === 'desc'
        }],
        title: _conf.default.i18n('vxe.table.sortDesc'),
        onClick(evnt) {
          evnt.stopPropagation();
          $table.triggerSortEvent(evnt, column, 'desc');
        }
      })])];
    }
    return [];
  },
  /**
   * 筛选
   */
  renderFilterHeader(params) {
    return Cell.renderDefaultHeader(params).concat(Cell.renderFilterIcon(params));
  },
  renderFilterIcon(params) {
    const {
      $table,
      column,
      hasFilter
    } = params;
    const {
      reactData
    } = $table;
    const {
      filterStore
    } = reactData;
    const {
      computeFilterOpts
    } = $table.getComputeMaps();
    const filterOpts = computeFilterOpts.value;
    const {
      showIcon,
      iconNone,
      iconMatch
    } = filterOpts;
    return showIcon ? [(0, _vue.h)('span', {
      class: ['vxe-cell--filter', {
        'is--active': filterStore.visible && filterStore.column === column
      }]
    }, [(0, _vue.h)('i', {
      class: ['vxe-filter--btn', hasFilter ? iconMatch || _conf.default.icon.TABLE_FILTER_MATCH : iconNone || _conf.default.icon.TABLE_FILTER_NONE],
      title: _conf.default.i18n('vxe.table.filter'),
      onClick(evnt) {
        if ($table.triggerFilterEvent) {
          $table.triggerFilterEvent(evnt, params.column, params);
        }
      }
    })])] : [];
  },
  /**
   * 可编辑
   */
  renderEditHeader(params) {
    const {
      $table,
      column
    } = params;
    const {
      props
    } = $table;
    const {
      computeEditOpts
    } = $table.getComputeMaps();
    const {
      editConfig,
      editRules
    } = props;
    const editOpts = computeEditOpts.value;
    const {
      sortable,
      filters,
      editRender
    } = column;
    let isRequired = false;
    if (editRules) {
      const columnRules = _xeUtils.default.get(editRules, column.field);
      if (columnRules) {
        isRequired = columnRules.some(rule => rule.required);
      }
    }
    return ((0, _utils.isEnableConf)(editConfig) ? [isRequired && editOpts.showAsterisk ? (0, _vue.h)('i', {
      class: 'vxe-cell--required-icon'
    }) : null, (0, _utils.isEnableConf)(editRender) && editOpts.showIcon ? (0, _vue.h)('i', {
      class: ['vxe-cell--edit-icon', editOpts.icon || _conf.default.icon.TABLE_EDIT]
    }) : null] : []).concat(Cell.renderDefaultHeader(params)).concat(sortable ? Cell.renderSortIcon(params) : []).concat(filters ? Cell.renderFilterIcon(params) : []);
  },
  // 行格编辑模式
  renderRowEdit(params) {
    const {
      $table,
      column
    } = params;
    const {
      reactData
    } = $table;
    const {
      editStore
    } = reactData;
    const {
      actived
    } = editStore;
    const {
      editRender
    } = column;
    return Cell.runRenderer(params, (0, _utils.isEnableConf)(editRender) && actived && actived.row === params.row);
  },
  renderTreeRowEdit(params) {
    return Cell.renderTreeIcon(params, Cell.renderRowEdit(params));
  },
  // 单元格编辑模式
  renderCellEdit(params) {
    const {
      $table,
      column
    } = params;
    const {
      reactData
    } = $table;
    const {
      editStore
    } = reactData;
    const {
      actived
    } = editStore;
    const {
      editRender
    } = column;
    return Cell.runRenderer(params, (0, _utils.isEnableConf)(editRender) && actived && actived.row === params.row && actived.column === params.column);
  },
  renderTreeCellEdit(params) {
    return Cell.renderTreeIcon(params, Cell.renderCellEdit(params));
  },
  runRenderer(params, isEdit) {
    const {
      $table,
      column
    } = params;
    const {
      slots,
      editRender,
      formatter
    } = column;
    const defaultSlot = slots ? slots.default : null;
    const editSlot = slots ? slots.edit : null;
    const compConf = _vXETable.VXETable.renderer.get(editRender.name);
    if (isEdit) {
      if (editSlot) {
        return $table.callSlot(editSlot, params);
      }
      if (compConf && compConf.renderEdit) {
        return (0, _vn.getSlotVNs)(compConf.renderEdit(editRender, Object.assign({
          $type: 'edit'
        }, params)));
      }
      return [];
    }
    if (defaultSlot) {
      return $table.callSlot(defaultSlot, params);
    }
    if (formatter) {
      return [(0, _vue.h)('span', {
        class: 'vxe-cell--label'
      }, getDefaultCellLabel(params))];
    }
    return Cell.renderDefaultCell(params);
  }
};
var _default = exports.default = Cell;