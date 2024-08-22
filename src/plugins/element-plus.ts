import { App } from 'vue'
import ElementPlus, {
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
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElCheckboxGroup,
  ElBadge,
  ElAvatar,
  ElImage,
  ElTimeline,
  ElTimelineItem,
  ElDatePicker,
  ElTag,
  ElConfigProvider,
  ElSelect,
  ElOption,
  ElTree,
  ElRadioGroup,
  ElRadio,
  ElSwitch,
  ElInputNumber,
  ElColorPicker,
  ElRadioButton
} from 'element-plus'
// 引入element样式
import 'element-plus/dist/index.css'
// 引入Element Plus的中文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const components = [
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
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElCheckboxGroup,
  ElBadge,
  ElAvatar,
  ElImage,
  ElTimeline,
  ElTimelineItem,
  ElDatePicker,
  ElTag,
  ElConfigProvider,
  ElSelect,
  ElOption,
  ElTree,
  ElRadioGroup,
  ElRadio,
  ElSwitch,
  ElInputNumber,
  ElColorPicker,
  ElRadioButton
]

const plugins = [ElLoading]

export const useElementPlus = (app: App) => {
  // 设置Element Plus的语言
  app.use(ElementPlus, {
    locale: zhCn
  })
  for (const component of components) {
    app.component(component.name, component)
  }
  for (const plugin of plugins) {
    app.use(plugin)
  }
}
