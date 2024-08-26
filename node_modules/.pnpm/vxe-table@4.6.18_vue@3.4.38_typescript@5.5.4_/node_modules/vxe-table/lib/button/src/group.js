"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _button = _interopRequireDefault(require("./button"));
var _size = require("../../hooks/size");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeButtonGroup',
  props: {
    options: Array,
    mode: String,
    status: String,
    round: Boolean,
    circle: Boolean,
    className: [String, Function],
    disabled: Boolean,
    size: {
      type: String,
      default: () => _conf.default.buttonGroup.size || _conf.default.size
    }
  },
  emits: ['click'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const computeMaps = {};
    const $xebuttongroup = {
      xID,
      props,
      context,
      getComputeMaps: () => computeMaps
    };
    (0, _size.useSize)(props);
    const buttonGroupMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, Object.assign({
          $buttonGroup: $xebuttongroup,
          $event: evnt
        }, params));
      }
    };
    const buttonGroupPrivateMethods = {
      handleClick(params, evnt) {
        const {
          options
        } = props;
        const {
          name
        } = params;
        const option = options ? options.find(item => item.name === name) : null;
        buttonGroupMethods.dispatchEvent('click', Object.assign(Object.assign({}, params), {
          option
        }), evnt);
      }
    };
    Object.assign($xebuttongroup, buttonGroupMethods, buttonGroupPrivateMethods);
    const renderVN = () => {
      const {
        className,
        options
      } = props;
      const defaultSlot = slots.default;
      return (0, _vue.h)('div', {
        class: ['vxe-button-group', className ? _xeUtils.default.isFunction(className) ? className({
          $buttonGroup: $xebuttongroup
        }) : className : '']
      }, defaultSlot ? defaultSlot({}) : options ? options.map((item, index) => {
        return (0, _vue.h)(_button.default, Object.assign({
          key: index
        }, item));
      }) : []);
    };
    $xebuttongroup.renderVN = renderVN;
    (0, _vue.provide)('$xebuttongroup', $xebuttongroup);
    return renderVN;
  }
});