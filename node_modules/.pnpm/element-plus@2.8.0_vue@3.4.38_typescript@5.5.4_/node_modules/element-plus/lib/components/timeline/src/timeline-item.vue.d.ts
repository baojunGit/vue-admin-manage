declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    readonly timestamp: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly hideTimestamp: BooleanConstructor;
    readonly center: BooleanConstructor;
    readonly placement: import("../../../utils").EpPropFinalized<StringConstructor, "top" | "bottom", unknown, "bottom", boolean>;
    readonly type: import("../../../utils").EpPropFinalized<StringConstructor, "success" | "warning" | "info" | "primary" | "danger", unknown, "", boolean>;
    readonly color: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly size: import("../../../utils").EpPropFinalized<StringConstructor, "normal" | "large", unknown, "normal", boolean>;
    readonly icon: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) & {}) | (() => string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) | ((new (...args: any[]) => (string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) & {}) | (() => string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly hollow: BooleanConstructor;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly timestamp: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly hideTimestamp: BooleanConstructor;
    readonly center: BooleanConstructor;
    readonly placement: import("../../../utils").EpPropFinalized<StringConstructor, "top" | "bottom", unknown, "bottom", boolean>;
    readonly type: import("../../../utils").EpPropFinalized<StringConstructor, "success" | "warning" | "info" | "primary" | "danger", unknown, "", boolean>;
    readonly color: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly size: import("../../../utils").EpPropFinalized<StringConstructor, "normal" | "large", unknown, "normal", boolean>;
    readonly icon: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) & {}) | (() => string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) | ((new (...args: any[]) => (string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) & {}) | (() => string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly hollow: BooleanConstructor;
}>>, {
    readonly color: string;
    readonly center: boolean;
    readonly size: import("../../../utils").EpPropMergeType<StringConstructor, "normal" | "large", unknown>;
    readonly type: import("../../../utils").EpPropMergeType<StringConstructor, "success" | "warning" | "info" | "primary" | "danger", unknown>;
    readonly placement: import("../../../utils").EpPropMergeType<StringConstructor, "top" | "bottom", unknown>;
    readonly timestamp: string;
    readonly hideTimestamp: boolean;
    readonly hollow: boolean;
}>, {
    dot?(_: {}): any;
    default?(_: {}): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
