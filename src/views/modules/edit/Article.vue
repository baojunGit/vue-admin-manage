<template>
  <div id="article-container">
    <el-row :gutter="20">
      <el-col :xl="5" :lg="5" :md="5" :sm="24" :xs="24">
        <el-card>
          <template #header>
            <el-input v-model="name" placeholder="请输入文章名">
              <template #suffix>
                <el-icon class="el-input__icon"><search /></el-icon>
              </template>
            </el-input>
          </template>
          <el-tree
            ref="treeRef"
            :data="list"
            :props="defaultProps"
            node-key="id"
            :default-expanded-keys="[]"
            :default-checked-keys="menuIds"
            :filter-node-method="filterNode"
          ></el-tree>
        </el-card>
      </el-col>
      <el-col :xl="19" :lg="19" :md="19" :sm="24" :xs="24">
        <el-card>
          <template #header>
            <el-tag
              size="large"
              v-for="tag in dynamicTags"
              :key="tag"
              mr10
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="inputRef"
              v-model="inputValue"
              mr10
              style="width: 100px"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag ml-1" @click="showInput">
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
            <!-- 这里要设置最低高度，不然编辑器会出现多个滚动条的问题 -->
            <Editor
              :editorId="editorId"
              :defaultConfig="editorConfig"
              :defaultHtml="defaultHtml"
              @onChange="handleChange"
              style="min-height: 150px"
            />
            <div class="card-footer">
              <el-button type="primary">保存</el-button>
              <el-button type="primary">提交</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref, watch, onBeforeUnmount, nextTick } from 'vue'
import { getArticleList } from '@/api/article'
import { Search } from '@element-plus/icons'
import type { ElTree, ElInput } from 'element-plus'
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
  dynamicTags: ['html', 'css', 'js'],
  inputValue: '',
  inputVisible: false,
  // default 默认模式 - 集成了 wangEditor 所有功能
  // simple 简洁模式 - 仅有部分常见功能，但更加简洁易用
  mode: 'default'
})

const fetchData = async () => {
  let {
    data: { articles }
  } = await getArticleList()
  state.list = articles
  console.log(articles)
}

interface Tree {
  id: number
  title: string
  children?: Tree[]
}

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.title.indexOf(value) !== -1
}

const treeRef = ref<InstanceType<typeof ElTree>>()

const name = ref('')

// 不能监听state.name这种会报错？
watch(name, val => {
  treeRef.value!.filter(val)
})

const inputRef = ref<InstanceType<typeof ElInput>>()

const showInput = () => {
  state.inputVisible = true
  nextTick(() => {
    inputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

const handleClose = tag => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

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
    'insertLink',
    {
      key: 'group-more-image',
      title: '图片配置',
      iconSvg:
        '<svg viewBox="0 0 1024 1024"><path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path></svg>', // 可选
      menuKeys: ['insertImage', 'uploadImage']
    },
    'insertTable',
    'insertVideo',
    {
      key: 'group-more-style',
      title: '更多样式',
      iconSvg:
        '<svg viewBox="0 0 1024 1024"><path d="M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path></svg>', // 可选
      menuKeys: ['code']
    },
    'fullScreen'
  ]
}

// 回调函数
const handleChange = editor => {
  // console.log('change:', editor.getHtml())
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
      box-sizing: border-box;
      padding: 10px;
      overflow: auto;
      .full-screen-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        // 解决全屏后底部按钮出现其它元素，设置背景色遮盖
        .card-footer {
          padding: 10px;
          background-color: #fff;
        }
      }
    }
  }
}
</style>
