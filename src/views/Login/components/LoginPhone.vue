<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Cellphone,Edit } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();
const { setLogin } = userStore;
const router = useRouter();

// 验证手机号格式
const checkPhone = (_, value, callback) => {
	if (
		value &&
		new RegExp(
			/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
		).test(value)
	) {
		callback();
	} else {
		callback('请输入正确手机号！');
	}
};

const checkVerifyCode = (_, value, callback) => {
	// 使用正则表达式检查是否为纯数字字符串
	const numRegex = /^\d+$/;
	if (value === '') callback(new Error('手机验证码不能为空'));
	if (!numRegex.test(value)) callback(new Error('手机验证码必须是数字'));
	callback();
};

const formRef = ref(null);
const form = ref({
	telephone: '',
	verifyCode: '' // 验证码
});
const loading = ref(false);
const rules = ref({
	telephone: [
		{
			required: true,
			trigger: 'blur',
			validator: checkPhone
		}
	],
	verifyCode: [
		{ required: true, trigger: 'blur', validator: checkVerifyCode }
	]
});
const time = ref(60);
const smsSendBtn = ref(false);

// 输入正确的手机号，获取手机验证码
const getCaptcha = () => {
	formRef.value?.validateField('telephone', err => {
		if (!err) {
			smsSendBtn.value = true;
			const interval = window.setInterval(() => {
				if (time.value-- <= 0) {
					time.value = 60;
					smsSendBtn.value = false;
					window.clearInterval(interval);
				}
			}, 1000);
		}
	});
};

// 提交账户信息登陆
const submit = async () => {
	formRef.value?.validate(async valid => {
		if (!valid) return;
		try {
			loading.value = true;
			await setLogin(form.value);
			router.push('/home');
		} finally {
			loading.value = false;
		}
	});
};

const remenberMe = ref(false); // 是否自动登陆

</script>

<template>
	<div class="login-phone">
		<el-form
			style="width: 350px"
			ref="formRef"
			status-icon
			:rules="rules"
			:model="form"
		>
			<el-form-item prop="telephone">
				<el-input
					v-model="form.telephone"
					clearable
					size="large"
					placeholder="手机号"
					:prefix-icon="Cellphone"
					@keyup.enter="submit"
				></el-input>
			</el-form-item>
			<el-form-item prop="verifyCode">
				<el-row style="width: 100%" justify="space-between">
					<el-col :span="15">
						<el-input
							size="large"
							v-model.trim="form.verifyCode"
							placeholder="请输入验证码"
							clearable
							text
							:prefix-icon="Edit"
							@keyup.enter="submit"
						>
						</el-input>
					</el-col>
					<el-col :span="8">
						<el-button
							style="width: 100%"
							size="large"
							:disabled="smsSendBtn"
							@click="getCaptcha"
						>
							{{ (!smsSendBtn && '获取验证码') || time + 's' }}
						</el-button>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item>
				<el-row style="width: 100%" justify="space-between">
					<el-col :span="6">
						<el-checkbox v-model="remenberMe"> 自动登陆 </el-checkbox>
					</el-col>
					<el-col :span="4">
						<router-link :to="{ name: 'login' }">
							<a> 忘记密码</a>
						</router-link>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item>
				<!-- @click.stop: 阻止事件冒泡 -->
				<el-button
					size="large"
					type="primary"
					class="login-button"
					:loading="loading"
					style="width: 100%"
					@click="submit"
				>
					登陆
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
