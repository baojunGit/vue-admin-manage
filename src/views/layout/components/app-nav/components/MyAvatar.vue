<template>
  <div class="my-avatar">
    <el-dropdown @visible-change="handleVisibleChange">
      <span class="avatar-dropdown">
        <img class="user-avatar" src="@/assets/image/face.gif" />
        <div class="user-name">
          <span class="user-name-title"> {{ username }} </span>
          <i
            :class="[
              active ? 'user-name-dropdown-active' : '',
              'user-name-dropdown iconfont icon-xiangxia2'
            ]"
          ></i>
        </div>
      </span>
      <template #dropdown>
        <el-dropdown-menu style="width: 120px">
          <el-dropdown-item command="personalCenter">
            <i class="iconfont icon-wode1-xianxing"></i> <span>个人中心</span>
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            <i class="iconfont icon-guanji"></i> <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
// const avatar = computed(() => store.getters['user/avatar'])
const username = computed(() => store.getters['user/username'])

const active = ref(false)
const handleVisibleChange = val => {
  console.log(val)
  active.value = val
}
</script>

<style lang="scss" scoped>
.my-avatar {
  .avatar-dropdown {
    display: flex;
    justify-content: center;
    align-items: center;
    .user-avatar {
      width: 40px;
      height: 40px;
    }
    .user-name {
      .user-name-title {
        margin: 4px;
      }
      .user-name-dropdown {
        // i是行内元素，transform在行内元素不起作用，可以给i加上display:inline-block的样式转为行内块元素
        display: inline-block;
        font-size: 14px !important;
        font-weight: 700;
        transition: all 0.5s;
      }
      .user-name-dropdown-active {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
