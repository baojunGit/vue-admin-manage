import { defineComponent, h, onUnmounted, provide, inject, ref, onMounted } from 'vue';
import { createOption, watchOption, destroyOption, assemOption } from './util';
export default defineComponent({
    name: 'VxeOptgroup',
    props: {
        label: { type: [String, Number, Boolean], default: '' },
        visible: { type: Boolean, default: null },
        className: [String, Function],
        disabled: Boolean
    },
    setup(props, { slots }) {
        const elem = ref();
        const $xeselect = inject('$xeselect', {});
        const option = createOption($xeselect, props);
        const xeoption = { option };
        option.options = [];
        provide('xeoptgroup', xeoption);
        watchOption(props, option);
        onMounted(() => {
            assemOption($xeselect, elem.value, option);
        });
        onUnmounted(() => {
            destroyOption($xeselect, option);
        });
        return () => {
            return h('div', {
                ref: elem
            }, slots.default ? slots.default() : []);
        };
    }
});
