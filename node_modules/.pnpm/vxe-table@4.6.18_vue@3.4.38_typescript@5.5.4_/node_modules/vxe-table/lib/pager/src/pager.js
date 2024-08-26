"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _select = _interopRequireDefault(require("../../select"));
var _event = require("../../tools/event");
var _size = require("../../hooks/size");
var _log = require("../../tools/log");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxePager',
  props: {
    size: {
      type: String,
      default: () => _conf.default.pager.size || _conf.default.size
    },
    // 自定义布局
    layouts: {
      type: Array,
      default: () => _conf.default.pager.layouts || ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
    },
    // 当前页
    currentPage: {
      type: Number,
      default: 1
    },
    // 加载中
    loading: Boolean,
    // 每页大小
    pageSize: {
      type: Number,
      default: () => _conf.default.pager.pageSize || 10
    },
    // 总条数
    total: {
      type: Number,
      default: 0
    },
    // 显示页码按钮的数量
    pagerCount: {
      type: Number,
      default: () => _conf.default.pager.pagerCount || 7
    },
    // 每页大小选项列表
    pageSizes: {
      type: Array,
      default: () => _conf.default.pager.pageSizes || [10, 15, 20, 50, 100]
    },
    // 列对其方式
    align: {
      type: String,
      default: () => _conf.default.pager.align
    },
    // 带边框
    border: {
      type: Boolean,
      default: () => _conf.default.pager.border
    },
    // 带背景颜色
    background: {
      type: Boolean,
      default: () => _conf.default.pager.background
    },
    // 配套的样式
    perfect: {
      type: Boolean,
      default: () => _conf.default.pager.perfect
    },
    // 当只有一页时隐藏
    autoHidden: {
      type: Boolean,
      default: () => _conf.default.pager.autoHidden
    },
    transfer: {
      type: Boolean,
      default: () => _conf.default.pager.transfer
    },
    className: [String, Function],
    // 自定义图标
    iconPrevPage: String,
    iconJumpPrev: String,
    iconJumpNext: String,
    iconNextPage: String,
    iconJumpMore: String,
    iconHomePage: String,
    iconEndPage: String
  },
  emits: ['update:pageSize', 'update:currentPage', 'page-change'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const computeSize = (0, _size.useSize)(props);
    const $xegrid = (0, _vue.inject)('$xegrid', null);
    const reactData = (0, _vue.reactive)({
      inpCurrPage: props.currentPage
    });
    const refElem = (0, _vue.ref)();
    const refMaps = {
      refElem
    };
    const $xepager = {
      xID,
      props,
      context,
      getRefMaps: () => refMaps
    };
    let pagerMethods = {};
    let pagerPrivateMethods = {};
    const getPageCount = (total, size) => {
      return Math.max(Math.ceil(total / size), 1);
    };
    const computePageCount = (0, _vue.computed)(() => {
      return getPageCount(props.total, props.pageSize);
    });
    const jumpPageEvent = (evnt, currentPage) => {
      emit('update:currentPage', currentPage);
      if (evnt && currentPage !== props.currentPage) {
        pagerMethods.dispatchEvent('page-change', {
          type: 'current',
          pageSize: props.pageSize,
          currentPage
        }, evnt);
      }
    };
    const changeCurrentPage = (currentPage, evnt) => {
      emit('update:currentPage', currentPage);
      if (evnt && currentPage !== props.currentPage) {
        pagerMethods.dispatchEvent('page-change', {
          type: 'current',
          pageSize: props.pageSize,
          currentPage
        }, evnt);
      }
    };
    const triggerJumpEvent = evnt => {
      const inputElem = evnt.target;
      const inpValue = _xeUtils.default.toInteger(inputElem.value);
      const pageCount = computePageCount.value;
      const current = inpValue <= 0 ? 1 : inpValue >= pageCount ? pageCount : inpValue;
      const currPage = _xeUtils.default.toValueString(current);
      inputElem.value = currPage;
      reactData.inpCurrPage = currPage;
      changeCurrentPage(current, evnt);
    };
    const computeNumList = (0, _vue.computed)(() => {
      const {
        pagerCount
      } = props;
      const pageCount = computePageCount.value;
      const len = pageCount > pagerCount ? pagerCount - 2 : pagerCount;
      const rest = [];
      for (let index = 0; index < len; index++) {
        rest.push(index);
      }
      return rest;
    });
    const computeOffsetNumber = (0, _vue.computed)(() => {
      return Math.floor((props.pagerCount - 2) / 2);
    });
    const computeSizeList = (0, _vue.computed)(() => {
      return props.pageSizes.map(item => {
        if (_xeUtils.default.isNumber(item)) {
          return {
            value: item,
            label: `${_conf.default.i18n('vxe.pager.pagesize', [item])}`
          };
        }
        return Object.assign({
          value: '',
          label: ''
        }, item);
      });
    });
    const handleHomePage = evnt => {
      const {
        currentPage
      } = props;
      if (currentPage > 1) {
        changeCurrentPage(1, evnt);
      }
    };
    const handleEndPage = evnt => {
      const {
        currentPage
      } = props;
      const pageCount = computePageCount.value;
      if (currentPage < pageCount) {
        changeCurrentPage(pageCount, evnt);
      }
    };
    const handlePrevPage = evnt => {
      const {
        currentPage
      } = props;
      const pageCount = computePageCount.value;
      if (currentPage > 1) {
        changeCurrentPage(Math.min(pageCount, Math.max(currentPage - 1, 1)), evnt);
      }
    };
    const handleNextPage = evnt => {
      const {
        currentPage
      } = props;
      const pageCount = computePageCount.value;
      if (currentPage < pageCount) {
        changeCurrentPage(Math.min(pageCount, currentPage + 1), evnt);
      }
    };
    const handlePrevJump = evnt => {
      const numList = computeNumList.value;
      changeCurrentPage(Math.max(props.currentPage - numList.length, 1), evnt);
    };
    const handleNextJump = evnt => {
      const pageCount = computePageCount.value;
      const numList = computeNumList.value;
      changeCurrentPage(Math.min(props.currentPage + numList.length, pageCount), evnt);
    };
    const pageSizeEvent = params => {
      const {
        value
      } = params;
      const pageSize = _xeUtils.default.toNumber(value);
      const pageCount = getPageCount(props.total, pageSize);
      let currentPage = props.currentPage;
      if (currentPage > pageCount) {
        currentPage = pageCount;
        emit('update:currentPage', pageCount);
      }
      emit('update:pageSize', pageSize);
      pagerMethods.dispatchEvent('page-change', {
        type: 'size',
        pageSize,
        currentPage
      });
    };
    const jumpInputEvent = evnt => {
      const inputElem = evnt.target;
      reactData.inpCurrPage = inputElem.value;
    };
    const jumpKeydownEvent = evnt => {
      if ((0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ENTER)) {
        triggerJumpEvent(evnt);
      } else if ((0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ARROW_UP)) {
        evnt.preventDefault();
        handleNextPage(evnt);
      } else if ((0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ARROW_DOWN)) {
        evnt.preventDefault();
        handlePrevPage(evnt);
      }
    };
    // 第一页
    const renderHomePage = () => {
      return (0, _vue.h)('button', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': props.currentPage <= 1
        }],
        type: 'button',
        title: _conf.default.i18n('vxe.pager.homePageTitle'),
        onClick: handleHomePage
      }, [(0, _vue.h)('i', {
        class: ['vxe-pager--btn-icon', props.iconHomePage || _conf.default.icon.PAGER_HOME]
      })]);
    };
    // 上一页
    const renderPrevPage = () => {
      return (0, _vue.h)('button', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': props.currentPage <= 1
        }],
        type: 'button',
        title: _conf.default.i18n('vxe.pager.prevPageTitle'),
        onClick: handlePrevPage
      }, [(0, _vue.h)('i', {
        class: ['vxe-pager--btn-icon', props.iconPrevPage || _conf.default.icon.PAGER_PREV_PAGE]
      })]);
    };
    // 向上翻页
    const renderPrevJump = tagName => {
      return (0, _vue.h)(tagName || 'button', {
        class: ['vxe-pager--jump-prev', {
          'is--fixed': !tagName,
          'is--disabled': props.currentPage <= 1
        }],
        type: 'button',
        title: _conf.default.i18n('vxe.pager.prevJumpTitle'),
        onClick: handlePrevJump
      }, [tagName ? (0, _vue.h)('i', {
        class: ['vxe-pager--jump-more-icon', props.iconJumpMore || _conf.default.icon.PAGER_JUMP_MORE]
      }) : null, (0, _vue.h)('i', {
        class: ['vxe-pager--jump-icon', props.iconJumpPrev || _conf.default.icon.PAGER_JUMP_PREV]
      })]);
    };
    // 向下翻页
    const renderNextJump = tagName => {
      const pageCount = computePageCount.value;
      return (0, _vue.h)(tagName || 'button', {
        class: ['vxe-pager--jump-next', {
          'is--fixed': !tagName,
          'is--disabled': props.currentPage >= pageCount
        }],
        type: 'button',
        title: _conf.default.i18n('vxe.pager.nextJumpTitle'),
        onClick: handleNextJump
      }, [tagName ? (0, _vue.h)('i', {
        class: ['vxe-pager--jump-more-icon', props.iconJumpMore || _conf.default.icon.PAGER_JUMP_MORE]
      }) : null, (0, _vue.h)('i', {
        class: ['vxe-pager--jump-icon', props.iconJumpNext || _conf.default.icon.PAGER_JUMP_NEXT]
      })]);
    };
    // 下一页
    const renderNextPage = () => {
      const pageCount = computePageCount.value;
      return (0, _vue.h)('button', {
        class: ['vxe-pager--next-btn', {
          'is--disabled': props.currentPage >= pageCount
        }],
        type: 'button',
        title: _conf.default.i18n('vxe.pager.nextPageTitle'),
        onClick: handleNextPage
      }, [(0, _vue.h)('i', {
        class: ['vxe-pager--btn-icon', props.iconNextPage || _conf.default.icon.PAGER_NEXT_PAGE]
      })]);
    };
    // 最后一页
    const renderEndPage = () => {
      const pageCount = computePageCount.value;
      return (0, _vue.h)('button', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': props.currentPage >= pageCount
        }],
        type: 'button',
        title: _conf.default.i18n('vxe.pager.endPageTitle'),
        onClick: handleEndPage
      }, [(0, _vue.h)('i', {
        class: ['vxe-pager--btn-icon', props.iconEndPage || _conf.default.icon.PAGER_END]
      })]);
    };
    // 页数
    const renderNumber = showJump => {
      const {
        currentPage,
        pagerCount
      } = props;
      const nums = [];
      const pageCount = computePageCount.value;
      const numList = computeNumList.value;
      const offsetNumber = computeOffsetNumber.value;
      const isOv = pageCount > pagerCount;
      const isLt = isOv && currentPage > offsetNumber + 1;
      const isGt = isOv && currentPage < pageCount - offsetNumber;
      let startNumber = 1;
      if (isOv) {
        if (currentPage >= pageCount - offsetNumber) {
          startNumber = Math.max(pageCount - numList.length + 1, 1);
        } else {
          startNumber = Math.max(currentPage - offsetNumber, 1);
        }
      }
      if (showJump && isLt) {
        nums.push((0, _vue.h)('button', {
          class: 'vxe-pager--num-btn',
          type: 'button',
          onClick: evnt => jumpPageEvent(evnt, 1)
        }, 1), renderPrevJump('span'));
      }
      numList.forEach((item, index) => {
        const number = startNumber + index;
        if (number <= pageCount) {
          nums.push((0, _vue.h)('button', {
            key: number,
            class: ['vxe-pager--num-btn', {
              'is--active': currentPage === number
            }],
            type: 'button',
            onClick: evnt => jumpPageEvent(evnt, number)
          }, number));
        }
      });
      if (showJump && isGt) {
        nums.push(renderNextJump('button'), (0, _vue.h)('button', {
          class: 'vxe-pager--num-btn',
          type: 'button',
          onClick: evnt => jumpPageEvent(evnt, pageCount)
        }, pageCount));
      }
      return (0, _vue.h)('span', {
        class: 'vxe-pager--btn-wrapper'
      }, nums);
    };
    // jumpNumber
    const renderJumpNumber = () => {
      return renderNumber(true);
    };
    // sizes
    const renderSizes = () => {
      const sizeList = computeSizeList.value;
      return (0, _vue.h)(_select.default, {
        class: 'vxe-pager--sizes',
        modelValue: props.pageSize,
        placement: 'top',
        transfer: props.transfer,
        options: sizeList,
        onChange: pageSizeEvent
      });
    };
    // Jump
    const renderJump = isFull => {
      return (0, _vue.h)('span', {
        class: 'vxe-pager--jump'
      }, [isFull ? (0, _vue.h)('span', {
        class: 'vxe-pager--goto-text'
      }, _conf.default.i18n('vxe.pager.goto')) : null, (0, _vue.h)('input', {
        class: 'vxe-pager--goto',
        value: reactData.inpCurrPage,
        type: 'text',
        autocomplete: 'off',
        onInput: jumpInputEvent,
        onKeydown: jumpKeydownEvent,
        onBlur: triggerJumpEvent
      }), isFull ? (0, _vue.h)('span', {
        class: 'vxe-pager--classifier-text'
      }, _conf.default.i18n('vxe.pager.pageClassifier')) : null]);
    };
    // FullJump
    const renderFullJump = () => {
      return renderJump(true);
    };
    // PageCount
    const renderPageCount = () => {
      const pageCount = computePageCount.value;
      return (0, _vue.h)('span', {
        class: 'vxe-pager--count'
      }, [(0, _vue.h)('span', {
        class: 'vxe-pager--separator'
      }), (0, _vue.h)('span', pageCount)]);
    };
    // total
    const renderTotal = () => {
      return (0, _vue.h)('span', {
        class: 'vxe-pager--total'
      }, _conf.default.i18n('vxe.pager.total', [props.total]));
    };
    pagerMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, Object.assign({
          $pager: $xepager,
          $event: evnt
        }, params));
      },
      homePage() {
        handleHomePage();
        return (0, _vue.nextTick)();
      },
      endPage() {
        handleEndPage();
        return (0, _vue.nextTick)();
      },
      prevPage() {
        handlePrevPage();
        return (0, _vue.nextTick)();
      },
      nextPage() {
        handleNextPage();
        return (0, _vue.nextTick)();
      },
      prevJump() {
        handlePrevJump();
        return (0, _vue.nextTick)();
      },
      nextJump() {
        handleNextJump();
        return (0, _vue.nextTick)();
      }
    };
    pagerPrivateMethods = {
      handlePrevPage,
      handleNextPage,
      handlePrevJump,
      handleNextJump
    };
    Object.assign($xepager, pagerMethods, pagerPrivateMethods);
    (0, _vue.watch)(() => props.currentPage, value => {
      reactData.inpCurrPage = value;
    });
    const renderVN = () => {
      const {
        align,
        layouts,
        className
      } = props;
      const childNodes = [];
      const vSize = computeSize.value;
      const pageCount = computePageCount.value;
      if (slots.left) {
        childNodes.push((0, _vue.h)('span', {
          class: 'vxe-pager--left-wrapper'
        }, slots.left({
          $grid: $xegrid
        })));
      }
      layouts.forEach(name => {
        let renderFn;
        switch (name) {
          case 'Home':
            renderFn = renderHomePage;
            break;
          case 'PrevJump':
            renderFn = renderPrevJump;
            break;
          case 'PrevPage':
            renderFn = renderPrevPage;
            break;
          case 'Number':
            renderFn = renderNumber;
            break;
          case 'JumpNumber':
            renderFn = renderJumpNumber;
            break;
          case 'NextPage':
            renderFn = renderNextPage;
            break;
          case 'NextJump':
            renderFn = renderNextJump;
            break;
          case 'End':
            renderFn = renderEndPage;
            break;
          case 'Sizes':
            renderFn = renderSizes;
            break;
          case 'FullJump':
            renderFn = renderFullJump;
            break;
          case 'Jump':
            renderFn = renderJump;
            break;
          case 'PageCount':
            renderFn = renderPageCount;
            break;
          case 'Total':
            renderFn = renderTotal;
            break;
        }
        if (renderFn) {
          childNodes.push(renderFn());
        } else {
          if (process.env.NODE_ENV === 'development') {
            (0, _log.errLog)('vxe.error.notProp', [`layouts -> ${name}`]);
          }
        }
      });
      if (slots.right) {
        childNodes.push((0, _vue.h)('span', {
          class: 'vxe-pager--right-wrapper'
        }, slots.right({
          $grid: $xegrid
        })));
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-pager', className ? _xeUtils.default.isFunction(className) ? className({
          $pager: $xepager
        }) : className : '', {
          [`size--${vSize}`]: vSize,
          [`align--${align}`]: align,
          'is--border': props.border,
          'is--background': props.background,
          'is--perfect': props.perfect,
          'is--hidden': props.autoHidden && pageCount === 1,
          'is--loading': props.loading
        }]
      }, [(0, _vue.h)('div', {
        class: 'vxe-pager--wrapper'
      }, childNodes)]);
    };
    $xepager.renderVN = renderVN;
    return $xepager;
  },
  render() {
    return this.renderVN();
  }
});