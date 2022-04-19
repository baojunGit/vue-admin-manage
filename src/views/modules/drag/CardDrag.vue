<template>
  <div id="card-drag-container">
    <my-query-form>
      <my-query-form-left-panel>
        <el-button type="primary" @click="handleReset">重置顺序</el-button>
      </my-query-form-left-panel>
    </my-query-form>
    <div class="content">
      <!-- 属性 v-model="List"这个List为一个数组，一般与实际数据对应。排序、拖拽实际上都是改变这个List的值或顺序。 -->
      <!-- v-bind属性绑定配置项 -->
      <!-- 属性 item-key="key" 这个key为每个可拖拽组件的key，要求List数组中的每个数据项中有一个key作为子组件的唯一标识。 -->
      <!-- 属性 group 分组，如果要在不同容器间实现拖拽，那么它们的组名应该相等 -->
      <!-- 属性 tag 渲染后的<draggable>，例如tag =‘span’，那么<draggable>就会变为<span></span> -->
      <!-- ghost-class 拖动单元的影子副本类名 -->
      <vue-draggable
        v-model="data"
        v-bind="dragOptions"
        :component-data="{ tag: '', name: 'flip-list', type: 'transition' }"
        item-key="id"
        tag="transition-group"
        ghost-class="ghost-item"
        drag-class="drag-item"
      >
        <template #item="{ element: item }">
          <div class="item-card">
            <!-- <i :class="['iconfont', item]" style="font-size: 30px"></i>
                <p>按住拖拽</p> -->
            <h3 class="title">
              <div class="title-left">
                <span class="text">{{ item.name }}</span>
                <el-popover placement="bottom" :width="350" trigger="click">
                  <p class="tip" v-html="item.desc"></p>
                  <template #reference>
                    <el-icon
                      :size="16"
                      style="cursor: pointer; padding: 4px; color: #409eff"
                    >
                      <question-filled />
                    </el-icon>
                  </template>
                </el-popover>
              </div>
              <div class="title-right">
                <div
                  class="label"
                  :style="{ color: item.color, 'border-color': item.color }"
                >
                  {{ item.type }}
                </div>
              </div>
            </h3>
          </div>
        </template>
      </vue-draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueDraggable from 'vuedraggable'
import { reactive, toRefs } from 'vue'
import { getIconList } from '@/api/card'
import { QuestionFilled } from '@element-plus/icons'

const state = reactive({
  data: [],
  dragOptions: {
    animation: 600,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost'
  }
})

const fetchData = async () => {
  const {
    data: { list }
  } = await getIconList()
  state.data = list
}

fetchData()

const handleReset = () => {
  console.log('重置顺序事件')
}

const { data, dragOptions } = toRefs(state)
</script>

<style lang="scss" scoped>
#card-drag-container {
  .content {
    display: flex;
    flex-wrap: wrap;
    column-gap: 20px; // 列间距设置
    row-gap: 24px; // 行间距设置
    .item-card {
      cursor: move;
      user-select: none; // 防止选取元素的文本
      width: 385px;
      height: 278px;
      box-sizing: border-box;
      box-shadow: 0 0 14px #cfcfcf;
      .title {
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title-left {
          margin-left: 4px;
          .text {
            padding-left: 12px;
            border-left: 3px solid #409eff;
            font-size: 16px;
          }
        }
        .title-right {
          margin-right: 12px;
          .label {
            font-size: 12px;
            border: 1px solid #d68189;
            color: #d68189;
            padding: 2px 4px;
          }
        }
      }
    }
    .ghost-item {
      opacity: 0.5;
      background-color: #dcebf4;
    }
    .drag-class {
      background-color: red;
    }
  }
}
</style>
