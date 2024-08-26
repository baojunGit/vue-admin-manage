"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.print = exports.default = exports.VxeTableExportModule = exports.Export = void 0;
Object.defineProperty(exports, "readFile", {
  enumerable: true,
  get: function () {
    return _util.readLocalFile;
  }
});
Object.defineProperty(exports, "saveFile", {
  enumerable: true,
  get: function () {
    return _util.saveLocalFile;
  }
});
var _vXETable = require("../v-x-e-table");
var _exportPanel = _interopRequireDefault(require("./src/export-panel"));
var _importPanel = _interopRequireDefault(require("./src/import-panel"));
var _hook = _interopRequireDefault(require("./src/hook"));
var _util = require("./src/util");
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const print = options => {
  const opts = Object.assign({}, options, {
    type: 'html'
  });
  (0, _util.handlePrint)(null, opts, opts.content);
};
exports.print = print;
const VxeTableExportModule = exports.VxeTableExportModule = {
  ExportPanel: _exportPanel.default,
  ImportPanel: _importPanel.default,
  install(app) {
    _vXETable.VXETable.saveFile = _util.saveLocalFile;
    _vXETable.VXETable.readFile = _util.readLocalFile;
    _vXETable.VXETable.print = print;
    _vXETable.VXETable.setConfig({
      export: {
        types: {
          csv: 0,
          html: 0,
          xml: 0,
          txt: 0
        }
      }
    });
    _vXETable.VXETable.hooks.add('$tableExport', _hook.default);
    app.component(_exportPanel.default.name, _exportPanel.default);
    app.component(_importPanel.default.name, _importPanel.default);
  }
};
const Export = exports.Export = VxeTableExportModule;
_dynamics.dynamicApp.component(_exportPanel.default.name, _exportPanel.default);
_dynamics.dynamicApp.component(_importPanel.default.name, _importPanel.default);
var _default = exports.default = VxeTableExportModule;