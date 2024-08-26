declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    readonly space: import("../../../utils").EpPropFinalized<readonly [NumberConstructor, StringConstructor], unknown, unknown, "", boolean>;
    readonly active: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly direction: import("../../../utils").EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "horizontal", boolean>;
    readonly alignCenter: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly simple: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly finishStatus: import("../../../utils").EpPropFinalized<StringConstructor, "wait" | "error" | "finish" | "success" | "process", unknown, "finish", boolean>;
    readonly processStatus: import("../../../utils").EpPropFinalized<StringConstructor, "wait" | "error" | "finish" | "success" | "process", unknown, "process", boolean>;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (newVal: number, oldVal: number) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly space: import("../../../utils").EpPropFinalized<readonly [NumberConstructor, StringConstructor], unknown, unknown, "", boolean>;
    readonly active: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly direction: import("../../../utils").EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "horizontal", boolean>;
    readonly alignCenter: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly simple: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly finishStatus: import("../../../utils").EpPropFinalized<StringConstructor, "wait" | "error" | "finish" | "success" | "process", unknown, "finish", boolean>;
    readonly processStatus: import("../../../utils").EpPropFinalized<StringConstructor, "wait" | "error" | "finish" | "success" | "process", unknown, "process", boolean>;
}>> & {
    onChange?: ((newVal: number, oldVal: number) => any) | undefined;
}, {
    readonly direction: import("../../../utils").EpPropMergeType<StringConstructor, "horizontal" | "vertical", unknown>;
    readonly space: import("../../../utils").EpPropMergeType<readonly [NumberConstructor, StringConstructor], unknown, unknown>;
    readonly active: number;
    readonly finishStatus: import("../../../utils").EpPropMergeType<StringConstructor, "wait" | "error" | "finish" | "success" | "process", unknown>;
    readonly processStatus: import("../../../utils").EpPropMergeType<StringConstructor, "wait" | "error" | "finish" | "success" | "process", unknown>;
}>, {
    default?(_: {}): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
