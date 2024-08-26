declare const _default: import("vue").DefineComponent<{
    color: {
        type: StringConstructor;
        default: string;
    };
} & {
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: string | number | undefined;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
} & {
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: string | number | undefined;
    };
}>>, {
    size: string | number;
    color: string;
}>;
export default _default;