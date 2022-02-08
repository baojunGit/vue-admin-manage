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
        :collapse="!opened"
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

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/store1/modules/app'
import MenuItem from './components/MenuItem.vue'
import Logo from './components/Logo.vue'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()

const { opened } = storeToRefs(appStore)

const indexRoute = [
  {
    id: 1,
    name: 'index',
    frameSrc: '',
    title: 'message.index',
    sort: 1,
    icon: 'iconfont icon-index',
    children: null
  }
]

const backRoute = [
  {
    id: 2,
    name: 'sys',
    frameSrc: '',
    title: 'message.sysManage',
    sort: 2,
    icon: 'iconfont icon-setup',
    children: [
      {
        id: 21,
        name: 'user',
        frameSrc: '',
        title: 'message.userManage',
        sort: 1,
        icon: '',
        children: null
      },
      {
        id: 22,
        name: 'role',
        frameSrc: '',
        title: 'message.permission',
        sort: 2,
        icon: '',
        children: null
      },
      {
        id: 23,
        name: 'menu',
        frameSrc: '',
        title: 'message.menuManage',
        sort: 3,
        icon: '',
        children: null
      },
      {
        id: 24,
        name: 'dict',
        frameSrc: '',
        title: 'message.dictManage',
        sort: 4,
        icon: '',
        children: null
      }
    ]
  },
  {
    id: 3,
    name: 'edit',
    frameSrc: '',
    title: 'message.editManage',
    sort: 3,
    icon: 'iconfont icon-edit',
    children: [
      {
        id: 31,
        name: 'article',
        frameSrc: '',
        title: 'message.articleManage',
        sort: 2,
        icon: 'iconfont icon-edit',
        children: null
      }
    ]
  },
  {
    id: 4,
    name: 'case',
    frameSrc: '',
    title: 'message.caseManage',
    sort: 4,
    icon: 'iconfont icon-app',
    children: [
      {
        id: 41,
        name: 'scroll',
        frameSrc: '',
        title: 'message.scrollCase',
        sort: 1,
        icon: '',
        children: null
      },
      {
        id: 42,
        name: 'button',
        frameSrc: '',
        title: 'message.buttonCase',
        sort: 2,
        icon: '',
        children: null
      },
      {
        id: 43,
        name: 'video',
        frameSrc: '',
        title: 'message.videoCase',
        sort: 3,
        icon: '',
        children: null
      },
      {
        id: 44,
        name: 'table',
        frameSrc: '',
        title: 'message.tableCase',
        sort: 4,
        icon: '',
        children: null
      },
      {
        id: 45,
        name: 'splitPane',
        frameSrc: '',
        title: 'message.splitPane',
        sort: 5,
        icon: '',
        children: null
      }
    ]
  },
  {
    id: 5,
    name: 'drag',
    frameSrc: '',
    title: 'message.drag',
    sort: 1,
    icon: 'iconfont icon-Group',
    children: [
      {
        id: 51,
        name: 'table-drag',
        frameSrc: '',
        title: 'message.tableDrag',
        sort: 1,
        icon: '',
        children: null
      },
      {
        id: 52,
        name: 'list-drag',
        frameSrc: '',
        title: 'message.listDrag',
        sort: 2,
        icon: '',
        children: null
      }
    ]
  },
  {
    id: 6,
    name: 'error',
    frameSrc: '',
    title: 'message.error',
    sort: 6,
    icon: 'iconfont icon-warn',
    children: [
      {
        id: 61,
        name: '401',
        frameSrc: '',
        title: 'message.hsfourZeroOne',
        sort: 1,

        icon: '',
        children: null
      },
      {
        id: 62,
        name: '404',
        frameSrc: '',
        title: 'message.hsfourZeroFour',
        sort: 2,
        icon: '',
        children: null
      }
    ]
  },
  {
    id: 7,
    name: 'https://www.baidu.com/',
    frameSrc: '',
    title: 'message.externalLink',
    sort: 6,
    icon: 'iconfont icon-link',
    children: null
  }
]

const menuList = indexRoute.concat(backRoute)

// el-menu菜单激活回调
// index: 选中菜单项的 index, indexPath: 选中菜单项的 index集合, el: 选中路由对象信息,
// el: vue-router 的返回值（如果 router 为 true）
const selectMenuItem = (index, indexPath, el) => {
  // console.log(index)
  // console.log(route.name)
  // 传参的键和值
  const query = {}
  const params = {}
  // el &&el.route &&el.route.parameters 用可选链写法代替
  el?.route?.parameters &&
    el.route.parameters.forEach(item => {
      if (item.type === 'query') {
        query[item.key] = item.value
      } else {
        params[item.key] = item.value
      }
    })
  if (index === route.name) return
  // 判断是否网址链接，如果是就打开新窗口
  if (/http(s)?:/.test(index)) {
    window.open(index)
    // 不是就跳转到固定的路由
  } else {
    router.push({ name: index, query, params })
  }
}

// el-menu路由匹配方法
const activeMenu = computed((): string => {
  const { meta, name } = route
  // 可以在meta里添加信息，重置高亮的路由，比如要让父路由高亮
  if (meta.activeMenu) {
    // @ts-ignore 注释掉 不能将类型“unknown”分配给类型“string”。
    return meta.activeMenu
  }
  // @ts-ignore 不能将类型“RouteRecordName”分配给类型“string”。
  return name
})
</script>
