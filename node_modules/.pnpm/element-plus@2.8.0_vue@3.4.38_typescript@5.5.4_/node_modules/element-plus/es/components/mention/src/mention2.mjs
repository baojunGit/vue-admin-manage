import { defineComponent, computed, ref, nextTick, openBlock, createElementBlock, normalizeClass, unref, createVNode, mergeProps, createSlots, renderList, withCtx, renderSlot, normalizeProps, guardReactiveProps, createElementVNode, normalizeStyle, withModifiers } from 'vue';
import { pick } from 'lodash-unified';
import '../../../hooks/index.mjs';
import { ElInput } from '../../input/index.mjs';
import { ElTooltip } from '../../tooltip/index.mjs';
import '../../../constants/index.mjs';
import '../../../utils/index.mjs';
import { mentionProps, mentionEmits } from './mention.mjs';
import { getCursorPosition, getMentionCtx } from './helper.mjs';
import ElMentionDropdown from './mention-dropdown2.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { inputProps } from '../../input/src/input.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { isFunction } from '@vue/shared';
import { UPDATE_MODEL_EVENT } from '../../../constants/event.mjs';
import { useFocusController } from '../../../hooks/use-focus-controller/index.mjs';

const __default__ = defineComponent({
  name: "ElMention"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: mentionProps,
  emits: mentionEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const passInputProps = computed(() => pick(props, Object.keys(inputProps)));
    const ns = useNamespace("mention");
    const elInputRef = ref();
    const tooltipRef = ref();
    const dropdownRef = ref();
    const visible = ref(false);
    const cursorStyle = ref();
    const mentionCtx = ref();
    const computedPlacement = computed(() => props.showArrow ? props.placement : `${props.placement}-start`);
    const computedFallbackPlacements = computed(() => props.showArrow ? ["bottom", "top"] : ["bottom-start", "top-start"]);
    const filteredOptions = computed(() => {
      const { filterOption, options } = props;
      if (!mentionCtx.value || !filterOption)
        return options;
      return options.filter((option) => filterOption(mentionCtx.value.pattern, option));
    });
    const handleInputChange = (value) => {
      emit("update:modelValue", value);
      syncAfterCursorMove();
    };
    const handleInputKeyDown = (e) => {
      var _a, _b, _c, _d;
      if (!("key" in e))
        return;
      if ((_a = elInputRef.value) == null ? void 0 : _a.isComposing)
        return;
      if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
        syncAfterCursorMove();
      } else if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        if (!visible.value)
          return;
        e.preventDefault();
        const direction = e.key === "ArrowUp" ? "prev" : "next";
        (_b = dropdownRef.value) == null ? void 0 : _b.navigateOptions(direction);
      } else if (["Enter"].includes(e.key)) {
        if (!visible.value)
          return;
        e.preventDefault();
        if ((_c = dropdownRef.value) == null ? void 0 : _c.hoverOption) {
          (_d = dropdownRef.value) == null ? void 0 : _d.selectHoverOption();
        } else {
          visible.value = false;
        }
      } else if (["Backspace"].includes(e.key)) {
        if (props.whole && mentionCtx.value) {
          const { splitIndex, selectionEnd, pattern, prefixIndex, prefix } = mentionCtx.value;
          const inputEl = getInputEl();
          if (!inputEl)
            return;
          const inputValue = inputEl.value;
          const matchOption = props.options.find((item) => item.value === pattern);
          const isWhole = isFunction(props.checkIsWhole) ? props.checkIsWhole(pattern, prefix) : matchOption;
          if (isWhole && splitIndex !== -1 && splitIndex + 1 === selectionEnd) {
            e.preventDefault();
            const newValue = inputValue.slice(0, prefixIndex) + inputValue.slice(splitIndex + 1);
            emit(UPDATE_MODEL_EVENT, newValue);
            const newSelectionEnd = prefixIndex;
            nextTick(() => {
              inputEl.selectionStart = newSelectionEnd;
              inputEl.selectionEnd = newSelectionEnd;
              syncDropdownVisible();
            });
          }
        }
      }
    };
    const { wrapperRef } = useFocusController(elInputRef, {
      afterFocus() {
        syncAfterCursorMove();
      },
      beforeBlur(event) {
        var _a;
        return (_a = tooltipRef.value) == null ? void 0 : _a.isFocusInsideContent(event);
      },
      afterBlur() {
        visible.value = false;
      }
    });
    const handleInputMouseDown = () => {
      syncAfterCursorMove();
    };
    const handleSelect = (item) => {
      if (!mentionCtx.value)
        return;
      const inputEl = getInputEl();
      if (!inputEl)
        return;
      const inputValue = inputEl.value;
      const { split } = props;
      const newEndPart = inputValue.slice(mentionCtx.value.end);
      const alreadySeparated = newEndPart.startsWith(split);
      const newMiddlePart = `${item.value}${alreadySeparated ? "" : split}`;
      const newValue = inputValue.slice(0, mentionCtx.value.start) + newMiddlePart + newEndPart;
      emit(UPDATE_MODEL_EVENT, newValue);
      emit("select", item, mentionCtx.value.prefix);
      const newSelectionEnd = mentionCtx.value.start + newMiddlePart.length + (alreadySeparated ? 1 : 0);
      nextTick(() => {
        inputEl.selectionStart = newSelectionEnd;
        inputEl.selectionEnd = newSelectionEnd;
        inputEl.focus();
        syncDropdownVisible();
      });
    };
    const getInputEl = () => {
      var _a, _b;
      return props.type === "textarea" ? (_a = elInputRef.value) == null ? void 0 : _a.textarea : (_b = elInputRef.value) == null ? void 0 : _b.input;
    };
    const syncAfterCursorMove = () => {
      setTimeout(() => {
        syncCursor();
        syncDropdownVisible();
        nextTick(() => {
          var _a;
          return (_a = tooltipRef.value) == null ? void 0 : _a.updatePopper();
        });
      }, 0);
    };
    const syncCursor = () => {
      const inputEl = getInputEl();
      if (!inputEl)
        return;
      const caretPosition = getCursorPosition(inputEl);
      const inputRect = inputEl.getBoundingClientRect();
      const elInputRect = elInputRef.value.$el.getBoundingClientRect();
      cursorStyle.value = {
        position: "absolute",
        width: 0,
        height: `${caretPosition.height}px`,
        left: `${caretPosition.left + inputRect.left - elInputRect.left}px`,
        top: `${caretPosition.top + inputRect.top - elInputRect.top}px`
      };
    };
    const syncDropdownVisible = () => {
      const inputEl = getInputEl();
      if (document.activeElement !== inputEl) {
        visible.value = false;
        return;
      }
      const { prefix, split } = props;
      mentionCtx.value = getMentionCtx(inputEl, prefix, split);
      if (mentionCtx.value && mentionCtx.value.splitIndex === -1) {
        visible.value = true;
        emit("search", mentionCtx.value.pattern, mentionCtx.value.prefix);
        return;
      }
      visible.value = false;
    };
    expose({
      input: elInputRef,
      tooltip: tooltipRef
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "wrapperRef",
        ref: wrapperRef,
        class: normalizeClass(unref(ns).b())
      }, [
        createVNode(unref(ElInput), mergeProps(mergeProps(unref(passInputProps), _ctx.$attrs), {
          ref_key: "elInputRef",
          ref: elInputRef,
          "model-value": _ctx.modelValue,
          onInput: handleInputChange,
          onKeydown: handleInputKeyDown,
          onMousedown: handleInputMouseDown
        }), createSlots({ _: 2 }, [
          renderList(_ctx.$slots, (_, name) => {
            return {
              name,
              fn: withCtx((slotProps) => [
                renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(slotProps)))
              ])
            };
          })
        ]), 1040, ["model-value"]),
        createVNode(unref(ElTooltip), {
          ref_key: "tooltipRef",
          ref: tooltipRef,
          visible: visible.value && (!!unref(filteredOptions).length || _ctx.loading),
          "popper-class": [unref(ns).e("popper"), _ctx.popperClass],
          "popper-options": _ctx.popperOptions,
          placement: unref(computedPlacement),
          "fallback-placements": unref(computedFallbackPlacements),
          effect: "light",
          pure: "",
          offset: _ctx.offset,
          "show-arrow": _ctx.showArrow
        }, {
          default: withCtx(() => [
            createElementVNode("div", {
              style: normalizeStyle(cursorStyle.value)
            }, null, 4)
          ]),
          content: withCtx(() => {
            var _a;
            return [
              createVNode(ElMentionDropdown, {
                ref_key: "dropdownRef",
                ref: dropdownRef,
                options: unref(filteredOptions),
                disabled: _ctx.disabled,
                loading: _ctx.loading,
                onSelect: handleSelect,
                onClick: withModifiers((_a = elInputRef.value) == null ? void 0 : _a.focus, ["stop"])
              }, createSlots({ _: 2 }, [
                renderList(_ctx.$slots, (_, name) => {
                  return {
                    name,
                    fn: withCtx((slotProps) => [
                      renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(slotProps)))
                    ])
                  };
                })
              ]), 1032, ["options", "disabled", "loading", "onClick"])
            ];
          }),
          _: 3
        }, 8, ["visible", "popper-class", "popper-options", "placement", "fallback-placements", "offset", "show-arrow"])
      ], 2);
    };
  }
});
var Mention = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "mention.vue"]]);

export { Mention as default };
//# sourceMappingURL=mention2.mjs.map
