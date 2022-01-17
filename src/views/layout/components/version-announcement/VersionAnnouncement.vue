<template>
  <div class="version-announcement">
    <el-dialog
      title="版本记录"
      :append-to-body="false"
      v-model="store.state.version.openRecord"
    >
      <el-timeline>
        <el-timeline-item timestamp="2021/12/5" placement="top">
          <el-card>
            <h2>vue3后台管理系统V1.1.2</h2>
            <p>使用vue中transition标签完成页面切换的缓冲动画效果</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <el-timeline>
        <el-timeline-item timestamp="2021/11/30" placement="top">
          <el-card>
            <h2>vue3后台管理系统V1.1.1</h2>
            <p>
              完成首页模块功能<br />
              （1）新增头部时间翻转动态效果<br />
              （2）新增快捷导航<br />
              （3）新增待办事项<br />
              （4）新增项目部署信息<br />
              （5）新增我的项目导航<br />
            </p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <el-timeline>
        <el-timeline-item timestamp="2021/11/18" placement="top">
          <el-card>
            <h2>vue3后台管理系统V1.1.0</h2>
            <p>
              新增【nav栏目】<br />
              （1）新增通知模块；<br />
              （2）新增全屏切换按钮；<br />
              （3）新增国际化语言切换；<br />
              （4）实现页面组件局部刷新功能；<br />
            </p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <el-timeline>
        <el-timeline-item timestamp="2021/10/23" placement="top">
          <el-card>
            <h2>vue3后台管理系统V1.0.2</h2>
            <p>新增动态标签页功能</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <el-timeline>
        <el-timeline-item timestamp="2021/10/10" placement="top">
          <el-card>
            <h2>vue3后台管理系统V1.0.1</h2>
            <p>实现动态路由功能</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <el-timeline>
        <el-timeline-item timestamp="2021/9/20" placement="top">
          <el-card>
            <h2>vue3后台管理系统V1.0.0</h2>
            <p>vue3后台管理系统，完成基本架构上线</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
const store = useStore()
</script>

<style lang="scss" scoped>
// 不能写在.version-announcement里，因为不是它里面的后代元素
h2 {
  line-height: 32px;
  font-size: 18px;
  font-weight: 700;
  color: $base-color-blue;
}
p {
  line-height: 30px;
  margin-left: 2em;
  span {
    font-size: 22px;
    font-weight: 700;
  }
}
</style>
