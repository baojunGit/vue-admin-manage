<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef, onMounted, watch, nextTick } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Search } from '@element-plus/icons-vue';
import type { ElTree, ElInput } from 'element-plus';
import { getArticleList } from '@/api/article';

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('<p>hello</p>');

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>';
  }, 1500);
});

// 将 toolbarConfig 设置为空对象，默认模式下就会加载所有的功能组件
const toolbarConfig = {};
const editorConfig = { placeholder: '请输入内容...' };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = editor => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const list = ref([]);
const mode = ref('default');
const defaultProps = ref({
  children: 'children',
  label: 'title',
});
const menuIds = ref([2]);
const dynamicTags = ref(['html', 'css', 'js']);
const inputValue = ref('');
const inputVisible = ref(false);

// Fetch data function
const fetchData = async () => {
  const { data } = await getArticleList();
  list.value = data;
};
fetchData();

interface Tree {
  id: number;
  title: string;
  children?: Tree[];
}
const filterNode = (value: string, data: Tree) => {
  if (!value) return true;
  return data.title.includes(value);
};

const name = ref('');
const treeRef = ref<InstanceType<typeof ElTree>>();

watch(name, val => {
  treeRef.value?.filter(val);
});

const handleClose = tag => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = '';
};

const inputRef = ref<InstanceType<typeof ElInput>>();
const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    inputRef.value?.input?.focus();
  });
};
</script>

<template>
  <div id="article-container">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card>
          <template #header>
            <el-input v-model="name" placeholder="请输入文章名">
              <template #suffix>
                <el-icon class="el-input__icon">
                  <Search />
                </el-icon>
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
      <el-col :span="19">
        <el-card>
          <template #header>
            <div class="card-header-wrap">
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
              <el-button v-else class="button-new-tag ml-1" @click="showInput"> + 增加标签 </el-button>
            </div>
          </template>
          <div class="full-screen-container" style="z-index: 9999">
            <Toolbar
              style="border-bottom: 1px solid #cccccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              :mode="mode"
            />
            <Editor
              style="height: 500px; overflow-y: hidden"
              v-model="valueHtml"
              :defaultConfig="editorConfig"
              :mode="mode"
              @on-created="handleCreated"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
#article-container {
  position: relative;
}
:deep() {
  .el-card {
    box-sizing: border-box; // 消除border引起的滚动条
    height: calc($base-page-height - $base-padding * 2);
    overflow: hidden;
	.card-header-wrap {
		display: flex;
		column-gap: 12px;
	}
    .el-card__body {
      box-sizing: border-box;

      // 要设置固定高度，overflow: auto才会出现滚动条
      height: calc($base-page-height - $base-padding * 2 - 70px);
      padding: 10px;
      overflow: auto;
      .full-screen-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;

        // 解决全屏后底部按钮出现其它元素，设置背景色遮盖
        .card-footer {
          padding: 10px;
          background-color: #ffffff;
        }
      }
    }
  }
}
</style>
