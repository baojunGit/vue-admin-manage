<template>
  <div class="my-avatar">
    <!-- @command 下拉框点击事件 @visible-change 弹框出现消失事件  -->
    <el-dropdown @command="handleCommand" @visible-change="handleVisibleChange">
      <span class="avatar-dropdown">
        <img class="user-avatar" src="@/assets/image/face.gif" />
        <div class="user-name">
          <span class="user-name-title"> {{ username }} </span>
          <i
            :class="[
              'user-name-dropdown iconfont icon-xiangxia2',
              { 'user-name-dropdown-active': active }
            ]"
          ></i>
        </div>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
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
import { ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const { username } = storeToRefs(userStore)
const { setLogout } = userStore
const router = useRouter()

const handleCommand = async command => {
  switch (command) {
    case 'logout':
      setLogout()
      break
    case 'personalCenter':
      await router.push('/personal-center')
  }
}

const active = ref(false)
const handleVisibleChange = val => {
  // console.log(val)
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
      border-radius: 50%;
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
