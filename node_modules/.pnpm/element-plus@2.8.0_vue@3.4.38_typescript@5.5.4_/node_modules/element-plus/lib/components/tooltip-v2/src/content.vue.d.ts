import type { CSSProperties } from 'vue';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    nowrap: BooleanConstructor;
    ariaLabel: StringConstructor;
    arrowPadding: import("../../../utils").EpPropFinalized<(new (...args: any[]) => number & {}) | (() => number) | ((new (...args: any[]) => number & {}) | (() => number))[], unknown, unknown, 5, boolean>;
    effect: import("../../../utils").EpPropFinalized<(new (...args: any[]) => string & {}) | (() => string) | ((new (...args: any[]) => string & {}) | (() => string))[], unknown, unknown, "light", boolean>;
    contentClass: StringConstructor;
    placement: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/dom").Placement & {}) | (() => import("@floating-ui/dom").Placement) | ((new (...args: any[]) => import("@floating-ui/dom").Placement & {}) | (() => import("@floating-ui/dom").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, "bottom", boolean>;
    reference: import("../../../utils").EpPropFinalized<(new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null) | ((new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null))[], unknown, unknown, null, boolean>;
    offset: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 8, boolean>;
    strategy: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/dom").Strategy & {}) | (() => import("@floating-ui/dom").Strategy) | ((new (...args: any[]) => import("@floating-ui/dom").Strategy & {}) | (() => import("@floating-ui/dom").Strategy))[], "fixed" | "absolute", unknown, "absolute", boolean>;
    showArrow: BooleanConstructor;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    nowrap: BooleanConstructor;
    ariaLabel: StringConstructor;
    arrowPadding: import("../../../utils").EpPropFinalized<(new (...args: any[]) => number & {}) | (() => number) | ((new (...args: any[]) => number & {}) | (() => number))[], unknown, unknown, 5, boolean>;
    effect: import("../../../utils").EpPropFinalized<(new (...args: any[]) => string & {}) | (() => string) | ((new (...args: any[]) => string & {}) | (() => string))[], unknown, unknown, "light", boolean>;
    contentClass: StringConstructor;
    placement: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/dom").Placement & {}) | (() => import("@floating-ui/dom").Placement) | ((new (...args: any[]) => import("@floating-ui/dom").Placement & {}) | (() => import("@floating-ui/dom").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, "bottom", boolean>;
    reference: import("../../../utils").EpPropFinalized<(new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null) | ((new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null))[], unknown, unknown, null, boolean>;
    offset: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 8, boolean>;
    strategy: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/dom").Strategy & {}) | (() => import("@floating-ui/dom").Strategy) | ((new (...args: any[]) => import("@floating-ui/dom").Strategy & {}) | (() => import("@floating-ui/dom").Strategy))[], "fixed" | "absolute", unknown, "absolute", boolean>;
    showArrow: BooleanConstructor;
}>>, {
    offset: number;
    nowrap: boolean;
    placement: import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("@floating-ui/dom").Placement & {}) | (() => import("@floating-ui/dom").Placement) | ((new (...args: any[]) => import("@floating-ui/dom").Placement & {}) | (() => import("@floating-ui/dom").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown>;
    strategy: import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("@floating-ui/dom").Strategy & {}) | (() => import("@floating-ui/dom").Strategy) | ((new (...args: any[]) => import("@floating-ui/dom").Strategy & {}) | (() => import("@floating-ui/dom").Strategy))[], "fixed" | "absolute", unknown>;
    reference: import("../../../utils").EpPropMergeType<(new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null) | ((new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null))[], unknown, unknown>;
    effect: string;
    showArrow: boolean;
    arrowPadding: number;
}>, {
    default?(_: {}): any;
    arrow?(_: {
        style: CSSProperties;
        side: string;
    }): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
