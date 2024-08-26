import type { VNode } from 'vue';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    readonly data: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferDataItem[]) | (() => import("./transfer").TransferDataItem[]) | ((new (...args: any[]) => import("./transfer").TransferDataItem[]) | (() => import("./transfer").TransferDataItem[]))[], unknown, unknown, () => never[], boolean>;
    readonly optionRender: {
        readonly type: import("vue").PropType<(option: import("./transfer").TransferDataItem) => VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }> | VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>[]>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly placeholder: StringConstructor;
    readonly title: StringConstructor;
    readonly filterable: BooleanConstructor;
    readonly format: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat) | ((new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat))[], unknown, unknown, () => {}, boolean>;
    readonly filterMethod: {
        readonly type: import("vue").PropType<(query: string, item: import("./transfer").TransferDataItem) => boolean>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly defaultChecked: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]) | ((new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]))[], unknown, unknown, () => never[], boolean>;
    readonly props: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias) | ((new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{
        readonly label: "label";
        readonly key: "key";
        readonly disabled: "disabled";
    }>, boolean>;
}, {
    /** @description filter keyword */
    query: import("vue").Ref<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "checked-change": (value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly data: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferDataItem[]) | (() => import("./transfer").TransferDataItem[]) | ((new (...args: any[]) => import("./transfer").TransferDataItem[]) | (() => import("./transfer").TransferDataItem[]))[], unknown, unknown, () => never[], boolean>;
    readonly optionRender: {
        readonly type: import("vue").PropType<(option: import("./transfer").TransferDataItem) => VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }> | VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>[]>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly placeholder: StringConstructor;
    readonly title: StringConstructor;
    readonly filterable: BooleanConstructor;
    readonly format: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat) | ((new (...args: any[]) => import("./transfer").TransferFormat) | (() => import("./transfer").TransferFormat))[], unknown, unknown, () => {}, boolean>;
    readonly filterMethod: {
        readonly type: import("vue").PropType<(query: string, item: import("./transfer").TransferDataItem) => boolean>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly defaultChecked: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]) | ((new (...args: any[]) => import("./transfer").TransferKey[]) | (() => import("./transfer").TransferKey[]))[], unknown, unknown, () => never[], boolean>;
    readonly props: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias) | ((new (...args: any[]) => import("./transfer").TransferPropsAlias) | (() => import("./transfer").TransferPropsAlias))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{
        readonly label: "label";
        readonly key: "key";
        readonly disabled: "disabled";
    }>, boolean>;
}>> & {
    "onChecked-change"?: ((value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => any) | undefined;
}, {
    readonly data: import("./transfer").TransferDataItem[];
    readonly props: import("./transfer").TransferPropsAlias;
    readonly format: import("./transfer").TransferFormat;
    readonly filterable: boolean;
    readonly defaultChecked: import("./transfer").TransferKey[];
}>, {
    default?(_: {}): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
