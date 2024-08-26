declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    readonly header: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly footer: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly bodyStyle: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("vue").StyleValue & {}) | (() => import("vue").StyleValue) | ((new (...args: any[]) => import("vue").StyleValue & {}) | (() => import("vue").StyleValue))[], unknown, unknown, "", boolean>;
    readonly bodyClass: StringConstructor;
    readonly shadow: import("../../../utils").EpPropFinalized<StringConstructor, "always" | "never" | "hover", unknown, "always", boolean>;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly header: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly footer: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly bodyStyle: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("vue").StyleValue & {}) | (() => import("vue").StyleValue) | ((new (...args: any[]) => import("vue").StyleValue & {}) | (() => import("vue").StyleValue))[], unknown, unknown, "", boolean>;
    readonly bodyClass: StringConstructor;
    readonly shadow: import("../../../utils").EpPropFinalized<StringConstructor, "always" | "never" | "hover", unknown, "always", boolean>;
}>>, {
    readonly footer: string;
    readonly header: string;
    readonly bodyStyle: import("vue").StyleValue;
    readonly shadow: import("../../../utils").EpPropMergeType<StringConstructor, "always" | "never" | "hover", unknown>;
}>, {
    header?(_: {}): any;
    default?(_: {}): any;
    footer?(_: {}): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
