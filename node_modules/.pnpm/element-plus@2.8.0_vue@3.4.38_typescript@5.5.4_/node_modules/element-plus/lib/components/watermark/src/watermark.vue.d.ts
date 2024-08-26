declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    readonly zIndex: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 9, boolean>;
    readonly rotate: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, -22, boolean>;
    readonly width: NumberConstructor;
    readonly height: NumberConstructor;
    readonly image: StringConstructor;
    readonly content: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (string | string[]) & {}) | (() => string | string[]) | ((new (...args: any[]) => (string | string[]) & {}) | (() => string | string[]))[], unknown, unknown, "Element Plus", boolean>;
    readonly font: {
        readonly type: import("vue").PropType<import("./watermark").WatermarkFontType>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly gap: import("../../../utils").EpPropFinalized<(new (...args: any[]) => [number, number]) | (() => [number, number]) | ((new (...args: any[]) => [number, number]) | (() => [number, number]))[], unknown, unknown, () => number[], boolean>;
    readonly offset: {
        readonly type: import("vue").PropType<[number, number]>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly zIndex: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 9, boolean>;
    readonly rotate: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, -22, boolean>;
    readonly width: NumberConstructor;
    readonly height: NumberConstructor;
    readonly image: StringConstructor;
    readonly content: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (string | string[]) & {}) | (() => string | string[]) | ((new (...args: any[]) => (string | string[]) & {}) | (() => string | string[]))[], unknown, unknown, "Element Plus", boolean>;
    readonly font: {
        readonly type: import("vue").PropType<import("./watermark").WatermarkFontType>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly gap: import("../../../utils").EpPropFinalized<(new (...args: any[]) => [number, number]) | (() => [number, number]) | ((new (...args: any[]) => [number, number]) | (() => [number, number]))[], unknown, unknown, () => number[], boolean>;
    readonly offset: {
        readonly type: import("vue").PropType<[number, number]>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}>>, {
    readonly content: import("../../../utils").EpPropMergeType<(new (...args: any[]) => (string | string[]) & {}) | (() => string | string[]) | ((new (...args: any[]) => (string | string[]) & {}) | (() => string | string[]))[], unknown, unknown>;
    readonly rotate: number;
    readonly zIndex: number;
    readonly gap: [number, number];
}>, {
    default?(_: {}): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
