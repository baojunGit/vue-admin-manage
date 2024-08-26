'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index.js');
var tree = require('./src/tree.js');
var install = require('../../utils/vue/install.js');

const ElTree = install.withInstall(tree["default"]);

exports.ElTree = ElTree;
exports["default"] = ElTree;
//# sourceMappingURL=index.js.map
