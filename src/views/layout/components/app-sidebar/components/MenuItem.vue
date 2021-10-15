<template>
  <!-- <el-menu>里面直接嵌套的是<el-menu-item>,<el-submenu>,<el-menu-item-group>之一，且里面的样式和标签类型都要一致才能生效 -->
  <!-- .el-menu--collapse>.el-sub-menu>.el-sub-menu__title span  -->
  <!-- popper-append-to-body	是否将弹出菜单插入至 body 元素, 后台管理项目侧边栏都不加 -->
  <!-- 还有子菜单 -->
  <el-sub-menu v-if="menuItem.children" :index="menuItem.path">
    <!-- element-plus改为具名插槽 -->
    <template #title>
      <i
        :class="menuItem.icon"
        style="font-size: 18px; vertical-align: bottom; margin-right: 8px"
      ></i>
      <span>{{ $t(menuItem.routeName) }}</span>
    </template>
    <template v-for="item in menuItem.children" :index="item.routeId">
      <!-- 判断子菜单下面是否还有三级和四级菜单 -->
      <!-- 在组件中调用自己，需要设置组件名，直接使用 -->
      <menu-item
        v-if="item.children"
        :menuItem="item"
        :key="item.routeId"
      ></menu-item>
      <el-menu-item v-else :index="item.path" :key="item.routeId">
        {{ $t(item.routeName) }}
      </el-menu-item>
    </template>
  </el-sub-menu>
  <!-- 只有一层菜单，但是element不支持跳转新窗口链接的功能，只能自己实现 -->
  <el-menu-item v-else :index="menuItem.path">
    <i
      :class="menuItem.icon"
      style="font-size: 18px; vertical-align: bottom; margin-right: 8px"
    ></i>
    <template #title>
      {{ $t(menuItem.routeName) }}
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
// import { isUrl } from '@/utils/is'
// 需要安装 npm install path --save
// import path from 'path'
export default defineComponent({
  name: 'MenuItem',
  props: {
    menuItem: {
      type: Object,
      require: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    // 优化if判断: 0: 无子菜单， 1：有1个子菜单， 2：显示上下级子菜单
    // const showMenuType = computed(() => {
    //   if (
    //     menuItem.children &&
    //     (menuItem.children.length > 1 ||
    //       (menuItem.children.length === 1 && menuItem.isShow))
    //   ) {
    //     return 2
    //   } else if (
    //     menuItem.children &&
    //     menuItem.children.length === 1 &&
    //     !menuItem.isShow
    //   ) {
    //     return 1
    //   } else {
    //     return 0
    //   }
    // })

    const showingChildNumber = computed(() => {
      if (props.menuItem.children) {
        const showingChildren = props.menuItem.children.filter(item => {
          if (item.meta && item.meta.hidden) {
            return false
          } else {
            return true
          }
        })
        return showingChildren.length
      }
      return 0
    })

    const theOnlyOneChild = computed(() => {
      if (showingChildNumber.value > 1) {
        return null
      }
      if (props.menuItem.children) {
        for (const child of props.menuItem.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      // If there is no children, return itself with path removed,
      // because this.basePath already conatins item's path information
      return { ...props.menuItem, path: '' }
    })

    // const resolvePath = (routePath: string) => {
    //   if (isUrl(routePath)) {
    //     return routePath
    //   }
    //   if (isUrl(props.basePath)) {
    //     return props.basePath
    //   }
    //   // @ts-ignore
    //   // 从后向前，若字符以 / 开头，不会拼接到前面的路径；若以 …/ 开头，拼接前面的路径，且不含最后一节路径；
    //   // 若连续出现多个…/…/…或者…/…则忽略前方…个路径名进行拼接；若以 ./ 开头 或者没有符号 则拼接前面路径；
    //   return path.resolve(props.basePath, routePath)
    // }

    return { showingChildNumber, theOnlyOneChild }
  }
})
</script>
