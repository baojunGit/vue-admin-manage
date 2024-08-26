declare const _default: import("vue").DefineComponent<{
    zIndex: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    visible: BooleanConstructor;
    fill: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
    pos: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("./types").PosInfo) | (() => import("./types").PosInfo | null) | ((new (...args: any[]) => import("./types").PosInfo) | (() => import("./types").PosInfo | null))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    targetAreaClickable: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    zIndex: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    visible: BooleanConstructor;
    fill: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
    pos: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("./types").PosInfo) | (() => import("./types").PosInfo | null) | ((new (...args: any[]) => import("./types").PosInfo) | (() => import("./types").PosInfo | null))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    targetAreaClickable: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
}>>, {
    zIndex: number;
    fill: string;
    visible: boolean;
    targetAreaClickable: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
}>;
export default _default;
