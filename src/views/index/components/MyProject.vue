<template>
  <div class="my-projcet">
    <el-card>
      <template #header>
        <div class="card-header">
          <div><i class="iconfont icon-github-line"></i> 我的项目</div>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in list"
          :key="index"
          :lg="12"
          :md="12"
          :sm="24"
          :xl="12"
          :xs="24"
        >
          <my-colorful-card
            :color-from="item.colorFrom"
            :color-to="item.colorTo"
            :icon="item.icon"
            height="186px"
            shadow="hover"
            :title="item.title"
            @click="handleOpenWindow(item.url)"
          >
            <div class="project-card-description">{{ item.description }}</div>
          </my-colorful-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import MyColorfulCard from './components/MyColorfulCard.vue'
const list = [
  {
    title: 'vue3-admin-manage',
    description: '一款基于vue2.x + element-ui的绝佳的中后台前端开发管理框架',
    colorFrom: '#1f94ff',
    colorTo: '#77e19d',
    icon: 'iconfont icon-vuejs-line',
    url: 'https://github.com/baojunGit/vue3-admin-manage'
  },
  {
    title: 'react-admin-manage',
    description:
      '一款基于vue3.x + ant-design-vue的绝佳的中后台前端开发管理框架',
    colorFrom: '#77e19d',
    colorTo: '#1f94ff',
    icon: 'iconfont icon-reactjs-line',
    url: 'https://github.com/chuzhixin/vue-admin-beautiful/tree/vue3.0-antdv'
  }
]

const handleOpenWindow = (url: string): void => {
  window.open(url)
}
</script>
<style lang="scss" scoped>
.my-project {
  :deep() {
    .el-card__body {
      padding-bottom: 0 !important;
    }
  }

  .project-card-description {
    width: calc(100% - 100px);
    margin-right: 45px;
    font-size: 12px;
    font-weight: bold;
    font-weight: normal;
    line-height: 20px;
    color: #fff;
  }
}
</style>
