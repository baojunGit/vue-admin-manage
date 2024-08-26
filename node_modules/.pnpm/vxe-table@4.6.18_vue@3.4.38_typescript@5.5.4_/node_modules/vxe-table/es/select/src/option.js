import { defineComponent, h, onUnmounted, inject, ref, onMounted } from 'vue';
import { createOption, watchOption, destroyOption, assemOption } from './util';
export default defineComponent({
    name: 'VxeOption',
    props: {
        value: null,
        label: { type: [String, Number, Boolean], default: '' },
        visible: { type: Boolean, default: null },
        className: [String, Function],
        disabled: Boolean
    },
    setup(props, { slots }) {
        const elem = ref();
        const $xeselect = inject('$xeselect', {});
        const optgroup = inject('xeoptgroup', null);
        const option = createOption($xeselect, props);
        option.slots = slots;
        watchOption(props, option);
        onMounted(() => {
            assemOption($xeselect, elem.value, option, optgroup);
        });
        onUnmounted(() => {
            destroyOption($xeselect, option);
        });
        return () => {
            return h('div', {
                ref: elem
            });
        };
    }
});
