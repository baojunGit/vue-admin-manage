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
import { defineComponent, PropType } from 'vue'
export interface ContextProps {
  routeId: number
  routeName: string
  order: number
  path: string
  icon: string
  // 泛型就是在编译期间不确定的类型，在调用时由程序员指定泛型具体指向什么类型
  // 在定义函数或是类时，如果遇到类型不明确就可以使用泛型
  // Array<> 泛型类写法
  children: Array<ContextProps>
}
export default defineComponent({
  name: 'MenuItem',
  props: {
    menuItem: {
      // PropsType 是vue中提供的类型推论
      // 如果不使用，只能知道type是对象类型，里面有什么参数不知道，且多层嵌套有规律的数据可能会有警告信息 如：ts Property 'xxx' does not exist on type 'unknown'.
      // 使用后的好处：不论在 ts 中还是模版中都能获得类型的推断和自动补全等等。
      type: Object as PropType<ContextProps>,
      require: true
    }
  }
})
</script>
