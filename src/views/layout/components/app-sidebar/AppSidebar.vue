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
          :key="menuItem.id"
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
        id: 1,
        name: 'index',
        title: 'message.index',
        order: 1,
        icon: 'iconfont icon-index'
      },
      {
        id: 2,
        name: 'sys',
        title: 'message.sysManage',
        order: 1,
        icon: 'iconfont icon-setup',
        children: [
          {
            id: 21,
            name: 'user',
            title: 'message.userManage',
            order: 1,
            icon: ''
          },
          {
            id: 22,
            name: 'role',
            title: 'message.permission',
            order: 2,
            icon: ''
          },
          {
            id: 23,
            name: 'menu',
            title: 'message.menuManage',
            order: 3,
            icon: ''
          },
          {
            id: 24,
            name: 'dict',
            title: 'message.dictManage',
            order: 4,
            icon: ''
          }
        ]
      },
      {
        id: 3,
        name: 'edit',
        title: 'message.editManage',
        order: 1,
        icon: 'iconfont icon-edit',
        children: [
          {
            id: 31,
            name: 'article',
            title: 'message.articleManage',
            order: 2,
            icon: ''
          }
        ]
      },
      {
        id: 4,
        name: 'case',
        title: 'message.caseManage',
        order: 1,
        icon: 'iconfont icon-app',
        children: [
          {
            id: 41,
            name: 'scroll',
            title: 'message.scrollCase',
            order: 1,
            icon: ''
          },
          {
            id: 42,
            name: 'button',
            title: 'message.buttonCase',
            order: 2,
            icon: ''
          },
          {
            id: 43,
            name: 'video',
            title: 'message.videoCase',
            order: 3,
            icon: ''
          }
        ]
      },
      {
        id: 5,
        name: 'error',
        title: 'message.error',
        order: 1,
        icon: 'iconfont icon-warn',
        children: [
          {
            id: 51,
            title: 'message.hsfourZeroOne',
            order: 1,
            name: '401',
            icon: ''
          },
          {
            id: 52,
            name: '404',
            title: 'message.hsfourZeroFour',
            order: 2,
            icon: ''
          }
        ]
      },
      {
        id: 6,
        name: '',
        title: 'message.externalLink',
        order: 1,
        icon: 'iconfont icon-link'
      }
    ]

    // el-menu菜单激活回调
    // index: 选中菜单项的 index, indexPath: 选中菜单项的 index集合, el: 选中路由对象信息,
    // el: vue-router 的返回值（如果 router 为 true）
    const selectMenuItem = (index, indexPath, el) => {
      // console.log(index)
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
