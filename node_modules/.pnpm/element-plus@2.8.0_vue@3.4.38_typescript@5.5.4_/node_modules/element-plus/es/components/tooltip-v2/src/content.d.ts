import type { ExtractPropTypes } from 'vue';
import type { Placement, Strategy, VirtualElement } from '@floating-ui/dom';
export declare const tooltipV2ContentProps: {
    readonly ariaLabel: StringConstructor;
    readonly arrowPadding: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => number & {}) | (() => number) | ((new (...args: any[]) => number & {}) | (() => number))[], unknown, unknown, 5, boolean>;
    readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string & {}) | (() => string) | ((new (...args: any[]) => string & {}) | (() => string))[], unknown, unknown, "light", boolean>;
    readonly contentClass: StringConstructor;
    readonly placement: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Placement & {}) | (() => Placement) | ((new (...args: any[]) => Placement & {}) | (() => Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, "bottom", boolean>;
    readonly reference: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => HTMLElement | VirtualElement) | (() => HTMLElement | VirtualElement | null) | ((new (...args: any[]) => HTMLElement | VirtualElement) | (() => HTMLElement | VirtualElement | null))[], unknown, unknown, null, boolean>;
    readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 8, boolean>;
    readonly strategy: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Strategy & {}) | (() => Strategy) | ((new (...args: any[]) => Strategy & {}) | (() => Strategy))[], "fixed" | "absolute", unknown, "absolute", boolean>;
    readonly showArrow: BooleanConstructor;
};
export declare type TooltipV2ContentProps = ExtractPropTypes<typeof tooltipV2ContentProps>;
