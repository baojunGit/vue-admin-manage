import { defineComponent, h, ref, computed, reactive, nextTick, createCommentVNode, inject } from 'vue';
import XEUtils from 'xe-utils';
import GlobalConfig from '../../v-x-e-table/src/conf';
import { useSize } from '../../hooks/size';
import { getFuncText } from '../../tools/utils';
export default defineComponent({
    name: 'VxeSwitch',
    props: {
        modelValue: [String, Number, Boolean],
        disabled: Boolean,
        size: { type: String, default: () => GlobalConfig.switch.size || GlobalConfig.size },
        openLabel: String,
        closeLabel: String,
        openValue: { type: [String, Number, Boolean], default: true },
        closeValue: { type: [String, Number, Boolean], default: false },
        openIcon: String,
        closeIcon: String,
        openActiveIcon: String,
        closeActiveIcon: String
    },
    emits: [
        'update:modelValue',
        'change',
        'focus',
        'blur'
    ],
    setup(props, context) {
        const { emit } = context;
        const $xeform = inject('$xeform', null);
        const $xeformiteminfo = inject('$xeformiteminfo', null);
        const xID = XEUtils.uniqueId();
        const computeSize = useSize(props);
        const reactData = reactive({
            isActivated: false,
            hasAnimat: false,
            offsetLeft: 0
        });
        const $xeswitch = {
            xID,
            props,
            context,
            reactData
        };
        const refButton = ref();
        let switchMethods = {};
        const computeOnShowLabel = computed(() => {
            return getFuncText(props.openLabel);
        });
        const computeOffShowLabel = computed(() => {
            return getFuncText(props.closeLabel);
        });
        const computeIsChecked = computed(() => {
            return props.modelValue === props.openValue;
        });
        let _atimeout;
        const clickEvent = (evnt) => {
            if (!props.disabled) {
                const isChecked = computeIsChecked.value;
                clearTimeout(_atimeout);
                const value = isChecked ? props.closeValue : props.openValue;
                reactData.hasAnimat = true;
                emit('update:modelValue', value);
                switchMethods.dispatchEvent('change', { value }, evnt);
                // 自动更新校验状态
                if ($xeform && $xeformiteminfo) {
                    $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, value);
                }
                _atimeout = setTimeout(() => {
                    reactData.hasAnimat = false;
                }, 400);
            }
        };
        const focusEvent = (evnt) => {
            reactData.isActivated = true;
            switchMethods.dispatchEvent('focus', { value: props.modelValue }, evnt);
        };
        const blurEvent = (evnt) => {
            reactData.isActivated = false;
            switchMethods.dispatchEvent('blur', { value: props.modelValue }, evnt);
        };
        switchMethods = {
            dispatchEvent(type, params, evnt) {
                emit(type, Object.assign({ $switch: $xeswitch, $event: evnt }, params));
            },
            focus() {
                const btnElem = refButton.value;
                reactData.isActivated = true;
                btnElem.focus();
                return nextTick();
            },
            blur() {
                const btnElem = refButton.value;
                btnElem.blur();
                reactData.isActivated = false;
                return nextTick();
            }
        };
        Object.assign($xeswitch, switchMethods);
        const renderVN = () => {
            const { disabled, openIcon, closeIcon, openActiveIcon, closeActiveIcon } = props;
            const isChecked = computeIsChecked.value;
            const vSize = computeSize.value;
            const onShowLabel = computeOnShowLabel.value;
            const offShowLabel = computeOffShowLabel.value;
            return h('div', {
                class: ['vxe-switch', isChecked ? 'is--on' : 'is--off', {
                        [`size--${vSize}`]: vSize,
                        'is--disabled': disabled,
                        'is--animat': reactData.hasAnimat
                    }]
            }, [
                h('button', {
                    ref: refButton,
                    class: 'vxe-switch--button',
                    type: 'button',
                    disabled,
                    onClick: clickEvent,
                    onFocus: focusEvent,
                    onBlur: blurEvent
                }, [
                    h('span', {
                        class: 'vxe-switch--label vxe-switch--label-on'
                    }, [
                        openIcon ? h('i', {
                            class: ['vxe-switch--label-icon', openIcon]
                        }) : createCommentVNode(),
                        onShowLabel
                    ]),
                    h('span', {
                        class: 'vxe-switch--label vxe-switch--label-off'
                    }, [
                        closeIcon ? h('i', {
                            class: ['vxe-switch--label-icon', closeIcon]
                        }) : createCommentVNode(),
                        offShowLabel
                    ]),
                    h('span', {
                        class: 'vxe-switch--icon'
                    }, openActiveIcon || closeActiveIcon
                        ? [
                            h('i', {
                                class: isChecked ? openActiveIcon : closeActiveIcon
                            })
                        ]
                        : [])
                ])
            ]);
        };
        $xeswitch.renderVN = renderVN;
        return $xeswitch;
    },
    render() {
        return this.renderVN();
    }
});
