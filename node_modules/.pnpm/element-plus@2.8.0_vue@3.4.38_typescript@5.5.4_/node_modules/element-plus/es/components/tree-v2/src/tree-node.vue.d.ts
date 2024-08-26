import type { CheckboxValueType } from 'element-plus/es/components/checkbox';
declare const _default: import("vue").DefineComponent<{
    readonly node: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("./types").TreeNode) | (() => import("./types").TreeNode) | ((new (...args: any[]) => import("./types").TreeNode) | (() => import("./types").TreeNode))[], unknown, unknown, () => import("../../../utils").Mutable<{
        readonly key: -1;
        readonly level: -1;
        readonly data: {};
    }>, boolean>;
    readonly expanded: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly checked: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly indeterminate: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly showCheckbox: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly disabled: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly current: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly hiddenExpandIcon: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly itemSize: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (node: import("./types").TreeNode, e: MouseEvent) => void;
    toggle: (node: import("./types").TreeNode) => void;
    check: (node: import("./types").TreeNode, checked: CheckboxValueType) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly node: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("./types").TreeNode) | (() => import("./types").TreeNode) | ((new (...args: any[]) => import("./types").TreeNode) | (() => import("./types").TreeNode))[], unknown, unknown, () => import("../../../utils").Mutable<{
        readonly key: -1;
        readonly level: -1;
        readonly data: {};
    }>, boolean>;
    readonly expanded: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly checked: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly indeterminate: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly showCheckbox: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly disabled: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly current: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly hiddenExpandIcon: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly itemSize: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
}>> & {
    onClick?: ((node: import("./types").TreeNode, e: MouseEvent) => any) | undefined;
    onToggle?: ((node: import("./types").TreeNode) => any) | undefined;
    onCheck?: ((node: import("./types").TreeNode, checked: CheckboxValueType) => any) | undefined;
}, {
    readonly expanded: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly disabled: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly current: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly indeterminate: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly checked: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly node: import("./types").TreeNode;
    readonly itemSize: number;
    readonly showCheckbox: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly hiddenExpandIcon: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
}>;
export default _default;
