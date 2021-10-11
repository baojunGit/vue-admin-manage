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
      <span>{{ menuItem.routeName }}</span>
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
        {{ item.routeName }}
      </el-menu-item>
    </template>
  </el-sub-menu>
  <!-- 只有一层菜单 -->
  <el-menu-item v-else :index="menuItem.path">
    <i
      :class="menuItem.icon"
      style="font-size: 18px; vertical-align: bottom; margin-right: 8px"
    ></i>
    <template #title>
      {{ menuItem.routeName }}
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MenuItem',
  props: {
    menuItem: {
      type: Object,
      require: true
    }
  }
})
</script>
