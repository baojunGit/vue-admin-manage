<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

interface Props {
  startVal?: number;
  endVal?: number;
  duration?: number;
  autoplay?: boolean;
  decimals?: number;
  decimal?: string;
  separator?: string;
  prefix?: string;
  suffix?: string;
  color?: string;
  fontSize?: string;
  useEasing?: boolean;
  easingFn?: (t: number, b: number, c: number, d: number) => number;
}

const props = withDefaults(defineProps<Props>(), {
  startVal: 0,
  endVal: 2021,
  duration: 3000,
  autoplay: true,
  decimals: 0,
  decimal: '.',
  separator: ',',
  prefix: '',
  suffix: '',
  color: '',
  fontSize: '16px',
  useEasing: true,
  easingFn: (t: number, b: number, c: number, d: number) => {
    return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
  },
});

const emit = defineEmits(['mounted', 'callback']);

const formatNumber = (num: number | string) => {
  num = Number(num).toFixed(props.decimals);
  let [x1, x2] = num.split('.');
  x2 = x2 ? props.decimal + x2 : '';
  const rgx = /(\d+)(\d{3})/;
  if (props.separator) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + props.separator + '$2');
    }
  }
  return props.prefix + x1 + x2 + props.suffix;
};

const count = (timestamp: number) => {
  if (!startTime.value) startTime.value = timestamp;
  const progress = timestamp - startTime.value;
  remaining.value = localDuration.value - progress;

  if (props.useEasing) {
    if (getCountDown.value) {
      printVal.value =
        localStartVal.value -
        props.easingFn(
          progress,
          0,
          localStartVal.value - props.endVal,
          localDuration.value
        );
    } else {
      printVal.value = props.easingFn(
        progress,
        localStartVal.value,
        props.endVal - localStartVal.value,
        localDuration.value
      );
    }
  } else {
    if (getCountDown.value) {
      printVal.value =
        localStartVal.value -
        (localStartVal.value - props.endVal) * (progress / localDuration.value);
    } else {
      printVal.value =
        localStartVal.value +
        (props.endVal - localStartVal.value) * (progress / localDuration.value);
    }
  }

  printVal.value = getCountDown.value
    ? Math.max(printVal.value, props.endVal)
    : Math.min(printVal.value, props.endVal);

  displayValue.value = formatNumber(printVal.value);

  if (progress < localDuration.value) {
    rAF.value = requestAnimationFrame(count);
  } else {
    emit('callback');
  }
};

const start = () => {
  localStartVal.value = props.startVal;
  startTime.value = null;
  localDuration.value = props.duration;
  paused.value = false;
  rAF.value = requestAnimationFrame(count);
};

const localStartVal = ref(props.startVal);
const displayValue = ref(formatNumber(props.startVal));
const printVal = ref<number | null>(null);
const startTime = ref<number | null>(null);
const rAF = ref<number | null>(null);
const remaining = ref<number | null>(null);
const paused = ref(false);
const color = ref(props.color);
const fontSize = ref(props.fontSize);
const localDuration = ref(props.duration);

watch(
  () => [props.startVal, props.endVal],
  () => {
    if (props.autoplay) {
      start();
    }
  },
  { immediate: true }
);



const getCountDown = computed(() => props.startVal > props.endVal);

onMounted(() => {
  if (props.autoplay) {
    start();
  }
  emit('mounted');
});
</script>

<template>
  <span class="app-count-to" :style="{ color: color, fontSize: fontSize }">
    {{ displayValue }}
  </span>
</template>
