declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    placement: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, string, boolean>;
    reference: import("../../../utils").EpPropFinalized<(new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null) | ((new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null))[], unknown, unknown, null, boolean>;
    strategy: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy) | ((new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy))[], "fixed" | "absolute", unknown, string, boolean>;
    offset: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    showArrow: BooleanConstructor;
    zIndex: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: () => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    placement: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, string, boolean>;
    reference: import("../../../utils").EpPropFinalized<(new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null) | ((new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null))[], unknown, unknown, null, boolean>;
    strategy: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy) | ((new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy))[], "fixed" | "absolute", unknown, string, boolean>;
    offset: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    showArrow: BooleanConstructor;
    zIndex: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
}>> & {
    onClose?: (() => any) | undefined;
}, {
    zIndex: number;
    offset: number;
    placement: import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown>;
    strategy: import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy) | ((new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy))[], "fixed" | "absolute", unknown>;
    reference: import("../../../utils").EpPropMergeType<(new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null) | ((new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null))[], unknown, unknown>;
    showArrow: boolean;
}>, {
    default?(_: {}): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
