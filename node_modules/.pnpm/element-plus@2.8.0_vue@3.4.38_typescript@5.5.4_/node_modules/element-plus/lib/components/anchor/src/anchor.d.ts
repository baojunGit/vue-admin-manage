import type { ExtractPropTypes } from 'vue';
import type Anchor from './anchor.vue';
export declare const anchorProps: {
    container: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | HTMLElement | Window | null) & {}) | (() => string | HTMLElement | Window | null) | ((new (...args: any[]) => (string | HTMLElement | Window | null) & {}) | (() => string | HTMLElement | Window | null))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    bound: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    duration: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    marker: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    type: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => ("default" | "underline") & {}) | (() => "default" | "underline") | ((new (...args: any[]) => ("default" | "underline") & {}) | (() => "default" | "underline"))[], unknown, unknown, string, boolean>;
    direction: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => ("horizontal" | "vertical") & {}) | (() => "horizontal" | "vertical") | ((new (...args: any[]) => ("horizontal" | "vertical") & {}) | (() => "horizontal" | "vertical"))[], unknown, unknown, string, boolean>;
};
export declare type AnchorProps = ExtractPropTypes<typeof anchorProps>;
export declare type AnchorInstance = InstanceType<typeof Anchor>;
export declare const anchorEmits: {
    change: (href: string) => boolean;
    click: (e: MouseEvent, href?: string) => boolean;
};
export declare type AnchorEmits = typeof anchorEmits;
