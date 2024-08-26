import { defineComponent, h, computed, inject } from 'vue';
import XEUtils from 'xe-utils';
import { getFuncText } from '../../tools/utils';
import GlobalConfig from '../../v-x-e-table/src/conf';
import { useSize } from '../../hooks/size';
export default defineComponent({
    name: 'VxeCheckbox',
    props: {
        modelValue: [String, Number, Boolean],
        label: { type: [String, Number], default: null },
        indeterminate: Boolean,
        title: [String, Number],
        checkedValue: { type: [String, Number, Boolean], default: true },
        uncheckedValue: { type: [String, Number, Boolean], default: false },
        content: [String, Number],
        disabled: Boolean,
        size: { type: String, default: () => GlobalConfig.checkbox.size || GlobalConfig.size }
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
        const $xecheckbox = {
            xID,
            props,
            context
        };
        let checkboxMethods = {};
        const computeSize = useSize(props);
        const $xecheckboxgroup = inject('$xecheckboxgroup', null);
        const computeIsChecked = computed(() => {
            if ($xecheckboxgroup) {
                return XEUtils.includes($xecheckboxgroup.props.modelValue, props.label);
            }
            return props.modelValue === props.checkedValue;
        });
        const computeIsDisabled = computed(() => {
            if (props.disabled) {
                return true;
            }
            if ($xecheckboxgroup) {
                const { props: groupProps } = $xecheckboxgroup;
                const { computeIsMaximize } = $xecheckboxgroup.getComputeMaps();
                const isMaximize = computeIsMaximize.value;
                const isChecked = computeIsChecked.value;
                return groupProps.disabled || (isMaximize && !isChecked);
            }
            return false;
        });
        const changeEvent = (evnt) => {
            const { checkedValue, uncheckedValue } = props;
            const isDisabled = computeIsDisabled.value;
            if (!isDisabled) {
                const checked = evnt.target.checked;
                const value = checked ? checkedValue : uncheckedValue;
                const params = { checked, value, label: props.label };
                if ($xecheckboxgroup) {
                    $xecheckboxgroup.handleChecked(params, evnt);
                }
                else {
                    emit('update:modelValue', value);
                    checkboxMethods.dispatchEvent('change', params, evnt);
                    // 自动更新校验状态
                    if ($xeform && $xeformiteminfo) {
                        $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, value);
                    }
                }
            }
        };
        checkboxMethods = {
            dispatchEvent(type, params, evnt) {
                emit(type, Object.assign({ $checkbox: $xecheckbox, $event: evnt }, params));
            }
        };
        Object.assign($xecheckbox, checkboxMethods);
        const renderVN = () => {
            const vSize = computeSize.value;
            const isDisabled = computeIsDisabled.value;
            const isChecked = computeIsChecked.value;
            const indeterminate = props.indeterminate;
            return h('label', {
                class: ['vxe-checkbox', {
                        [`size--${vSize}`]: vSize,
                        'is--indeterminate': indeterminate,
                        'is--disabled': isDisabled,
                        'is--checked': isChecked
                    }],
                title: props.title
            }, [
                h('input', {
                    class: 'vxe-checkbox--input',
                    type: 'checkbox',
                    disabled: isDisabled,
                    checked: isChecked,
                    onChange: changeEvent
                }),
                h('span', {
                    class: ['vxe-checkbox--icon', indeterminate ? 'vxe-icon-checkbox-indeterminate' : (isChecked ? 'vxe-icon-checkbox-checked' : 'vxe-icon-checkbox-unchecked')]
                }),
                h('span', {
                    class: 'vxe-checkbox--label'
                }, slots.default ? slots.default({}) : getFuncText(props.content))
            ]);
        };
        $xecheckbox.renderVN = renderVN;
        return $xecheckbox;
    },
    render() {
        return this.renderVN();
    }
});
