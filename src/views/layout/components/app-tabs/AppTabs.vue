<template>
  <div class="app-tabs">
    <!-- @tab-click="handleTabClick" @tab-remove="handleTabRemove" -->
    <el-tabs v-model="tabActive" type="card" closable>
      <el-tab-pane
        v-for="item in visitedRoutes"
        :key="item.path"
        :label="item.meta.title"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      tabActive: '2',
      visitedRoutes: [
        {
          path: 'Tab 1',
          name: '1',
          content: 'Tab 1 content',
          meta: {
            title: '首页'
          }
        },
        {
          path: 'Tab 2',
          name: '2',
          meta: {
            title: '迭代度量'
          }
        }
      ],
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
