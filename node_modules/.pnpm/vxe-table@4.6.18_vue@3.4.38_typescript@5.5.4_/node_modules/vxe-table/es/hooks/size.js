import { computed, inject, provide } from 'vue';
export function useSize(props) {
    // 组件尺寸上下文
    const xesize = inject('xesize', null);
    const computeSize = computed(() => {
        return props.size || (xesize ? xesize.value : null);
    });
    provide('xesize', computeSize);
    return computeSize;
}
