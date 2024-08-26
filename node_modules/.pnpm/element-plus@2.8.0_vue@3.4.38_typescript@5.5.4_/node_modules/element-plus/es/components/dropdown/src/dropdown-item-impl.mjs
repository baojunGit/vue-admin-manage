import { defineComponent, inject, computed, resolveComponent, openBlock, createElementBlock, Fragment, mergeProps, createCommentVNode, createElementVNode, withModifiers, createBlock, withCtx, resolveDynamicComponent, renderSlot } from 'vue';
import '../../roving-focus-group/index.mjs';
import '../../collection/index.mjs';
import { ElIcon } from '../../icon/index.mjs';
import '../../../hooks/index.mjs';
import '../../../utils/index.mjs';
import '../../../constants/index.mjs';
import { dropdownItemProps, DROPDOWN_COLLECTION_ITEM_INJECTION_KEY as COLLECTION_ITEM_INJECTION_KEY } from './dropdown.mjs';
import { DROPDOWN_INJECTION_KEY } from './tokens.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY as COLLECTION_ITEM_INJECTION_KEY$1 } from '../../roving-focus-group/src/roving-focus-group.mjs';
import { ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY } from '../../roving-focus-group/src/tokens.mjs';
import { composeRefs } from '../../../utils/vue/refs.mjs';
import { composeEventHandlers } from '../../../utils/dom/event.mjs';
import { EVENT_CODE } from '../../../constants/aria.mjs';
import { COLLECTION_ITEM_SIGN } from '../../collection/src/collection.mjs';

const _sfc_main = defineComponent({
  name: "DropdownItemImpl",
  components: {
    ElIcon
  },
  props: dropdownItemProps,
  emits: ["pointermove", "pointerleave", "click", "clickimpl"],
  setup(_, { emit }) {
    const ns = useNamespace("dropdown");
    const { role: menuRole } = inject(DROPDOWN_INJECTION_KEY, void 0);
    const { collectionItemRef: dropdownCollectionItemRef } = inject(COLLECTION_ITEM_INJECTION_KEY, void 0);
    const { collectionItemRef: rovingFocusCollectionItemRef } = inject(COLLECTION_ITEM_INJECTION_KEY$1, void 0);
    const {
      rovingFocusGroupItemRef,
      tabIndex,
      handleFocus,
      handleKeydown: handleItemKeydown,
      handleMousedown
    } = inject(ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, void 0);
    const itemRef = composeRefs(dropdownCollectionItemRef, rovingFocusCollectionItemRef, rovingFocusGroupItemRef);
    const role = computed(() => {
      if (menuRole.value === "menu") {
        return "menuitem";
      } else if (menuRole.value === "navigation") {
        return "link";
      }
      return "button";
    });
    const handleKeydown = composeEventHandlers((e) => {
      const { code } = e;
      if (code === EVENT_CODE.enter || code === EVENT_CODE.space) {
        e.preventDefault();
        e.stopImmediatePropagation();
        emit("clickimpl", e);
        return true;
      }
    }, handleItemKeydown);
    return {
      ns,
      itemRef,
      dataset: {
        [COLLECTION_ITEM_SIGN]: ""
      },
      role,
      tabIndex,
      handleFocus,
      handleKeydown,
      handleMousedown
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = resolveComponent("el-icon");
  return openBlock(), createElementBlock(Fragment, null, [
    _ctx.divided ? (openBlock(), createElementBlock("li", mergeProps({
      key: 0,
      role: "separator",
      class: _ctx.ns.bem("menu", "item", "divided")
    }, _ctx.$attrs), null, 16)) : createCommentVNode("v-if", true),
    createElementVNode("li", mergeProps({ ref: _ctx.itemRef }, { ..._ctx.dataset, ..._ctx.$attrs }, {
      "aria-disabled": _ctx.disabled,
      class: [_ctx.ns.be("menu", "item"), _ctx.ns.is("disabled", _ctx.disabled)],
      tabindex: _ctx.tabIndex,
      role: _ctx.role,
      onClick: (e) => _ctx.$emit("clickimpl", e),
      onFocus: _ctx.handleFocus,
      onKeydown: withModifiers(_ctx.handleKeydown, ["self"]),
      onMousedown: _ctx.handleMousedown,
      onPointermove: (e) => _ctx.$emit("pointermove", e),
      onPointerleave: (e) => _ctx.$emit("pointerleave", e)
    }), [
      _ctx.icon ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
        default: withCtx(() => [
          (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon)))
        ]),
        _: 1
      })) : createCommentVNode("v-if", true),
      renderSlot(_ctx.$slots, "default")
    ], 16, ["aria-disabled", "tabindex", "role", "onClick", "onFocus", "onKeydown", "onMousedown", "onPointermove", "onPointerleave"])
  ], 64);
}
var ElDropdownItemImpl = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "dropdown-item-impl.vue"]]);

export { ElDropdownItemImpl as default };
//# sourceMappingURL=dropdown-item-impl.mjs.map
