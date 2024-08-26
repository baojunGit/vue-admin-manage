declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    readonly beforeUpload: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<boolean | void | File | Blob | null | undefined>) | (() => (rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<boolean | void | File | Blob | null | undefined>) | {
        (): (rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<boolean | void | File | Blob | null | undefined>;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<boolean | void | File | Blob | null | undefined>) | (() => (rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<boolean | void | File | Blob | null | undefined>) | {
        (): (rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<boolean | void | File | Blob | null | undefined>;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly beforeRemove: {
        readonly type: import("vue").PropType<(uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => import("../../../utils").Awaitable<boolean>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onRemove: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly onChange: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly onPreview: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (uploadFile: import("./upload").UploadFile) => void) | (() => (uploadFile: import("./upload").UploadFile) => void) | {
        (): (uploadFile: import("./upload").UploadFile) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (uploadFile: import("./upload").UploadFile) => void) | (() => (uploadFile: import("./upload").UploadFile) => void) | {
        (): (uploadFile: import("./upload").UploadFile) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly onSuccess: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (response: any, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (response: any, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (response: any, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (response: any, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (response: any, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (response: any, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly onProgress: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (evt: import("./upload").UploadProgressEvent, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (evt: import("./upload").UploadProgressEvent, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (evt: import("./upload").UploadProgressEvent, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (evt: import("./upload").UploadProgressEvent, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (evt: import("./upload").UploadProgressEvent, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (evt: import("./upload").UploadProgressEvent, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly onError: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (error: Error, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (error: Error, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (error: Error, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (error: Error, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (error: Error, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (error: Error, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly onExceed: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (files: File[], uploadFiles: import("./upload").UploadUserFile[]) => void) | (() => (files: File[], uploadFiles: import("./upload").UploadUserFile[]) => void) | {
        (): (files: File[], uploadFiles: import("./upload").UploadUserFile[]) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (files: File[], uploadFiles: import("./upload").UploadUserFile[]) => void) | (() => (files: File[], uploadFiles: import("./upload").UploadUserFile[]) => void) | {
        (): (files: File[], uploadFiles: import("./upload").UploadUserFile[]) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly crossorigin: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<(new (...args: any[]) => ("" | "anonymous" | "use-credentials") & {}) | (() => "" | "anonymous" | "use-credentials") | ((new (...args: any[]) => ("" | "anonymous" | "use-credentials") & {}) | (() => "" | "anonymous" | "use-credentials"))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly action: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "#", boolean>;
    readonly headers: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<(new (...args: any[]) => Record<string, any> | Headers) | (() => Record<string, any> | Headers) | ((new (...args: any[]) => Record<string, any> | Headers) | (() => Record<string, any> | Headers))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly method: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "post", boolean>;
    readonly data: import("../../../utils").EpPropFinalized<(new (...args: any[]) => ((rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<import("../../../utils").Mutable<Record<string, any>>>) | import("../../../utils").Mutable<Record<string, any>> | Promise<import("../../../utils").Mutable<Record<string, any>>>) | (() => ((rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<import("../../../utils").Mutable<Record<string, any>>>) | import("../../../utils").Awaitable<import("../../../utils").Mutable<Record<string, any>>>) | ((new (...args: any[]) => ((rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<import("../../../utils").Mutable<Record<string, any>>>) | import("../../../utils").Mutable<Record<string, any>> | Promise<import("../../../utils").Mutable<Record<string, any>>>) | (() => ((rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<import("../../../utils").Mutable<Record<string, any>>>) | import("../../../utils").Awaitable<import("../../../utils").Mutable<Record<string, any>>>))[], unknown, unknown, () => import("../../../utils").Mutable<{}>, boolean>;
    readonly multiple: BooleanConstructor;
    readonly name: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "file", boolean>;
    readonly drag: BooleanConstructor;
    readonly withCredentials: BooleanConstructor;
    readonly showFileList: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly accept: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly fileList: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("./upload").UploadUserFile[]) | (() => import("./upload").UploadUserFile[]) | ((new (...args: any[]) => import("./upload").UploadUserFile[]) | (() => import("./upload").UploadUserFile[]))[], unknown, unknown, () => [], boolean>;
    readonly autoUpload: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly listType: import("../../../utils").EpPropFinalized<StringConstructor, "picture" | "text" | "picture-card", unknown, "text", boolean>;
    readonly httpRequest: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("./upload").UploadRequestHandler) | (() => import("./upload").UploadRequestHandler) | {
        (): import("./upload").UploadRequestHandler;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => import("./upload").UploadRequestHandler) | (() => import("./upload").UploadRequestHandler) | {
        (): import("./upload").UploadRequestHandler;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, import("./upload").UploadRequestHandler, boolean>;
    readonly disabled: BooleanConstructor;
    readonly limit: NumberConstructor;
}, {
    /** @description cancel upload request */
    abort: (file: import("./upload").UploadFile) => void;
    /** @description upload the file list manually */
    submit: () => void;
    /** @description clear the file list  */
    clearFiles: (states?: import("./upload").UploadStatus[]) => void;
    /** @description select the file manually */
    handleStart: (rawFile: import("./upload").UploadRawFile) => void;
    /** @description remove the file manually */
    handleRemove: (file: import("./upload").UploadRawFile | import("./upload").UploadFile, rawFile?: import("./upload").UploadRawFile | undefined) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly beforeUpload: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<boolean | void | File | Blob | null | undefined>) | (() => (rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<boolean | void | File | Blob | null | undefined>) | {
        (): (rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<boolean | void | File | Blob | null | undefined>;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<boolean | void | File | Blob | null | undefined>) | (() => (rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<boolean | void | File | Blob | null | undefined>) | {
        (): (rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<boolean | void | File | Blob | null | undefined>;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly beforeRemove: {
        readonly type: import("vue").PropType<(uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => import("../../../utils").Awaitable<boolean>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onRemove: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly onChange: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly onPreview: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (uploadFile: import("./upload").UploadFile) => void) | (() => (uploadFile: import("./upload").UploadFile) => void) | {
        (): (uploadFile: import("./upload").UploadFile) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (uploadFile: import("./upload").UploadFile) => void) | (() => (uploadFile: import("./upload").UploadFile) => void) | {
        (): (uploadFile: import("./upload").UploadFile) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly onSuccess: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (response: any, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (response: any, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (response: any, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (response: any, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (response: any, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (response: any, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly onProgress: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (evt: import("./upload").UploadProgressEvent, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (evt: import("./upload").UploadProgressEvent, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (evt: import("./upload").UploadProgressEvent, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (evt: import("./upload").UploadProgressEvent, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (evt: import("./upload").UploadProgressEvent, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (evt: import("./upload").UploadProgressEvent, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly onError: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (error: Error, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (error: Error, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (error: Error, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (error: Error, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | (() => (error: Error, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void) | {
        (): (error: Error, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly onExceed: import("../../../utils").EpPropFinalized<(new (...args: any[]) => (files: File[], uploadFiles: import("./upload").UploadUserFile[]) => void) | (() => (files: File[], uploadFiles: import("./upload").UploadUserFile[]) => void) | {
        (): (files: File[], uploadFiles: import("./upload").UploadUserFile[]) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (files: File[], uploadFiles: import("./upload").UploadUserFile[]) => void) | (() => (files: File[], uploadFiles: import("./upload").UploadUserFile[]) => void) | {
        (): (files: File[], uploadFiles: import("./upload").UploadUserFile[]) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly crossorigin: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<(new (...args: any[]) => ("" | "anonymous" | "use-credentials") & {}) | (() => "" | "anonymous" | "use-credentials") | ((new (...args: any[]) => ("" | "anonymous" | "use-credentials") & {}) | (() => "" | "anonymous" | "use-credentials"))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly action: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "#", boolean>;
    readonly headers: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<(new (...args: any[]) => Record<string, any> | Headers) | (() => Record<string, any> | Headers) | ((new (...args: any[]) => Record<string, any> | Headers) | (() => Record<string, any> | Headers))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly method: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "post", boolean>;
    readonly data: import("../../../utils").EpPropFinalized<(new (...args: any[]) => ((rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<import("../../../utils").Mutable<Record<string, any>>>) | import("../../../utils").Mutable<Record<string, any>> | Promise<import("../../../utils").Mutable<Record<string, any>>>) | (() => ((rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<import("../../../utils").Mutable<Record<string, any>>>) | import("../../../utils").Awaitable<import("../../../utils").Mutable<Record<string, any>>>) | ((new (...args: any[]) => ((rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<import("../../../utils").Mutable<Record<string, any>>>) | import("../../../utils").Mutable<Record<string, any>> | Promise<import("../../../utils").Mutable<Record<string, any>>>) | (() => ((rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<import("../../../utils").Mutable<Record<string, any>>>) | import("../../../utils").Awaitable<import("../../../utils").Mutable<Record<string, any>>>))[], unknown, unknown, () => import("../../../utils").Mutable<{}>, boolean>;
    readonly multiple: BooleanConstructor;
    readonly name: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "file", boolean>;
    readonly drag: BooleanConstructor;
    readonly withCredentials: BooleanConstructor;
    readonly showFileList: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly accept: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly fileList: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("./upload").UploadUserFile[]) | (() => import("./upload").UploadUserFile[]) | ((new (...args: any[]) => import("./upload").UploadUserFile[]) | (() => import("./upload").UploadUserFile[]))[], unknown, unknown, () => [], boolean>;
    readonly autoUpload: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly listType: import("../../../utils").EpPropFinalized<StringConstructor, "picture" | "text" | "picture-card", unknown, "text", boolean>;
    readonly httpRequest: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("./upload").UploadRequestHandler) | (() => import("./upload").UploadRequestHandler) | {
        (): import("./upload").UploadRequestHandler;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => import("./upload").UploadRequestHandler) | (() => import("./upload").UploadRequestHandler) | {
        (): import("./upload").UploadRequestHandler;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, import("./upload").UploadRequestHandler, boolean>;
    readonly disabled: BooleanConstructor;
    readonly limit: NumberConstructor;
}>>, {
    readonly data: import("../../../utils").EpPropMergeType<(new (...args: any[]) => ((rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<import("../../../utils").Mutable<Record<string, any>>>) | import("../../../utils").Mutable<Record<string, any>> | Promise<import("../../../utils").Mutable<Record<string, any>>>) | (() => ((rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<import("../../../utils").Mutable<Record<string, any>>>) | import("../../../utils").Awaitable<import("../../../utils").Mutable<Record<string, any>>>) | ((new (...args: any[]) => ((rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<import("../../../utils").Mutable<Record<string, any>>>) | import("../../../utils").Mutable<Record<string, any>> | Promise<import("../../../utils").Mutable<Record<string, any>>>) | (() => ((rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<import("../../../utils").Mutable<Record<string, any>>>) | import("../../../utils").Awaitable<import("../../../utils").Mutable<Record<string, any>>>))[], unknown, unknown>;
    readonly drag: boolean;
    readonly multiple: boolean;
    readonly disabled: boolean;
    readonly name: string;
    readonly onChange: (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
    readonly onError: (error: Error, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
    readonly onProgress: (evt: import("./upload").UploadProgressEvent, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
    readonly method: string;
    readonly action: string;
    readonly withCredentials: boolean;
    readonly onPreview: (uploadFile: import("./upload").UploadFile) => void;
    readonly listType: import("../../../utils").EpPropMergeType<StringConstructor, "picture" | "text" | "picture-card", unknown>;
    readonly onRemove: (uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
    readonly showFileList: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly accept: string;
    readonly fileList: import("./upload").UploadUserFile[];
    readonly autoUpload: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly httpRequest: import("./upload").UploadRequestHandler;
    readonly beforeUpload: (rawFile: import("./upload").UploadRawFile) => import("../../../utils").Awaitable<boolean | void | File | Blob | null | undefined>;
    readonly onSuccess: (response: any, uploadFile: import("./upload").UploadFile, uploadFiles: import("./upload").UploadFiles) => void;
    readonly onExceed: (files: File[], uploadFiles: import("./upload").UploadUserFile[]) => void;
}>, {
    file?(_: {
        file: import("./upload").UploadFile;
        index: number;
    }): any;
    trigger?(_: {}): any;
    default?(_: {}): any;
    tip?(_: {}): any;
}>;
export default _default;
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
