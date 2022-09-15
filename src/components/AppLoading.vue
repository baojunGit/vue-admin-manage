<!-- @see https://github.com/leonzalion/vue3-spinners -->
<script setup lang="ts">
import {
	VueSpinner,
	VueSpinnerAudio,
	VueSpinnerBall,
	VueSpinnerBar,
	VueSpinnerBars,
	VueSpinnerBeat,
	VueSpinnerBounce,
	VueSpinnerBox,
	VueSpinnerCircle,
	VueSpinnerClimbingBox,
	VueSpinnerClip,
	VueSpinnerClock,
	VueSpinnerComment,
	VueSpinnerCore,
	VueSpinnerDot,
	VueSpinnerDots,
	VueSpinnerFacebook,
	VueSpinnerFade,
	VueSpinnerGears,
	VueSpinnerGrid,
	VueSpinnerGridPop,
	VueSpinnerHearts,
	VueSpinnerHourglass,
	VueSpinnerInfinity,
	VueSpinnerIos,
	VueSpinnerMoon,
	VueSpinnerOrbit,
	VueSpinnerOval,
	VueSpinnerPacman,
	VueSpinnerPie,
	VueSpinnerPropagate,
	VueSpinnerPuff,
	VueSpinnerPulse,
	VueSpinnerRadio,
	VueSpinnerRing,
	VueSpinnerRings,
	VueSpinnerRise,
	VueSpinnerRotate,
	VueSpinnerScale,
	VueSpinnerSkew,
	VueSpinnerSquare,
	VueSpinnerSync,
	VueSpinnerTail
} from 'vue3-spinners';

interface propsType {
	color?: string;
	name?: string;
	size?: string;
}
// withDefaults是给defineProps绑定默认值的api
// 没用到props就不用声明const props = xxx
withDefaults(defineProps<propsType>(), {
	color: '#409eff',
	name: 'VueSpinner',
	size: '40'
});
</script>

<template>
	<div id="app-loading">
		<VueSpinner v-if="name === 'VueSpinner'" :color="color" :size="size" />
		<VueSpinnerAudio
			v-if="name === 'VueSpinnerAudio'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerBall
			v-if="name === 'VueSpinnerBall'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerBar
			v-if="name === 'VueSpinnerBar'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerBars
			v-if="name === 'VueSpinnerBars'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerBeat
			v-if="name === 'VueSpinnerBeat'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerBounce
			v-if="name === 'VueSpinnerBeat'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerBox
			v-if="name === 'VueSpinnerBox'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerCircle
			v-if="name === 'VueSpinnerCircle'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerClimbingBox
			v-if="name === 'VueSpinnerClimbingBox'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerClip
			v-if="name === 'VueSpinnerClip'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerClock
			v-if="name === 'VueSpinnerClock'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerComment
			v-if="name === 'VueSpinnerComment'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerCore
			v-if="name === 'VueSpinnerCore'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerDot
			v-if="name === 'VueSpinnerDot'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerDots
			v-if="name === 'VueSpinnerDots'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerDots
			v-if="name === 'VueSpinnerDots'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerFacebook
			v-if="name === 'VueSpinnerFacebook'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerFade
			v-if="name === 'VueSpinnerFade'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerGears
			v-if="name === 'VueSpinnerGears'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerGrid
			v-if="name === 'VueSpinnerGrid'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerGridPop
			v-if="name === 'VueSpinnerGridPop'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerHearts
			v-if="name === 'VueSpinnerHearts'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerHourglass
			v-if="name === 'VueSpinnerHourglass'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerInfinity
			v-if="name === 'VueSpinnerInfinity'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerIos
			v-if="name === 'VueSpinnerIos'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerMoon
			v-if="name === 'VueSpinnerMoon'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerOrbit
			v-if="name === 'VueSpinnerOrbit'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerOval
			v-if="name === 'VueSpinnerOval'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerPacman
			v-if="name === 'VueSpinnerPacman'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerPie
			v-if="name === 'VueSpinnerPie'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerPropagate
			v-if="name === 'VueSpinnerPropagate '"
			:color="color"
			:size="size"
		/>
		<VueSpinnerPuff
			v-if="name === 'VueSpinnerPuff'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerPulse
			v-if="name === 'VueSpinnerPulse'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerRadio
			v-if="name === 'VueSpinnerRadio'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerRing
			v-if="name === 'VueSpinnerRing'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerRings
			v-if="name === 'VueSpinnerRings'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerRise
			v-if="name === 'VueSpinnerRise'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerRotate
			v-if="name === 'VueSpinnerRotate '"
			:color="color"
			:size="size"
		/>
		<VueSpinnerScale
			v-if="name === 'VueSpinnerScale'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerSkew
			v-if="name === 'VueSpinnerSkew'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerSquare
			v-if="name === 'VueSpinnerSquare'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerSync
			v-if="name === 'VueSpinnerSync'"
			:color="color"
			:size="size"
		/>
		<VueSpinnerTail
			v-if="name === 'VueSpinnerTail'"
			:color="color"
			:size="size"
		/>
	</div>
</template>
