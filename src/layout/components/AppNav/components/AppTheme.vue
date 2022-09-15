<script setup lang="ts">
import { reactive, toRefs } from 'vue';
// import { Sunny, Moon } from '@element-plus/icons-vue'

const state = reactive({
	drawer: false
});

const openDrawer = () => {
	state.drawer = true;
};

const { drawer } = toRefs(state);
</script>

<template>
	<div class="my-theme">
		<i class="iconfont icon-tubiao02-xianxing" @click="openDrawer"></i>
		<!-- append-to-body 让层级最高 -->
		<el-drawer
			title="项目配置"
			v-model="drawer"
			direction="rtl"
			size="350px"
			append-to-body
		>
			<!-- height="88vh" -->
			<el-scrollbar>
				<el-form ref="form" label-position="left">
					<el-divider><h3>换肤配置</h3></el-divider>
					<!-- <el-form-item label="主题颜色">
            <el-switch
              style="color: #409eff"
              v-model="theme.model"
              class="mt-2"
              inline-prompt
              :active-icon="Sunny"
              :inactive-icon="Moon"
              active-value="light"
              inactive-value="dark"
              @change="updateTheme"
            />
          </el-form-item> -->
					<el-form-item label="主题颜色">
						<el-select>
							<el-option label="浅色" value="light" key="light"></el-option>
							<el-option label="深色" value="dark" key="dark"></el-option>
							<el-option
								label="蓝黑"
								value="blueBlack"
								key="blueBlack"
							></el-option>
							<el-option
								label="蓝白"
								value="blueWhite"
								key="blueWhite"
							></el-option>
							<el-option
								label="绿黑"
								value="greenBlack"
								key="greenBlack"
							></el-option>
							<el-option
								label="绿白"
								value="greenWhite"
								key="greenWhite"
							></el-option>
							<el-option
								label="紫黑"
								value="purpleBlack"
								key="purpleBlack"
							></el-option>
							<el-option
								label="紫白"
								value="purpleWhite"
								key="purpleWhite"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="菜单背景">
						<el-radio-group>
							<el-radio-button class="none" label="none" />
							<el-radio-button class="app-image" label="app-image" />
						</el-radio-group>
					</el-form-item>
				</el-form>
			</el-scrollbar>
			<!-- <template #footer>
        <el-button type="primary" @click="handleSaveTheme"> 保存 </el-button>
        <el-button @click="setDefaultTheme"> 恢复默认 </el-button>
      </template> -->
		</el-drawer>
	</div>
</template>

<style lang="scss">
.el-radio-button {
	display: block;
	float: left;
	width: 80px;
	height: 80px;
	margin: 10px;
	cursor: pointer;
	border-radius: 5px;
	&.is-disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}
	&.is-active {
		box-shadow: 0 0 2px 2px #1890ff;
	}
	.el-radio-button__orig-radio,
	.el-radio-button__inner {
		display: none;
	}
	&.none {
		font-family: remixicon, sans-serif !important;
		font-size: 16px;
		font-weight: 580;
		line-height: 80px;
		text-align: center;
		background: #f7f7f7 none;
		background-size: cover;
		&::before {
			// 这个要怎么显示出图案
			content: '\eace';
		}
	}
	&.app-image {
		background: url('~@/assets/image/menu-background.png');
		background-size: cover;
	}
}
</style>
