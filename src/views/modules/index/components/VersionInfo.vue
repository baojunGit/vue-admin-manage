<template>
  <div class="version-info">
    <el-card>
      <template #header>
        <div class="card-header">
          <div><i class="iconfont icon-xinxi"></i> 信息</div>
          <el-tag style="position: absolute; right: 0"
            >部署时间：{{ updateTime }}</el-tag
          >
        </div>
      </template>
      <el-scrollbar>
        <table class="table">
          <!-- tr是行 -->
          <tr>
            <!-- td是列 -->
            <td>当前版本</td>
            <td colspan="3">
              <el-tag>1.1.2</el-tag>
            </td>
          </tr>
          <tr>
            <td>vue</td>
            <td>
              {{ dependencies['vue'] }}
              <el-popover
                content="已升级至最新版本"
                placement="top-start"
                trigger="hover"
                :width="200"
              >
                <template #reference>
                  <i class="iconfont icon-jiantou_xiangshang"></i>
                </template>
              </el-popover>
            </td>
            <td>@vue/cli</td>
            <td>{{ devDependencies['@vue/cli-service'] }}</td>
          </tr>
          <tr>
            <td>pinia</td>
            <td>{{ dependencies['pinia'] }}</td>
            <td>vue-router</td>
            <td>{{ dependencies['vue-router'] }}</td>
          </tr>
          <tr>
            <td>vue-i18n</td>
            <td>{{ dependencies['vue-i18n'] }}</td>
            <td>element-plus</td>
            <td>
              {{ dependencies['element-plus'] }}
              <el-popover
                content="已升级至最新版本"
                placement="top-start"
                trigger="hover"
                :width="200"
              >
                <template #reference>
                  <i class="iconfont icon-jiantou_xiangshang"></i>
                </template>
              </el-popover>
            </td>
          </tr>
          <tr>
            <td>eslint</td>
            <td>{{ devDependencies['eslint'] }}</td>
            <td>sass</td>
            <td>
              {{ devDependencies['sass'] }}
            </td>
          </tr>
        </table>
      </el-scrollbar>
    </el-card>
  </div>
</template>
<script setup lang="ts">
// 找不到模块“~/package.json”或其相应的类型声明
// 要把webpack的alias配置同步到ts的路径声明里
import { default as pkg } from '~/package.json'
const { dependencies, devDependencies } = pkg
const updateTime = process.env.VUE_APP_UPDATE_TIME
// console.log(updateTime)
</script>
<style lang="scss" scoped>
.version-info {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  .table {
    width: 100%;
    color: #666;
    border-collapse: collapse;
    background-color: #fff;

    td {
      position: relative;
      padding: 9px 15px !important;
      overflow: hidden;
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
      border: 1px solid #e6e6e6;

      i {
        color: var(--el-color-success);
        vertical-align: middle;
        cursor: pointer;
      }

      &:nth-child(odd) {
        width: 20%;
        text-align: right;
        background-color: #f7f7f7;
      }
    }
  }
}
</style>
