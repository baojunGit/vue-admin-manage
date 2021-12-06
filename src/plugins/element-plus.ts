import { App, Component } from 'vue'
import {
  ElAffix,
  ElSkeleton,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElScrollbar,
  ElSubMenu,
  ElButton,
  ElCol,
  ElRow,
  ElSpace,
  ElDivider,
  ElCard,
  ElDropdown,
  ElDialog,
  ElMenu,
  ElMenuItem,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElInput,
  ElForm,
  ElFormItem,
  ElLoading,
  ElPopover,
  ElPopper,
  ElTooltip,
  ElDrawer,
  ElPagination,
  ElAlert,
  ElRadioButton,
  ElRadioGroup,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElBadge,
  ElAvatar,
  ElImage
  // ElTabPane
} from 'element-plus'
/* 引入element样式 */
import 'element-plus/dist/index.css'

const component = [
  ElAffix,
  ElSkeleton,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElScrollbar,
  ElSubMenu,
  ElButton,
  ElCol,
  ElRow,
  ElSpace,
  ElDivider,
  ElCard,
  ElDropdown,
  ElDialog,
  ElMenu,
  ElMenuItem,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElInput,
  ElForm,
  ElFormItem,
  ElPopover,
  ElPopper,
  ElTooltip,
  ElDrawer,
  ElPagination,
  ElAlert,
  ElRadioButton,
  ElRadioGroup,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElBadge,
  ElAvatar,
  ElImage
]

const plugins = [ElLoading]

export function useElementPlus(app: App) {
  component.forEach((component: Component) => {
    app.component(component.name, component)
  })
  plugins.forEach(plugin => {
    app.use(plugin)
  })
}
