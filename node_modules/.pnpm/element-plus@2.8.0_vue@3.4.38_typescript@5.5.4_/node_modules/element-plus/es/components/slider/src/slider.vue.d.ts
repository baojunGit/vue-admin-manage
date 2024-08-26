declare const _default: import("vue").DefineComponent<{
    readonly ariaLabel: StringConstructor;
    readonly modelValue: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("../../../utils").Arrayable<number> & {}) | (() => import("../../../utils").Arrayable<number>) | ((new (...args: any[]) => import("../../../utils").Arrayable<number> & {}) | (() => import("../../../utils").Arrayable<number>))[], unknown, unknown, 0, boolean>;
    readonly id: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
    readonly min: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly max: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 100, boolean>;
    readonly step: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
    readonly showInput: BooleanConstructor;
    readonly showInputControls: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly size: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly inputSize: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly showStops: BooleanConstructor;
    readonly showTooltip: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly formatTooltip: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (val: number) => string | number) | (() => (val: number) => string | number) | {
        (): (val: number) => string | number;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (val: number) => string | number) | (() => (val: number) => string | number) | {
        (): (val: number) => string | number;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, undefined, boolean>;
    readonly disabled: BooleanConstructor;
    readonly range: BooleanConstructor;
    readonly vertical: BooleanConstructor;
    readonly height: StringConstructor;
    readonly debounce: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 300, boolean>;
    readonly rangeStartLabel: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
    readonly rangeEndLabel: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
    readonly formatValueText: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (val: number) => string) | (() => (val: number) => string) | {
        (): (val: number) => string;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (val: number) => string) | (() => (val: number) => string) | {
        (): (val: number) => string;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, undefined, boolean>;
    readonly tooltipClass: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
    readonly placement: import("../../../utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "top", boolean>;
    readonly marks: {
        readonly type: import("vue").PropType<{
            [x: number]: import("../../../utils").EpPropMergeType<(new (...args: any[]) => (string | {
                style: import("vue").CSSProperties;
                label: any;
            }) & {}) | (() => string | {
                style: import("vue").CSSProperties;
                label: any;
            }) | ((new (...args: any[]) => (string | {
                style: import("vue").CSSProperties;
                label: any;
            }) & {}) | (() => string | {
                style: import("vue").CSSProperties;
                label: any;
            }))[], unknown, unknown> | undefined;
        }>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly validateEvent: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
}, {
    onSliderClick: (event: MouseEvent | TouchEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    input: (value: import("../../../utils").Arrayable<number>) => void;
    "update:modelValue": (value: import("../../../utils").Arrayable<number>) => void;
    change: (value: import("../../../utils").Arrayable<number>) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly ariaLabel: StringConstructor;
    readonly modelValue: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("../../../utils").Arrayable<number> & {}) | (() => import("../../../utils").Arrayable<number>) | ((new (...args: any[]) => import("../../../utils").Arrayable<number> & {}) | (() => import("../../../utils").Arrayable<number>))[], unknown, unknown, 0, boolean>;
    readonly id: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
    readonly min: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly max: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 100, boolean>;
    readonly step: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
    readonly showInput: BooleanConstructor;
    readonly showInputControls: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly size: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly inputSize: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly showStops: BooleanConstructor;
    readonly showTooltip: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly formatTooltip: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (val: number) => string | number) | (() => (val: number) => string | number) | {
        (): (val: number) => string | number;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (val: number) => string | number) | (() => (val: number) => string | number) | {
        (): (val: number) => string | number;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, undefined, boolean>;
    readonly disabled: BooleanConstructor;
    readonly range: BooleanConstructor;
    readonly vertical: BooleanConstructor;
    readonly height: StringConstructor;
    readonly debounce: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 300, boolean>;
    readonly rangeStartLabel: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
    readonly rangeEndLabel: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
    readonly formatValueText: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (val: number) => string) | (() => (val: number) => string) | {
        (): (val: number) => string;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (val: number) => string) | (() => (val: number) => string) | {
        (): (val: number) => string;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, undefined, boolean>;
    readonly tooltipClass: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
    readonly placement: import("../../../utils").EpPropFinalized<StringConstructor, import("@popperjs/core").Placement, unknown, "top", boolean>;
    readonly marks: {
        readonly type: import("vue").PropType<{
            [x: number]: import("../../../utils").EpPropMergeType<(new (...args: any[]) => (string | {
                style: import("vue").CSSProperties;
                label: any;
            }) & {}) | (() => string | {
                style: import("vue").CSSProperties;
                label: any;
            }) | ((new (...args: any[]) => (string | {
                style: import("vue").CSSProperties;
                label: any;
            }) & {}) | (() => string | {
                style: import("vue").CSSProperties;
                label: any;
            }))[], unknown, unknown> | undefined;
        }>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly validateEvent: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
}>> & {
    "onUpdate:modelValue"?: ((value: import("../../../utils").Arrayable<number>) => any) | undefined;
    onChange?: ((value: import("../../../utils").Arrayable<number>) => any) | undefined;
    onInput?: ((value: import("../../../utils").Arrayable<number>) => any) | undefined;
}, {
    readonly vertical: boolean;
    readonly range: boolean;
    readonly disabled: boolean;
    readonly id: string;
    readonly modelValue: import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("../../../utils").Arrayable<number> & {}) | (() => import("../../../utils").Arrayable<number>) | ((new (...args: any[]) => import("../../../utils").Arrayable<number> & {}) | (() => import("../../../utils").Arrayable<number>))[], unknown, unknown>;
    readonly placement: import("../../../utils").EpPropMergeType<StringConstructor, import("@popperjs/core").Placement, unknown>;
    readonly min: number;
    readonly max: number;
    readonly validateEvent: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly debounce: number;
    readonly step: number;
    readonly showInputControls: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly showTooltip: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly formatTooltip: (val: number) => string | number;
    readonly rangeStartLabel: string;
    readonly rangeEndLabel: string;
    readonly formatValueText: (val: number) => string;
    readonly tooltipClass: string;
    readonly showInput: boolean;
    readonly showStops: boolean;
}>;
export default _default;
