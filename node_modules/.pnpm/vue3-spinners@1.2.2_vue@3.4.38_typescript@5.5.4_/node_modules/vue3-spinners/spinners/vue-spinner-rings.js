import { defineComponent, h } from 'vue';
import useSpinner, { spinnerProps } from '../utils/use-spinner.js';
const svg = [
    h('g', {
        fill: 'none',
        'fill-rule': 'evenodd',
        transform: 'translate(1 1)',
        'stroke-width': '2',
    }, [
        h('circle', {
            cx: '22',
            cy: '22',
            r: '6',
        }, [
            h('animate', {
                attributeName: 'r',
                begin: '1.5s',
                dur: '3s',
                values: '6;22',
                calcMode: 'linear',
                repeatCount: 'indefinite',
            }),
            h('animate', {
                attributeName: 'stroke-opacity',
                begin: '1.5s',
                dur: '3s',
                values: '1;0',
                calcMode: 'linear',
                repeatCount: 'indefinite',
            }),
            h('animate', {
                attributeName: 'stroke-width',
                begin: '1.5s',
                dur: '3s',
                values: '2;0',
                calcMode: 'linear',
                repeatCount: 'indefinite',
            }),
        ]),
        h('circle', {
            cx: '22',
            cy: '22',
            r: '6',
        }, [
            h('animate', {
                attributeName: 'r',
                begin: '3s',
                dur: '3s',
                values: '6;22',
                calcMode: 'linear',
                repeatCount: 'indefinite',
            }),
            h('animate', {
                attributeName: 'stroke-opacity',
                begin: '3s',
                dur: '3s',
                values: '1;0',
                calcMode: 'linear',
                repeatCount: 'indefinite',
            }),
            h('animate', {
                attributeName: 'stroke-width',
                begin: '3s',
                dur: '3s',
                values: '2;0',
                calcMode: 'linear',
                repeatCount: 'indefinite',
            }),
        ]),
        h('circle', {
            cx: '22',
            cy: '22',
            r: '8',
        }, [
            h('animate', {
                attributeName: 'r',
                begin: '0s',
                dur: '1.5s',
                values: '6;1;2;3;4;5;6',
                calcMode: 'linear',
                repeatCount: 'indefinite',
            }),
        ]),
    ]),
];
export default defineComponent({
    name: 'VueSpinnerRings',
    props: spinnerProps,
    setup(props) {
        const { cSize, classes, style } = useSpinner(props);
        return () => h('svg', {
            style: style.value,
            class: classes.value,
            stroke: 'currentColor',
            width: cSize.value,
            height: cSize.value,
            viewBox: '0 0 45 45',
            xmlns: 'http://www.w3.org/2000/svg',
        }, svg);
    },
});
