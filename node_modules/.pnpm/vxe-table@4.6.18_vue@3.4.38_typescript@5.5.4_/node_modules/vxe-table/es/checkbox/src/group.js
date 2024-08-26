import { defineComponent, h, provide, computed, inject } from 'vue';
import GlobalConfig from '../../v-x-e-table/src/conf';
import XEUtils from 'xe-utils';
import VxeCheckboxComponent from './checkbox';
import { useSize } from '../../hooks/size';
export default defineComponent({
    name: 'VxeCheckboxGroup',
    props: {
        modelValue: Array,
        options: Array,
        optionProps: Object,
        disabled: Boolean,
        max: { type: [String, Number], default: null },
        size: { type: String, default: () => GlobalConfig.checkboxGroup.size || GlobalConfig.size }
    },
    emits: [
        'update:modelValue',
        'change'
    ],
    setup(props, context) {
        const { slots, emit } = context;
        const $xeform = inject('$xeform', null);
        const $xeformiteminfo = inject('$xeformiteminfo', null);
        const xID = XEUtils.uniqueId();
        const computeIsMaximize = computed(() => {
            const { modelValue, max } = props;
            if (max) {
                return (modelValue ? modelValue.length : 0) >= XEUtils.toNumber(max);
            }
            return false;
        });
        const computePropsOpts = computed(() => {
            return props.optionProps || {};
        });
        const computeLabelField = computed(() => {
            const propsOpts = computePropsOpts.value;
            return propsOpts.label || 'label';
        });
        const computeValueField = computed(() => {
            const propsOpts = computePropsOpts.value;
            return propsOpts.value || 'value';
        });
        const computeDisabledField = computed(() => {
            const propsOpts = computePropsOpts.value;
            return propsOpts.disabled || 'disabled';
        });
        const computeMaps = {
            computeIsMaximize
        };
        const $xecheckboxgroup = {
            xID,
            props,
            context,
            getComputeMaps: () => computeMaps
        };
        useSize(props);
        const checkboxGroupMethods = {
            dispatchEvent(type, params, evnt) {
                emit(type, Object.assign({ $checkboxGroup: $xecheckboxgroup, $event: evnt }, params));
            }
        };
        const checkboxGroupPrivateMethods = {
            handleChecked(params, evnt) {
                const { checked, label } = params;
                const checklist = props.modelValue || [];
                const checkIndex = checklist.indexOf(label);
                if (checked) {
                    if (checkIndex === -1) {
                        checklist.push(label);
                    }
                }
                else {
                    checklist.splice(checkIndex, 1);
                }
                emit('update:modelValue', checklist);
                $xecheckboxgroup.dispatchEvent('change', Object.assign({ checklist }, params), evnt);
                // 自动更新校验状态
                if ($xeform && $xeformiteminfo) {
                    $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, checklist);
                }
            }
        };
        Object.assign($xecheckboxgroup, checkboxGroupMethods, checkboxGroupPrivateMethods);
        const renderVN = () => {
            const { options } = props;
            const defaultSlot = slots.default;
            const valueField = computeValueField.value;
            const labelField = computeLabelField.value;
            const disabledField = computeDisabledField.value;
            return h('div', {
                class: 'vxe-checkbox-group'
            }, defaultSlot ? defaultSlot({}) : (options ? options.map(item => {
                return h(VxeCheckboxComponent, {
                    label: item[valueField],
                    content: item[labelField],
                    disabled: item[disabledField]
                });
            }) : []));
        };
        $xecheckboxgroup.renderVN = renderVN;
        provide('$xecheckboxgroup', $xecheckboxgroup);
        return renderVN;
    }
});
