declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    readonly tag: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "div", boolean>;
    readonly gutter: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly justify: import("../../../utils").EpPropFinalized<StringConstructor, "center" | "space-around" | "space-between" | "space-evenly" | "end" | "start", unknown, "start", boolean>;
    readonly align: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<StringConstructor, "top" | "bottom" | "middle", unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly tag: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "div", boolean>;
    readonly gutter: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly justify: import("../../../utils").EpPropFinalized<StringConstructor, "center" | "space-around" | "space-between" | "space-evenly" | "end" | "start", unknown, "start", boolean>;
    readonly align: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<StringConstructor, "top" | "bottom" | "middle", unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}>>, {
    readonly justify: import("../../../utils").EpPropMergeType<StringConstructor, "center" | "space-around" | "space-between" | "space-evenly" | "end" | "start", unknown>;
    readonly tag: string;
    readonly gutter: number;
}>, {
    default?(_: {}): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
