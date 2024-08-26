"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateQuarter = getDateQuarter;
exports.toStringTimeDate = toStringTimeDate;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function toStringTimeDate(str) {
  if (str) {
    const rest = new Date();
    let h = 0;
    let m = 0;
    let s = 0;
    if (_xeUtils.default.isDate(str)) {
      h = str.getHours();
      m = str.getMinutes();
      s = str.getSeconds();
    } else {
      str = _xeUtils.default.toValueString(str);
      const parses = str.match(/^(\d{1,2})(:(\d{1,2}))?(:(\d{1,2}))?/);
      if (parses) {
        h = _xeUtils.default.toNumber(parses[1]);
        m = _xeUtils.default.toNumber(parses[3]);
        s = _xeUtils.default.toNumber(parses[5]);
      }
    }
    rest.setHours(h);
    rest.setMinutes(m);
    rest.setSeconds(s);
    return rest;
  }
  return new Date('');
}
function getDateQuarter(date) {
  const month = date.getMonth();
  if (month < 3) {
    return 1;
  } else if (month < 6) {
    return 2;
  } else if (month < 9) {
    return 3;
  }
  return 4;
}