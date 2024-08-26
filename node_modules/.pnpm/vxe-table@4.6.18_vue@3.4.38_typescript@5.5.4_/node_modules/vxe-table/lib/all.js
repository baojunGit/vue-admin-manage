"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  install: true
};
exports.install = install;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _vXETable = require("./v-x-e-table");
Object.keys(_vXETable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _vXETable[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _vXETable[key];
    }
  });
});
var _theme = require("./v-x-e-table/src/theme");
var _filter = require("./filter");
Object.keys(_filter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _filter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _filter[key];
    }
  });
});
var _menu = require("./menu");
Object.keys(_menu).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _menu[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _menu[key];
    }
  });
});
var _edit = require("./edit");
Object.keys(_edit).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _edit[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _edit[key];
    }
  });
});
var _export = require("./export");
Object.keys(_export).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _export[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _export[key];
    }
  });
});
var _keyboard = require("./keyboard");
Object.keys(_keyboard).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _keyboard[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _keyboard[key];
    }
  });
});
var _validator = require("./validator");
Object.keys(_validator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _validator[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _validator[key];
    }
  });
});
var _custom = require("./custom");
Object.keys(_custom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _custom[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _custom[key];
    }
  });
});
var _icon = require("./icon");
Object.keys(_icon).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _icon[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _icon[key];
    }
  });
});
var _column = require("./column");
Object.keys(_column).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _column[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _column[key];
    }
  });
});
var _colgroup = require("./colgroup");
Object.keys(_colgroup).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _colgroup[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _colgroup[key];
    }
  });
});
var _grid = require("./grid");
Object.keys(_grid).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _grid[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _grid[key];
    }
  });
});
var _toolbar = require("./toolbar");
Object.keys(_toolbar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _toolbar[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _toolbar[key];
    }
  });
});
var _pager = require("./pager");
Object.keys(_pager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _pager[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pager[key];
    }
  });
});
var _checkbox = require("./checkbox");
Object.keys(_checkbox).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _checkbox[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _checkbox[key];
    }
  });
});
var _checkboxGroup = require("./checkbox-group");
Object.keys(_checkboxGroup).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _checkboxGroup[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _checkboxGroup[key];
    }
  });
});
var _radio = require("./radio");
Object.keys(_radio).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _radio[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _radio[key];
    }
  });
});
var _radioGroup = require("./radio-group");
Object.keys(_radioGroup).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _radioGroup[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _radioGroup[key];
    }
  });
});
var _radioButton = require("./radio-button");
Object.keys(_radioButton).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _radioButton[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _radioButton[key];
    }
  });
});
var _input = require("./input");
Object.keys(_input).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _input[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _input[key];
    }
  });
});
var _textarea = require("./textarea");
Object.keys(_textarea).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _textarea[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _textarea[key];
    }
  });
});
var _button = require("./button");
Object.keys(_button).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _button[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _button[key];
    }
  });
});
var _buttonGroup = require("./button-group");
Object.keys(_buttonGroup).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _buttonGroup[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _buttonGroup[key];
    }
  });
});
var _modal = require("./modal");
Object.keys(_modal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _modal[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _modal[key];
    }
  });
});
var _drawer = require("./drawer");
Object.keys(_drawer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _drawer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _drawer[key];
    }
  });
});
var _tooltip = require("./tooltip");
Object.keys(_tooltip).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tooltip[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tooltip[key];
    }
  });
});
var _form = require("./form");
Object.keys(_form).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _form[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _form[key];
    }
  });
});
var _formItem = require("./form-item");
Object.keys(_formItem).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _formItem[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _formItem[key];
    }
  });
});
var _formGather = require("./form-gather");
Object.keys(_formGather).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _formGather[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _formGather[key];
    }
  });
});
var _select = require("./select");
Object.keys(_select).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _select[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _select[key];
    }
  });
});
var _optgroup = require("./optgroup");
Object.keys(_optgroup).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _optgroup[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _optgroup[key];
    }
  });
});
var _option = require("./option");
Object.keys(_option).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _option[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _option[key];
    }
  });
});
var _switch = require("./switch");
Object.keys(_switch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _switch[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _switch[key];
    }
  });
});
var _list = require("./list");
Object.keys(_list).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _list[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _list[key];
    }
  });
});
var _pulldown = require("./pulldown");
Object.keys(_pulldown).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _pulldown[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pulldown[key];
    }
  });
});
var _table = require("./table");
Object.keys(_table).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _table[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _table[key];
    }
  });
});
var _zhCN = _interopRequireDefault(require("./locale/lang/zh-CN"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// 按需加载的组件
const components = [
// 功能模块
_filter.VxeTableFilterModule, _menu.VxeTableMenuModule, _edit.VxeTableEditModule, _export.VxeTableExportModule, _keyboard.VxeTableKeyboardModule, _validator.VxeTableValidatorModule, _custom.VxeTableCustomModule,
// 可选组件
_icon.VxeIcon, _column.VxeColumn, _colgroup.VxeColgroup, _grid.VxeGrid, _toolbar.VxeToolbar, _pager.VxePager, _checkbox.VxeCheckbox, _checkboxGroup.VxeCheckboxGroup, _radio.VxeRadio, _radioGroup.VxeRadioGroup, _radioButton.VxeRadioButton, _input.VxeInput, _textarea.VxeTextarea, _button.VxeButton, _buttonGroup.VxeButtonGroup, _modal.VxeModal, _drawer.VxeDrawer, _tooltip.VxeTooltip, _form.VxeForm, _formItem.VxeFormItem, _formGather.VxeFormGather, _select.VxeSelect, _optgroup.VxeOptgroup, _option.VxeOption, _switch.VxeSwitch, _list.VxeList, _pulldown.VxePulldown,
// 核心
_table.VxeTable];
// 默认中文
(0, _vXETable.setConfig)({
  i18n: (key, args) => _xeUtils.default.toFormatString(_xeUtils.default.get(_zhCN.default, key), args)
});
// 默认安装
function install(app, options) {
  if (_xeUtils.default.isPlainObject(options)) {
    (0, _vXETable.setConfig)(options);
    if (options.theme) {
      (0, _theme.setTheme)(options.theme);
    }
  }
  components.forEach(component => component.install(app));
}

// Table module

// Components