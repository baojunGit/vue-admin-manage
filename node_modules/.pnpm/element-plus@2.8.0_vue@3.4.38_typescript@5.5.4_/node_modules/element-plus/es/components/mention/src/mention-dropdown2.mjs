import { defineComponent, ref, computed, nextTick, watch, openBlock, createElementBlock, normalizeClass, unref, renderSlot, createCommentVNode, withDirectives, createVNode, withCtx, Fragment, renderList, withModifiers, createElementVNode, toDisplayString, vShow, createTextVNode } from 'vue';
import '../../../hooks/index.mjs';
import '../../../utils/index.mjs';
import { ElScrollbar } from '../../scrollbar/index.mjs';
import { mentionDropdownProps, mentionDropdownEmits } from './mention-dropdown.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';
import { scrollIntoView } from '../../../utils/dom/scroll.mjs';

const __default__ = defineComponent({
  name: "ElMentionDropdown"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: mentionDropdownProps,
  emits: mentionDropdownEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const ns = useNamespace("mention");
    const { t } = useLocale();
    const hoveringIndex = ref(-1);
    const scrollbarRef = ref();
    const optionRefs = ref();
    const dropdownRef = ref();
    const optionkls = (item, index) => [
      ns.be("dropdown", "item"),
      ns.is("hovering", hoveringIndex.value === index),
      ns.is("disabled", item.disabled || props.disabled)
    ];
    const handleSelect = (item) => {
      if (item.disabled || props.disabled)
        return;
      emit("select", item);
    };
    const handleMouseEnter = (index) => {
      hoveringIndex.value = index;
    };
    const filteredAllDisabled = computed(() => props.disabled || props.options.every((item) => item.disabled));
    const hoverOption = computed(() => props.options[hoveringIndex.value]);
    const selectHoverOption = () => {
      if (!hoverOption.value)
        return;
      emit("select", hoverOption.value);
    };
    const navigateOptions = (direction) => {
      const { options } = props;
      if (options.length === 0 || filteredAllDisabled.value)
        return;
      if (direction === "next") {
        hoveringIndex.value++;
        if (hoveringIndex.value === options.length) {
          hoveringIndex.value = 0;
        }
      } else if (direction === "prev") {
        hoveringIndex.value--;
        if (hoveringIndex.value < 0) {
          hoveringIndex.value = options.length - 1;
        }
      }
      const option = options[hoveringIndex.value];
      if (option.disabled) {
        navigateOptions(direction);
        return;
      }
      nextTick(() => scrollToOption(option));
    };
    const scrollToOption = (option) => {
      var _a, _b, _c, _d;
      const { options } = props;
      const index = options.findIndex((item) => item.value === option.value);
      const target = (_a = optionRefs.value) == null ? void 0 : _a[index];
      if (target) {
        const menu = (_c = (_b = dropdownRef.value) == null ? void 0 : _b.querySelector) == null ? void 0 : _c.call(_b, `.${ns.be("dropdown", "wrap")}`);
        if (menu) {
          scrollIntoView(menu, target);
        }
      }
      (_d = scrollbarRef.value) == null ? void 0 : _d.handleScroll();
    };
    const resetHoveringIndex = () => {
      if (filteredAllDisabled.value || props.options.length === 0) {
        hoveringIndex.value = -1;
      } else {
        hoveringIndex.value = 0;
      }
    };
    watch(() => props.options, resetHoveringIndex, {
      immediate: true
    });
    expose({
      navigateOptions,
      selectHoverOption,
      hoverOption
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "dropdownRef",
        ref: dropdownRef,
        class: normalizeClass(unref(ns).b("dropdown"))
      }, [
        _ctx.$slots.header ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(ns).be("dropdown", "header"))
        }, [
          renderSlot(_ctx.$slots, "header")
        ], 2)) : createCommentVNode("v-if", true),
        withDirectives(createVNode(unref(ElScrollbar), {
          ref_key: "scrollbarRef",
          ref: scrollbarRef,
          tag: "ul",
          "wrap-class": unref(ns).be("dropdown", "wrap"),
          "view-class": unref(ns).be("dropdown", "list")
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, (item, index) => {
              return openBlock(), createElementBlock("li", {
                ref_for: true,
                ref_key: "optionRefs",
                ref: optionRefs,
                key: item.value,
                class: normalizeClass(optionkls(item, index)),
                onMouseenter: ($event) => handleMouseEnter(index),
                onClick: withModifiers(($event) => handleSelect(item), ["stop"])
              }, [
                renderSlot(_ctx.$slots, "label", {
                  item,
                  index
                }, () => {
                  var _a;
                  return [
                    createElementVNode("span", null, toDisplayString((_a = item.label) != null ? _a : item.value), 1)
                  ];
                })
              ], 42, ["onMouseenter", "onClick"]);
            }), 128))
          ]),
          _: 3
        }, 8, ["wrap-class", "view-class"]), [
          [vShow, _ctx.options.length > 0 && !_ctx.loading]
        ]),
        _ctx.loading ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(unref(ns).be("dropdown", "loading"))
        }, [
          renderSlot(_ctx.$slots, "loading", {}, () => [
            createTextVNode(toDisplayString(unref(t)("el.mention.loading")), 1)
          ])
        ], 2)) : createCommentVNode("v-if", true),
        _ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass(unref(ns).be("dropdown", "footer"))
        }, [
          renderSlot(_ctx.$slots, "footer")
        ], 2)) : createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var ElMentionDropdown = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "mention-dropdown.vue"]]);

export { ElMentionDropdown as default };
//# sourceMappingURL=mention-dropdown2.mjs.map
