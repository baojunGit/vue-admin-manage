<template>
  <div id="not-found-401">
    <div class="not-found-content">
      <h2 class="not-found-title">401</h2>
      <p class="not-found-desc">抱歉！您没有<em>权限</em>访问 ...</p>
      <div class="not-found-btn">
        <el-button @click="$router.go(-1)">返回上一页</el-button>
        <el-button type="primary" @click="$router.push({ name: 'index' })"
          >进入首页</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: '401',
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
#not-found-401 {
  position: relative;
  height: 100%;
  .not-found-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .not-found-title {
      padding-bottom: 30px;
      text-align: center;
      font-size: 160px;
      line-height: 160px;
      font-weight: 400;
      color: rgb(55, 71, 79);
    }
    .not-found-desc {
      margin: 0 0 30px;
      font-size: 26px;
      text-transform: uppercase;
      color: rgb(118, 131, 143);
      > em {
        font-style: normal;
        color: #ee8145;
      }
    }
    .not-found-btn {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
