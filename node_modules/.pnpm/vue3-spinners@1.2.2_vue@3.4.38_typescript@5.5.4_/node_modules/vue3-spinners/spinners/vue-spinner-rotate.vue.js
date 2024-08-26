import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle, Fragment, renderList, unref } from 'vue';
import range from 'just-range';
import { useSpinnerProps } from '../utils/props.js';
import { useSize } from '../utils/size.js';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n@keyframes vue-spinner-rotate-079b92bc {\n0% {\n\t\ttransform: rotate(0deg);\n}\n50% {\n\t\ttransform: rotate(180deg);\n}\n100% {\n\t\ttransform: rotate(360deg);\n}\n}\n";
n(css,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const __default__ = { name: "VueSpinnerRotate" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: useSpinnerProps({ size: "15px", margin: "2px" }),
  setup(__props) {
    const size = useSize(() => __props.size);
    const margin = useSize(() => __props.margin);
    const wrapperStyle = computed(() => ({
      position: "relative",
      display: "inline-block",
      animation: "vue-spinner-rotate 1s 0s infinite cubic-bezier(0.7, -0.13, 0.22, 0.86)",
      animationFillMode: "both",
      width: size.value.string,
      height: size.value.string,
      margin: margin.value.string,
      borderRadius: "100%",
      backgroundColor: __props.color
    }));
    const getCircleStyle = (side) => ({
      position: "absolute",
      top: "0",
      opacity: "0.8",
      width: size.value.string,
      height: size.value.string,
      margin: margin.value.string,
      borderRadius: "100%",
      backgroundColor: __props.color,
      left: `${side === 1 ? -28 : 25}px`
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle(wrapperStyle.value)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(range)(0, 2), (n) => {
          return openBlock(), createElementBlock("div", {
            key: n,
            style: normalizeStyle(getCircleStyle(n))
          }, null, 4);
        }), 128))
      ], 4);
    };
  }
});
var vueSpinnerRotate = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-079b92bc"], ["__file", "/Users/leonzalion/projects/vue3-spinners/packages/vue3-spinners/src/spinners/vue-spinner-rotate.vue"]]);

export { vueSpinnerRotate as default };
