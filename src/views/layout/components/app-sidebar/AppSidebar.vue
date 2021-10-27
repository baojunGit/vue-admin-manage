<template>
  <div class="app-sidebar">
    <logo></logo>
    <!-- wrap-class 包裹层自定义样式类 -->
    <el-scrollbar wrap-class="scroll-wrapper">
      <!-- unique-opened有且只能展开一个 -->
      <!-- :collapse="isCollapse" 是否收缩侧边菜单-->
      <!-- :collapse-transition=false解决折叠卡顿不流畅 -->
      <!-- router 会默认匹配路由，执行激活菜单回调 -->
      <el-menu
        :default-active="activeMenu"
        unique-opened
        mode="vertical"
        :collapse="isCollapse"
        :collapse-transition="false"
        @select="selectMenuItem"
      >
        <menu-item
          v-for="menuItem in menuList"
          :key="menuItem.routeId"
          :menuItem="menuItem"
        ></menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { handleSession } from '@/utils/storage'
import { useStore } from 'vuex'
import MenuItem from './components/MenuItem.vue'
import Logo from './components/Logo.vue'

export default defineComponent({
  name: 'AppSidebar',
  components: { MenuItem, Logo },
  // 执行时机位于beforeCreate和created之间
  // 不能在setup函数中使用data和methods,
  // VUE为了避免我们错误的使用,将setup函数中this修改成了undefined
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const showLogo = ref(handleSession.get('logoVal') || 1)

    const menuList = [
      {
        routeId: 1,
        routeName: 'message.index',
        order: 1,
        name: 'index',
        icon: 'iconfont icon-index'
      },
      {
        routeId: 2,
        routeName: 'message.sysManage',
        order: 1,
        name: 'sys',
        icon: 'iconfont icon-setup',
        children: [
          {
            routeId: 21,
            routeName: 'message.userManage',
            order: 1,
            name: 'user',
            icon: ''
          },
          {
            routeId: 22,
            routeName: 'message.permission',
            order: 2,
            name: 'role',
            icon: ''
          },
          {
            routeId: 23,
            routeName: 'message.menuManage',
            order: 3,
            name: 'menu',
            icon: ''
          },
          {
            routeId: 24,
            routeName: 'message.dictManage',
            order: 4,
            name: 'dict',
            icon: ''
          }
        ]
      },
      {
        routeId: 3,
        routeName: 'message.editManage',
        order: 1,
        name: 'edit',
        icon: 'iconfont icon-edit',
        children: [
          {
            routeId: 31,
            routeName: 'message.articleManage',
            order: 2,
            name: 'article',
            icon: ''
          }
        ]
      },
      {
        routeId: 4,
        routeName: 'message.caseManage',
        order: 1,
        name: 'case',
        icon: 'iconfont icon-app',
        children: [
          {
            routeId: 41,
            routeName: 'message.scrollCase',
            order: 1,
            name: 'scroll',
            icon: ''
          },
          {
            routeId: 42,
            routeName: 'message.buttonCase',
            order: 2,
            name: 'button',
            icon: ''
          },
          {
            routeId: 43,
            routeName: 'message.videoCase',
            order: 3,
            name: 'video',
            icon: ''
          }
        ]
      },
      {
        routeId: 5,
        routeName: 'message.error',
        order: 1,
        name: 'error',
        icon: 'iconfont icon-warn',
        children: [
          {
            routeId: 51,
            routeName: 'message.hsfourZeroOne',
            order: 1,
            name: '401',
            icon: ''
          },
          {
            routeId: 52,
            routeName: 'message.hsfourZeroFour',
            order: 2,
            name: '404',
            icon: ''
          }
        ]
      },
      {
        routeId: 6,
        routeName: 'message.externalLink',
        order: 1,
        name: 'https://github.com/baojunGit/vue3-admin-manage',
        icon: 'iconfont icon-link'
      }
    ]

    // el-menu菜单激活回调
    // index: 选中菜单项的 index, indexPath: 选中菜单项的 index集合, el: 选中路由对象信息,
    // el: vue-router 的返回值（如果 router 为 true）
    const selectMenuItem = (index, indexPath, el) => {
      console.log(route.meta.title)
      // 传参的键和值
      const query = {}
      const params = {}
      el?.route?.parameters &&
        el.route.parameters.forEach(item => {
          if (item.type === 'query') {
            query[item.key] = item.value
          } else {
            params[item.key] = item.value
          }
        })
      if (index === route.name) return
      if (index.indexOf('http://') > -1 || index.indexOf('https://') > -1) {
        window.open(index)
      } else {
        router.push({ name: index, query, params })
      }
    }

    // el-menu路由匹配方法
    const activeMenu = computed(() => {
      const { meta, name } = route
      // 可以在meta里添加信息，重置高亮的路由，比如要让父路由高亮
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return name
    })

    return {
      showLogo,
      activeMenu,
      menuList,
      isCollapse: computed(() => !store.state.app.sidebar.opened),
      selectMenuItem
    }
  }
})
</script>
