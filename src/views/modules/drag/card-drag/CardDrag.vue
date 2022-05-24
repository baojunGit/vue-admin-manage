<template>
  <div id="card-drag-container">
    <my-tabs v-model="activeValue" @tab-click="handleClick">
      <!-- <my-tabs-pane label="研发中心" name="1"></my-tabs-pane>
      <my-tabs-pane label="敏捷迭代" name="2"></my-tabs-pane>
      <my-tabs-pane label="云数据中心" name="3"></my-tabs-pane>
      <my-tabs-pane label="架构团队" name="4"></my-tabs-pane>
      <my-tabs-pane label="资管团队" name="5"></my-tabs-pane>
      <p>hhhhhhh</p> -->
      <my-tab-pane
        v-for="(item, index) in tabList"
        :key="index"
        :label="item.name"
        :name="item.id"
      ></my-tab-pane>
      <template #suffix>
        <!--        阻止el-popover点击事件冒泡-->
        <div @click.stop>
          <el-popover
            popper-class="tab-set2"
            style="min-width: auto"
            placement="bottom"
            :width="80"
            trigger="click"
          >
            <template #reference>
              <el-icon :size="16" style="cursor: pointer; padding: 4px">
                <caret-bottom />
              </el-icon>
            </template>
            <ul class="menu">
              <li class="menu-item">编辑</li>
              <li class="menu-item">删除</li>
            </ul>
          </el-popover>
        </div></template
      >
      <template #append>
        <el-button :icon="Plus" type="text"> 新建页签 </el-button>
      </template>
    </my-tabs>
    <my-query-form>
      <my-query-form-top-panel>
        <el-alert
          title="默认展示近一年数据，可以通过拖拽排序设置指标展示格局"
          type="info"
          show-icon
          :closable="false"
        />
      </my-query-form-top-panel>
    </my-query-form>
    <div class="main">
      <!-- 属性 v-model="List"这个List为一个数组，一般与实际数据对应。排序、拖拽实际上都是改变这个List的值或顺序。 -->
      <!-- v-bind属性绑定配置项 -->
      <!-- 属性 item-key="key" 这个key为每个可拖拽组件的key，要求List数组中的每个数据项中有一个key作为子组件的唯一标识。 -->
      <!-- 属性 group 分组，如果要在不同容器间实现拖拽，那么它们的组名应该相等 -->
      <!-- 属性 tag 渲染后的<draggable>，例如tag =‘span’，那么<draggable>就会变为<span></span> -->
      <!-- ghost-class 拖动单元的影子副本类名 -->
      <!-- :move="dragMoved" 自定义控制那些元素可以拖拽或不允许拖拽并控制是否允许停靠-->
      <vue-draggable
        v-model="data"
        v-bind="dragOptions"
        :component-data="{ tag: '', name: 'flip-list', type: 'transition' }"
        item-key="id"
        tag="transition-group"
        @end="dragEnd"
      >
        <template #item="{ element: item }">
          <div class="item-card">
            <!-- 最外层的类名item-card也会成为拖拽中元素的类名，如果设置transition的css属性会影响拖拽功能 -->
            <div class="item-card-wrap">
              <h3 class="title">
                <div class="title-left">
                  <span class="text">{{ item.name }}</span>
                  <el-popover placement="bottom" :width="350" trigger="click">
                    <p class="tip" v-html="item.desc"></p>
                    <template #reference>
                      <el-icon
                        :size="18"
                        style="cursor: pointer; padding: 4px; color: #409eff"
                      >
                        <question-filled />
                      </el-icon>
                    </template>
                  </el-popover>
                </div>
                <div class="title-right">
                  <span
                    class="label"
                    :style="{ color: item.color, 'border-color': item.color }"
                  >
                    {{ item.type }}
                  </span>
                  <el-popover
                    popper-class="menu-set"
                    style="min-width: auto"
                    placement="bottom-end"
                    :width="80"
                    trigger="click"
                  >
                    <template #reference
                      ><div class="menu-button">
                        <span></span>
                        <span></span>
                        <span></span></div
                    ></template>
                    <ul class="menu">
                      <li class="menu-item">删除</li>
                    </ul>
                  </el-popover>
                </div>
              </h3>
              <el-divider border-style="dashed" style="margin: 0" />
              <div class="content">
                <div class="have-data" v-if="item?.data?.length !== 0">
                  <div
                    class="board1"
                    v-if="item?.visualizationMode === 'board1'"
                    @click="board1Click(item)"
                  >
                    {{ item?.data[0].value }}{{ item?.data[0].suffix }}
                  </div>
                  <board2
                    v-if="item?.visualizationMode === 'board2'"
                    :list="item.data"
                    :url="item.url"
                  ></board2>
                  <bar1
                    v-if="item?.visualizationMode === 'bar1'"
                    :list="item.data"
                    :url="item.url"
                  ></bar1>
                </div>
                <div class="no-data" v-else>无数据</div>
              </div>
            </div>
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
import { Plus, QuestionFilled, CaretBottom } from '@element-plus/icons-vue'
import { bar1, board2 } from './components'

