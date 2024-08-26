declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    ariaControls: StringConstructor;
    modelValue: {
        type: (NumberConstructor | StringConstructor | BooleanConstructor)[];
        default: undefined;
    };
    label: {
        type: (ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[];
        default: undefined;
    };
    value: {
        type: (ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[];
        default: undefined;
    };
    indeterminate: BooleanConstructor;
    disabled: BooleanConstructor;
    checked: BooleanConstructor;
    name: {
        type: StringConstructor;
        default: undefined;
    };
    trueValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: undefined;
    };
    falseValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: undefined;
    };
    trueLabel: {
        type: (NumberConstructor | StringConstructor)[];
        default: undefined;
    };
    falseLabel: {
        type: (NumberConstructor | StringConstructor)[];
        default: undefined;
    };
    id: {
        type: StringConstructor;
        default: undefined;
    };
    border: BooleanConstructor;
    size: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    tabindex: (NumberConstructor | StringConstructor)[];
    validateEvent: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (val: import("./checkbox").CheckboxValueType) => void;
    change: (val: import("./checkbox").CheckboxValueType) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    ariaControls: StringConstructor;
    modelValue: {
        type: (NumberConstructor | StringConstructor | BooleanConstructor)[];
        default: undefined;
    };
    label: {
        type: (ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[];
        default: undefined;
    };
    value: {
        type: (ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[];
        default: undefined;
    };
    indeterminate: BooleanConstructor;
    disabled: BooleanConstructor;
    checked: BooleanConstructor;
    name: {
        type: StringConstructor;
        default: undefined;
    };
    trueValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: undefined;
    };
    falseValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: undefined;
    };
    trueLabel: {
        type: (NumberConstructor | StringConstructor)[];
        default: undefined;
    };
    falseLabel: {
        type: (NumberConstructor | StringConstructor)[];
        default: undefined;
    };
    id: {
        type: StringConstructor;
        default: undefined;
    };
    border: BooleanConstructor;
    size: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    tabindex: (NumberConstructor | StringConstructor)[];
    validateEvent: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((val: import("./checkbox").CheckboxValueType) => any) | undefined;
    onChange?: ((val: import("./checkbox").CheckboxValueType) => any) | undefined;
}, {
    label: string | number | boolean | Record<string, any>;
    border: boolean;
    disabled: boolean;
    value: string | number | boolean | Record<string, any>;
    id: string;
    name: string;
    modelValue: string | number | boolean;
    validateEvent: boolean;
    indeterminate: boolean;
    checked: boolean;
    trueValue: string | number;
    falseValue: string | number;
    trueLabel: string | number;
    falseLabel: string | number;
}>, {
    default?(_: {}): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
