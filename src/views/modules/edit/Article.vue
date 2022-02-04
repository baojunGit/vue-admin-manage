<template>
  <div id="article-container">
    <el-row :gutter="20">
      <el-col :lg="6" :md="6" :sm="24" :xl="6" :xs="24">
        <el-card>
          <template #header>
            <el-input v-model="name" placeholder="请输入文章名搜索">
              <template #suffix>
                <el-icon class="el-input__icon"><search /></el-icon>
              </template>
            </el-input>
          </template>
          <el-tree
            ref="menuTree"
            :data="list"
            :props="defaultProps"
            node-key="id"
            :default-expanded-keys="[]"
            :default-checked-keys="menuIds"
          ></el-tree>
        </el-card>
      </el-col>
      <el-col :lg="18" :md="18" :sm="24" :xl="18" :xs="24">
        <el-card>
          <template #header>
            <el-tag
              size="large"
              v-for="tag in dynamicTags"
              :key="tag"
              mr10
              closable
              :disable-transitions="false"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="InputRef"
              v-model="inputValue"
              mr10
            >
            </el-input>
            <el-button v-else class="button-new-tag ml-1">
              + 增加标签
            </el-button>
          </template>
          <!-- wangEditor 工具栏内置了“全屏”菜单，但使用它需要有一个条件：
          toolbar-container 和 editor-container 必须有同一个父元素，最好不要用其它UI组件当父元素，会导致全屏出现错乱或空白
          且要设置最高层级覆盖 -->
          <div class="full-screen-container" style="z-index: 9999">
            <!-- 工具栏 -->
            <Toolbar
              :editorId="editorId"
              style="border-bottom: 1px solid #ccc"
            />
            <!-- 编辑器 -->
            <Editor
              :editorId="editorId"
              :defaultConfig="editorConfig"
              :defaultHtml="defaultHtml"
              @onChange="handleChange"
              style="height: 260px"
            />
          </div>
          <div class="card-footer">
            <el-button type="primary" mr20>保存</el-button>
            <el-button type="primary">提交</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref, onBeforeUnmount } from 'vue'
import { getMenuList } from '@/api/menu'
import { Search } from '@element-plus/icons'
import type { ElInput } from 'element-plus'
import {
  Editor,
  Toolbar,
  getEditor,
  removeEditor
} from '@wangeditor/editor-for-vue'
// 引入wangeditor样式
import '@wangeditor/editor/dist/css/style.css'

const state = reactive({
  drawer: false,
  list: [],
  defaultProps: {
    children: 'children',
    label: 'title'
  },
  openLevel: '收合所有',
  menuIds: [2],
  name: '',
  dynamicTags: ['html', 'css', 'js', 'ts', 'node'],
  inputValue: '',
  inputVisible: false
})

const fetchData = async () => {
  let {
    data: { menus }
  } = await getMenuList()
  state.list = menus
}

const queryName = () => {
  console.log(1)
}

const InputRef = ref<InstanceType<typeof ElInput>>()

const defaultHtml = ref('')

// 定义一个编辑器 id ，要求：全局唯一且不变！！！
const editorId = 'wangeEditor-1'

// 编辑器配置
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    /* 菜单配置，下文解释 */
  }
}

// 回调函数
const handleChange = editor => {
  console.log('change:', editor.getHtml())
}

onBeforeUnmount(() => {
  const editor = getEditor(editorId)
  if (editor == null) return

  // 销毁，并移除 editor
  editor.destroy()
  removeEditor(editorId)
})

const {
  list,
  defaultProps,
  menuIds,
  name,
  dynamicTags,
  inputValue,
  inputVisible
} = toRefs(state)

fetchData()
</script>

<style lang="scss" scoped>
:deep() {
  .el-card {
    height: calc($base-page-height - $base-padding * 2);
    box-sizing: border-box; // 消除border引起的滚动条
    overflow: hidden;
    .el-card__body {
      // 要设置固定高度，overflow: auto才会出现滚动条
      height: calc($base-page-height - $base-padding * 2 - 70px);
      overflow: auto;
    }
  }
}
</style>
