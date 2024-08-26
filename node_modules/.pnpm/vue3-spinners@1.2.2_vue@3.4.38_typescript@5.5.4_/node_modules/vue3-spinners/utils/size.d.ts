import type { ComputedGetter } from 'vue';
export declare function useSize(sizeGetter: ComputedGetter<string | number>): import("vue").ComputedRef<{
    value: number;
    unit: string;
    string: string;
}>;
