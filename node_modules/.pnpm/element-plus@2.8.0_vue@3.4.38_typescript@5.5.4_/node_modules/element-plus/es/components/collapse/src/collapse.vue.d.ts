declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    readonly accordion: BooleanConstructor;
    readonly modelValue: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("./collapse").CollapseModelValue & {}) | (() => import("./collapse").CollapseModelValue) | ((new (...args: any[]) => import("./collapse").CollapseModelValue & {}) | (() => import("./collapse").CollapseModelValue))[], unknown, unknown, () => [], boolean>;
}, {
    /** @description active names */
    activeNames: import("vue").Ref<(string | number)[]>;
    /** @description set active names */
    setActiveNames: (_activeNames: import("./collapse").CollapseActiveName[]) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: import("./collapse").CollapseModelValue) => void;
    change: (value: import("./collapse").CollapseModelValue) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly accordion: BooleanConstructor;
    readonly modelValue: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("./collapse").CollapseModelValue & {}) | (() => import("./collapse").CollapseModelValue) | ((new (...args: any[]) => import("./collapse").CollapseModelValue & {}) | (() => import("./collapse").CollapseModelValue))[], unknown, unknown, () => [], boolean>;
}>> & {
    "onUpdate:modelValue"?: ((value: import("./collapse").CollapseModelValue) => any) | undefined;
    onChange?: ((value: import("./collapse").CollapseModelValue) => any) | undefined;
}, {
    readonly modelValue: import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("./collapse").CollapseModelValue & {}) | (() => import("./collapse").CollapseModelValue) | ((new (...args: any[]) => import("./collapse").CollapseModelValue & {}) | (() => import("./collapse").CollapseModelValue))[], unknown, unknown>;
    readonly accordion: boolean;
}>, {
    default?(_: {}): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
