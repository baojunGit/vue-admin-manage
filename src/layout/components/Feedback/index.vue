<script setup lang="ts">
import { ref } from 'vue';
import { useFeedbackStore } from '@/store/modules/feedback';
import { useSettingStore } from '@/store/modules/setting';
import { storeToRefs } from 'pinia';
import SubmitFeedback from './components/SubmitFeedback.vue';

const feedbackStore = useFeedbackStore();
const settingStore = useSettingStore();
const { openFeedback } = storeToRefs(feedbackStore);
const { mobile } = storeToRefs(settingStore);

const activeName = ref('submitFeed');

const handleClick = () => {
	console.log('测试一下');
};
const wakeUpQQ = () => {
	// QQ唤醒功能介绍 https://shang.qq.com/v3/widget.html
	window.open('http://wpa.qq.com/msgrd?v=3&uin=1018440268&site=qq&menu=yes');
};
</script>

<template>
	<div class="app-feedback-container">
		<el-dialog
			:width="mobile ? '80%' : '50%'"
			title="提交反馈"
			:append-to-body="false"
			v-model="openFeedback"
		>
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane label="我要反馈" name="submitFeed">
					<SubmitFeedback></SubmitFeedback>
				</el-tab-pane>
				<el-tab-pane label="我的反馈" name="myFeed"></el-tab-pane>
			</el-tabs>
			<div class="call-online-service" @click="wakeUpQQ()">
				<el-image
					style="width: 16px; height: 16px; margin-right: 4px"
					fit="fill"
					src="http://img.lubaojun.com/app/img/feedback.png"
				></el-image>
				<span>在线客服</span>
			</div>
		</el-dialog>
	</div>
</template>

<style lang="scss" scoped>
.app-feedback-container {
	position: relative;
	.call-online-service {
		position: absolute;
		top: 94px;
		right: 30px;
		z-index: $base-z-index-max;
		color: $base-color-blue;
		cursor: pointer;
	}
}
</style>
