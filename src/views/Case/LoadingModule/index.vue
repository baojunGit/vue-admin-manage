<script setup lang="ts">
const loadingList = [
	{
		name: 'VueSpinner',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerAudio',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerBall',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerBar',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerBars',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerBeat',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerBounce',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerBox',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerCircle',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerClimbingBox',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerClip',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerClock',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerComment',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerCore',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerDot',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerDots',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerFacebook',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerFade',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerGears',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerGrid',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerGridPop',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerHearts',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerHourglass',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerInfinity',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerIos',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerMoon',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerOrbit',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerOval',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerPacman',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerPie',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerPropagate',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerPuff',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerPulse',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerRadio',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerRing',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerRings',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerRise',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerRotate',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerScale',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerSkew',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerSquare',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerSync',
		color: '#409eff'
	},
	{
		name: 'VueSpinnerTail',
		color: '#409eff'
	}
];
</script>

<template>
	<div id="loading-module-container">
		<div v-for="({ name, color }, index) in loadingList" :key="index">
			<AppLoading :name="name" :color="color" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
#loading-module-container {
	display: flex;
	flex-wrap: wrap;
	row-gap: 20px;
	column-gap: 20px;
	padding-bottom: 20px;
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 200px;
		height: 200px;
		background-color: #cccccc;
	}
}
</style>
