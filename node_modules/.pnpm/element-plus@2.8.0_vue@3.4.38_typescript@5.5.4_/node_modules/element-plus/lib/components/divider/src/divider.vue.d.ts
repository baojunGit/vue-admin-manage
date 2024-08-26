declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    readonly direction: import("../../../utils").EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "horizontal", boolean>;
    readonly contentPosition: import("../../../utils").EpPropFinalized<StringConstructor, "left" | "right" | "center", unknown, "center", boolean>;
    readonly borderStyle: import("../../../utils").EpPropFinalized<(new (...args: any[]) => string & {}) | (() => string) | ((new (...args: any[]) => string & {}) | (() => string))[], unknown, unknown, "solid", boolean>;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly direction: import("../../../utils").EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "horizontal", boolean>;
    readonly contentPosition: import("../../../utils").EpPropFinalized<StringConstructor, "left" | "right" | "center", unknown, "center", boolean>;
    readonly borderStyle: import("../../../utils").EpPropFinalized<(new (...args: any[]) => string & {}) | (() => string) | ((new (...args: any[]) => string & {}) | (() => string))[], unknown, unknown, "solid", boolean>;
}>>, {
    readonly direction: import("../../../utils").EpPropMergeType<StringConstructor, "horizontal" | "vertical", unknown>;
    readonly borderStyle: string;
    readonly contentPosition: import("../../../utils").EpPropMergeType<StringConstructor, "left" | "right" | "center", unknown>;
}>, {
    default?(_: {}): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
