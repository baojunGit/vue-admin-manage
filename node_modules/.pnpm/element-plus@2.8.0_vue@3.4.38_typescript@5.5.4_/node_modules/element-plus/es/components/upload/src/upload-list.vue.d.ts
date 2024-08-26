import type { UploadFile } from './upload';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    readonly files: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("./upload").UploadFiles) | (() => import("./upload").UploadFiles) | ((new (...args: any[]) => import("./upload").UploadFiles) | (() => import("./upload").UploadFiles))[], unknown, unknown, () => never[], boolean>;
    readonly disabled: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly handlePreview: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (uploadFile: UploadFile) => void) | (() => (uploadFile: UploadFile) => void) | {
        (): (uploadFile: UploadFile) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (uploadFile: UploadFile) => void) | (() => (uploadFile: UploadFile) => void) | {
        (): (uploadFile: UploadFile) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly listType: import("../../../utils").EpPropFinalized<StringConstructor, "picture" | "text" | "picture-card", unknown, "text", boolean>;
    readonly crossorigin: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<(new (...args: any[]) => ("" | "anonymous" | "use-credentials") & {}) | (() => "" | "anonymous" | "use-credentials") | ((new (...args: any[]) => ("" | "anonymous" | "use-credentials") & {}) | (() => "" | "anonymous" | "use-credentials"))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    remove: (file: UploadFile) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly files: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("./upload").UploadFiles) | (() => import("./upload").UploadFiles) | ((new (...args: any[]) => import("./upload").UploadFiles) | (() => import("./upload").UploadFiles))[], unknown, unknown, () => never[], boolean>;
    readonly disabled: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly handlePreview: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (uploadFile: UploadFile) => void) | (() => (uploadFile: UploadFile) => void) | {
        (): (uploadFile: UploadFile) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (uploadFile: UploadFile) => void) | (() => (uploadFile: UploadFile) => void) | {
        (): (uploadFile: UploadFile) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly listType: import("../../../utils").EpPropFinalized<StringConstructor, "picture" | "text" | "picture-card", unknown, "text", boolean>;
    readonly crossorigin: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<(new (...args: any[]) => ("" | "anonymous" | "use-credentials") & {}) | (() => "" | "anonymous" | "use-credentials") | ((new (...args: any[]) => ("" | "anonymous" | "use-credentials") & {}) | (() => "" | "anonymous" | "use-credentials"))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}>> & {
    onRemove?: ((file: UploadFile) => any) | undefined;
}, {
    readonly disabled: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly files: import("./upload").UploadFiles;
    readonly handlePreview: (uploadFile: UploadFile) => void;
    readonly listType: import("../../../utils").EpPropMergeType<StringConstructor, "picture" | "text" | "picture-card", unknown>;
}>, {
    default?(_: {
        file: UploadFile;
        index: number;
    }): any;
    append?(_: {}): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
