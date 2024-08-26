declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    readonly animated: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly count: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
    readonly rows: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 3, boolean>;
    readonly loading: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly throttle: {
        readonly type: import("vue").PropType<number>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}, {
    /** @description loading state */
    uiLoading: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly animated: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly count: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
    readonly rows: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 3, boolean>;
    readonly loading: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly throttle: {
        readonly type: import("vue").PropType<number>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}>>, {
    readonly loading: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly rows: number;
    readonly count: number;
    readonly animated: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
}>, {
    template?(_: {
        key: number;
    }): any;
    default?(_: {
        [x: string]: unknown;
    }): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
