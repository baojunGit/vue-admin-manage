import { defineComponent, useCssVars, openBlock, createElementBlock, Fragment, renderList, unref, normalizeStyle } from 'vue';
import range from 'just-range';
import { useSpinnerProps } from '../utils/props.js';
import { useSize } from '../utils/size.js';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n@keyframes vue-spinner-even {\n0% {\n\t\ttransform: scale(1.1);\n}\n25% {\n\t\ttransform: translateY(var(--515f9cd0--riseAmount____px_));\n}\n50% {\n\t\ttransform: scale(0.4);\n}\n75% {\n\t\ttransform: translateY(var(--515f9cd0-riseAmount____px_));\n}\n100% {\n\t\ttransform: translateY(0) scale(1);\n}\n}\n@keyframes vue-spinner-odd {\n0% {\n\t\ttransform: scale(0.4);\n}\n25% {\n\t\ttransform: translateY(var(--515f9cd0-riseAmount____px_));\n}\n50% {\n\t\ttransform: scale(1.1);\n}\n75% {\n\t\ttransform: translateY(var(--515f9cd0--riseAmount____px_));\n}\n100% {\n\t\ttransform: translateY(0) scale(0.75);\n}\n}\n";
n(css,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const __default__ = { name: "VueSpinnerRise" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: useSpinnerProps({ size: "15px", margin: "2px" }),
  setup(__props) {
    useCssVars((_ctx) => ({
      "515f9cd0--riseAmount____px_": -riseAmount + "px",
      "515f9cd0-riseAmount____px_": riseAmount + "px"
    }));
    const size = useSize(() => __props.size);
    const margin = useSize(() => __props.margin);
    const riseAmount = 30;
    const getCircleStyle = (version) => ({
      display: "inline-block",
      width: size.value.string,
      height: size.value.string,
      margin: margin.value.string,
      borderRadius: "100%",
      backgroundColor: __props.color,
      animationFillMode: "both",
      animation: `${version % 2 === 0 ? "vue-spinner-even" : "vue-spinner-odd"} 1s 0s infinite cubic-bezier(0.15, 0.46, 0.9, 0.6)`
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(range)(1, 6), (n) => {
          return openBlock(), createElementBlock("div", {
            key: n,
            style: normalizeStyle(getCircleStyle(n))
          }, null, 4);
        }), 128))
      ]);
    };
  }
});
var vueSpinnerRise = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/leonzalion/projects/vue3-spinners/packages/vue3-spinners/src/spinners/vue-spinner-rise.vue"]]);

export { vueSpinnerRise as default };
