import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle, Fragment, renderList, createElementVNode } from 'vue';
import { useSpinnerProps } from '../utils/props.js';
import { useSize } from '../utils/size.js';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n@keyframes vue-spinner-circle {\n0% {\n\t\ttransform: rotate(0deg);\n}\n50% {\n\t\ttransform: rotate(180deg);\n}\n100% {\n\t\ttransform: rotate(360deg);\n}\n}\n";
n(css,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const __default__ = { name: "VueSpinnerCircle" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: useSpinnerProps({ size: 50 }),
  setup(__props) {
    const size = useSize(() => __props.size);
    const getRingStyle = (version) => ({
      position: "absolute",
      border: `1px solid ${__props.color}`,
      borderRadius: "100%",
      transition: "2s",
      borderBottom: "none",
      borderRight: "none",
      animationFillMode: "",
      height: `${size.value.value * (1 - version / 10)}${size.value.unit}`,
      width: `${size.value.value * (1 - version / 10)}${size.value.unit}`,
      top: `${version * 0.7 * 2.5}%`,
      left: `${version * 0.35 * 2.5}%`,
      animation: `vue-spinner-circle 1s ${version * 0.2}s infinite linear`
    });
    const wrapperStyle = computed(() => ({
      position: "relative",
      width: size.value.string,
      height: size.value.string
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle(wrapperStyle.value)
      }, [
        (openBlock(), createElementBlock(Fragment, null, renderList(5, (i) => {
          return createElementVNode("div", {
            key: i,
            style: normalizeStyle(getRingStyle(i))
          }, null, 4);
        }), 64))
      ], 4);
    };
  }
});
var vueSpinnerCircle = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/leonzalion/projects/vue3-spinners/packages/vue3-spinners/src/spinners/vue-spinner-circle.vue"]]);

export { vueSpinnerCircle as default };
