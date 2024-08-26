"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFrame = createFrame;
exports.createHtmlPage = createHtmlPage;
exports.getExportBlobByContent = getExportBlobByContent;
exports.handlePrint = handlePrint;
exports.saveLocalFile = exports.readLocalFile = void 0;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _vXETable = require("../../v-x-e-table");
var _dom = require("../../tools/dom");
var _utils = require("../../tools/utils");
var _log = require("../../tools/log");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// 导入
let fileForm;
let fileInput;
// 打印
let printFrame;
// 默认导出或打印的 HTML 样式
const defaultHtmlStyle = 'body{margin:0;padding: 0 1px;color:#333333;font-size:14px;font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu}body *{-webkit-box-sizing:border-box;box-sizing:border-box}.vxe-table{border-collapse:collapse;text-align:left;border-spacing:0}.vxe-table:not(.is--print){table-layout:fixed}.vxe-table,.vxe-table th,.vxe-table td,.vxe-table td{border-color:#D0D0D0;border-style:solid;border-width:0}.vxe-table.is--print{width:100%}.border--default,.border--full,.border--outer{border-top-width:1px}.border--default,.border--full,.border--outer{border-left-width:1px}.border--outer,.border--default th,.border--default td,.border--full th,.border--full td,.border--outer th,.border--inner th,.border--inner td{border-bottom-width:1px}.border--default,.border--outer,.border--full th,.border--full td{border-right-width:1px}.border--default th,.border--full th,.border--outer th{background-color:#f8f8f9}.vxe-table td>div,.vxe-table th>div{padding:.5em .4em}.col--center{text-align:center}.col--right{text-align:right}.vxe-table:not(.is--print) .col--ellipsis>div{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-break:break-all}.vxe-table--tree-node{text-align:left}.vxe-table--tree-node-wrapper{position:relative}.vxe-table--tree-icon-wrapper{position:absolute;top:50%;width:1em;height:1em;text-align:center;-webkit-transform:translateY(-50%);transform:translateY(-50%);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.vxe-table--tree-unfold-icon,.vxe-table--tree-fold-icon{position:absolute;width:0;height:0;border-style:solid;border-width:.5em;border-right-color:transparent;border-bottom-color:transparent}.vxe-table--tree-unfold-icon{left:.3em;top:0;border-left-color:#939599;border-top-color:transparent}.vxe-table--tree-fold-icon{left:0;top:.3em;border-left-color:transparent;border-top-color:#939599}.vxe-table--tree-cell{display:block;padding-left:1.5em}.vxe-table input[type="checkbox"]{margin:0}.vxe-table input[type="checkbox"],.vxe-table input[type="radio"],.vxe-table input[type="checkbox"]+span,.vxe-table input[type="radio"]+span{vertical-align:middle;padding-left:0.4em}';
function createFrame() {
  const frame = document.createElement('iframe');
  frame.className = 'vxe-table--print-frame';
  return frame;
}
function getExportBlobByContent(content, options) {
  return new Blob([content], {
    type: `text/${options.type};charset=utf-8;`
  });
}
function createHtmlPage(opts, content) {
  const {
    style
  } = opts;
  return ['<!DOCTYPE html><html>', '<head>', '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">', `<title>${opts.sheetName}</title>`, '<style media="print">.vxe-page-break-before{page-break-before:always;}.vxe-page-break-after{page-break-after:always;}</style>', `<style>${defaultHtmlStyle}</style>`, style ? `<style>${style}</style>` : '', '</head>', `<body>${content}</body>`, '</html>'].join('');
}
/**
 * 读取本地文件
 * @param {*} options 参数
 */
