import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle, Fragment, renderList, createElementVNode } from 'vue';
import { useSpinnerProps } from '../utils/props.js';
import { useSize } from '../utils/size.js';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n@keyframes vue-spinner-rotate {\n100% {\n\t\ttransform: rotate(360deg);\n}\n}\n@keyframes vue-spinner-bounce {\n0%,\n\t100% {\n\t\ttransform: scale(0);\n}\n50% {\n\t\ttransform: scale(1);\n}\n}\n";
n(css,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const __default__ = { name: "VueSpinnerDot" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: useSpinnerProps({ size: 60 }),
  setup(__props) {
    const size = useSize(() => __props.size);
    const getCircleStyle = (version) => ({
      position: "absolute",
      height: `${size.value.value / 2}${size.value.unit}`,
      width: `${size.value.value / 2}${size.value.unit}`,
      backgroundColor: __props.color,
      borderRadius: "100%",
      animationFillMode: "forwards",
      top: version % 2 ? "0" : "auto",
      bottom: version % 2 ? `auto` : `0`,
      animation: `vue-spinner-bounce 2s ${version === 2 ? `-1s` : `0s`} infinite linear`
    });
    const wrapperStyle = computed(() => ({
      position: "relative",
      width: size.value.string,
      height: size.value.string,
      animationFillMode: "forwards",
      animation: "vue-spinner-rotate 2s 0s infinite linear"
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle(wrapperStyle.value)
      }, [
        (openBlock(), createElementBlock(Fragment, null, renderList(2, (n) => {
          return createElementVNode("div", {
            key: n,
            style: normalizeStyle(getCircleStyle(n))
          }, null, 4);
        }), 64))
      ], 4);
    };
  }
});
var vueSpinnerDot = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/leonzalion/projects/vue3-spinners/packages/vue3-spinners/src/spinners/vue-spinner-dot.vue"]]);

export { vueSpinnerDot as default };
