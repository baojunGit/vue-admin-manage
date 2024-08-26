declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    readonly initialIndex: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly height: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly trigger: import("../../../utils").EpPropFinalized<StringConstructor, "click" | "hover", unknown, "hover", boolean>;
    readonly autoplay: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly interval: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 3000, boolean>;
    readonly indicatorPosition: import("../../../utils").EpPropFinalized<StringConstructor, "" | "none" | "outside", unknown, "", boolean>;
    readonly arrow: import("../../../utils").EpPropFinalized<StringConstructor, "always" | "never" | "hover", unknown, "hover", boolean>;
    readonly type: import("../../../utils").EpPropFinalized<StringConstructor, "" | "card", unknown, "", boolean>;
    readonly cardScale: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0.83, boolean>;
    readonly loop: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly direction: import("../../../utils").EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "horizontal", boolean>;
    readonly pauseOnHover: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly motionBlur: BooleanConstructor;
}, {
    /** @description active slide index */
    activeIndex: import("vue").Ref<number>;
    /** @description manually switch slide, index of the slide to be switched to, starting from 0; or the `name` of corresponding `el-carousel-item` */
    setActiveItem: (index: string | number) => void;
    /** @description switch to the previous slide */
    prev: () => void;
    /** @description switch to the next slide */
    next: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (current: number, prev: number) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly initialIndex: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly height: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly trigger: import("../../../utils").EpPropFinalized<StringConstructor, "click" | "hover", unknown, "hover", boolean>;
    readonly autoplay: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly interval: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 3000, boolean>;
    readonly indicatorPosition: import("../../../utils").EpPropFinalized<StringConstructor, "" | "none" | "outside", unknown, "", boolean>;
    readonly arrow: import("../../../utils").EpPropFinalized<StringConstructor, "always" | "never" | "hover", unknown, "hover", boolean>;
    readonly type: import("../../../utils").EpPropFinalized<StringConstructor, "" | "card", unknown, "", boolean>;
    readonly cardScale: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0.83, boolean>;
    readonly loop: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly direction: import("../../../utils").EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "horizontal", boolean>;
    readonly pauseOnHover: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly motionBlur: BooleanConstructor;
}>> & {
    onChange?: ((current: number, prev: number) => any) | undefined;
}, {
    readonly height: string;
    readonly direction: import("../../../utils").EpPropMergeType<StringConstructor, "horizontal" | "vertical", unknown>;
    readonly type: import("../../../utils").EpPropMergeType<StringConstructor, "" | "card", unknown>;
    readonly arrow: import("../../../utils").EpPropMergeType<StringConstructor, "always" | "never" | "hover", unknown>;
    readonly trigger: import("../../../utils").EpPropMergeType<StringConstructor, "click" | "hover", unknown>;
    readonly loop: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly interval: number;
    readonly cardScale: number;
    readonly initialIndex: number;
    readonly autoplay: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly indicatorPosition: import("../../../utils").EpPropMergeType<StringConstructor, "" | "none" | "outside", unknown>;
    readonly pauseOnHover: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly motionBlur: boolean;
}>, {
    default?(_: {}): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
