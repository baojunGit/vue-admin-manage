import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle } from 'vue';
import { useSpinnerProps } from '../utils/props.js';
import { useSize } from '../utils/size.js';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n@keyframes vue-spinner-skew {\n25% {\n\t\ttransform: perspective(100px) rotateX(180deg) rotateY(0);\n}\n50% {\n\t\ttransform: perspective(100px) rotateX(180deg) rotateY(180deg);\n}\n75% {\n\t\ttransform: perspective(100px) rotateX(0) rotateY(180deg);\n}\n100% {\n\t\ttransform: perspective(100px) rotateX(0) rotateY(0);\n}\n}\n";
n(css,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const __default__ = { name: "VueSpinnerSkew" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: useSpinnerProps({ size: "20px" }),
  setup(__props) {
    const size = useSize(() => __props.size);
    const triangleStyle = computed(() => ({
      display: "inline-block",
      width: 0,
      height: 0,
      borderLeft: `${size.value.string} solid transparent`,
      borderRight: `${size.value.string} solid transparent`,
      borderBottom: `${size.value.string} solid ${__props.color}`,
      animation: `vue-spinner-skew 3s 0s infinite cubic-bezier(0.09, 0.57, 0.49, 0.9)`,
      animationFillMode: "both"
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle(triangleStyle.value)
      }, null, 4);
    };
  }
});
var vueSpinnerSkew = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/leonzalion/projects/vue3-spinners/packages/vue3-spinners/src/spinners/vue-spinner-skew.vue"]]);

export { vueSpinnerSkew as default };
