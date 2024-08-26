declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    readonly alwaysOn: BooleanConstructor;
    readonly fullTransition: BooleanConstructor;
    readonly transitionProps: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("vue").TransitionProps) | (() => import("vue").TransitionProps | null) | ((new (...args: any[]) => import("vue").TransitionProps) | (() => import("vue").TransitionProps | null))[], unknown, unknown, null, boolean>;
    readonly teleported: BooleanConstructor;
    readonly to: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (string | import("vue").RendererElement | null | undefined) & {}) | (() => string | import("vue").RendererElement | null | undefined) | ((new (...args: any[]) => (string | import("vue").RendererElement | null | undefined) & {}) | (() => string | import("vue").RendererElement | null | undefined))[], unknown, unknown, "body", boolean>;
    readonly ariaLabel: StringConstructor;
    readonly arrowPadding: import("../../../utils").EpPropFinalized<(new (...args: any[]) => number & {}) | (() => number) | ((new (...args: any[]) => number & {}) | (() => number))[], unknown, unknown, 5, boolean>;
    readonly effect: import("../../../utils").EpPropFinalized<(new (...args: any[]) => string & {}) | (() => string) | ((new (...args: any[]) => string & {}) | (() => string))[], unknown, unknown, "light", boolean>;
    readonly contentClass: StringConstructor;
    readonly placement: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, "bottom", boolean>;
    readonly reference: import("../../../utils").EpPropFinalized<(new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null) | ((new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null))[], unknown, unknown, null, boolean>;
    readonly offset: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 8, boolean>;
    readonly strategy: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy) | ((new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy))[], "fixed" | "absolute", unknown, "absolute", boolean>;
    readonly showArrow: BooleanConstructor;
    readonly onBlur: {
        readonly type: import("vue").PropType<(e: Event) => boolean | void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onClick: {
        readonly type: import("vue").PropType<(e: Event) => boolean | void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onFocus: {
        readonly type: import("vue").PropType<(e: Event) => boolean | void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onMouseDown: {
        readonly type: import("vue").PropType<(e: Event) => boolean | void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onMouseEnter: {
        readonly type: import("vue").PropType<(e: Event) => boolean | void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onMouseLeave: {
        readonly type: import("vue").PropType<(e: Event) => boolean | void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly width: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 10, boolean>;
    readonly height: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 10, boolean>;
    readonly style: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("vue").CSSProperties) | (() => import("vue").CSSProperties | null) | ((new (...args: any[]) => import("vue").CSSProperties) | (() => import("vue").CSSProperties | null))[], unknown, unknown, null, boolean>;
    readonly delayDuration: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 300, boolean>;
    readonly defaultOpen: BooleanConstructor;
    readonly open: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
    readonly onOpenChange: {
        readonly type: import("vue").PropType<(state: boolean) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly 'onUpdate:open': {
        readonly type: import("vue").PropType<(state: boolean) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly alwaysOn: BooleanConstructor;
    readonly fullTransition: BooleanConstructor;
    readonly transitionProps: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("vue").TransitionProps) | (() => import("vue").TransitionProps | null) | ((new (...args: any[]) => import("vue").TransitionProps) | (() => import("vue").TransitionProps | null))[], unknown, unknown, null, boolean>;
    readonly teleported: BooleanConstructor;
    readonly to: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (string | import("vue").RendererElement | null | undefined) & {}) | (() => string | import("vue").RendererElement | null | undefined) | ((new (...args: any[]) => (string | import("vue").RendererElement | null | undefined) & {}) | (() => string | import("vue").RendererElement | null | undefined))[], unknown, unknown, "body", boolean>;
    readonly ariaLabel: StringConstructor;
    readonly arrowPadding: import("../../../utils").EpPropFinalized<(new (...args: any[]) => number & {}) | (() => number) | ((new (...args: any[]) => number & {}) | (() => number))[], unknown, unknown, 5, boolean>;
    readonly effect: import("../../../utils").EpPropFinalized<(new (...args: any[]) => string & {}) | (() => string) | ((new (...args: any[]) => string & {}) | (() => string))[], unknown, unknown, "light", boolean>;
    readonly contentClass: StringConstructor;
    readonly placement: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, "bottom", boolean>;
    readonly reference: import("../../../utils").EpPropFinalized<(new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null) | ((new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null))[], unknown, unknown, null, boolean>;
    readonly offset: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 8, boolean>;
    readonly strategy: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy) | ((new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy))[], "fixed" | "absolute", unknown, "absolute", boolean>;
    readonly showArrow: BooleanConstructor;
    readonly onBlur: {
        readonly type: import("vue").PropType<(e: Event) => boolean | void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onClick: {
        readonly type: import("vue").PropType<(e: Event) => boolean | void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onFocus: {
        readonly type: import("vue").PropType<(e: Event) => boolean | void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onMouseDown: {
        readonly type: import("vue").PropType<(e: Event) => boolean | void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onMouseEnter: {
        readonly type: import("vue").PropType<(e: Event) => boolean | void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onMouseLeave: {
        readonly type: import("vue").PropType<(e: Event) => boolean | void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly width: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 10, boolean>;
    readonly height: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 10, boolean>;
    readonly style: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("vue").CSSProperties) | (() => import("vue").CSSProperties | null) | ((new (...args: any[]) => import("vue").CSSProperties) | (() => import("vue").CSSProperties | null))[], unknown, unknown, null, boolean>;
    readonly delayDuration: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 300, boolean>;
    readonly defaultOpen: BooleanConstructor;
    readonly open: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
    readonly onOpenChange: {
        readonly type: import("vue").PropType<(state: boolean) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly 'onUpdate:open': {
        readonly type: import("vue").PropType<(state: boolean) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}>>, {
    readonly style: import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("vue").CSSProperties) | (() => import("vue").CSSProperties | null) | ((new (...args: any[]) => import("vue").CSSProperties) | (() => import("vue").CSSProperties | null))[], unknown, unknown>;
    readonly height: number;
    readonly width: number;
    readonly offset: number;
    readonly open: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly to: import("../../../utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").RendererElement | null | undefined) & {}) | (() => string | import("vue").RendererElement | null | undefined) | ((new (...args: any[]) => (string | import("vue").RendererElement | null | undefined) & {}) | (() => string | import("vue").RendererElement | null | undefined))[], unknown, unknown>;
    readonly placement: import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown>;
    readonly strategy: import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy) | ((new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy))[], "fixed" | "absolute", unknown>;
    readonly reference: import("../../../utils").EpPropMergeType<(new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null) | ((new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null))[], unknown, unknown>;
    readonly effect: string;
    readonly teleported: boolean;
    readonly showArrow: boolean;
    readonly alwaysOn: boolean;
    readonly arrowPadding: number;
    readonly delayDuration: number;
    readonly defaultOpen: boolean;
    readonly transitionProps: import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("vue").TransitionProps) | (() => import("vue").TransitionProps | null) | ((new (...args: any[]) => import("vue").TransitionProps) | (() => import("vue").TransitionProps | null))[], unknown, unknown>;
    readonly fullTransition: boolean;
}>, {
    trigger?(_: {}): any;
    default?(_: {}): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
