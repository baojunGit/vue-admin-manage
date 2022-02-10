<template>
  <div id="index-container">
    <!-- 自适应布局对应的类：
    lg(pc大桌面显示器，≥1200px) md(中等屏幕显示器，≥992px) sm(小屏幕 平板 ≥768px) xs(超小屏幕 手机 <768px)-->
    <!-- gutter值为该单元格左右的padding之和, 即左右各10px -->
    <el-row :gutter="20">
      <!-- 首栏 -->
      <el-col :span="24">
        <el-card>
          <div class="box-card">
            <div class="box-card-left">
              <img class="user-avatar" src="@/assets/image/face.gif" />
              <div class="index-header-tip">
                <p class="index-header-tip-title">
                  {{ handleTip() }}
                </p>
              </div>
            </div>
            <flip-clock v-if="!isMobile"></flip-clock>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="6" :md="6" :sm="24" :xl="6" :xs="24">
        <quick-nav></quick-nav>
      </el-col>
      <el-col :lg="18" :md="18" :sm="24" :xl="18" :xs="24">
        <todo-list></todo-list>
      </el-col>
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <version-info></version-info>
      </el-col>
      <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
        <my-project></my-project>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  FlipClock,
  VersionInfo,
  MyProject,
  QuickNav,
  TodoList
} from './components/index'
import { deviceDetection } from '@/utils/deviceDetection'
const handleTip = () => {
  const hour = new Date().getHours()
  return hour < 8
    ? `早安，管理员，新的一天新的开始`
    : hour <= 11
    ? `上午好，管理员，一日之计在于晨`
    : hour <= 13
    ? `午安，管理员，记得休息一下哦`
    : hour < 18
    ? `下午好，管理员，下个早班吧`
    : `晚上好，管理员，愿你三冬暖，愿你春不寒`
}
const isMobile = ref(deviceDetection())
</script>

<style lang="scss" scoped>
#index-container {
  .box-card {
    display: flex;
    justify-content: space-between;
    .box-card-left {
      display: flex;
      align-items: center;
      .user-avatar {
        width: 60px;
        height: 60px;
        margin-right: 20px;
        border-radius: 50%;
      }
      .index-header-tip-title {
        font-size: 20px;
        font-weight: bold;
        color: #3c4a54;
      }
    }
  }
}
</style>
