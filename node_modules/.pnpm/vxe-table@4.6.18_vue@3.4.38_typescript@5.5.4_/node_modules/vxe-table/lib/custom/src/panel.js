"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _vXETable = require("../../v-x-e-table");
var _utils = require("../../tools/utils");
var _dom = require("../../tools/dom");
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _modal = _interopRequireDefault(require("../../modal/src/modal"));
var _button = _interopRequireDefault(require("../../button/src/button"));
var _group = _interopRequireDefault(require("../../radio/src/group"));
var _tooltip = _interopRequireDefault(require("../../tooltip/src/tooltip"));
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeTableCustomPanel',
  props: {
    customStore: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const $xetable = (0, _vue.inject)('$xetable', {});
    const {
      reactData
    } = $xetable;
    const {
      computeCustomOpts,
      computeColumnOpts,
      computeIsMaxFixedColumn
    } = $xetable.getComputeMaps();
    const refElem = (0, _vue.ref)();
    const bodyElemRef = (0, _vue.ref)();
    const dragHintElemRef = (0, _vue.ref)();
    const dragColumn = (0, _vue.ref)();
    let prevDropTrEl;
    const handleWrapperMouseenterEvent = evnt => {
      const {
        customStore
      } = props;
      customStore.activeWrapper = true;
      $xetable.customOpenEvent(evnt);
    };
    const handleWrapperMouseleaveEvent = evnt => {
      const {
        customStore
      } = props;
      customStore.activeWrapper = false;
      setTimeout(() => {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          $xetable.customColseEvent(evnt);
        }
      }, 300);
    };
    const confirmCustomEvent = evnt => {
      updateColumnSort();
      $xetable.closeCustom();
      $xetable.emitCustomEvent('confirm', evnt);
    };
    const cancelCustomEvent = evnt => {
      $xetable.closeCustom();
      $xetable.emitCustomEvent('cancel', evnt);
    };
    const resetCustomEvent = evnt => {
      $xetable.resetColumn(true);
      $xetable.closeCustom();
      $xetable.emitCustomEvent('reset', evnt);
    };
    const resetPopupCustomEvent = evnt => {
      if (_vXETable.VXETable.modal) {
        _vXETable.VXETable.modal.confirm({
          content: _conf.default.i18n('vxe.custom.cstmConfirmRestore'),
          className: 'vxe-table--ignore-clear',
          escClosable: true
        }).then(type => {
          if (type === 'confirm') {
            resetCustomEvent(evnt);
          }
        });
      } else {
        resetCustomEvent(evnt);
      }
    };
    const handleOptionCheck = column => {
      const {
        customColumnList
      } = reactData;
      const matchObj = _xeUtils.default.findTree(customColumnList, item => item === column);
      if (matchObj && matchObj.parent) {
        const {
          parent
        } = matchObj;
        if (parent.children && parent.children.length) {
          parent.visible = parent.children.every(column => column.visible);
          parent.halfVisible = !parent.visible && parent.children.some(column => column.visible || column.halfVisible);
          handleOptionCheck(parent);
        }
      }
    };
    const changeCheckboxOption = column => {
      const isChecked = !column.visible;
      const customOpts = computeCustomOpts.value;
      _xeUtils.default.eachTree([column], item => {
        item.visible = isChecked;
        item.halfVisible = false;
      });
      handleOptionCheck(column);
      if (customOpts.immediate) {
        $xetable.handleCustom();
      }
      $xetable.checkCustomStatus();
    };
    const changeFixedOption = (column, colFixed) => {
      const isMaxFixedColumn = computeIsMaxFixedColumn.value;
      if (column.fixed === colFixed) {
        $xetable.clearColumnFixed(column);
      } else {
        if (!isMaxFixedColumn || column.fixed) {
          $xetable.setColumnFixed(column, colFixed);
        }
      }
    };
    const changePopupFixedOption = column => {
      const isMaxFixedColumn = computeIsMaxFixedColumn.value;
      if (!isMaxFixedColumn) {
        $xetable.setColumnFixed(column, column.fixed);
      }
    };
    const allCustomEvent = () => {
      const {
        customStore
      } = props;
      const {
        customColumnList
      } = reactData;
      const customOpts = computeCustomOpts.value;
      const {
        checkMethod
      } = customOpts;
      const isAll = !customStore.isAll;
      _xeUtils.default.eachTree(customColumnList, column => {
        if (!checkMethod || checkMethod({
          column
        })) {
          column.visible = isAll;
          column.halfVisible = false;
        }
      });
      customStore.isAll = isAll;
      $xetable.checkCustomStatus();
    };
    const sortMousedownEvent = evnt => {
      const btnEl = evnt.currentTarget;
      const tdEl = btnEl.parentNode;
      const trEl = tdEl.parentNode;
      const colid = trEl.getAttribute('colid');
      const column = $xetable.getColumnById(colid);
      trEl.draggable = true;
      dragColumn.value = column;
      (0, _dom.addClass)(trEl, 'active--drag-origin');
    };
    const sortMouseupEvent = evnt => {
      const btnEl = evnt.currentTarget;
      const tdEl = btnEl.parentNode;
      const trEl = tdEl.parentNode;
      const dragHintEl = dragHintElemRef.value;
      trEl.draggable = false;
      dragColumn.value = null;
      (0, _dom.removeClass)(trEl, 'active--drag-origin');
      if (dragHintEl) {
        dragHintEl.style.display = '';
      }
    };
    const sortDragstartEvent = evnt => {
      const img = new Image();
      if (evnt.dataTransfer) {
        evnt.dataTransfer.setDragImage(img, 0, 0);
      }
    };
    const updateColumnSort = () => {
      const {
        customColumnList
      } = reactData;
      // 更新顺序
      customColumnList.forEach((column, index) => {
        const sortIndex = index + 1;
        column.renderSortNumber = sortIndex;
      });
    };
    const sortDragendEvent = evnt => {
      const {
        customColumnList
      } = reactData;
      const trEl = evnt.currentTarget;
      const dragHintEl = dragHintElemRef.value;
      if (prevDropTrEl) {
        // 判断是否有拖动
        if (prevDropTrEl !== trEl) {
          const dragOffset = prevDropTrEl.getAttribute('drag-pos');
          const colid = trEl.getAttribute('colid');
          const column = $xetable.getColumnById(colid);
          if (!column) {
            return;
          }
          const cIndex = _xeUtils.default.findIndexOf(customColumnList, item => item.id === column.id);
          const targetColid = prevDropTrEl.getAttribute('colid');
          const targetColumn = $xetable.getColumnById(targetColid);
          if (!targetColumn) {
            return;
          }
          // 移出源位置
          customColumnList.splice(cIndex, 1);
          const tcIndex = _xeUtils.default.findIndexOf(customColumnList, item => item.id === targetColumn.id);
          // 插新位置
          customColumnList.splice(tcIndex + (dragOffset === 'bottom' ? 1 : 0), 0, column);
        }
        prevDropTrEl.draggable = false;
        prevDropTrEl.removeAttribute('drag-pos');
        (0, _dom.removeClass)(prevDropTrEl, 'active--drag-target');
      }
      dragColumn.value = null;
      trEl.draggable = false;
      trEl.removeAttribute('drag-pos');
      if (dragHintEl) {
        dragHintEl.style.display = '';
      }
      (0, _dom.removeClass)(trEl, 'active--drag-target');
      (0, _dom.removeClass)(trEl, 'active--drag-origin');
      // 更新顺序
      updateColumnSort();
    };
    const sortDragoverEvent = evnt => {
      const trEl = evnt.currentTarget;
      if (prevDropTrEl !== trEl) {
        (0, _dom.removeClass)(prevDropTrEl, 'active--drag-target');
      }
      const colid = trEl.getAttribute('colid');
      const column = $xetable.getColumnById(colid);
      // 是否移入有效元行
      if (column && column.level === 1) {
        evnt.preventDefault();
        const offsetY = evnt.clientY - trEl.getBoundingClientRect().y;
        const dragOffset = offsetY < trEl.clientHeight / 2 ? 'top' : 'bottom';
        (0, _dom.addClass)(trEl, 'active--drag-target');
        trEl.setAttribute('drag-pos', dragOffset);
        prevDropTrEl = trEl;
      }
      updateDropHint(evnt);
    };
    const updateDropHint = evnt => {
      const dragHintEl = dragHintElemRef.value;
      const bodyEl = bodyElemRef.value;
      if (!bodyEl) {
        return;
      }
      if (dragHintEl) {
        const wrapperEl = bodyEl.parentNode;
        const wrapperRect = wrapperEl.getBoundingClientRect();
        dragHintEl.style.display = 'block';
        dragHintEl.style.top = `${Math.min(wrapperEl.clientHeight - wrapperEl.scrollTop - dragHintEl.clientHeight, evnt.clientY - wrapperRect.y)}px`;
        dragHintEl.style.left = `${Math.min(wrapperEl.clientWidth - wrapperEl.scrollLeft - dragHintEl.clientWidth - 16, evnt.clientX - wrapperRect.x)}px`;
      }
    };
    const renderSimplePanel = () => {
      const {
        customStore
      } = props;
      const {
        customColumnList
      } = reactData;
      const customOpts = computeCustomOpts.value;
      const {
        maxHeight
      } = customStore;
      const {
        checkMethod,
        visibleMethod,
        trigger
      } = customOpts;
      const isMaxFixedColumn = computeIsMaxFixedColumn.value;
      const colVNs = [];
      const customWrapperOns = {};
      // hover 触发
      if (trigger === 'hover') {
        customWrapperOns.onMouseenter = handleWrapperMouseenterEvent;
        customWrapperOns.onMouseleave = handleWrapperMouseleaveEvent;
      }
      _xeUtils.default.eachTree(customColumnList, (column, index, items, path, parent) => {
        const isVisible = visibleMethod ? visibleMethod({
          column
        }) : true;
        if (isVisible) {
          const isChecked = column.visible;
          const isIndeterminate = column.halfVisible;
          const isColGroup = column.children && column.children.length;
          const colTitle = (0, _utils.formatText)(column.getTitle(), 1);
          const isDisabled = checkMethod ? !checkMethod({
            column
          }) : false;
          colVNs.push((0, _vue.h)('li', {
            key: column.id,
            class: ['vxe-table-custom--option', `level--${column.level}`, {
              'is--group': isColGroup
            }]
          }, [(0, _vue.h)('div', {
            title: colTitle,
            class: ['vxe-table-custom--checkbox-option', {
              'is--checked': isChecked,
              'is--indeterminate': isIndeterminate,
              'is--disabled': isDisabled
            }],
            onClick: () => {
              if (!isDisabled) {
                changeCheckboxOption(column);
              }
            }
          }, [(0, _vue.h)('span', {
            class: ['vxe-checkbox--icon', isIndeterminate ? _conf.default.icon.TABLE_CHECKBOX_INDETERMINATE : isChecked ? _conf.default.icon.TABLE_CHECKBOX_CHECKED : _conf.default.icon.TABLE_CHECKBOX_UNCHECKED]
          }), (0, _vue.h)('span', {
            class: 'vxe-checkbox--label'
          }, colTitle)]), !parent && customOpts.allowFixed ? (0, _vue.h)('div', {
            class: 'vxe-table-custom--fixed-option'
          }, [(0, _vue.h)('span', {
            class: ['vxe-table-custom--fixed-left-option', column.fixed === 'left' ? _conf.default.icon.TOOLBAR_TOOLS_FIXED_LEFT_ACTIVED : _conf.default.icon.TOOLBAR_TOOLS_FIXED_LEFT, {
              'is--checked': column.fixed === 'left',
              'is--disabled': isMaxFixedColumn && !column.fixed
            }],
            title: _conf.default.i18n(column.fixed === 'left' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedLeft'),
            onClick: () => {
              changeFixedOption(column, 'left');
            }
          }), (0, _vue.h)('span', {
            class: ['vxe-table-custom--fixed-right-option', column.fixed === 'right' ? _conf.default.icon.TOOLBAR_TOOLS_FIXED_RIGHT_ACTIVED : _conf.default.icon.TOOLBAR_TOOLS_FIXED_RIGHT, {
              'is--checked': column.fixed === 'right',
              'is--disabled': isMaxFixedColumn && !column.fixed
            }],
            title: _conf.default.i18n(column.fixed === 'right' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedRight'),
            onClick: () => {
              changeFixedOption(column, 'right');
            }
          })]) : null]));
        }
      });
      const isAllChecked = customStore.isAll;
      const isAllIndeterminate = customStore.isIndeterminate;
      return (0, _vue.h)('div', {
        ref: refElem,
        key: 'simple',
        class: ['vxe-table-custom-wrapper', {
          'is--active': customStore.visible
        }]
      }, [(0, _vue.h)('ul', {
        class: 'vxe-table-custom--header'
      }, [(0, _vue.h)('li', {
        class: 'vxe-table-custom--option'
      }, [(0, _vue.h)('div', {
        class: ['vxe-table-custom--checkbox-option', {
          'is--checked': isAllChecked,
          'is--indeterminate': isAllIndeterminate
        }],
        title: _conf.default.i18n('vxe.table.allTitle'),
        onClick: allCustomEvent
      }, [(0, _vue.h)('span', {
        class: ['vxe-checkbox--icon', isAllIndeterminate ? _conf.default.icon.TABLE_CHECKBOX_INDETERMINATE : isAllChecked ? _conf.default.icon.TABLE_CHECKBOX_CHECKED : _conf.default.icon.TABLE_CHECKBOX_UNCHECKED]
      }), (0, _vue.h)('span', {
        class: 'vxe-checkbox--label'
      }, _conf.default.i18n('vxe.toolbar.customAll'))])])]), (0, _vue.h)('ul', Object.assign({
        class: 'vxe-table-custom--body',
        style: maxHeight ? {
          maxHeight: `${maxHeight}px`
        } : {}
      }, customWrapperOns), colVNs), customOpts.showFooter ? (0, _vue.h)('div', {
        class: 'vxe-table-custom--footer'
      }, [(0, _vue.h)('button', {
        class: 'btn--reset',
        onClick: resetCustomEvent
      }, customOpts.resetButtonText || _conf.default.i18n('vxe.toolbar.customRestore')), (0, _vue.h)('button', {
        class: 'btn--confirm',
        onClick: confirmCustomEvent
      }, customOpts.confirmButtonText || _conf.default.i18n('vxe.toolbar.customConfirm'))]) : null]);
    };
    const renderPopupPanel = () => {
      const {
        customStore
      } = props;
      const {
        customColumnList
      } = reactData;
      const customOpts = computeCustomOpts.value;
      const {
        checkMethod,
        visibleMethod
      } = customOpts;
      const columnOpts = computeColumnOpts.value;
      const isMaxFixedColumn = computeIsMaxFixedColumn.value;
      const trVNs = [];
      _xeUtils.default.eachTree(customColumnList, (column, index, items, path, parent) => {
        const isVisible = visibleMethod ? visibleMethod({
          column
        }) : true;
        if (isVisible) {
          const isChecked = column.visible;
          const isIndeterminate = column.halfVisible;
          const colTitle = (0, _utils.formatText)(column.getTitle(), 1);
          const isColGroup = column.children && column.children.length;
          const isDisabled = checkMethod ? !checkMethod({
            column
          }) : false;
          trVNs.push((0, _vue.h)('tr', {
            key: column.id,
            colid: column.id,
            class: [`vxe-table-custom-popup--row level--${column.level}`, {
              'is--group': isColGroup
            }],
            onDragstart: sortDragstartEvent,
            onDragend: sortDragendEvent,
            onDragover: sortDragoverEvent
          }, [(0, _vue.h)('td', {
            class: 'vxe-table-custom-popup--column-item col--sort'
          }, [column.level === 1 ? (0, _vue.h)('span', {
            class: 'vxe-table-custom-popup--column-sort-btn',
            onMousedown: sortMousedownEvent,
            onMouseup: sortMouseupEvent
          }, [(0, _vue.h)('i', {
            class: 'vxe-icon-sort'
          })]) : null]), (0, _vue.h)('td', {
            class: 'vxe-table-custom-popup--column-item col--name'
          }, [(0, _vue.h)('div', {
            class: 'vxe-table-custom-popup--name',
            title: colTitle
          }, colTitle)]), (0, _vue.h)('td', {
            class: 'vxe-table-custom-popup--column-item col--visible'
          }, [(0, _vue.h)('div', {
            class: ['vxe-table-custom--checkbox-option', {
              'is--checked': isChecked,
              'is--indeterminate': isIndeterminate,
              'is--disabled': isDisabled
            }],
            onClick: () => {
              if (!isDisabled) {
                changeCheckboxOption(column);
              }
            }
          }, [(0, _vue.h)('span', {
            class: ['vxe-checkbox--icon', isIndeterminate ? _conf.default.icon.TABLE_CHECKBOX_INDETERMINATE : isChecked ? _conf.default.icon.TABLE_CHECKBOX_CHECKED : _conf.default.icon.TABLE_CHECKBOX_UNCHECKED]
          })])]), (0, _vue.h)('td', {
            class: 'vxe-table-custom-popup--column-item col--fixed'
          }, [!parent && customOpts.allowFixed ? (0, _vue.h)(_group.default, {
            modelValue: column.fixed || '',
            type: 'button',
            size: 'mini',
            options: [{
              label: _conf.default.i18n('vxe.custom.setting.fixedLeft'),
              value: 'left',
              disabled: isMaxFixedColumn
            }, {
              label: _conf.default.i18n('vxe.custom.setting.fixedUnset'),
              value: ''
            }, {
              label: _conf.default.i18n('vxe.custom.setting.fixedRight'),
              value: 'right',
              disabled: isMaxFixedColumn
            }],
            'onUpdate:modelValue'(value) {
              column.fixed = value;
            },
            onChange() {
              changePopupFixedOption(column);
            }
          }) : null])]));
        }
      });
      return (0, _vue.h)(_modal.default, {
        key: 'popup',
        className: 'vxe-table-custom-popup-wrapper vxe-table--ignore-clear',
        modelValue: customStore.visible,
        title: _conf.default.i18n('vxe.custom.cstmTitle'),
        width: '40vw',
        minWidth: 520,
        height: '50vh',
        minHeight: 300,
        mask: true,
        lockView: true,
        showFooter: true,
        resize: true,
        escClosable: true,
        destroyOnClose: true,
        'onUpdate:modelValue'(value) {
          customStore.visible = value;
        }
      }, {
        default: () => {
          return (0, _vue.h)('div', {
            ref: bodyElemRef,
            class: 'vxe-table-custom-popup--body'
          }, [(0, _vue.h)('div', {
            class: 'vxe-table-custom-popup--table-wrapper'
          }, [(0, _vue.h)('table', {}, [(0, _vue.h)('colgroup', {}, [(0, _vue.h)('col', {
            style: {
              width: '80px'
            }
          }), (0, _vue.h)('col', {}), (0, _vue.h)('col', {
            style: {
              width: '80px'
            }
          }), (0, _vue.h)('col', {
            style: {
              width: '200px'
            }
          })]), (0, _vue.h)('thead', {}, [(0, _vue.h)('tr', {}, [(0, _vue.h)('th', {}, [(0, _vue.h)('span', {
            class: 'vxe-table-custom-popup--table-sort-help-title'
          }, _conf.default.i18n('vxe.custom.setting.colSort')), (0, _vue.h)(_tooltip.default, {
            enterable: true,
            content: _conf.default.i18n('vxe.custom.setting.sortHelpTip')
          }, {
            default: () => {
              return (0, _vue.h)('i', {
                class: 'vxe-table-custom-popup--table-sort-help-icon vxe-icon-question-circle-fill'
              });
            }
          })]), (0, _vue.h)('th', {}, _conf.default.i18n('vxe.custom.setting.colTitle')), (0, _vue.h)('th', {}, _conf.default.i18n('vxe.custom.setting.colVisible')), (0, _vue.h)('th', {}, _conf.default.i18n('vxe.custom.setting.colFixed', [columnOpts.maxFixedSize || 0]))])]), (0, _vue.h)(_vue.TransitionGroup, {
            class: 'vxe-table-custom--body',
            tag: 'tbody',
            name: 'vxe-table-custom--list'
          }, {
            default: () => trVNs
          })])]), (0, _vue.h)('div', {
            ref: dragHintElemRef,
            class: 'vxe-table-custom-popup--drag-hint'
          }, _conf.default.i18n('vxe.custom.cstmDragTarget', [dragColumn.value ? dragColumn.value.getTitle() : '']))]);
        },
        footer: () => {
          return (0, _vue.h)('div', {
            class: 'vxe-table-custom-popup--footer'
          }, [(0, _vue.h)(_button.default, {
            content: customOpts.resetButtonText || _conf.default.i18n('vxe.custom.cstmRestore'),
            onClick: resetPopupCustomEvent
          }), (0, _vue.h)(_button.default, {
            content: customOpts.resetButtonText || _conf.default.i18n('vxe.custom.cstmCancel'),
            onClick: cancelCustomEvent
          }), (0, _vue.h)(_button.default, {
            status: 'primary',
            content: customOpts.confirmButtonText || _conf.default.i18n('vxe.custom.cstmConfirm'),
            onClick: confirmCustomEvent
          })]);
        }
      });
    };
    const renderVN = () => {
      const customOpts = computeCustomOpts.value;
      if (customOpts.mode === 'popup') {
        return renderPopupPanel();
      }
      return renderSimplePanel();
    };
    return renderVN;
  }
});