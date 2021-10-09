<template>
  <!-- 还有子菜单 -->
  <el-sub-menu
    v-if="menuItem.children"
    :popper-append-to-body="false"
    :index="menuItem.path"
  >
    <!-- element-plus改为具名插槽 -->
    <template #title>
      <i :class="menuItem.icon"></i>
      {{ menuItem.routeName }}
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
    <template #title>
      <i :class="menuItem.icon"></i>
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
