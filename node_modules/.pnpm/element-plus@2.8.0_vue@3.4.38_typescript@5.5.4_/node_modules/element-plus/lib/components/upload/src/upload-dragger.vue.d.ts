declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    readonly disabled: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    file: (file: File[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly disabled: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
}>> & {
    onFile?: ((file: File[]) => any) | undefined;
}, {
    readonly disabled: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
}>, {
    default?(_: {}): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
