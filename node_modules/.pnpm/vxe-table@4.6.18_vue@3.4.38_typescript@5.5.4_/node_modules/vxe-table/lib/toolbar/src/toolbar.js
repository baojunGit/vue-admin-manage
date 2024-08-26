"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _button = _interopRequireDefault(require("../../button"));
var _vXETable = require("../../v-x-e-table");
var _size = require("../../hooks/size");
var _log = require("../../tools/log");
var _vn = require("../../tools/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeToolbar',
  props: {
    loading: Boolean,
    refresh: [Boolean, Object],
    import: [Boolean, Object],
    export: [Boolean, Object],
    print: [Boolean, Object],
    zoom: [Boolean, Object],
    custom: [Boolean, Object],
    buttons: {
      type: Array,
      default: () => _conf.default.toolbar.buttons
    },
    tools: {
      type: Array,
      default: () => _conf.default.toolbar.tools
    },
    perfect: {
      type: Boolean,
      default: () => _conf.default.toolbar.perfect
    },
    size: {
      type: String,
      default: () => _conf.default.toolbar.size || _conf.default.size
    },
    className: [String, Function]
  },
  emits: ['button-click', 'tool-click'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const computeSize = (0, _size.useSize)(props);
    const reactData = (0, _vue.reactive)({
      isRefresh: false,
      columns: []
    });
    const refElem = (0, _vue.ref)();
    const refMaps = {
      refElem
    };
    const $xetoolbar = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps
    };
    let toolbarMethods = {};
    const $xegrid = (0, _vue.inject)('$xegrid', null);
    let $xetable;
    const connectFlag = (0, _vue.ref)(0);
    const computeRefreshOpts = (0, _vue.computed)(() => {
      return Object.assign({}, _conf.default.toolbar.refresh, props.refresh);
    });
    const computeImportOpts = (0, _vue.computed)(() => {
      return Object.assign({}, _conf.default.toolbar.import, props.import);
    });
    const computeExportOpts = (0, _vue.computed)(() => {
      return Object.assign({}, _conf.default.toolbar.export, props.export);
    });
    const computePrintOpts = (0, _vue.computed)(() => {
      return Object.assign({}, _conf.default.toolbar.print, props.print);
    });
    const computeZoomOpts = (0, _vue.computed)(() => {
      return Object.assign({}, _conf.default.toolbar.zoom, props.zoom);
    });
    const computeCustomOpts = (0, _vue.computed)(() => {
      return Object.assign({}, _conf.default.toolbar.custom, props.custom);
    });
    const computeTableCustomOpts = (0, _vue.computed)(() => {
      if (connectFlag.value || $xetable) {
        if ($xetable) {
          const {
            computeCustomOpts
          } = $xetable.getComputeMaps();
          return computeCustomOpts.value;
        }
      }
      return {};
    });
    const computeTrigger = (0, _vue.computed)(() => {
      const tableCustomOpts = computeTableCustomOpts.value;
      return tableCustomOpts.trigger;
    });
    const checkTable = () => {
      if ($xetable) {
        return true;
      }
      (0, _log.errLog)('vxe.error.barUnableLink');
    };
    const handleClickSettingEvent = ({
      $event
    }) => {
      if ($xetable) {
        if ($xetable.triggerCustomEvent) {
          $xetable.triggerCustomEvent($event);
        } else {
          (0, _log.errLog)('vxe.error.reqModule', ['VxeTableCustomModule']);
        }
      }
    };
    const handleMouseenterSettingEvent = ({
      $event
    }) => {
      if ($xetable) {
        $xetable.customOpenEvent($event);
      } else {
        (0, _log.errLog)('vxe.error.reqModule', ['VxeTableCustomModule']);
      }
    };
    const handleMouseleaveSettingEvent = ({
      $event
    }) => {
      const {
        customStore
      } = $xetable.reactData;
      customStore.activeBtn = false;
      setTimeout(() => {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          $xetable.customColseEvent($event);
        }
      }, 350);
    };
    const refreshEvent = evnt => {
      const {
        isRefresh
      } = reactData;
      const refreshOpts = computeRefreshOpts.value;
      if (!isRefresh) {
        const queryMethod = refreshOpts.queryMethod || refreshOpts.query;
        if (queryMethod) {
          reactData.isRefresh = true;
          try {
            Promise.resolve(queryMethod({})).catch(e => e).then(() => {
              reactData.isRefresh = false;
            });
          } catch (e) {
            reactData.isRefresh = false;
          }
        } else if ($xegrid) {
          reactData.isRefresh = true;
          $xegrid.triggerToolbarCommitEvent({
            code: refreshOpts.code || 'reload'
          }, evnt).catch(e => e).then(() => {
            reactData.isRefresh = false;
          });
        }
      }
    };
    const zoomEvent = evnt => {
      if ($xegrid) {
        $xegrid.triggerZoomEvent(evnt);
      }
    };
    const btnEvent = (evnt, item) => {
      const {
        code
      } = item;
      if (code) {
        if ($xegrid) {
          $xegrid.triggerToolbarBtnEvent(item, evnt);
        } else {
          const gCommandOpts = _vXETable.VXETable.commands.get(code);
          const params = {
            code,
            button: item,
            $table: $xetable,
            $grid: $xegrid,
            $event: evnt
          };
          if (gCommandOpts) {
            if (gCommandOpts.commandMethod) {
              gCommandOpts.commandMethod(params);
            } else {
              if (process.env.NODE_ENV === 'development') {
                (0, _log.errLog)('vxe.error.notCommands', [code]);
              }
            }
          }
          $xetoolbar.dispatchEvent('button-click', params, evnt);
        }
      }
    };
    const tolEvent = (evnt, item) => {
      const {
        code
      } = item;
      if (code) {
        if ($xegrid) {
          $xegrid.triggerToolbarTolEvent(item, evnt);
        } else {
          const gCommandOpts = _vXETable.VXETable.commands.get(code);
          const params = {
            code,
            tool: item,
            $table: $xetable,
            $grid: $xegrid,
            $event: evnt
          };
          if (gCommandOpts) {
            if (gCommandOpts.commandMethod) {
              gCommandOpts.commandMethod(params);
            } else {
              if (process.env.NODE_ENV === 'development') {
                (0, _log.errLog)('vxe.error.notCommands', [code]);
              }
            }
          }
          $xetoolbar.dispatchEvent('tool-click', params, evnt);
        }
      }
    };
    const importEvent = () => {
      if (checkTable()) {
        $xetable.openImport();
      }
    };
    const exportEvent = () => {
      if (checkTable()) {
        $xetable.openExport();
      }
    };
    const printEvent = () => {
      if (checkTable()) {
        $xetable.openPrint();
      }
    };
    const renderDropdowns = (item, isBtn) => {
      const {
        dropdowns
      } = item;
      const downVNs = [];
      if (dropdowns) {
        return dropdowns.map((child, index) => {
          if (child.visible === false) {
            return (0, _vue.createCommentVNode)();
          }
          return (0, _vue.h)(_button.default, {
            key: index,
            disabled: child.disabled,
            loading: child.loading,
            type: child.type,
            icon: child.icon,
            circle: child.circle,
            round: child.round,
            status: child.status,
            content: child.name,
            onClick: evnt => isBtn ? btnEvent(evnt, child) : tolEvent(evnt, child)
          });
        });
      }
      return downVNs;
    };
    /**
     * 渲染按钮
     */
    const renderBtns = () => {
      const {
        buttons
      } = props;
      const buttonsSlot = slots.buttons;
      if (buttonsSlot) {
        return (0, _vn.getSlotVNs)(buttonsSlot({
          $grid: $xegrid,
          $table: $xetable
        }));
      }
      const btnVNs = [];
      if (buttons) {
        buttons.forEach(item => {
          const {
            dropdowns,
            buttonRender
          } = item;
          if (item.visible !== false) {
            const compConf = buttonRender ? _vXETable.VXETable.renderer.get(buttonRender.name) : null;
            if (buttonRender && compConf && compConf.renderToolbarButton) {
              const toolbarButtonClassName = compConf.toolbarButtonClassName;
              const params = {
                $grid: $xegrid,
                $table: $xetable,
                button: item
              };
              btnVNs.push((0, _vue.h)('span', {
                class: ['vxe-button--item', toolbarButtonClassName ? _xeUtils.default.isFunction(toolbarButtonClassName) ? toolbarButtonClassName(params) : toolbarButtonClassName : '']
              }, (0, _vn.getSlotVNs)(compConf.renderToolbarButton(buttonRender, params))));
            } else {
              btnVNs.push((0, _vue.h)(_button.default, {
                disabled: item.disabled,
                loading: item.loading,
                type: item.type,
                icon: item.icon,
                circle: item.circle,
                round: item.round,
                status: item.status,
                content: item.name,
                destroyOnClose: item.destroyOnClose,
                placement: item.placement,
                transfer: item.transfer,
                onClick: evnt => btnEvent(evnt, item)
              }, dropdowns && dropdowns.length ? {
                dropdowns: () => renderDropdowns(item, true)
              } : {}));
            }
          }
        });
      }
      return btnVNs;
    };
    /**
     * 渲染右侧工具
     */
    const renderRightTools = () => {
      const {
        tools
      } = props;
      const toolsSlot = slots.tools;
      if (toolsSlot) {
        return (0, _vn.getSlotVNs)(toolsSlot({
          $grid: $xegrid,
          $table: $xetable
        }));
      }
      const btnVNs = [];
      if (tools) {
        tools.forEach((item, tIndex) => {
          const {
            dropdowns,
            toolRender
          } = item;
          if (item.visible !== false) {
            const rdName = toolRender ? toolRender.name : null;
            const compConf = toolRender ? _vXETable.VXETable.renderer.get(rdName) : null;
            if (toolRender && compConf && compConf.renderToolbarTool) {
              const toolbarToolClassName = compConf.toolbarToolClassName;
              const params = {
                $grid: $xegrid,
                $table: $xetable,
                tool: item
              };
              btnVNs.push((0, _vue.h)('span', {
                key: rdName,
                class: ['vxe-tool--item', toolbarToolClassName ? _xeUtils.default.isFunction(toolbarToolClassName) ? toolbarToolClassName(params) : toolbarToolClassName : '']
              }, (0, _vn.getSlotVNs)(compConf.renderToolbarTool(toolRender, params))));
            } else {
              btnVNs.push((0, _vue.h)(_button.default, {
                key: tIndex,
                disabled: item.disabled,
                loading: item.loading,
                type: item.type,
                icon: item.icon,
                circle: item.circle,
                round: item.round,
                status: item.status,
                content: item.name,
                destroyOnClose: item.destroyOnClose,
                placement: item.placement,
                transfer: item.transfer,
                onClick: evnt => tolEvent(evnt, item)
              }, dropdowns && dropdowns.length ? {
                dropdowns: () => renderDropdowns(item, false)
              } : {}));
            }
          }
        });
      }
      return btnVNs;
    };
    const renderToolImport = () => {
      const importOpts = computeImportOpts.value;
      return (0, _vue.h)(_button.default, {
        key: 'import',
        circle: true,
        icon: importOpts.icon || _conf.default.icon.TOOLBAR_TOOLS_IMPORT,
        title: _conf.default.i18n('vxe.toolbar.import'),
        onClick: importEvent
      });
    };
    const renderToolExport = () => {
      const exportOpts = computeExportOpts.value;
      return (0, _vue.h)(_button.default, {
        key: 'export',
        circle: true,
        icon: exportOpts.icon || _conf.default.icon.TOOLBAR_TOOLS_EXPORT,
        title: _conf.default.i18n('vxe.toolbar.export'),
        onClick: exportEvent
      });
    };
    const renderToolPrint = () => {
      const printOpts = computePrintOpts.value;
      return (0, _vue.h)(_button.default, {
        key: 'print',
        circle: true,
        icon: printOpts.icon || _conf.default.icon.TOOLBAR_TOOLS_PRINT,
        title: _conf.default.i18n('vxe.toolbar.print'),
        onClick: printEvent
      });
    };
    const renderToolRefresh = () => {
      const refreshOpts = computeRefreshOpts.value;
      return (0, _vue.h)(_button.default, {
        key: 'refresh',
        circle: true,
        icon: reactData.isRefresh ? refreshOpts.iconLoading || _conf.default.icon.TOOLBAR_TOOLS_REFRESH_LOADING : refreshOpts.icon || _conf.default.icon.TOOLBAR_TOOLS_REFRESH,
        title: _conf.default.i18n('vxe.toolbar.refresh'),
        onClick: refreshEvent
      });
    };
    const renderToolZoom = () => {
      const zoomOpts = computeZoomOpts.value;
      return $xegrid ? (0, _vue.h)(_button.default, {
        key: 'zoom',
        circle: true,
        icon: $xegrid.isMaximized() ? zoomOpts.iconOut || _conf.default.icon.TOOLBAR_TOOLS_MINIMIZE : zoomOpts.iconIn || _conf.default.icon.TOOLBAR_TOOLS_FULLSCREEN,
        title: _conf.default.i18n(`vxe.toolbar.zoom${$xegrid.isMaximized() ? 'Out' : 'In'}`),
        onClick: zoomEvent
      }) : (0, _vue.createCommentVNode)();
    };
    const renderToolCustom = () => {
      const customOpts = computeCustomOpts.value;
      const btnTrigger = computeTrigger.value;
      const customBtnOns = {};
      if (btnTrigger === 'manual') {
        // 手动触发
      } else if (btnTrigger === 'hover') {
        // hover 触发
        customBtnOns.onMouseenter = handleMouseenterSettingEvent;
        customBtnOns.onMouseleave = handleMouseleaveSettingEvent;
      } else {
        // 点击触发
        customBtnOns.onClick = handleClickSettingEvent;
      }
      return (0, _vue.h)(_button.default, Object.assign({
        key: 'custom',
        circle: true,
        icon: customOpts.icon || _conf.default.icon.TOOLBAR_TOOLS_CUSTOM,
        title: _conf.default.i18n('vxe.toolbar.custom'),
        className: 'vxe-toolbar-custom-target'
      }, customBtnOns));
    };
    toolbarMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, Object.assign({
          $toolbar: $xetoolbar,
          $event: evnt
        }, params));
      },
      syncUpdate(params) {
        const {
          collectColumn
        } = params;
        $xetable = params.$table;
        reactData.columns = collectColumn;
        connectFlag.value++;
      }
    };
    Object.assign($xetoolbar, toolbarMethods);
    (0, _vue.nextTick)(() => {
      const {
        refresh
      } = props;
      const refreshOpts = computeRefreshOpts.value;
      const queryMethod = refreshOpts.queryMethod || refreshOpts.query;
      if (refresh && !$xegrid && !queryMethod) {
        (0, _log.warnLog)('vxe.error.notFunc', ['queryMethod']);
      }
      const customOpts = computeCustomOpts.value;
      if (process.env.NODE_ENV === 'development') {
        if (customOpts.isFooter) {
          (0, _log.warnLog)('vxe.error.delProp', ['toolbar.custom.isFooter', 'table.custom-config.showFooter']);
        }
        if (customOpts.showFooter) {
          (0, _log.warnLog)('vxe.error.delProp', ['toolbar.custom.showFooter', 'table.custom-config.showFooter']);
        }
        if (customOpts.immediate) {
          (0, _log.warnLog)('vxe.error.delProp', ['toolbar.custom.immediate', 'table.custom-config.immediate']);
        }
        if (customOpts.trigger) {
          (0, _log.warnLog)('vxe.error.delProp', ['toolbar.custom.trigger', 'table.custom-config.trigger']);
        }
      }
    });
    const renderVN = () => {
      const {
        perfect,
        loading,
        refresh,
        zoom,
        custom,
        className
      } = props;
      const vSize = computeSize.value;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-toolbar', className ? _xeUtils.default.isFunction(className) ? className({
          $toolbar: $xetoolbar
        }) : className : '', {
          [`size--${vSize}`]: vSize,
          'is--perfect': perfect,
          'is--loading': loading
        }]
      }, [(0, _vue.h)('div', {
        class: 'vxe-buttons--wrapper'
      }, renderBtns()), (0, _vue.h)('div', {
        class: 'vxe-tools--wrapper'
      }, renderRightTools()), (0, _vue.h)('div', {
        class: 'vxe-tools--operate'
      }, [props.import ? renderToolImport() : (0, _vue.createCommentVNode)(), props.export ? renderToolExport() : (0, _vue.createCommentVNode)(), props.print ? renderToolPrint() : (0, _vue.createCommentVNode)(), refresh ? renderToolRefresh() : (0, _vue.createCommentVNode)(), zoom && $xegrid ? renderToolZoom() : (0, _vue.createCommentVNode)(), custom ? renderToolCustom() : (0, _vue.createCommentVNode)()])]);
    };
    $xetoolbar.renderVN = renderVN;
    return $xetoolbar;
  },
  render() {
    return this.renderVN();
  }
});