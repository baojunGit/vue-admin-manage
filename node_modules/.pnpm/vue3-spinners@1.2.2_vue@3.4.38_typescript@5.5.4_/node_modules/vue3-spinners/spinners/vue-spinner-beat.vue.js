import { defineComponent, openBlock, createElementBlock, Fragment, renderList, createElementVNode, normalizeStyle } from 'vue';
import { useSpinnerProps } from '../utils/props.js';
import { useSize } from '../utils/size.js';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n@keyframes vue-spinner-beat {\n50% {\n\t\ttransform: scale(0.75);\n\t\topacity: 0.2;\n}\n100% {\n\t\ttransform: scale(1);\n\t\topacity: 1;\n}\n}\n";
n(css,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  props: useSpinnerProps({ size: 15, margin: "2px" }),
  setup(__props) {
    const size = useSize(() => __props.size);
    const margin = useSize(() => __props.margin);
    const getCircleStyle = (version) => ({
      animation: `vue-spinner-beat 0.7s ${version % 2 ? `0s` : `0.35s`} infinite linear`,
      display: "inline-block",
      backgroundColor: __props.color,
      width: size.value.string,
      height: size.value.string,
      margin: margin.value.string,
      borderRadius: "100%",
      animationFillMode: "both"
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        (openBlock(), createElementBlock(Fragment, null, renderList(3, (n) => {
          return createElementVNode("div", {
            key: n,
            style: normalizeStyle(getCircleStyle(n))
          }, null, 4);
        }), 64))
      ]);
    };
  }
});
var vueSpinnerBeat = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/leonzalion/projects/vue3-spinners/packages/vue3-spinners/src/spinners/vue-spinner-beat.vue"]]);

export { vueSpinnerBeat as default };
