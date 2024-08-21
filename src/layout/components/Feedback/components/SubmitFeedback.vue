<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
const options = ref([
	{
		value: 'API接口',
		label: 'API接口'
	},
	{
		value: '项目级度量',
		label: '项目级度量'
	},
	{
		value: '研发中心度量',
		label: '研发中心度量'
	},
	{
		value: '自助查询',
		label: '自助查询'
	},
	{
		value: '组织级度量',
		label: '组织级度量'
	}
]);
const radio = ref(3);
const checked = ref(false);
const desc = ref('');
</script>

<template>
	<div class="submit-feedback-container">
		<el-form style="width: 100%">
			<el-form-item>
				<el-select
					v-model="value"
					style="width: 100%"
					filterable
					placeholder="请选择功能模块"
				>
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-row style="width: 100%" justify="space-between">
					<el-radio-group v-model="radio">
						<el-radio :label="3"> 问题 </el-radio>
						<el-radio :label="6"> 建议 </el-radio>
					</el-radio-group>
					<el-checkbox
						v-model="checked"
						label="紧急"
						v-if="radio != 6"
					></el-checkbox>
				</el-row>
			</el-form-item>
			<el-form-item>
				<el-input
					v-model="desc"
					type="textarea"
					:input-style="{ height: '140px' }"
					:row="5"
					show-word-limit
					maxlength="1000"
					placeholder="为更快更好解决您的困惑，请尽量详细描述反馈内容（请勿输入保密信息）。"
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button round> 保存 </el-button>
				<el-button round type="primary"> 提交 </el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<style lang="scss" scoped>
.submit-feedback-container {
	display: flex;
	justify-content: center;
}
</style>
