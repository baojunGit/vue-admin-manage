<template>
  <div id="index">
    <!-- 自适应布局对应的类：
    lg(pc大桌面显示器，≥1200px) md(中等屏幕显示器，≥992px) sm(小屏幕 平板 ≥768px) xs(超小屏幕 手机 <768px)-->
    <!-- gutter值为该单元格左右的padding之和, 即左右各10px -->
    <el-row :gutter="20">
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
            <flip-item></flip-item>
          </div>
        </el-card>
      </el-col>
      <el-col
        style="margin-bottom: 20px"
        :lg="6"
        :md="12"
        :sm="24"
        :xl="6"
        :xs="24"
      >
        1111
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24"> 2222 </el-col>
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24"> 3333 </el-col>
      <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24"> 4444 </el-col>
      <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24"> 55555 </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import FlipItem from './components/FlipClock.vue'
const handleTip = () => {
  const hour = new Date().getHours()
  return hour < 8
    ? `早上好, 新的一天新的开始`
    : hour <= 11
    ? `上午好，一日之计在于晨`
    : hour <= 13
    ? `中午好，记得午休一下哦`
    : hour < 18
    ? `下午好，早点下班吧`
    : `晚上好，愿你三冬暖，愿你春不寒`
}
</script>

<style lang="scss" scoped>
#index {
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
