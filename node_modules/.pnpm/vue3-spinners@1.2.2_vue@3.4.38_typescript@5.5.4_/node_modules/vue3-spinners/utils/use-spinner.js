import { outdent } from 'outdent';
import styleInject from 'style-inject';
import { computed } from 'vue';
export const spinnerProps = {
    size: {
        type: [Number, String],
        default: '1em',
    },
    color: String,
};
let isStyleInjected = false;
export default function useSpinner(props) {
    if (!isStyleInjected) {
        const spinnerCSS = outdent `
			.vue-spinner {
				vertical-align: middle;
			}
		`;
        styleInject(spinnerCSS);
        isStyleInjected = true;
    }
    return {
        cSize: computed(() => props.size),
        classes: computed(() => 'vue-spinner'),
        style: computed(() => ({ color: props.color })),
    };
}
