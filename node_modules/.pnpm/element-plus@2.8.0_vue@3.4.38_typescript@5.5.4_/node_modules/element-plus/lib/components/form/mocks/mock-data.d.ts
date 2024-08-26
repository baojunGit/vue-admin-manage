declare const DynamicDomainForm: import("vue").DefineComponent<{
    onSuccess: FunctionConstructor;
    onError: FunctionConstructor;
    onSubmit: FunctionConstructor;
    model: ObjectConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    onSuccess: FunctionConstructor;
    onError: FunctionConstructor;
    onSubmit: FunctionConstructor;
    model: ObjectConstructor;
}>>, {}>;
export default DynamicDomainForm;
export declare const formatDomainError: (count: number) => unknown;
