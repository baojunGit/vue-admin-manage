declare const _default: import("vue").DefineComponent<{
    color: {
        type: StringConstructor;
        default: string;
    };
} & {
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: string | number | undefined;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: string | number | undefined;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
} & {
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: string | number | undefined;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: string | number | undefined;
    };
}>>, {
    height: string | number;
    width: string | number;
    color: string;
}>;
export default _default;