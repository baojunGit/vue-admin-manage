"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeIcon',
  props: {
    name: String,
    roll: Boolean,
    status: String
  },
  emits: ['click'],
  setup(props, {
    emit
  }) {
    const clickEvent = evnt => {
      emit('click', {
        $event: evnt
      });
    };
    return () => {
      const {
        name,
        roll,
        status
      } = props;
      return (0, _vue.h)('i', {
        class: [`vxe-icon-${name}`, roll ? 'roll' : '', status ? [`theme--${status}`] : ''],
        onClick: clickEvent
      });
    };
  }
});