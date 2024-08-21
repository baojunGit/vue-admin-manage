<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { User,Lock,Edit } from '@element-plus/icons-vue';
import { useUserStore } from '@/store/modules/user';
import { getCode } from '@/api/login';
import { errorMessage } from '@/utils/message';
import { checkcodeImg } from '@/config/getImg';

const userStore = useUserStore();
const { setLogin } = userStore;
const router = useRouter();

const checkPassword = (_, value, callback) => {
	if (value === '') callback(new Error('密码不能为空'));
	if (value.length < 6) callback(new Error('密码长度必须不少于六位'));
	callback();
};

const checkVerifyCode = (_, value, callback) => {
	if (value === '') callback(new Error('验证码不能为空'));
	callback();
};

const formRef = ref(null);
const imgUrl = ref('');
const form = ref({
	username: 'admin', // 用户名
	password: '123456', // 密码
	verifyCode: '', // 验证码
	captchaId: ''
});
const loading = ref(false);
const rules = ref({
	username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
	password: [{ required: true, trigger: 'blur', validator: checkPassword }],
	verifyCode: [
		{ required: true, trigger: 'blur', validator: checkVerifyCode }
	]
});

// 获取&刷新验证码
const refreshGetVerify = async () => {
	const {
		code,
		msg,
		data: { img, id }
	} = await getCode();
	if (code !== 0) errorMessage(msg);
	imgUrl.value = img;
	form.value.captchaId = id;
};

refreshGetVerify();

const changeCode = (): void => {
	refreshGetVerify();
};

// 提交账户信息登陆
const submit = () => {
	formRef.value?.validate(async valid => {
		if (!valid) return;
		try {
			loading.value = true;
			await setLogin(form.value);
			router.push('/home');
		} finally {
			loading.value = false;
			refreshGetVerify();
		}
	});
};

const remenberMe = ref(false); // 是否自动登陆

</script>

<template>
	<div class="login-account">
		<el-form
			style="width: 350px"
			ref="formRef"
			status-icon
			:rules="rules"
			:model="form"
		>
			<el-form-item prop="username">
				<el-input
					v-model="form.username"
					placeholder="请输入账号"
					clearable
					size="large"
					:prefix-icon="User"
					@keyup.enter="submit"
				></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input
					v-model="form.password"
					placeholder="请输入密码"
					clearable
					size="large"
					:prefix-icon="Lock"
					@keyup.enter="submit"
				>
				</el-input>
			</el-form-item>
			<el-form-item prop="verifyCode">
				<el-row style="width: 100%" justify="space-between">
					<el-col :span="14">
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
					<el-col :span="9">
						<div class="picture">
							<img
								v-if="imgUrl"
								class="code"
								:src="imgUrl"
								@click="changeCode"
							/>
							<img
								v-else
								class="code"
								:src="checkcodeImg"
								@click="changeCode"
							/>
						</div>
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
							<a> 忘记密码 </a>
						</router-link>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item>
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

<style lang="scss" scoped>
.picture {
	width: 100%;
	height: 100%;
	.code {
		float: right;
	}
}
</style>
