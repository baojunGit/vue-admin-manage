<template>
  <div class="app-sidebar">
    <logo></logo>
    <!-- wrap-class 包裹层自定义样式类 -->
    <el-scrollbar wrap-class="scroll-wrapper">
      <!-- unique-opened有且只能展开一个 -->
      <!-- :collapse="isCollapse" 是否收缩侧边菜单-->
      <!-- :collapse-transition=false解决折叠卡顿不流畅 -->
      <el-menu
        router
        :default-active="activeMenu"
        unique-opened
        mode="vertical"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <menu-item
          v-for="menuItem in menuList"
          :menuItem="menuItem"
          :key="menuItem.routeId"
        ></menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeMount } from 'vue'
import { handleSession } from '@/utils/storage'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import MenuItem from './components/MenuItem.vue'
import Logo from './components/Logo.vue'
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
    const store = useStore()

    const showLogo = ref(handleSession.get('logoVal') || 1)

    const menuList = [
      {
        routeId: 1,
        routeName: 'message.index',
        order: 1,
        path: '/index',
        icon: 'iconfont icon-index'
      },
      {
        routeId: 2,
        routeName: 'message.sysManage',
        order: 1,
        path: '/sys',
        icon: 'iconfont icon-setup',
        children: [
          {
            routeId: 21,
            routeName: 'message.userManage',
            order: 1,
            path: '/sys/user',
            icon: ''
          },
          {
            routeId: 22,
            routeName: 'message.permission',
            order: 2,
            path: '/sys/role',
            icon: ''
          },
          {
            routeId: 23,
            routeName: 'message.menuManage',
            order: 3,
            path: '/sys/menu',
            icon: ''
          },
          {
            routeId: 24,
            routeName: 'message.dictManage',
            order: 4,
            path: '/sys/dict',
            icon: ''
          }
        ]
      },
      {
        routeId: 3,
        routeName: 'message.editManage',
        order: 1,
        path: '/edit',
        icon: 'iconfont icon-edit',
        children: [
          {
            routeId: 31,
            routeName: 'message.articleManage',
            order: 2,
            path: '/edit/article',
            icon: ''
          }
        ]
      },
      {
        routeId: 4,
        routeName: 'message.caseManage',
        order: 1,
        path: '/case',
        icon: 'iconfont icon-app',
        children: [
          {
            routeId: 41,
            routeName: 'message.scrollCase',
            order: 1,
            path: '/case/scroll',
            icon: ''
          },
          {
            routeId: 42,
            routeName: 'message.buttonCase',
            order: 2,
            path: '/case/button',
            icon: ''
          },
          {
            routeId: 43,
            routeName: 'message.videoCase',
            order: 3,
            path: '/case/video',
            icon: ''
          }
        ]
      },
      {
        routeId: 5,
        routeName: 'message.error',
        order: 1,
        path: '/error',
        icon: 'iconfont icon-warn',
        children: [
          {
            routeId: 51,
            routeName: 'message.hsfourZeroOne',
            order: 1,
            path: '/error/401',
            icon: ''
          },
          {
            routeId: 52,
            routeName: 'message.hsfourZeroFour',
            order: 2,
            path: '/error/404',
            icon: ''
          }
        ]
      },
      {
        routeId: 6,
        routeName: 'message.externalLink',
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
      menuList,
      isCollapse: computed(() => !store.state.app.sidebar.opened)
    }
  }
})
</script>
