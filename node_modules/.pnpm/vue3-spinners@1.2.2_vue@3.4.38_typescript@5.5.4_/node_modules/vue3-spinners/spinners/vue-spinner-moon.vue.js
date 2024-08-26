import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle, createElementVNode } from 'vue';
import { useSpinnerProps } from '../utils/props.js';
import { useSize } from '../utils/size.js';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n@keyframes vue-spinner-moon {\n100% {\n\t\ttransform: rotate(360deg);\n}\n}\n";
n(css,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const __default__ = { name: "VueSpinnerMoon" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: useSpinnerProps({ size: 60 }),
  setup(__props) {
    const size = useSize(() => __props.size);
    const moonSize = (size2) => size2 / 7;
    const wrapperStyle = computed(() => ({
      position: "relative",
      width: `${size.value.value + moonSize(size.value.value) * 2}${size.value.unit}`,
      height: `${size.value.value + moonSize(size.value.value) * 2}${size.value.unit}`,
      animation: "vue-spinner-moon 0.6s linear 0s infinite normal forwards running",
      boxSizing: "content-box"
    }));
    const moonStyle = computed(() => ({
      position: "absolute",
      top: `${size.value.value / 2 - moonSize(size.value.value)}${size.value.unit}`,
      backgroundColor: __props.color,
      opacity: "0.8",
      animation: "vue-spinner-moon 0.6s linear 0s infinite normal forwards running",
      boxSizing: "content-box",
      width: `${moonSize(size.value.value)}${size.value.unit}`,
      height: `${moonSize(size.value.value)}${size.value.unit}`,
      borderRadius: "100%"
    }));
    const ringStyle = computed(() => ({
      borderWidth: `${moonSize(size.value.value)}${size.value.unit}`,
      borderStyle: "solid",
      borderColor: __props.color,
      borderImage: "initial",
      opacity: "0.1",
      boxSizing: "content-box",
      width: size.value.string,
      height: size.value.string,
      borderRadius: "100%"
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle(wrapperStyle.value)
      }, [
        createElementVNode("div", {
          style: normalizeStyle(moonStyle.value)
        }, null, 4),
        createElementVNode("div", {
          style: normalizeStyle(ringStyle.value)
        }, null, 4)
      ], 4);
    };
  }
});
var vueSpinnerMoon = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/leonzalion/projects/vue3-spinners/packages/vue3-spinners/src/spinners/vue-spinner-moon.vue"]]);

export { vueSpinnerMoon as default };
