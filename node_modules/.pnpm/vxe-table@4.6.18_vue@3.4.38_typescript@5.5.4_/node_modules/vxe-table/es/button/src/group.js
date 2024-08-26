import { defineComponent, h, provide } from 'vue';
import GlobalConfig from '../../v-x-e-table/src/conf';
import XEUtils from 'xe-utils';
import VxeButtonComponent from './button';
import { useSize } from '../../hooks/size';
export default defineComponent({
    name: 'VxeButtonGroup',
    props: {
        options: Array,
        mode: String,
        status: String,
        round: Boolean,
        circle: Boolean,
        className: [String, Function],
        disabled: Boolean,
        size: { type: String, default: () => GlobalConfig.buttonGroup.size || GlobalConfig.size }
    },
    emits: [
        'click'
    ],
    setup(props, context) {
        const { slots, emit } = context;
        const xID = XEUtils.uniqueId();
        const computeMaps = {};
        const $xebuttongroup = {
            xID,
            props,
            context,
            getComputeMaps: () => computeMaps
        };
        useSize(props);
        const buttonGroupMethods = {
            dispatchEvent(type, params, evnt) {
                emit(type, Object.assign({ $buttonGroup: $xebuttongroup, $event: evnt }, params));
            }
        };
        const buttonGroupPrivateMethods = {
            handleClick(params, evnt) {
                const { options } = props;
                const { name } = params;
                const option = options ? options.find(item => item.name === name) : null;
                buttonGroupMethods.dispatchEvent('click', Object.assign(Object.assign({}, params), { option }), evnt);
            }
        };
        Object.assign($xebuttongroup, buttonGroupMethods, buttonGroupPrivateMethods);
        const renderVN = () => {
            const { className, options } = props;
            const defaultSlot = slots.default;
            return h('div', {
                class: ['vxe-button-group', className ? (XEUtils.isFunction(className) ? className({ $buttonGroup: $xebuttongroup }) : className) : '']
            }, defaultSlot ? defaultSlot({}) : (options ? options.map((item, index) => {
                return h(VxeButtonComponent, Object.assign({ key: index }, item));
            }) : []));
        };
        $xebuttongroup.renderVN = renderVN;
        provide('$xebuttongroup', $xebuttongroup);
        return renderVN;
    }
});
