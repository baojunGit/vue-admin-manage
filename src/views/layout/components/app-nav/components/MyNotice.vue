<template>
  <div class="my-notice">
    <el-badge type="danger" :value="badge">
      <el-popover placement="bottom" trigger="hover" :width="300">
        <template #reference>
          <i class="iconfont icon-shengyin08-xianxing"></i>
        </template>
        <el-tabs v-model="activeName">
          <el-tab-pane label="通知" name="notice">
            <div class="notice-list">
              <el-scrollbar>
                <ul>
                  <li v-for="(item, index) in notices" :key="index">
                    <el-avatar :size="45" :src="item.image" />
                    <span v-html="item.notice" />
                  </li>
                </ul>
              </el-scrollbar>
            </div>
          </el-tab-pane>
          <el-tab-pane label="邮件" name="email">
            <div class="notice-list">
              <el-scrollbar>
                <ul>
                  <li v-for="(item, index) in notices" :key="index">
                    <el-avatar :size="45" :src="item.image" />
                    <span>{{ item.email }}</span>
                  </li>
                </ul>
              </el-scrollbar>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="notice-clear" @click="handleClearNotice">
          <el-button type="text">
            <div class="text-container">
              <i class="iconfont icon-anniu_guanbi"></i>
              <span>清空消息</span>
            </div>
          </el-button>
        </div>
      </el-popover>
    </el-badge>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getNoticeList } from '@/api/notice'
export default defineComponent({
  name: 'MyNotice',
  setup() {
    const badge = ref()
    const activeName = ref('notice')
    const notices = ref([])
    const fetchData = async () => {
      const {
        data: { list, total }
      } = await getNoticeList()
      // console.log(list)
      // console.log(total)
      notices.value = list
      badge.value = total
    }
    fetchData()

    const handleClearNotice = () => {
      badge.value = 0
      notices.value = []
    }
    return {
      badge,
      activeName,
      notices,
      handleClearNotice
    }
  }
})
</script>

<style lang="scss" scoped>
:deep() {
  .el-tabs__active-bar {
    min-width: 28px;
  }
}

.notice-list {
  height: 30vh;

  ul {
    padding: 0 15px 0 0;
    margin: 0;

    li {
      display: flex;
      align-items: center;
      padding: 10px 0 10px 0;

      :deep() {
        .el-avatar {
          flex-shrink: 0;
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }

      span {
        margin-left: 10px;
      }
    }
  }
}

.notice-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0 0 0;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  border-top: 1px solid #e8eaec;
  .text-container {
    display: flex;
    align-items: center;
    i {
      margin-right: 3px;
    }
  }
}
</style>
