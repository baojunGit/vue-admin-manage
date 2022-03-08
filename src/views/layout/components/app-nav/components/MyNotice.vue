<template>
  <div class="my-notice-container">
    <el-badge type="danger" :value="badge" :max="99">
      <el-popover placement="bottom" trigger="hover" :width="320">
        <template #reference>
          <i class="iconfont icon-shengyin08-xianxing"></i>
        </template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <template v-for="item in notices" :key="item.key">
            <el-tab-pane
              :label="`${item.name}(${item.noticeList.length})`"
              :name="item.name"
            >
              <el-scrollbar>
                <div class="notice-list">
                  <ul>
                    <li
                      class="notice-container"
                      v-for="(i, index) in item.noticeList"
                      :key="index"
                    >
                      <el-avatar
                        class="notice-container-avatar"
                        v-if="i.avatar"
                        :size="30"
                        :src="i.avatar"
                      />
                      <div class="notice-container-text">
                        <div class="notice-text-title">
                          <el-tooltip
                            popper-class="notice-title-popper"
                            :disabled="!titleTooltip"
                            :content="i.title"
                          >
                            <div
                              class="notice-title-content"
                              @mouseenter="hoverTitle($event)"
                            >
                              {{ i.title }}
                            </div>
                          </el-tooltip>
                          <el-tag
                            v-if="i?.extra"
                            :type="i?.status"
                            size="small"
                            class="notice-title-extra"
                            >{{ i?.extra }}
                          </el-tag>
                        </div>
                        <el-tooltip
                          popper-class="notice-title-popper"
                          :disabled="!descTooltip"
                          :content="i.description"
                          placement="top-start"
                        >
                          <div
                            class="notice-text-description"
                            @mouseenter="hoverDesc($event, i.description)"
                          >
                            {{ i.description }}
                          </div>
                        </el-tooltip>
                        <div class="notice-text-datetime">
                          {{ i.datetime }}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-scrollbar>
            </el-tab-pane>
          </template>
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

<script setup lang="ts">
import { ref } from 'vue'
import { getNoticeList } from '@/api/notice'

const activeName = ref('通知')
const notices = ref([])
const badge = ref()
const fetchData = async () => {
  const {
    data: { list }
  } = await getNoticeList()
  notices.value = list
  // 初始化信息条数
  badge.value = 0 // 重置信息条数，要给初始值0，不然下面与数字相加会等于NaN
  for (const { noticeList } of notices.value) {
    badge.value += noticeList.length
  }
}
fetchData()

const handleClearNotice = () => {
  badge.value = 0
  for (const item of notices.value) {
    item.list = []
  }
}

const handleClick = () => {
  fetchData()
}

const titleTooltip = ref(false)
const descTooltip = ref(false)

const hoverTitle = event => {
  // offsetWidth 指的是元素的实际宽度，包含边线宽度
  // scrollWidth：获取指定标签内容层的真实宽度（可视区域宽度+被隐藏区域宽度），不包含边线宽度
  // clientWidth = width+左右padding，不包含边线宽度

  event.target?.scrollWidth > event.target?.clientWidth
    ? (titleTooltip.value = true)
    : (titleTooltip.value = false)
}

const hoverDesc = (event, desc) => {
  // currentWidth 为文本在页面中所占的宽度，创建标签，加入到页面，获取currentWidth ,最后在移除
  let tempTag = document.createElement('span')
  tempTag.innerText = desc
  tempTag.className = 'getDescWidth'
  document.querySelector('body').appendChild(tempTag)
  let currentWidth = (
    document.querySelector('.getDescWidth') as HTMLSpanElement
  ).offsetWidth
  document.querySelector('.getDescWidth').remove()
  // cellWidth为容器的宽度
  const cellWidth = event.target.offsetWidth
  // 当文本宽度大于容器宽度两倍时，代表文本显示超过两行
  currentWidth > 2 * cellWidth
    ? (descTooltip.value = true)
    : (descTooltip.value = false)
}
</script>

<style lang="scss" scoped>
// :deep(.el-tabs__active-bar) {
//   min-width: 28px;
// }

:deep(.el-tabs__nav-scroll) {
  display: flex;
  justify-content: center;
}

:deep(.el-tabs__header) {
  margin: 0;
}

.notice-list {
  height: 30vh;
  padding: 15px 24px 0;
  .notice-container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .notice-container-avatar {
    // 如果兄弟元素设置flex：1
    margin-right: 16px;
    background: #fff;
  }

  .notice-container-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;

    .notice-text-title {
      display: flex;
      margin-bottom: 8px;
      font-weight: 400;
      font-size: 14px;
      line-height: 1.5715;
      color: rgba(0, 0, 0, 0.85);
      cursor: pointer;

      .notice-title-content {
        flex: 1; // flex是对可用空间的分配，可用空间要减去margin、border、padding
        width: 200px; // 限制宽度的作用是什么？
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .notice-title-extra {
        float: right;
        margin-top: -1.5px;
        font-weight: 400;
      }
    }

    .notice-text-description,
    .notice-text-datetime {
      font-size: 12px;
      line-height: 1.5715;
      color: rgba(0, 0, 0, 0.45);
    }

    .notice-text-description {
      display: -webkit-box;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .notice-text-datetime {
      margin-top: 4px;
    }
  }
}

.notice-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
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

<style lang="scss">
// 弹框不属于组件页面里的元素，不能加scoped
.el-popper {
  padding: 0 !important;
}

.notice-title-popper {
  max-width: 238px !important;
  padding: 10px !important;
}
</style>
