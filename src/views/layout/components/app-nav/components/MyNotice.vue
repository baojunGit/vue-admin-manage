<template>
  <div class="my-notice">
    <el-badge type="danger" :balue="badge">
      <el-popover placement="bottom" trigger="hover" :width="300">
        <template #reference>
          <i class="iconfont icon-tongzhizhongxin_o"></i>
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
        </el-tabs>
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
      let res = await getNoticeList()
      notices.value = res.data.list
    }
    fetchData()
    return {
      badge,
      activeName,
      notices
    }
  }
})
</script>

<style scoped></style>
