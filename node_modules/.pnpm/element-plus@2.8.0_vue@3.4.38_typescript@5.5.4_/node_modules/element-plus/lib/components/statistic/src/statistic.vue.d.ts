declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    readonly decimalSeparator: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, ".", boolean>;
    readonly groupSeparator: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, ",", boolean>;
    readonly precision: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly formatter: FunctionConstructor;
    readonly value: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => (number | import("dayjs").Dayjs) & {}) | (() => number | import("dayjs").Dayjs) | ((new (...args: any[]) => (number | import("dayjs").Dayjs) & {}) | (() => number | import("dayjs").Dayjs))[], unknown, unknown, 0, boolean>;
    readonly prefix: StringConstructor;
    readonly suffix: StringConstructor;
    readonly title: StringConstructor;
    readonly valueStyle: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => import("vue").StyleValue & {}) | (() => import("vue").StyleValue) | ((new (...args: any[]) => import("vue").StyleValue & {}) | (() => import("vue").StyleValue))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}, {
    /**
     * @description current display value
     */
    displayValue: import("vue").ComputedRef<any>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly decimalSeparator: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, ".", boolean>;
    readonly groupSeparator: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, ",", boolean>;
    readonly precision: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly formatter: FunctionConstructor;
    readonly value: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => (number | import("dayjs").Dayjs) & {}) | (() => number | import("dayjs").Dayjs) | ((new (...args: any[]) => (number | import("dayjs").Dayjs) & {}) | (() => number | import("dayjs").Dayjs))[], unknown, unknown, 0, boolean>;
    readonly prefix: StringConstructor;
    readonly suffix: StringConstructor;
    readonly title: StringConstructor;
    readonly valueStyle: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => import("vue").StyleValue & {}) | (() => import("vue").StyleValue) | ((new (...args: any[]) => import("vue").StyleValue & {}) | (() => import("vue").StyleValue))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}>>, {
    readonly value: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (number | import("dayjs").Dayjs) & {}) | (() => number | import("dayjs").Dayjs) | ((new (...args: any[]) => (number | import("dayjs").Dayjs) & {}) | (() => number | import("dayjs").Dayjs))[], unknown, unknown>;
    readonly decimalSeparator: string;
    readonly groupSeparator: string;
    readonly precision: number;
}>, {
    title?(_: {}): any;
    prefix?(_: {}): any;
    suffix?(_: {}): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
