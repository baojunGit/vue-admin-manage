import { defineComponent, useCssVars, computed, openBlock, createElementBlock, normalizeStyle, Fragment, renderList, unref } from 'vue';
import range from 'just-range';
import { useSpinnerProps } from '../utils/props.js';
import { useSize } from '../utils/size.js';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n@keyframes vue-spinner-propagate0 {\n25% {\n\t\ttransform: translateX(var(--4d723eb2-getDistance_0___left__)) scale(0.75);\n}\n50% {\n\t\ttransform: translateX(var(--4d723eb2-getDistance_1___left__)) scale(0.6);\n}\n75% {\n\t\ttransform: translateX(var(--4d723eb2-getDistance_2___left__)) scale(0.5);\n}\n95% {\n\t\ttransform: translateX(0rem) scale(1);\n}\n}\n@keyframes vue-spinner-propagate1 {\n25% {\n\t\ttransform: translateX(var(--4d723eb2-getDistance_0___left__)) scale(0.75);\n}\n50% {\n\t\ttransform: translateX(var(--4d723eb2-getDistance_1___left__)) scale(0.6);\n}\n75% {\n\t\ttransform: translateX(var(--4d723eb2-getDistance_1___left__)) scale(0.6);\n}\n95% {\n\t\ttransform: translateX(0rem) scale(1);\n}\n}\n@keyframes vue-spinner-propagate2 {\n25% {\n\t\ttransform: translateX(var(--4d723eb2-getDistance_0___left__)) scale(0.75);\n}\n75% {\n\t\ttransform: translateX(var(--4d723eb2-getDistance_0___left__)) scale(0.75);\n}\n95% {\n\t\ttransform: translateX(0rem) scale(1);\n}\n}\n@keyframes vue-spinner-propagate3 {\n25% {\n\t\ttransform: translateX(var(--4d723eb2-getDistance_0___right__)) scale(0.75);\n}\n75% {\n\t\ttransform: translateX(var(--4d723eb2-getDistance_0___right__)) scale(0.75);\n}\n95% {\n\t\ttransform: translateX(0rem) scale(1);\n}\n}\n@keyframes vue-spinner-propagate4 {\n25% {\n\t\ttransform: translateX(var(--4d723eb2-getDistance_0___right__)) scale(0.75);\n}\n50% {\n\t\ttransform: translateX(var(--4d723eb2-getDistance_1___right__)) scale(0.6);\n}\n75% {\n\t\ttransform: translateX(var(--4d723eb2-getDistance_1___right__)) scale(0.6);\n}\n95% {\n\t\ttransform: translateX(0rem) scale(1);\n}\n}\n@keyframes vue-spinner-propagate5 {\n25% {\n\t\ttransform: translateX(var(--4d723eb2-getDistance_0___right__)) scale(0.75);\n}\n50% {\n\t\ttransform: translateX(var(--4d723eb2-getDistance_1___right__)) scale(0.6);\n}\n75% {\n\t\ttransform: translateX(var(--4d723eb2-getDistance_2___right__)) scale(0.5);\n}\n95% {\n\t\ttransform: translateX(0rem) scale(1);\n}\n}\n";
n(css,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const __default__ = { name: "VueSpinnerPropagate" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: useSpinnerProps({
    size: "15px"
  }),
  setup(__props) {
    useCssVars((_ctx) => ({
      "4d723eb2-getDistance_0___left__": getDistance(0, "left"),
      "4d723eb2-getDistance_1___left__": getDistance(1, "left"),
      "4d723eb2-getDistance_2___left__": getDistance(2, "left"),
      "4d723eb2-getDistance_0___right__": getDistance(0, "right"),
      "4d723eb2-getDistance_1___right__": getDistance(1, "right"),
      "4d723eb2-getDistance_2___right__": getDistance(2, "right")
    }));
    const size = useSize(() => __props.size);
    const distance = [1, 3, 5];
    const getCircleStyle = (version) => ({
      position: "absolute",
      width: size.value.string,
      height: size.value.string,
      borderRadius: "50%",
      background: __props.color,
      fontSize: `${size.value.value / 3}${size.value.unit}`,
      animationFillMode: "forwards",
      animation: `vue-spinner-propagate${version} 1.5s infinite`
    });
    const getDistance = (index, direction) => `${distance[index] * (direction === "left" ? -1 : 1)}rem`;
    const wrapperStyle = computed(() => ({
      position: "relative"
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle(wrapperStyle.value)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(range)(0, 6), (n) => {
          return openBlock(), createElementBlock("div", {
            key: n,
            style: normalizeStyle(getCircleStyle(n))
          }, null, 4);
        }), 128))
      ], 4);
    };
  }
});
var vueSpinnerPropagate = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/leonzalion/projects/vue3-spinners/packages/vue3-spinners/src/spinners/vue-spinner-propagate.vue"]]);

export { vueSpinnerPropagate as default };
