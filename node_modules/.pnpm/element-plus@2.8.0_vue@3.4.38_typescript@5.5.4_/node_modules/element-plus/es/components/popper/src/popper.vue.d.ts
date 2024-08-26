import type { Instance as PopperInstance } from '@popperjs/core';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    readonly role: import("../../../utils").EpPropFinalized<StringConstructor, "dialog" | "menu" | "grid" | "listbox" | "tooltip" | "tree" | "group" | "navigation", unknown, "tooltip", boolean>;
}, {
    triggerRef: import("vue").Ref<import("./constants").Measurable | undefined>;
    contentRef: import("vue").Ref<HTMLElement | undefined>;
    popperInstanceRef: import("vue").Ref<PopperInstance | undefined>;
    referenceRef: import("vue").Ref<import("./constants").Measurable | undefined>;
    role: import("vue").ComputedRef<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly role: import("../../../utils").EpPropFinalized<StringConstructor, "dialog" | "menu" | "grid" | "listbox" | "tooltip" | "tree" | "group" | "navigation", unknown, "tooltip", boolean>;
}>>, {
    readonly role: import("../../../utils").EpPropMergeType<StringConstructor, "dialog" | "menu" | "grid" | "listbox" | "tooltip" | "tree" | "group" | "navigation", unknown>;
}>, {
    default?(_: {}): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
