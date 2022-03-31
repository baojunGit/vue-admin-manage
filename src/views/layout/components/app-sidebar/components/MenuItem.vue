<template>
  <!-- <el-menu>里面直接嵌套的是<el-menu-item>,<el-submenu>,<el-menu-item-group>之一，且里面的样式和标签类型都要一致才能生效 -->
  <!-- .el-menu--collapse>.el-sub-menu>.el-sub-menu__title span  -->
  <!-- popper-append-to-body	是否将弹出菜单插入至 body 元素, 后台管理项目侧边栏都不加 -->
  <!-- 只有一层菜单，但是element不支持跳转新窗口链接的功能，只能自己实现 -->
  <!-- 多层菜单还有多个子菜单 -->
  <el-sub-menu v-if="showMenuType === 2" :index="menuItem.name">
    <!-- element-plus改为具名插槽 -->
    <template #title>
      <i
        :class="menuItem.meta.icon"
        style="font-size: 18px; vertical-align: bottom; margin-right: 8px"
      ></i>
      <span>{{ translateTitle(menuItem.meta.title) }}</span>
    </template>
    <template v-for="i in menuItem.children" :key="i.id">
      <!-- 判断子菜单下面是否还有三级和四级菜单 -->
      <!-- 在组件中调用自己，需要设置组件名，直接使用 -->
      <!-- v-if 加key值的作用 vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染 -->
      <menu-item v-if="i.children" :menu-item="i"></menu-item>
      <el-menu-item v-else :index="i.name">
        {{ translateTitle(i.meta.title) }}
      </el-menu-item>
    </template>
  </el-sub-menu>
  <el-menu-item
    v-else-if="showMenuType === 1"
    :index="menuItem.children[0].name"
  >
    <i
      :class="menuItem.children[0].meta.icon"
      style="font-size: 18px; vertical-align: bottom; margin-right: 8px"
    ></i>
    <template #title>
      {{ translateTitle(menuItem.children[0].meta.title) }}
    </template>
  </el-menu-item>
  <el-menu-item v-else :index="menuItem.name">
    <i
      :class="menuItem.meta.icon"
      style="font-size: 18px; vertical-align: bottom; margin-right: 8px"
    ></i>
    <template #title>
      {{ translateTitle(menuItem.meta.title) }}
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { defineProps, PropType, computed, toRefs } from 'vue'
import { translateTitle } from '@/locale'

// 定义值的写法，能有类型提示
interface ContextProps {
  id: number
  path: string
  name: string
  component: unknown
  redirect?: string
  meta: {
    title: string
    icon: string
    frameSrc?: string
    hideInMenu?: boolean
    hideInBread?: boolean
    noCloseTab?: boolean
  }

  // 泛型就是在编译期间不确定的类型，在调用时由程序员指定泛型具体指向什么类型
  // 在定义函数或是类时，如果遇到类型不明确就可以使用泛型
  // Array<> 泛型类写法
  children?: Array<ContextProps>
}

const props = defineProps({
  menuItem: {
    // PropsType 是vue中提供的类型推论
    // 如果不使用，只能知道type是对象类型，里面有什么参数不知道，且多层嵌套有规律的数据可能会有警告信息 如：ts Property 'xxx' does not exist on type 'unknown'.
    // 使用后的好处：不论在 ts 中还是模版中都能获得类型的推断和自动补全等等。
    type: Object as PropType<ContextProps>,
    require: true,
    default: () => {}
  }
})

// 使用 `toRefs` 创建对prop的 `menuItem` property 的响应式引用
const { menuItem } = toRefs(props)
// 不需要数据响应，只要初始值用于显示
// 添加类型断言 as 告诉程序：“相信我，我知道自己在干什么” , 解决如下报错Property 'children' does not exist on type 'unknown'.
const item = menuItem.value as ContextProps

// 优化菜单类型 if结构
// 0: 无子菜单， 1：只有1个子菜单， 2：多个子菜单
const showMenuType = computed(() => {
  if (item.children && item.children.length > 1) {
    return 2
  } else if (item.children && item.children.length === 1) {
    return 1
  } else {
    return 0
  }
})
</script>
