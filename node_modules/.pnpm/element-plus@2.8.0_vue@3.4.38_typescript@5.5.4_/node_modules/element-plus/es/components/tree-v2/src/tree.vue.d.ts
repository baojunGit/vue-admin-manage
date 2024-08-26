declare const _default: import("vue").DefineComponent<{
    readonly data: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("./types").TreeData) | (() => import("./types").TreeData) | ((new (...args: any[]) => import("./types").TreeData) | (() => import("./types").TreeData))[], unknown, unknown, () => [], boolean>;
    readonly emptyText: {
        readonly type: import("vue").PropType<string>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly height: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 200, boolean>;
    readonly props: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("./types").TreeOptionProps) | (() => import("./types").TreeOptionProps) | ((new (...args: any[]) => import("./types").TreeOptionProps) | (() => import("./types").TreeOptionProps))[], unknown, unknown, () => import("../../../utils").Mutable<{
        readonly children: import("./virtual-tree").TreeOptionsEnum.CHILDREN;
        readonly label: import("./virtual-tree").TreeOptionsEnum.LABEL;
        readonly disabled: import("./virtual-tree").TreeOptionsEnum.DISABLED;
        readonly value: import("./virtual-tree").TreeOptionsEnum.KEY;
    }>, boolean>;
    readonly highlightCurrent: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly showCheckbox: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly defaultCheckedKeys: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("./types").TreeKey[]) | (() => import("./types").TreeKey[]) | ((new (...args: any[]) => import("./types").TreeKey[]) | (() => import("./types").TreeKey[]))[], unknown, unknown, () => [], boolean>;
    readonly checkStrictly: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly defaultExpandedKeys: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("./types").TreeKey[]) | (() => import("./types").TreeKey[]) | ((new (...args: any[]) => import("./types").TreeKey[]) | (() => import("./types").TreeKey[]))[], unknown, unknown, () => [], boolean>;
    readonly indent: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 16, boolean>;
    readonly itemSize: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    readonly icon: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) & {}) | (() => string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) | ((new (...args: any[]) => (string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) & {}) | (() => string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly expandOnClickNode: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly checkOnClickNode: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly currentNodeKey: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("./types").TreeKey & {}) | (() => import("./types").TreeKey) | ((new (...args: any[]) => import("./types").TreeKey & {}) | (() => import("./types").TreeKey))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly accordion: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly filterMethod: {
        readonly type: import("vue").PropType<import("./types").FilterMethod>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly perfMode: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
}, {
    toggleCheckbox: (node: import("./types").TreeNode, isChecked: import("../..").CheckboxValueType, nodeClick?: boolean) => void;
    getCurrentNode: () => import("./types").TreeNodeData | undefined;
    getCurrentKey: () => import("./types").TreeKey | undefined;
    setCurrentKey: (key: import("./types").TreeKey) => void;
    getCheckedKeys: (leafOnly?: boolean) => import("./types").TreeKey[];
    getCheckedNodes: (leafOnly?: boolean) => import("./types").TreeNodeData[];
    getHalfCheckedKeys: () => import("./types").TreeKey[];
    getHalfCheckedNodes: () => import("./types").TreeNodeData[];
    setChecked: (key: import("./types").TreeKey, isChecked: boolean) => void;
    setCheckedKeys: (keys: import("./types").TreeKey[]) => void;
    filter: (query: string) => void;
    setData: (data: import("./types").TreeData) => void;
    getNode: (data: import("./types").TreeNodeData | import("./types").TreeKey) => import("./types").TreeNode | undefined;
    expandNode: (node: import("./types").TreeNode) => void;
    collapseNode: (node: import("./types").TreeNode) => void;
    setExpandedKeys: (keys: import("./types").TreeKey[]) => void;
    scrollToNode: (key: import("./types").TreeKey, strategy?: import("element-plus/es/components/virtual-list").Alignment) => void;
    scrollTo: (offset: number) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    check: (data: import("../../tree/src/tree.type").TreeNodeData, checkedInfo: import("./types").CheckedInfo) => void;
    "current-change": (data: import("../../tree/src/tree.type").TreeNodeData, node: import("./types").TreeNode) => void;
    "node-expand": (data: import("../../tree/src/tree.type").TreeNodeData, node: import("./types").TreeNode) => void;
    "check-change": (data: import("../../tree/src/tree.type").TreeNodeData, checked: boolean) => void;
    "node-click": (data: import("../../tree/src/tree.type").TreeNodeData, node: import("./types").TreeNode, e: MouseEvent) => void;
    "node-contextmenu": (evt: Event, data: import("../../tree/src/tree.type").TreeNodeData, node: import("./types").TreeNode) => void;
    "node-collapse": (data: import("../../tree/src/tree.type").TreeNodeData, node: import("./types").TreeNode) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly data: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("./types").TreeData) | (() => import("./types").TreeData) | ((new (...args: any[]) => import("./types").TreeData) | (() => import("./types").TreeData))[], unknown, unknown, () => [], boolean>;
    readonly emptyText: {
        readonly type: import("vue").PropType<string>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly height: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 200, boolean>;
    readonly props: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("./types").TreeOptionProps) | (() => import("./types").TreeOptionProps) | ((new (...args: any[]) => import("./types").TreeOptionProps) | (() => import("./types").TreeOptionProps))[], unknown, unknown, () => import("../../../utils").Mutable<{
        readonly children: import("./virtual-tree").TreeOptionsEnum.CHILDREN;
        readonly label: import("./virtual-tree").TreeOptionsEnum.LABEL;
        readonly disabled: import("./virtual-tree").TreeOptionsEnum.DISABLED;
        readonly value: import("./virtual-tree").TreeOptionsEnum.KEY;
    }>, boolean>;
    readonly highlightCurrent: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly showCheckbox: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly defaultCheckedKeys: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("./types").TreeKey[]) | (() => import("./types").TreeKey[]) | ((new (...args: any[]) => import("./types").TreeKey[]) | (() => import("./types").TreeKey[]))[], unknown, unknown, () => [], boolean>;
    readonly checkStrictly: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly defaultExpandedKeys: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("./types").TreeKey[]) | (() => import("./types").TreeKey[]) | ((new (...args: any[]) => import("./types").TreeKey[]) | (() => import("./types").TreeKey[]))[], unknown, unknown, () => [], boolean>;
    readonly indent: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, 16, boolean>;
    readonly itemSize: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    readonly icon: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) & {}) | (() => string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) | ((new (...args: any[]) => (string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) & {}) | (() => string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly expandOnClickNode: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly checkOnClickNode: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly currentNodeKey: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("./types").TreeKey & {}) | (() => import("./types").TreeKey) | ((new (...args: any[]) => import("./types").TreeKey & {}) | (() => import("./types").TreeKey))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly accordion: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly filterMethod: {
        readonly type: import("vue").PropType<import("./types").FilterMethod>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly perfMode: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
}>> & {
    "onNode-expand"?: ((data: import("../../tree/src/tree.type").TreeNodeData, node: import("./types").TreeNode) => any) | undefined;
    onCheck?: ((data: import("../../tree/src/tree.type").TreeNodeData, checkedInfo: import("./types").CheckedInfo) => any) | undefined;
    "onCurrent-change"?: ((data: import("../../tree/src/tree.type").TreeNodeData, node: import("./types").TreeNode) => any) | undefined;
    "onCheck-change"?: ((data: import("../../tree/src/tree.type").TreeNodeData, checked: boolean) => any) | undefined;
    "onNode-click"?: ((data: import("../../tree/src/tree.type").TreeNodeData, node: import("./types").TreeNode, e: MouseEvent) => any) | undefined;
    "onNode-contextmenu"?: ((evt: Event, data: import("../../tree/src/tree.type").TreeNodeData, node: import("./types").TreeNode) => any) | undefined;
    "onNode-collapse"?: ((data: import("../../tree/src/tree.type").TreeNodeData, node: import("./types").TreeNode) => any) | undefined;
}, {
    readonly data: import("./types").TreeData;
    readonly height: number;
    readonly props: import("./types").TreeOptionProps;
    readonly checkStrictly: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly accordion: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly perfMode: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly itemSize: number;
    readonly showCheckbox: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly defaultCheckedKeys: import("./types").TreeKey[];
    readonly defaultExpandedKeys: import("./types").TreeKey[];
    readonly expandOnClickNode: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly checkOnClickNode: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly highlightCurrent: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly indent: number;
}>;
export default _default;
