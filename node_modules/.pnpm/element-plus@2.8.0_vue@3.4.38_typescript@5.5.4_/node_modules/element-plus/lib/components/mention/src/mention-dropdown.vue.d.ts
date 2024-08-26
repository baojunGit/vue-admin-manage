import type { MentionOption } from './types';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    options: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => MentionOption[]) | (() => MentionOption[]) | ((new (...args: any[]) => MentionOption[]) | (() => MentionOption[]))[], unknown, unknown, () => never[], boolean>;
    loading: BooleanConstructor;
    disabled: BooleanConstructor;
}, {
    navigateOptions: (direction: "prev" | "next") => void;
    selectHoverOption: () => void;
    hoverOption: import("vue").ComputedRef<MentionOption>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    select: (option: MentionOption) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    options: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => MentionOption[]) | (() => MentionOption[]) | ((new (...args: any[]) => MentionOption[]) | (() => MentionOption[]))[], unknown, unknown, () => never[], boolean>;
    loading: BooleanConstructor;
    disabled: BooleanConstructor;
}>> & {
    onSelect?: ((option: MentionOption) => any) | undefined;
}, {
    disabled: boolean;
    loading: boolean;
    options: MentionOption[];
}>, {
    header?(_: {}): any;
    label?(_: {
        item: MentionOption;
        index: number;
    }): any;
    loading?(_: {}): any;
    footer?(_: {}): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
