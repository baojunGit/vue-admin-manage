"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _modal = _interopRequireDefault(require("../../modal/src/modal"));
var _group = _interopRequireDefault(require("../../radio/src/group"));
var _radio = _interopRequireDefault(require("../../radio/src/radio"));
var _button = _interopRequireDefault(require("../../button/src/button"));
var _utils = require("../../tools/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeTableImportPanel',
  props: {
    defaultOptions: Object,
    storeData: Object
  },
  setup(props) {
    const $xetable = (0, _vue.inject)('$xetable', {});
    const {
      computeImportOpts
    } = $xetable.getComputeMaps();
    const reactData = (0, _vue.reactive)({
      loading: false
    });
    const refFileBtn = (0, _vue.ref)();
    const computeSelectName = (0, _vue.computed)(() => {
      const {
        storeData
      } = props;
      return `${storeData.filename}.${storeData.type}`;
    });
    const computeHasFile = (0, _vue.computed)(() => {
      const {
        storeData
      } = props;
      return storeData.file && storeData.type;
    });
    const computeParseTypeLabel = (0, _vue.computed)(() => {
      const {
        storeData
      } = props;
      const {
        type,
        typeList
      } = storeData;
      if (type) {
        const selectItem = _xeUtils.default.find(typeList, item => type === item.value);
        return selectItem ? _conf.default.i18n(selectItem.label) : '*.*';
      }
      return `*.${typeList.map(item => item.value).join(', *.')}`;
    });
    const clearFileEvent = () => {
      const {
        storeData
      } = props;
      Object.assign(storeData, {
        filename: '',
        sheetName: '',
        type: ''
      });
    };
    const selectFileEvent = () => {
      const {
        storeData,
        defaultOptions
      } = props;
      $xetable.readFile(defaultOptions).then(params => {
        const {
          file
        } = params;
        Object.assign(storeData, (0, _utils.parseFile)(file), {
          file
        });
      }).catch(e => e);
    };
    const showEvent = () => {
      (0, _vue.nextTick)(() => {
        const targetElem = refFileBtn.value;
        if (targetElem) {
          targetElem.focus();
        }
      });
    };
    const cancelEvent = () => {
      const {
        storeData
      } = props;
      storeData.visible = false;
    };
    const importEvent = () => {
      const {
        storeData,
        defaultOptions
      } = props;
      const importOpts = computeImportOpts.value;
      reactData.loading = true;
      $xetable.importByFile(storeData.file, Object.assign({}, importOpts, defaultOptions)).then(() => {
        reactData.loading = false;
        storeData.visible = false;
      }).catch(() => {
        reactData.loading = false;
      });
    };
    const renderVN = () => {
      const {
        defaultOptions,
        storeData
      } = props;
      const selectName = computeSelectName.value;
      const hasFile = computeHasFile.value;
      const parseTypeLabel = computeParseTypeLabel.value;
      return (0, _vue.h)(_modal.default, {
        modelValue: storeData.visible,
        title: _conf.default.i18n('vxe.import.impTitle'),
        className: 'vxe-table-import-popup-wrapper',
        width: 440,
        mask: true,
        lockView: true,
        showFooter: false,
        escClosable: true,
        maskClosable: true,
        loading: reactData.loading,
        'onUpdate:modelValue'(value) {
          storeData.visible = value;
        },
        onShow: showEvent
      }, {
        default: () => {
          return (0, _vue.h)('div', {
            class: 'vxe-export--panel'
          }, [(0, _vue.h)('table', {
            cellspacing: 0,
            cellpadding: 0,
            border: 0
          }, [(0, _vue.h)('tbody', [(0, _vue.h)('tr', [(0, _vue.h)('td', _conf.default.i18n('vxe.import.impFile')), (0, _vue.h)('td', [hasFile ? (0, _vue.h)('div', {
            class: 'vxe-import-selected--file',
            title: selectName
          }, [(0, _vue.h)('span', selectName), (0, _vue.h)('i', {
            class: _conf.default.icon.INPUT_CLEAR,
            onClick: clearFileEvent
          })]) : (0, _vue.h)('button', {
            ref: refFileBtn,
            class: 'vxe-import-select--file',
            onClick: selectFileEvent
          }, _conf.default.i18n('vxe.import.impSelect'))])]), (0, _vue.h)('tr', [(0, _vue.h)('td', _conf.default.i18n('vxe.import.impType')), (0, _vue.h)('td', parseTypeLabel)]), (0, _vue.h)('tr', [(0, _vue.h)('td', _conf.default.i18n('vxe.import.impOpts')), (0, _vue.h)('td', [(0, _vue.h)(_group.default, {
            modelValue: defaultOptions.mode,
            'onUpdate:modelValue'(value) {
              defaultOptions.mode = value;
            }
          }, {
            default: () => storeData.modeList.map(item => (0, _vue.h)(_radio.default, {
              label: item.value,
              content: _conf.default.i18n(item.label)
            }))
          })])])])]), (0, _vue.h)('div', {
            class: 'vxe-export--panel-btns'
          }, [(0, _vue.h)(_button.default, {
            content: _conf.default.i18n('vxe.import.impCancel'),
            onClick: cancelEvent
          }), (0, _vue.h)(_button.default, {
            status: 'primary',
            disabled: !hasFile,
            content: _conf.default.i18n('vxe.import.impConfirm'),
            onClick: importEvent
          })])]);
        }
      });
    };
    return renderVN;
  }
});