const readLocalFile = options => {
  const opts = Object.assign({}, options);
  if (!fileForm) {
    fileForm = document.createElement('form');
    fileInput = document.createElement('input');
    fileForm.className = 'vxe-table--file-form';
    fileInput.name = 'file';
    fileInput.type = 'file';
    fileForm.appendChild(fileInput);
    document.body.appendChild(fileForm);
  }
  return new Promise((resolve, reject) => {
    const types = opts.types || [];
    const isAllType = !types.length || types.some(type => type === '*');
    fileInput.multiple = !!opts.multiple;
    fileInput.accept = isAllType ? '' : `.${types.join(', .')}`;
    fileInput.onchange = evnt => {
      const {
        files
      } = evnt.target;
      const file = files[0];
      let errType = '';
      // 校验类型
      if (!isAllType) {
        for (let fIndex = 0; fIndex < files.length; fIndex++) {
          const {
            type
          } = (0, _utils.parseFile)(files[fIndex]);
          if (!_xeUtils.default.includes(types, type)) {
            errType = type;
            break;
          }
        }
      }
      if (!errType) {
        resolve({
          status: true,
          files,
          file
        });
      } else {
        if (opts.message !== false) {
          // 检测弹窗模块
          if (process.env.NODE_ENV === 'development') {
            if (!_vXETable.VXETable.modal) {
              (0, _log.errLog)('vxe.error.reqModule', ['Modal']);
            }
          }
          _vXETable.VXETable.modal.message({
            content: _conf.default.i18n('vxe.error.notType', [errType]),
            status: 'error'
          });
        }
        const params = {
          status: false,
          files,
          file
        };
        reject(params);
      }
    };
    fileForm.reset();
    fileInput.click();
  });
};
exports.readLocalFile = readLocalFile;
function removePrintFrame() {
  if (printFrame) {
    if (printFrame.parentNode) {
      try {
        printFrame.contentDocument.write('');
      } catch (e) {}
      printFrame.parentNode.removeChild(printFrame);
    }
    printFrame = null;
  }
}
function appendPrintFrame() {
  if (!printFrame.parentNode) {
    document.body.appendChild(printFrame);
  }
}
function afterPrintEvent() {
  requestAnimationFrame(removePrintFrame);
}
function handlePrint($xetable, opts, content = '') {
  const {
    beforePrintMethod
  } = opts;
  if (beforePrintMethod) {
    content = beforePrintMethod({
      content,
      options: opts,
      $table: $xetable
    }) || '';
  }
  content = createHtmlPage(opts, content);
  const blob = getExportBlobByContent(content, opts);
  if (_dom.browse.msie) {
    removePrintFrame();
    printFrame = createFrame();
    appendPrintFrame();
    printFrame.contentDocument.write(content);
    printFrame.contentDocument.execCommand('print');
  } else {
    if (!printFrame) {
      printFrame = createFrame();
      printFrame.onload = evnt => {
        if (evnt.target.src) {
          evnt.target.contentWindow.onafterprint = afterPrintEvent;
          evnt.target.contentWindow.print();
        }
      };
    }
    appendPrintFrame();
    printFrame.src = URL.createObjectURL(blob);
  }
}
/**
 * 保存文件到本地
 * @param {*} options 参数
 */
const saveLocalFile = options => {
  const {
    filename,
    type,
    content
  } = options;
  const name = `${filename}.${type}`;
  if (window.Blob) {
    const blob = content instanceof Blob ? content : getExportBlobByContent(_xeUtils.default.toValueString(content), options);
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, name);
    } else {
      const url = URL.createObjectURL(blob);
      const linkElem = document.createElement('a');
      linkElem.target = '_blank';
      linkElem.download = name;
      linkElem.href = url;
      document.body.appendChild(linkElem);
      linkElem.click();
      requestAnimationFrame(() => {
        if (linkElem.parentNode) {
          linkElem.parentNode.removeChild(linkElem);
        }
        URL.revokeObjectURL(url);
      });
    }
    return Promise.resolve();
  }
  return Promise.reject(new Error((0, _log.getLog)('vxe.error.notExp')));
};
exports.saveLocalFile = saveLocalFile;