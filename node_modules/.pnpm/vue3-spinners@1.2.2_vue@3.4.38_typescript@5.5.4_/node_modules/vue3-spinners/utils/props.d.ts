interface UseSpinnerPropsProps {
    margin?: string;
    size?: string | number;
    height?: string | number;
    width?: string | number;
    radius?: string | number;
}
export declare function useSpinnerProps<T extends UseSpinnerPropsProps>(props: T): {
    color: {
        type: StringConstructor;
        default: string;
    };
} & {};
export {};
