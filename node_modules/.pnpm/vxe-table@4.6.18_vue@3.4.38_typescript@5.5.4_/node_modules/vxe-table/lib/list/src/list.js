"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _size = require("../../hooks/size");
var _resize = require("../../tools/resize");
var _dom = require("../../tools/dom");
var _event = require("../../tools/event");
var _index = _interopRequireDefault(require("../../loading/index"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeList',
  props: {
    data: Array,
    height: [Number, String],
    maxHeight: [Number, String],
    loading: Boolean,
    className: [String, Function],
    size: {
      type: String,
      default: () => _conf.default.list.size || _conf.default.size
    },
    autoResize: {
      type: Boolean,
      default: () => _conf.default.list.autoResize
    },
    syncResize: [Boolean, String, Number],
    scrollY: Object
  },
  emits: ['scroll'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const computeSize = (0, _size.useSize)(props);
    const reactData = (0, _vue.reactive)({
      scrollYLoad: false,
      bodyHeight: 0,
      rowHeight: 0,
      topSpaceHeight: 0,
      items: []
    });
    const refElem = (0, _vue.ref)();
    const refVirtualWrapper = (0, _vue.ref)();
    const refVirtualBody = (0, _vue.ref)();
    const internalData = {
      fullData: [],
      lastScrollLeft: 0,
      lastScrollTop: 0,
      scrollYStore: {
        startIndex: 0,
        endIndex: 0,
        visibleSize: 0,
        offsetSize: 0,
        rowHeight: 0
      }
    };
    const refMaps = {
      refElem
    };
    const $xelist = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps
    };
    let listMethods = {};
    const computeSYOpts = (0, _vue.computed)(() => {
      return Object.assign({}, _conf.default.list.scrollY, props.scrollY);
    });
    const computeStyles = (0, _vue.computed)(() => {
      const {
        height,
        maxHeight
      } = props;
      const style = {};
      if (height) {
        style.height = `${isNaN(height) ? height : `${height}px`}`;
      } else if (maxHeight) {
        style.height = 'auto';
        style.maxHeight = `${isNaN(maxHeight) ? maxHeight : `${maxHeight}px`}`;
      }
      return style;
    });
    const updateYSpace = () => {
      const {
        scrollYLoad
      } = reactData;
      const {
        scrollYStore,
        fullData
      } = internalData;
      reactData.bodyHeight = scrollYLoad ? fullData.length * scrollYStore.rowHeight : 0;
      reactData.topSpaceHeight = scrollYLoad ? Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0) : 0;
    };
    const handleData = () => {
      const {
        scrollYLoad
      } = reactData;
      const {
        fullData,
        scrollYStore
      } = internalData;
      reactData.items = scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.endIndex) : fullData.slice(0);
      return (0, _vue.nextTick)();
    };
    const updateYData = () => {
      handleData();
      updateYSpace();
    };
    const computeScrollLoad = () => {
      return (0, _vue.nextTick)().then(() => {
        const {
          scrollYLoad
        } = reactData;
        const {
          scrollYStore
        } = internalData;
        const virtualBodyElem = refVirtualBody.value;
        const sYOpts = computeSYOpts.value;
        let rowHeight = 0;
        let firstItemElem;
        if (virtualBodyElem) {
          if (sYOpts.sItem) {
            firstItemElem = virtualBodyElem.querySelector(sYOpts.sItem);
          }
          if (!firstItemElem) {
            firstItemElem = virtualBodyElem.children[0];
          }
        }
        if (firstItemElem) {
          rowHeight = firstItemElem.offsetHeight;
        }
        rowHeight = Math.max(20, rowHeight);
        scrollYStore.rowHeight = rowHeight;
        // 计算 Y 逻辑
        if (scrollYLoad) {
          const scrollBodyElem = refVirtualWrapper.value;
          const visibleYSize = Math.max(8, Math.ceil(scrollBodyElem.clientHeight / rowHeight));
          const offsetYSize = sYOpts.oSize ? _xeUtils.default.toNumber(sYOpts.oSize) : _dom.browse.edge ? 10 : 0;
          scrollYStore.offsetSize = offsetYSize;
          scrollYStore.visibleSize = visibleYSize;
          scrollYStore.endIndex = Math.max(scrollYStore.startIndex, visibleYSize + offsetYSize, scrollYStore.endIndex);
          updateYData();
        } else {
          updateYSpace();
        }
        reactData.rowHeight = rowHeight;
      });
    };
    /**
     * 清除滚动条
     */
    const clearScroll = () => {
      const scrollBodyElem = refVirtualWrapper.value;
      if (scrollBodyElem) {
        scrollBodyElem.scrollTop = 0;
      }
      return (0, _vue.nextTick)();
    };
    /**
     * 如果有滚动条，则滚动到对应的位置
     * @param {Number} scrollLeft 左距离
     * @param {Number} scrollTop 上距离
     */
    const scrollTo = (scrollLeft, scrollTop) => {
      const scrollBodyElem = refVirtualWrapper.value;
      if (_xeUtils.default.isNumber(scrollLeft)) {
        scrollBodyElem.scrollLeft = scrollLeft;
      }
      if (_xeUtils.default.isNumber(scrollTop)) {
        scrollBodyElem.scrollTop = scrollTop;
      }
      if (reactData.scrollYLoad) {
        return new Promise(resolve => {
          setTimeout(() => {
            (0, _vue.nextTick)(() => {
              resolve();
            });
          }, 50);
        });
      }
      return (0, _vue.nextTick)();
    };
    /**
     * 刷新滚动条
     */
    const refreshScroll = () => {
      const {
        lastScrollLeft,
        lastScrollTop
      } = internalData;
      return clearScroll().then(() => {
        if (lastScrollLeft || lastScrollTop) {
          internalData.lastScrollLeft = 0;
          internalData.lastScrollTop = 0;
          return scrollTo(lastScrollLeft, lastScrollTop);
        }
      });
    };
    /**
     * 重新计算列表
     */
    const recalculate = () => {
      const el = refElem.value;
      if (el.clientWidth && el.clientHeight) {
        return computeScrollLoad();
      }
      return Promise.resolve();
    };
    const loadYData = evnt => {
      const {
        scrollYStore
      } = internalData;
      const {
        startIndex,
        endIndex,
        visibleSize,
        offsetSize,
        rowHeight
      } = scrollYStore;
      const scrollBodyElem = evnt.target;
      const scrollTop = scrollBodyElem.scrollTop;
      const toVisibleIndex = Math.floor(scrollTop / rowHeight);
      const offsetStartIndex = Math.max(0, toVisibleIndex - 1 - offsetSize);
      const offsetEndIndex = toVisibleIndex + visibleSize + offsetSize;
      if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
        if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
          scrollYStore.startIndex = offsetStartIndex;
          scrollYStore.endIndex = offsetEndIndex;
          updateYData();
        }
      }
    };
    const scrollEvent = evnt => {
      const scrollBodyElem = evnt.target;
      const scrollTop = scrollBodyElem.scrollTop;
      const scrollLeft = scrollBodyElem.scrollLeft;
      const isX = scrollLeft !== internalData.lastScrollLeft;
      const isY = scrollTop !== internalData.lastScrollTop;
      internalData.lastScrollTop = scrollTop;
      internalData.lastScrollLeft = scrollLeft;
      if (reactData.scrollYLoad) {
        loadYData(evnt);
      }
      listMethods.dispatchEvent('scroll', {
        scrollLeft,
        scrollTop,
        isX,
        isY
      }, evnt);
    };
    listMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, Object.assign({
          $list: $xelist,
          $event: evnt
        }, params));
      },
      /**
       * 加载数据
       * @param {Array} datas 数据
       */
      loadData(datas) {
        const {
          scrollYStore
        } = internalData;
        const sYOpts = computeSYOpts.value;
        const fullData = datas || [];
        Object.assign(scrollYStore, {
          startIndex: 0,
          endIndex: 1,
          visibleSize: 0
        });
        internalData.fullData = fullData;
        // 如果gt为0，则总是启用
        reactData.scrollYLoad = !!sYOpts.enabled && sYOpts.gt > -1 && (sYOpts.gt === 0 || sYOpts.gt <= fullData.length);
        handleData();
        return computeScrollLoad().then(() => {
          refreshScroll();
        });
      },
      /**
       * 重新加载数据
       * @param {Array} datas 数据
       */
      reloadData(datas) {
        clearScroll();
        return listMethods.loadData(datas);
      },
      recalculate,
      scrollTo,
      refreshScroll,
      clearScroll
    };
    Object.assign($xelist, listMethods);
    const dataFlag = (0, _vue.ref)(0);
    (0, _vue.watch)(() => props.data ? props.data.length : -1, () => {
      dataFlag.value++;
    });
    (0, _vue.watch)(() => props.data, () => {
      dataFlag.value++;
    });
    (0, _vue.watch)(dataFlag, () => {
      listMethods.loadData(props.data || []);
    });
    (0, _vue.watch)(() => props.syncResize, value => {
      if (value) {
        recalculate();
        (0, _vue.nextTick)(() => setTimeout(() => recalculate()));
      }
    });
    (0, _vue.onActivated)(() => {
      recalculate().then(() => refreshScroll());
    });
    let resizeObserver;
    (0, _vue.nextTick)(() => {
      _event.GlobalEvent.on($xelist, 'resize', () => {
        recalculate();
      });
      if (props.autoResize) {
        const el = refElem.value;
        resizeObserver = (0, _resize.createResizeEvent)(() => recalculate());
        resizeObserver.observe(el);
      }
      listMethods.loadData(props.data || []);
    });
    (0, _vue.onUnmounted)(() => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      _event.GlobalEvent.off($xelist, 'resize');
    });
    const renderVN = () => {
      const {
        className,
        loading
      } = props;
      const {
        bodyHeight,
        topSpaceHeight,
        items
      } = reactData;
      const vSize = computeSize.value;
      const styles = computeStyles.value;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-list', className ? _xeUtils.default.isFunction(className) ? className({
          $list: $xelist
        }) : className : '', {
          [`size--${vSize}`]: vSize,
          'is--loading': loading
        }]
      }, [(0, _vue.h)('div', {
        ref: refVirtualWrapper,
        class: 'vxe-list--virtual-wrapper',
        style: styles,
        onScroll: scrollEvent
      }, [(0, _vue.h)('div', {
        class: 'vxe-list--y-space',
        style: {
          height: bodyHeight ? `${bodyHeight}px` : ''
        }
      }), (0, _vue.h)('div', {
        ref: refVirtualBody,
        class: 'vxe-list--body',
        style: {
          marginTop: topSpaceHeight ? `${topSpaceHeight}px` : ''
        }
      }, slots.default ? slots.default({
        items,
        $list: $xelist
      }) : [])]),
      /**
       * 加载中
       */
      (0, _vue.h)(_index.default, {
        class: 'vxe-list--loading',
        modelValue: loading
      })]);
    };
    $xelist.renderVN = renderVN;
    return $xelist;
  },
  render() {
    return this.renderVN();
  }
});