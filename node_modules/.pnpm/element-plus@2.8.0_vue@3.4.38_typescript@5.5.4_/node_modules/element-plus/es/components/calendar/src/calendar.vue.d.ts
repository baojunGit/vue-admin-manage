declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    readonly modelValue: {
        readonly type: import("vue").PropType<Date>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly range: {
        readonly type: import("vue").PropType<[Date, Date]>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}, {
    /** @description currently selected date */
    selectedDay: import("vue").WritableComputedRef<import("dayjs").Dayjs | undefined>;
    /** @description select a specific date */
    pickDay: (day: import("dayjs").Dayjs) => void;
    /** @description select date */
    selectDate: (type: import("./calendar").CalendarDateType) => void;
    /** @description Calculate the validate date range according to the start and end dates */
    calculateValidatedDateRange: (startDayjs: import("dayjs").Dayjs, endDayjs: import("dayjs").Dayjs) => [import("dayjs").Dayjs, import("dayjs").Dayjs][];
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    input: (value: Date) => void;
    "update:modelValue": (value: Date) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly modelValue: {
        readonly type: import("vue").PropType<Date>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly range: {
        readonly type: import("vue").PropType<[Date, Date]>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}>> & {
    "onUpdate:modelValue"?: ((value: Date) => any) | undefined;
    onInput?: ((value: Date) => any) | undefined;
}, {}>, {
    header?(_: {
        date: string;
    }): any;
    "date-cell"?(_: {
        data: {
            isSelected: boolean;
            type: string;
            day: string;
            date: Date;
        };
    }): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
