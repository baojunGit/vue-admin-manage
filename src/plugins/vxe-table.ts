// 也要安装xe-utils工具库，vxe-table依赖它
import { App } from 'vue'
import { VxeUI, VxeLoading, VxeTooltip } from 'vxe-pc-ui'
import { VxeTable, VxeColumn, VxeColgroup, VxeToolbar } from 'vxe-table'

// 导入主题变量，也可以重写主题变量
import 'vxe-table/styles/cssvar.scss'
import 'vxe-pc-ui/styles/cssvar.scss'

// 导入默认的语言
import zhCN from 'vxe-pc-ui/lib/language/zh-CN'
VxeUI.setI18n('zh-CN', zhCN)
VxeUI.setLanguage('zh-CN')

// vxe-table全局配置项
// VxeTable.setConfig({
// 	// version: 0,
// 	// zIndex: 9999
// 	// table: {
// 	//   autoResize: true
// 	// }
// });

const lazyVxeUI = [VxeLoading, VxeTooltip]

const lazyVxeTable = [VxeTable, VxeColumn, VxeColgroup, VxeToolbar]

export const useVxeTable = (app: App) => {
  for (const plugin of lazyVxeUI) {
    app.use(plugin)
  }
  for (const plugin of lazyVxeTable) {
    app.use(plugin)
  }
}
