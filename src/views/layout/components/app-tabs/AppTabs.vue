<template>
  <div class="app-tabs">
    <!-- @tab-click="handleTabClick" @tab-remove="handleTabRemove" -->
    <el-tabs
      class="app-tabs-content"
      v-model="tabActive"
      type="card"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="item in visitedRoutes"
        :key="item.path"
        :label="t(item.meta.title)"
        :name="item.path"
        :closable="!item.meta.noClosable"
      >
      </el-tab-pane>
    </el-tabs>
    <el-dropdown @command="handleCommand" placement="top">
      <!-- 下拉图标 -->
      <span class="tabs-more">
        <span class="tabs-more-icon">
          <i class="box box-t"></i>
          <i class="box box-b"></i>
        </span>
      </span>

      <template #dropdown>
        <el-dropdown-menu class="tabs-select">
          <el-dropdown-item command="closeOthersTabs">
            <div
              class="tabs-select-item"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
              "
            >
              <i class="iconfont icon-guanbi"></i><span>关闭其他</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="closeLeftTabs">
            <div
              class="tabs-select-item"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
              "
            >
              <i class="iconfont icon-jiantou_xiangzuo"></i
              ><span>关闭左侧</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="closeRightTabs">
            <div
              class="tabs-select-item"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
              "
            >
              <i class="iconfont icon-jiantou_xiangyou"></i
              ><span>关闭右侧</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="closeAllTabs">
            <div
              class="tabs-select-item"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
              "
            >
              <i class="iconfont icon-guanbi"></i><span>关闭全部</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useRouterStore } from '@/store/modules/router'
import { useTabStore } from '@/store/modules/tab'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

// 基本库对象引入
const routerStore = useRouterStore()
const tabStore = useTabStore()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const { routes } = storeToRefs(routerStore)

const {
  addVisitedRoute,
  delVisitedRoute,
  delOthersVisitedRoutes,
  delLeftVisitedRoutes,
  delRightVisitedRoutes,
  delAllVisitedRoutes
} = tabStore

// 初始化固定无法关闭的页签
const initNoCLosableTabs = routes => {
  routes.forEach(item => {
    if (item.meta && item.meta.noClosable) addTabs(item)
    if (item.children) initNoCLosableTabs(item.children)
  })
}

// 添加页签功能
const visitedRoutes = computed(() => tabStore.getVisitedRoutes)
const tabActive = ref('')
/**
 * @description 添加页签的方法
 * @param 传入当前访问的页签路由对象
 */
const addTabs = tab => {
  addVisitedRoute(tab)
  tabActive.value = tab.path
}

// 调用要在所有执行函数定义之后
initNoCLosableTabs(routes.value)

/**
 * @description watch监听完整路由地址变化，watch有2个参数
 * @param 参数1 是监听的数据对象，可以是变量、数组、函数
 * @param 参数2 是数据改变时的回调函数，有2个参数，（改变后的数据，改变前的数据）
 */
watch(
  () => route.path,
  () => {
    addTabs(route)
  },
  {
    immediate: true // 是否初始值也执行一次
  }
)

// 页签点击功能
/**
 * @description 页签点击事件
 * @param 默认返回页签对象
 */
const handleTabClick = tab => {
  router.push(visitedRoutes.value[tab.index])
}

// 移除单个页签功能
/**
 * @description 页签删除事件
 * @param 默认返回点击页签的路由地址
 */
const handleTabRemove = rawPath => {
  toLastTab()
  delVisitedRoute(rawPath)
}
/**
 * @description 跳转最后一个标签页
 */
const toLastTab = () => {
  const latestView = visitedRoutes.value
    .filter(item => item.path !== route.path)
    .slice(-1)[0]
  // console.log(latestView)

  if (latestView) router.push(latestView)
  else router.push('/')
  // console.log(2)
}

// 拓展选项功能
const handleCommand = command => {
  switch (command) {
    case 'closeOthersTabs':
      closeOthersTabs()
      break
    case 'closeLeftTabs':
      closeLeftTabs()
      break
    case 'closeRightTabs':
      closeRightTabs()
      break
    case 'closeAllTabs':
      closeAllTabs()
      break
  }
}
const closeOthersTabs = () => {
  delOthersVisitedRoutes(route.path)
}
const closeLeftTabs = () => {
  delLeftVisitedRoutes(route.path)
}
const closeRightTabs = () => {
  delRightVisitedRoutes(route.path)
}
const closeAllTabs = () => {
  delAllVisitedRoutes()
  toLastTab()
}
</script>

<style lang="scss" scoped>
.app-tabs {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $base-tabs-height;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  :deep(.el-tabs) {
    height: 34px;
    width: calc(100% - 40px);
    .el-tabs__header {
      border-bottom: 0;
      .el-tabs__nav {
        border: 0;
      }
      .el-tabs__item {
        box-sizing: border-box;
        height: 34px;
        line-height: 34px;
        margin-right: 5px;
        border: 0;
        outline: none;
        transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
        &:after {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          content: '';
          background-color: $base-color-blue;
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s,
            color 0.1s, font-size 0s;
        }
        &:hover {
          background: #e8f4ff;
          &:after {
            width: 100%;
          }
        }
        &.is-active {
          background: #e8f4ff;
          &:after {
            width: 100%;
          }
        }
      }
      .el-tabs__nav-next,
      .el-tabs__nav-prev {
        line-height: 34px;
      }
    }
  }

  .tabs-more {
    position: relative;
    box-sizing: border-box;
    &-icon {
      display: inline-block;
      color: #9a9a9a;
      cursor: pointer;
      transition: transform 0.3s ease-out;
      .box {
        position: relative;
        display: block;
        width: 14px;
        height: 8px;
        &:before {
          position: absolute;
          top: 2px;
          left: 0;
          width: 6px;
          height: 6px;
          content: '';
          background: #9a9a9a;
        }
        &:after {
          position: absolute;
          top: 2px;
          left: 8px;
          width: 6px;
          height: 6px;
          content: '';
          background: #9a9a9a;
        }
        .box-t {
          &:before {
            transition: transform 0.3s ease-out 0.3s;
          }
        }
      }
    }
    &-active,
    &:hover {
      .tabs-more-icon {
        transform: rotate(90deg);
        .box-t {
          &:before {
            transform: rotate(45deg);
          }
        }
        .box:before,
        .box:after {
          background: $base-color-blue;
        }
      }
    }
  }
}
</style>
