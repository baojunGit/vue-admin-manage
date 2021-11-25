<template>
  <div class="app-tabs">
    <!-- @tab-click="handleTabClick" @tab-remove="handleTabRemove" -->
    <el-tabs
      v-model="tabActive"
      type="card"
      closable
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="item in visitedRoutes"
        :key="item.path"
        :label="$t(item.meta.title)"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: 'AppTabs',
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const visitedRoutes = computed(() => store.getters['tabs/visitedRoutes'])

    const tabActive = ref('')
    /**
     * @description 添加页签的方法
     * @param 传入当前访问的页签路由对象
     */
    const addTabs = async tab => {
      store.dispatch('tabs/addVisitedRoute', tab)
      tabActive.value = tab.path
    }
    /**
     * @description watch监听完整路由地址变化，watch有2个参数
     * @param 参数1 是监听的数据对象，可以是变量、数组、函数
     * @param 参数2 是数据改变时的回调函数，有2个参数，（改变后的数据，改变前的数据）
     */
    watch(
      () => route.fullPath,
      () => {
        addTabs(route)
      },
      {
        immediate: true // 是否初始值也执行一次
      }
    )

    /**
     * @description 页签点击事件
     * @param 默认返回页签对象
     */
    const handleTabClick = tab => {
      router.push(visitedRoutes.value[tab.index])
    }

    const handleTabRemove = rawPath => {
      store.dispatch('tabs/delVisitedRoute', rawPath)
    }

    return {
      visitedRoutes,
      tabActive,
      handleTabClick,
      handleTabRemove,
      tabIndex: 2
    }
  }
})
</script>

<style lang="scss" scoped>
.app-tabs {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  :deep() {
    .el-tabs {
      height: 34px;
      .el-tabs__header {
        border-bottom: 0;
        .el-tabs__nav {
          border: 0;
        }
        .el-tabs__item {
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
            background-color: #409eff;
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
      }
    }
  }
}
</style>
