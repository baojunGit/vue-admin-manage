import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle } from 'vue';
import { useSpinnerProps } from '../utils/props.js';
import { useSize } from '../utils/size.js';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n@keyframes vue-spinner-clip {\n0% {\n\t\ttransform: rotate(0deg) scale(1);\n}\n50% {\n\t\ttransform: rotate(180deg) scale(0.8);\n}\n100% {\n\t\ttransform: rotate(360deg) scale(1);\n}\n}\n";
n(css,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const __default__ = { name: "VueSpinnerClip" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: useSpinnerProps({ size: 35 }),
  setup(__props) {
    const size = useSize(() => __props.size);
    const ringStyle = computed(() => ({
      background: "transparent !important",
      width: size.value.string,
      height: size.value.string,
      borderRadius: "100%",
      border: `2px solid ${__props.color}`,
      borderBottomColor: "transparent",
      display: "inline-block",
      animation: "vue-spinner-clip 0.75s 0s infinite linear",
      animationFillMode: "both"
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle(ringStyle.value)
      }, null, 4);
    };
  }
});
var vueSpinnerClip = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/leonzalion/projects/vue3-spinners/packages/vue3-spinners/src/spinners/vue-spinner-clip.vue"]]);

export { vueSpinnerClip as default };
