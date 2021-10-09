<template>
  <div class="app-sidebar">
    <logo></logo>
    <div :class="{ 'has-logo': showLogo }">
      <!-- wrap-class 包裹层自定义样式类 -->
      <el-scrollbar wrap-class="scroll-wrapper">
        <!-- :collapse="isCollapse" -->
        <!-- unique-opened有且只能展开一个 -->
        <!-- :collapse-transition=false解决折叠卡顿不流畅 -->
        <el-menu
          router
          :default-active="activeMenu"
          unique-opened
          :collapse-transition="false"
          mode="vertical"
        >
          <menu-item
            v-for="menuItem in menuList"
            :menuItem="menuItem"
            :key="menuItem.routeId"
          ></menu-item>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeMount } from 'vue'
import { setSession } from '@/utils/storage'
import { useRoute } from 'vue-router'
import MenuItem from './MenuItem.vue'
import Logo from './Logo.vue'
// mapActions辅助函数
// import { useStore, mapActions } from 'vuex'

export default defineComponent({
  name: 'AppSidebar',
  components: { MenuItem, Logo },
  // 执行时机位于beforeCreate和created之间
  // 不能在setup函数中使用data和methods,
  // VUE为了避免我们错误的使用,将setup函数中this修改成了undefined
  setup() {
    const route = useRoute()
    // const store = useStore()
    const showLogo = ref(setSession.get('logoVal') || 1)

    const menuList = [
      {
        routeId: 1,
        routeName: '首页',
        order: 1,
        path: '/index',
        icon: 'iconfont icon-index'
      },
      {
        routeId: 2,
        routeName: '系统管理',
        order: 1,
        path: '/sys',
        icon: 'iconfont icon-setup',
        children: [
          {
            routeId: 21,
            routeName: '用户管理',
            order: 1,
            path: '/sys/user',
            icon: ''
          },
          {
            routeId: 22,
            routeName: '角色管理',
            order: 2,
            path: '/sys/role',
            icon: ''
          },
          {
            routeId: 23,
            routeName: '菜单管理',
            order: 3,
            path: '/sys/menu',
            icon: ''
          },
          {
            routeId: 24,
            routeName: '字典管理',
            order: 4,
            path: '/sys/dict',
            icon: ''
          }
        ]
      },
      {
        routeId: 3,
        routeName: '编辑管理',
        order: 1,
        path: '/edit',
        icon: 'iconfont icon-edit',
        children: [
          {
            routeId: 31,
            routeName: '文章管理',
            order: 2,
            path: '/edit/article',
            icon: ''
          }
        ]
      },
      {
        routeId: 4,
        routeName: '组件展示',
        order: 1,
        path: '/component',
        icon: 'iconfont icon-app',
        children: [
          {
            routeId: 41,
            routeName: '滚动组件',
            order: 1,
            path: '/conponents/scroll',
            icon: ''
          },
          {
            routeId: 42,
            routeName: '按钮组件',
            order: 2,
            path: '/component/button',
            icon: ''
          },
          {
            routeId: 43,
            routeName: '视频组件',
            order: 3,
            path: '/component/video',
            icon: ''
          }
        ]
      },
      {
        routeId: 5,
        routeName: '错误页面',
        order: 1,
        path: '/error',
        icon: 'iconfont icon-warn',
        children: [
          {
            routeId: 51,
            routeName: '401',
            order: 1,
            path: '/error/401',
            icon: ''
          },
          {
            routeId: 52,
            routeName: '404',
            order: 2,
            path: '/error/404',
            icon: ''
          }
        ]
      },
      {
        routeId: 6,
        routeName: '外链',
        order: 1,
        path: 'https://www.baidu.com/',
        icon: 'iconfont icon-link'
      }
    ]

    // el-menu路由匹配方法
    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    // 在Vue应用被挂载之前，自动执行的函数
    onBeforeMount(() => {
      // 通过dispatch调用vuex模块中的actions方法
      // store.dispatch('app/toggleSidebarAction')
      // 如果需要传入额外的参数, 派发风格变为对象类型
      // store.dispatch({
      //   type: 'app/toggleSidebarAction',
      //   elseValue: 'xxx'
      // })
    })

    return {
      showLogo,
      activeMenu,
      // isCollapse: computed(() => !pureApp.getSidebarStatus)
      menuList
    }
  }
})
</script>