const state = reactive({
  activeValue: 2,
  tabList: [
    {
      id: 1,
      name: '研发中心'
    },
    {
      id: 2,
      name: '自定义面板'
    }
  ],
  data: [],
  dragOptions: {
    animation: 600,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost-item', // 占位元素的类名
    scroll: true, // 开启自动滚动
    // forceAutoscrollFallback: false, // 即使本机浏览器自动滚动可用，也强制启用自动滚动插件
    // px，鼠标必须离边缘多近才能开始滚动
    // 只有满足如下任意一项，才会调用它：1.forceFallback: true  2.它是一个移动设备  3.浏览器是 Safari、Internet Explorer 或 Edge
    scrollSensitivity: 180,
    scrollSpeed: 20, // px，鼠标滚动速度
    bubbleScroll: true, // 将自动滚动应用于所有父元素，以便更轻松地移动
    // 默认为false, 设置为true时，将不使用原生的html5的拖放，可以修改一些拖放中元素的样式, h5拖拽是方便，但是呢，拖拽的影子改不了透明度是硬伤
    forceFallback: true,
    fallbackClass: 'drag-item' // 为true时，拖放过程中克隆DOM元素的类名。
    // fallbackOnBody: true
    // fallbackTolerance: 10 // 以像素为单位指定鼠标在被视为拖动以前应移动多远
    // swapThreshold: 0.65 // 交换区域将占据的目标百分比，介于0和之间1
  }
})

const handleClick = tab => {
  activeValue.value = tab.name
  console.log(activeValue.value)
}

const fetchData = async () => {
  const {
    data: { list }
  } = await getIconList()
  state.data = list
}

fetchData()

const board1Click = item => {
  console.log(item?.data[0].url)
  window.open(item?.url)
}

const dragEnd = () => {
  console.log(state.data)
}

const { activeValue, tabList, data, dragOptions } = toRefs(state)
</script>

<style lang="scss" scoped>
#card-drag-container {
  .main {
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
      border: 1px solid #cfcfcf; // 要有边框拖拽元素才明显
      .item-card-wrap {
        height: 100%;
        // transition: all ease-in-out 0.5s;
        .title {
          width: 100%;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title-left {
            margin-left: 4px;
            display: flex;
            align-items: center;
            .text {
              padding-left: 12px;
              border-left: 3px solid #409eff;
              font-size: 16px;
            }
          }
          .title-right {
            margin-right: 12px;
            display: flex;
            align-items: center;
            .label {
              font-size: 12px;
              border: 1px solid #d68189;
              color: #d68189;
              padding: 2px 4px;
            }
            .menu-button {
              display: flex;
              flex-flow: column;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;
              padding: 2px 6px;
              margin-left: 4px;
              cursor: pointer;
              &:hover {
                background-color: #eff5f9;
              }
              // &:active {
              //   background-color: #409eff;
              // }
              span {
                margin: 2px 0;
                border-radius: 50%;
                width: 4px;
                height: 4px;
                background-color: #c8c8c8;
              }
              span:first-of-type {
                padding-top: 0;
              }
            }
          }
        }
        .content {
          box-sizing: border-box;
          height: calc(100% - 32px - 2px);
          padding: 20px;
          position: relative;
          .have-data {
            height: 100%;
            width: 100%;
            position: relative;
            .board1 {
              cursor: pointer;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              font-size: 40px;
              font-weight: 700;
              color: #409eff;
            }
          }
          .no-data {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 34px;
            font-weight: 700;
            color: #7f7f80;
          }
        }
      }
    }
    .ghost-item {
      opacity: 0.5;
      background-color: #dcebf4;
    }
    .drag-item {
      border: 1px solid #cfcfcf;
      background-color: #f5f5f5;
    }
  }
}
</style>
<style lang="scss">
.tab-set2,
.menu-set {
  min-width: auto !important;
  padding: 5px 0 !important;
  .menu {
    .menu-item {
      cursor: pointer;
      padding: 5px 12px;
      transition: all 0.3s;
      &:hover {
        background-color: #f5f5f5;
        color: (0, 0, 0, 0.65);
      }
    }
  }
}
</style>
