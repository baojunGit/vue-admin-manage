<template>
  <div id="article-container">
    <el-row :gutter="20">
      <el-col :lg="5" :md="5" :sm="24" :xl="5" :xs="24">
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
      <el-col :lg="19" :md="19" :sm="24" :xl="19" :xs="24">
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
              :defaultConfig="toolbarConfig"
              :mode="mode"
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
import { IToolbarConfig } from '@wangeditor/editor'

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
  inputVisible: false,
  // default 默认模式 - 集成了 wangEditor 所有功能
  // simple 简洁模式 - 仅有部分常见功能，但更加简洁易用
  mode: 'default'
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

const toolbarConfig: Partial<IToolbarConfig> = {
  toolbarKeys: [
    // 菜单 key
    'headerSelect',

    // 分割线
    '|',

    // 菜单 key
    'fontSize',
    'fontFamily',
    'lineHeight',
    'bold',
    'underline',
    'italic',
    'through',
    'clearStyle',
    'color',
    'bgColor',
    // 菜单组，包含多个菜单
    {
      key: 'group-more-justify', // 必填，要以 group 开头
      title: '对齐方式', // 必填
      iconSvg:
        '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>', // 可选
      menuKeys: [
        'justifyLeft',
        'justifyRight',
        'justifyCenter',
        'justifyJustify'
      ] // 下级菜单 key ，必填
    },
    {
      key: 'group-more-indent',
      title: '缩进配置',
      iconSvg:
        '<svg viewBox="0 0 1024 1024"><path d="M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z"></path></svg>',
      menuKeys: ['indent', 'delIndent']
    },
    {
      key: 'group-more-style',
      title: '更多样式',
      iconSvg:
        '<svg viewBox="0 0 1024 1024"><path d="M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path></svg>', // 可选
      menuKeys: ['through', 'code', 'clearStyle']
    }
  ]
}

// 回调函数
const handleChange = editor => {
  console.log('change:', editor.getHtml())
  console.log(editor.getAllMenuKeys())
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
  inputVisible,
  mode
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
