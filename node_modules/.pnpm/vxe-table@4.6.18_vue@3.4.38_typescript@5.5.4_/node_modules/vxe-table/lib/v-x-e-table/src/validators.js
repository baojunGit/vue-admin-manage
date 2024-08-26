"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validators = void 0;
var _store = _interopRequireDefault(require("./store"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validators = exports.validators = new _store.default();
if (process.env.NODE_ENV === 'development') {
  Object.assign(validators, {
    _name: 'Validators'
  });
}