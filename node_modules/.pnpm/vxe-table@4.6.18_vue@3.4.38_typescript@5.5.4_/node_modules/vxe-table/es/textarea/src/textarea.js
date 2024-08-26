import { defineComponent, h, ref, computed, nextTick, watch, reactive, inject } from 'vue';
import XEUtils from 'xe-utils';
import GlobalConfig from '../../v-x-e-table/src/conf';
import { getFuncText } from '../../tools/utils';
import { useSize } from '../../hooks/size';
let autoTxtElem;
export default defineComponent({
    name: 'VxeTextarea',
    props: {
        modelValue: [String, Number],
        className: String,
        immediate: { type: Boolean, default: true },
        name: String,
        readonly: Boolean,
        disabled: Boolean,
        placeholder: {
            type: String,
            default: () => XEUtils.eqNull(GlobalConfig.textarea.placeholder) ? GlobalConfig.i18n('vxe.base.pleaseInput') : GlobalConfig.textarea.placeholder
        },
        maxlength: [String, Number],
        rows: { type: [String, Number], default: 2 },
        cols: { type: [String, Number], default: null },
        showWordCount: Boolean,
        countMethod: Function,
        autosize: [Boolean, Object],
        form: String,
        resize: { type: String, default: () => GlobalConfig.textarea.resize },
        size: { type: String, default: () => GlobalConfig.textarea.size || GlobalConfig.size }
    },
    emits: [
        'update:modelValue',
        'input',
        'keydown',
        'keyup',
        'click',
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
            inputValue: props.modelValue
        });
        const refElem = ref();
        const refTextarea = ref();
        const refMaps = {
            refElem,
            refTextarea
        };
        const $xetextarea = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps
        };
        let textareaMethods = {};
        const computeInputCount = computed(() => {
            return XEUtils.getSize(reactData.inputValue);
        });
        const computeIsCountError = computed(() => {
            const inputCount = computeInputCount.value;
            return props.maxlength && inputCount > XEUtils.toNumber(props.maxlength);
        });
        const computeSizeOpts = computed(() => {
            return Object.assign({ minRows: 1, maxRows: 10 }, GlobalConfig.textarea.autosize, props.autosize);
        });
        const updateAutoTxt = () => {
            const { size, autosize } = props;
            const { inputValue } = reactData;
            if (autosize) {
                if (!autoTxtElem) {
                    autoTxtElem = document.createElement('div');
                }
                if (!autoTxtElem.parentNode) {
                    document.body.appendChild(autoTxtElem);
                }
                const textElem = refTextarea.value;
                const textStyle = getComputedStyle(textElem);
                autoTxtElem.className = ['vxe-textarea--autosize', size ? `size--${size}` : ''].join(' ');
                autoTxtElem.style.width = `${textElem.clientWidth}px`;
                autoTxtElem.style.padding = textStyle.padding;
                autoTxtElem.innerText = ('' + (inputValue || '　')).replace(/\n$/, '\n　');
            }
        };
        const handleResize = () => {
            if (props.autosize) {
                nextTick(() => {
                    const sizeOpts = computeSizeOpts.value;
                    const { minRows, maxRows } = sizeOpts;
                    const textElem = refTextarea.value;
                    const sizeHeight = autoTxtElem.clientHeight;
                    const textStyle = getComputedStyle(textElem);
                    const lineHeight = XEUtils.toNumber(textStyle.lineHeight);
                    const paddingTop = XEUtils.toNumber(textStyle.paddingTop);
                    const paddingBottom = XEUtils.toNumber(textStyle.paddingBottom);
                    const borderTopWidth = XEUtils.toNumber(textStyle.borderTopWidth);
                    const borderBottomWidth = XEUtils.toNumber(textStyle.borderBottomWidth);
                    const intervalHeight = paddingTop + paddingBottom + borderTopWidth + borderBottomWidth;
                    const rowNum = (sizeHeight - intervalHeight) / lineHeight;
                    const textRows = rowNum && /[0-9]/.test('' + rowNum) ? rowNum : Math.floor(rowNum) + 1;
                    let vaildRows = textRows;
                    if (textRows < minRows) {
                        vaildRows = minRows;
                    }
                    else if (textRows > maxRows) {
                        vaildRows = maxRows;
                    }
                    textElem.style.height = `${(vaildRows * lineHeight) + intervalHeight}px`;
                });
            }
        };
        const triggerEvent = (evnt) => {
            const value = reactData.inputValue;
            $xetextarea.dispatchEvent(evnt.type, { value }, evnt);
        };
        const emitUpdate = (value, evnt) => {
            reactData.inputValue = value;
            emit('update:modelValue', value);
            if (XEUtils.toValueString(props.modelValue) !== value) {
                textareaMethods.dispatchEvent('change', { value }, evnt);
                // 自动更新校验状态
                if ($xeform && $xeformiteminfo) {
                    $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, value);
                }
            }
        };
        const inputEvent = (evnt) => {
            const { immediate } = props;
            const textElem = evnt.target;
            const value = textElem.value;
            reactData.inputValue = value;
            if (immediate) {
                emitUpdate(value, evnt);
            }
            $xetextarea.dispatchEvent('input', { value }, evnt);
            handleResize();
        };
        const changeEvent = (evnt) => {
            const { immediate } = props;
            if (immediate) {
                triggerEvent(evnt);
            }
            else {
                emitUpdate(reactData.inputValue, evnt);
            }
        };
        const blurEvent = (evnt) => {
            const { immediate } = props;
            const { inputValue } = reactData;
            if (!immediate) {
                emitUpdate(inputValue, evnt);
            }
            $xetextarea.dispatchEvent('blur', { value: inputValue }, evnt);
        };
        textareaMethods = {
            dispatchEvent(type, params, evnt) {
                emit(type, Object.assign({ $textarea: $xetextarea, $event: evnt }, params));
            },
            focus() {
                const textElem = refTextarea.value;
                textElem.focus();
                return nextTick();
            },
            blur() {
                const textElem = refTextarea.value;
                textElem.blur();
                return nextTick();
            }
        };
        Object.assign($xetextarea, textareaMethods);
        watch(() => props.modelValue, (val) => {
            reactData.inputValue = val;
            updateAutoTxt();
        });
        nextTick(() => {
            const { autosize } = props;
            if (autosize) {
                updateAutoTxt();
                handleResize();
            }
        });
        const renderVN = () => {
            const { className, resize, placeholder, disabled, maxlength, autosize, showWordCount, countMethod, rows, cols } = props;
            const { inputValue } = reactData;
            const vSize = computeSize.value;
            const isCountError = computeIsCountError.value;
            const inputCount = computeInputCount.value;
            return h('div', {
                ref: refElem,
                class: ['vxe-textarea', className, {
                        [`size--${vSize}`]: vSize,
                        'is--autosize': autosize,
                        'is--count': showWordCount,
                        'is--disabled': disabled,
                        'def--rows': !XEUtils.eqNull(rows),
                        'def--cols': !XEUtils.eqNull(cols)
                    }]
            }, [
                h('textarea', {
                    ref: refTextarea,
                    class: 'vxe-textarea--inner',
                    value: inputValue,
                    name: props.name,
                    placeholder: placeholder ? getFuncText(placeholder) : null,
                    maxlength,
                    readonly: props.readonly,
                    disabled,
                    rows,
                    cols,
                    style: resize ? {
                        resize
                    } : null,
                    onInput: inputEvent,
                    onChange: changeEvent,
                    onKeydown: triggerEvent,
                    onKeyup: triggerEvent,
                    onClick: triggerEvent,
                    onFocus: triggerEvent,
                    onBlur: blurEvent
                }),
                showWordCount ? h('span', {
                    class: ['vxe-textarea--count', {
                            'is--error': isCountError
                        }]
                }, countMethod ? `${countMethod({ value: inputValue })}` : `${inputCount}${maxlength ? `/${maxlength}` : ''}`) : null
            ]);
        };
        $xetextarea.renderVN = renderVN;
        return $xetextarea;
    },
    render() {
        return this.renderVN();
    }
});
