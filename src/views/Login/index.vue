<script setup lang="ts">
import { ref } from 'vue';
import { LoginAccount, LoginPhone } from './components';
// 是账号还是手机号模式
// 因为被编译到setup函数中，可以直接访问顶层定义的属性和方法，不用return
const activeModel = ref('account');
const toPage = () => {
	window.location.href = 'https://beian.miit.gov.cn/';
};
</script>

<template>
	<div id="login">
		<div class="login-container">
			<header>
				<div class="header-logo">
					<a href="javascript:;">
						<img class="logo" src="@/assets/images/logo.jpg" alt="" />
						<span class="title">BaoJun</span>
					</a>
				</div>
				<div class="header-desc">这是一个程序员的试验田，喜欢给个star～～</div>
			</header>
			<div class="info">
				<!-- stretch设置文字下面的那条蓝线：平均宽度 -->
				<el-tabs stretch v-model="activeModel">
					<el-tab-pane label="账号密码登陆" name="account">
						<LoginAccount></LoginAccount>
					</el-tab-pane>
					<el-tab-pane label="手机号登陆" name="phone">
						<LoginPhone></LoginPhone>
					</el-tab-pane>
				</el-tabs>
			</div>
			<footer @click="toPage"><span>闽ICP备19000630号-1</span></footer>
		</div>
	</div>
</template>

<style lang="scss" scoped>
#login {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	background: #ffffff url('@/assets/svg/background.svg') no-repeat 60px 60px;

	// 这里为什么增加一层login-container
	// 解决flex子元素顶部内容被遮住
	// 给子元素设置margin: auto;来解决，且这种解决方案是在只有一个子元素的情况下才生效。
	.login-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: auto;
		header {
			.header-logo {
				display: flex;
				align-items: center;
				justify-content: center;
				a {
					text-decoration: none;
					.logo {
						height: 60px;
						margin-right: 16px;
						vertical-align: top;
						border-style: none;
					}
					.title {
						height: 60px;
						font-size: 30px;
						font-weight: 600;
						line-height: 60px;

						// 等价于rgba(0, 0, 0, 45%);
						// 新的颜色函数规范使用无逗号语法
						color: rgb(0 0 0 / 85%);
					}
				}
			}
			.header-desc {
				margin-top: 12px;
				margin-bottom: 40px;
				font-size: 14px;
				color: rgb(0 0 0 / 45%);
				text-align: center;
			}
		}
		footer {
			height: 80px;
			font-size: 12px;
			line-height: 80px;
			text-align: center;
			span {
				cursor: pointer;
			}
		}
	}
}
</style>
