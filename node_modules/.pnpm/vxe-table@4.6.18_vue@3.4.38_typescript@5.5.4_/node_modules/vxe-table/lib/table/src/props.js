"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = {
  /** 基本属性 */
  id: String,
  // 数据
  data: Array,
  // 表格的高度
  height: [Number, String],
  // 表格的最小高度
  minHeight: {
    type: [Number, String],
    default: () => _conf.default.table.minHeight
  },
  // 表格的最大高度
  maxHeight: [Number, String],
  // 已废弃，被 column-config.resizable 替换
  resizable: {
    type: Boolean,
    default: () => _conf.default.table.resizable
  },
  // 是否带有斑马纹
  stripe: {
    type: Boolean,
    default: () => _conf.default.table.stripe
  },
  // 是否带有边框
  border: {
    type: [Boolean, String],
    default: () => _conf.default.table.border
  },
  // 是否圆角边框
  round: {
    type: Boolean,
    default: () => _conf.default.table.round
  },
  // 表格的尺寸
  size: {
    type: String,
    default: () => _conf.default.table.size || _conf.default.size
  },
  // 列的宽度是否自撑开（可能会被废弃的参数，不要使用）
  fit: {
    type: Boolean,
    default: () => _conf.default.table.fit
  },
  // 表格是否加载中
  loading: Boolean,
  // 所有的列对其方式
  align: {
    type: String,
    default: () => _conf.default.table.align
  },
  // 所有的表头列的对齐方式
  headerAlign: {
    type: String,
    default: () => _conf.default.table.headerAlign
  },
  // 所有的表尾列的对齐方式
  footerAlign: {
    type: String,
    default: () => _conf.default.table.footerAlign
  },
  // 是否显示表头
  showHeader: {
    type: Boolean,
    default: () => _conf.default.table.showHeader
  },
  // （即将废弃）是否要高亮当前选中行
  highlightCurrentRow: {
    type: Boolean,
    default: () => _conf.default.table.highlightCurrentRow
  },
  // （即将废弃）鼠标移到行是否要高亮显示
  highlightHoverRow: {
    type: Boolean,
    default: () => _conf.default.table.highlightHoverRow
  },
  // （即将废弃）是否要高亮当前选中列
  highlightCurrentColumn: {
    type: Boolean,
    default: () => _conf.default.table.highlightCurrentColumn
  },
  // （即将废弃）鼠标移到列是否要高亮显示
  highlightHoverColumn: {
    type: Boolean,
    default: () => _conf.default.table.highlightHoverColumn
  },
  // （即将废弃）激活单元格编辑时是否高亮显示
  highlightCell: Boolean,
  // 是否显示表尾合计
  showFooter: Boolean,
  // 表尾数据
  footerData: Array,
  // 表尾合计的计算方法
  footerMethod: Function,
  // 给行附加 className
  rowClassName: [String, Function],
  // 给单元格附加 className
  cellClassName: [String, Function],
  // 给表头的行附加 className
  headerRowClassName: [String, Function],
  // 给表头的单元格附加 className
  headerCellClassName: [String, Function],
  // 给表尾的行附加 className
  footerRowClassName: [String, Function],
  // 给表尾的单元格附加 className
  footerCellClassName: [String, Function],
  // 给单元格附加样式
  cellStyle: [Object, Function],
  // 给表头单元格附加样式
  headerCellStyle: [Object, Function],
  // 给表尾单元格附加样式
  footerCellStyle: [Object, Function],
  // 给行附加样式
  rowStyle: [Object, Function],
  // 给表头行附加样式
  headerRowStyle: [Object, Function],
  // 给表尾行附加样式
  footerRowStyle: [Object, Function],
  // 合并指定单元格
  mergeCells: Array,
  // 合并指定的表尾
  mergeFooterItems: Array,
  // 自定义合并行或列的方法
  spanMethod: Function,
  // 表尾合并行或列
  footerSpanMethod: Function,
  // 设置所有内容过长时显示为省略号
  showOverflow: {
    type: [Boolean, String],
    default: () => _conf.default.table.showOverflow
  },
  // 设置表头所有内容过长时显示为省略号
  showHeaderOverflow: {
    type: [Boolean, String],
    default: () => _conf.default.table.showHeaderOverflow
  },
  // 设置表尾所有内容过长时显示为省略号
  showFooterOverflow: {
    type: [Boolean, String],
    default: () => _conf.default.table.showFooterOverflow
  },
  /** 高级属性 */
  // （即将废弃）columnKey 已废弃，被 column-config.useKey 替换
  columnKey: Boolean,
  // （即将废弃）rowKey 已废弃，被 row-config.useKey 替换
  rowKey: Boolean,
  // （即将废弃）rowId 已废弃，被 row-config.keyField 替换
  rowId: {
    type: String,
    default: () => _conf.default.table.rowId
  },
  zIndex: Number,
  emptyText: {
    type: String,
    default: () => _conf.default.table.emptyText
  },
  keepSource: {
    type: Boolean,
    default: () => _conf.default.table.keepSource
  },
  // 是否自动监听父容器变化去更新响应式表格宽高
  autoResize: {
    type: Boolean,
    default: () => _conf.default.table.autoResize
  },
  // 是否自动根据状态属性去更新响应式表格宽高
  syncResize: [Boolean, String, Number],
  // 响应式布局配置项
  resizeConfig: Object,
  // 列配置信息
  columnConfig: Object,
  // 行配置信息
  rowConfig: Object,
  // 列调整配置项
  resizableConfig: Object,
  // 序号配置项
  seqConfig: Object,
  // 排序配置项
  sortConfig: Object,
  // 筛选配置项
  filterConfig: Object,
  // 单选框配置
  radioConfig: Object,
  // 复选框配置项
  checkboxConfig: Object,
  // tooltip 配置项
  tooltipConfig: Object,
  // 导出配置项
  exportConfig: Object,
  // 导入配置项
  importConfig: Object,
  // 打印配置项
  printConfig: Object,
  // 展开行配置项
  expandConfig: Object,
  // 树形结构配置项
  treeConfig: Object,
  // 快捷菜单配置项
  menuConfig: Object,
  // 鼠标配置项
  mouseConfig: Object,
  // 区域配置项
  areaConfig: Object,
  // 按键配置项
  keyboardConfig: Object,
  // 复制粘/贴配置项
  clipConfig: Object,
  // 查找/替换配置项
  fnrConfig: Object,
  // 编辑配置项
  editConfig: Object,
  // 校验配置项
  validConfig: Object,
  // 校验规则配置项
  editRules: Object,
  // 加载中配置项
  loadingConfig: Object,
  // 空内容渲染配置项
  emptyRender: Object,
  // 自定义列配置项
  customConfig: Object,
  // 横向虚拟滚动配置项
  scrollX: Object,
  // 纵向虚拟滚动配置项
  scrollY: Object,
  // （即将废弃）优化相关
  animat: {
    type: Boolean,
    default: () => _conf.default.table.animat
  },
  // （可能会被废弃的参数，不要使用）
  delayHover: {
    type: Number,
    default: () => _conf.default.table.delayHover
  },
  // 额外的参数
  params: Object
};