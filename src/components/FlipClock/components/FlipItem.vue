<script setup lang="ts">
import { ref } from 'vue';
const frontText = ref(0);
const backText = ref(1);
const duration = ref(600);
const isFlipping = ref(false); // 翻转状态
const flipType = ref('down'); // 翻转方向

const textClass = (number: number) => {
	return 'number' + number;
};
const flip = (type: string, front: number, back: number) => {
	// console.log(frontText.value)
	// console.log(front)
	// 如果处于翻转中，则不执行
	if (isFlipping.value) return false;
	frontText.value = front;

	backText.value = back;
	// 根据传递过来的type设置翻转方向
	flipType.value = type;
	// 设置翻转状态为true
	isFlipping.value = true;
	setTimeout(() => {
		isFlipping.value = false;
		frontText.value = back;
	}, duration.value);
};
// 下翻牌
const flipDown = (front: any, back: any): void => {
	flip('down', front, back);
};
// 上翻牌
const flipUp = (front: any, back: any): void => {
	flip('up', front, back);
};

// 设置前牌文字
const setFront = (text: number): void => {
	frontText.value = text;
};
// 设置后牌文字
const setBack = (text: number): void => {
	backText.value = text;
};

defineExpose({
	flipDown,
	flipUp,
	setFront,
	setBack
});
</script>

<template>
	<div :class="`m-flipper ${flipType} ${isFlipping ? 'go' : ''}`">
		<div :class="`digital front ${textClass(frontText)}`"></div>
		<div :class="`digital back ${textClass(backText)}`"></div>
	</div>
</template>

<style lang="scss" scoped>
.m-flipper {
	position: relative;
	display: inline-block;
	width: 60px;
	height: 100px;
	font-family: 'Helvetica Neue';
	font-size: 66px;
	line-height: 100px;
	color: #ffffff;
	text-align: center;
	background: #ffffff;
	border: solid 1px #000000;
	border-radius: 10px;
	box-shadow: 0 0 6px rgb(0 0 0 / 50%);
	.digital::before,
	.digital::after {
		position: absolute;
		right: 0;
		left: 0;
		box-sizing: border-box;
		overflow: hidden;
		content: '';
		background: #000000;
	}
	.digital::before {
		top: 0;
		bottom: 50%;
		border-bottom: solid 1px #666666;
		border-radius: 10px 10px 0 0;
	}
	.digital::after {
		top: 50%;
		bottom: 0;
		line-height: 0;
		border-radius: 0 0 10px 10px;
	}

	/* 向下翻 */
	&.down {
		.front::after,
		.back::before {
			z-index: 1;
		}
		.front::before {
			z-index: 3;
		}
		.back::after {
			z-index: 2;
			transform: perspective(160px) rotateX(180deg);
			transform-origin: 50% 0%;
		}
		&.go {
			.front::before {
				box-shadow: 0 -2px 6px rgb(255 255 255 / 30%);
				transform-origin: 50% 100%;
				animation: front-flip-down 0.6s ease-in-out both;
				backface-visibility: hidden;
			}
			.back::after {
				animation: back-flip-down 0.6s ease-in-out both;
			}
		}
	}

	/* 向上翻 */
	&.up {
		.front::after {
			z-index: 3;
		}
		.front::before,
		.back::after {
			z-index: 1;
		}
		&.go {
			.front::after {
				box-shadow: 0 2px 6px rgb(255 255 255 / 30%);
				transform-origin: 50% 0;
				animation: front-flip-up 0.6s ease-in-out both;
				backface-visibility: hidden;
			}
			.back::before {
				animation: back-flip-up 0.6s ease-in-out both;
			}
		}
	}
	.number0::before,
	.number0::after {
		content: '0';
	}
	.number1::before,
	.number1::after {
		content: '1';
	}
	.number2::before,
	.number2::after {
		content: '2';
	}
	.number3::before,
	.number3::after {
		content: '3';
	}
	.number4::before,
	.number4::after {
		content: '4';
	}
	.number5::before,
	.number5::after {
		content: '5';
	}
	.number6::before,
	.number6::after {
		content: '6';
	}
	.number7::before,
	.number7::after {
		content: '7';
	}
	.number8::before,
	.number8::after {
		content: '8';
	}
	.number9::before,
	.number9::after {
		content: '9';
	}
}

@keyframes front-flip-down {
	0% {
		transform: perspective(160px) rotateX(0deg);
	}
	100% {
		transform: perspective(160px) rotateX(-180deg);
	}
}

@keyframes back-flip-down {
	0% {
		transform: perspective(160px) rotateX(180deg);
	}
	100% {
		transform: perspective(160px) rotateX(0deg);
	}
}

@keyframes front-flip-up {
	0% {
		transform: perspective(160px) rotateX(0deg);
	}
	100% {
		transform: perspective(160px) rotateX(180deg);
	}
}

@keyframes back-flip-up {
	0% {
		transform: perspective(160px) rotateX(-180deg);
	}
	100% {
		transform: perspective(160px) rotateX(0deg);
	}
}
</style>
