import type { ExtractPropTypes } from 'vue';
export declare const spinnerProps: {
    size: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    color: StringConstructor;
};
export default function useSpinner(props: ExtractPropTypes<typeof spinnerProps>): {
    cSize: import("vue").ComputedRef<string | number>;
    classes: import("vue").ComputedRef<string>;
    style: import("vue").ComputedRef<{
        color: string | undefined;
    }>;
};
