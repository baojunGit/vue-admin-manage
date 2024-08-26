declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    readonly size: import("element-plus/es/utils").EpPropFinalized<readonly [NumberConstructor, StringConstructor], "" | "small" | "default" | "large", number, "", boolean>;
    readonly shape: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "circle" | "square", unknown, "circle", boolean>;
    readonly icon: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) & {}) | (() => string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) | ((new (...args: any[]) => (string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) & {}) | (() => string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly src: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly alt: StringConstructor;
    readonly srcSet: StringConstructor;
    readonly fit: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("csstype").ObjectFitProperty & {}) | (() => import("csstype").ObjectFitProperty) | ((new (...args: any[]) => import("csstype").ObjectFitProperty & {}) | (() => import("csstype").ObjectFitProperty))[], unknown, unknown, "cover", boolean>;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: (evt: Event) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly size: import("element-plus/es/utils").EpPropFinalized<readonly [NumberConstructor, StringConstructor], "" | "small" | "default" | "large", number, "", boolean>;
    readonly shape: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "circle" | "square", unknown, "circle", boolean>;
    readonly icon: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) & {}) | (() => string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) | ((new (...args: any[]) => (string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) & {}) | (() => string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly src: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly alt: StringConstructor;
    readonly srcSet: StringConstructor;
    readonly fit: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("csstype").ObjectFitProperty & {}) | (() => import("csstype").ObjectFitProperty) | ((new (...args: any[]) => import("csstype").ObjectFitProperty & {}) | (() => import("csstype").ObjectFitProperty))[], unknown, unknown, "cover", boolean>;
}>> & {
    onError?: ((evt: Event) => any) | undefined;
}, {
    readonly size: import("element-plus/es/utils").EpPropMergeType<readonly [NumberConstructor, StringConstructor], "" | "small" | "default" | "large", number>;
    readonly shape: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "circle" | "square", unknown>;
    readonly src: string;
    readonly fit: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => import("csstype").ObjectFitProperty & {}) | (() => import("csstype").ObjectFitProperty) | ((new (...args: any[]) => import("csstype").ObjectFitProperty & {}) | (() => import("csstype").ObjectFitProperty))[], unknown, unknown>;
}>, {
    default?(_: {}): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
