import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle, Fragment, renderList, createElementVNode } from 'vue';
import { useSpinnerProps } from '../utils/props.js';
import { calculateRgba } from '../utils/rgba.js';
import { useSize } from '../utils/size.js';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n@keyframes vue-spinner-long {\n0% {\n\t\tleft: -35%;\n\t\tright: 100%;\n}\n60% {\n\t\tleft: 100%;\n\t\tright: -90%;\n}\n100% {\n\t\tleft: 100%;\n\t\tright: -90%;\n}\n}\n@keyframes vue-spinner-short {\n0% {\n\t\tleft: -200%;\n\t\tright: 100%;\n}\n60% {\n\t\tleft: 107%;\n\t\tright: -8%;\n}\n100% {\n\t\tleft: 107%;\n\t\tright: -8%;\n}\n}\n";
n(css,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const __default__ = { name: "VueSpinnerBar" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: useSpinnerProps({ height: 4, width: 100 }),
  setup(__props) {
    const width = useSize(() => __props.width);
    const height = useSize(() => __props.height);
    const wrapperStyle = computed(() => ({
      position: "relative",
      width: width.value.string,
      height: height.value.string,
      overflow: "hidden",
      backgroundColor: calculateRgba(__props.color, 0.2),
      backgroundClip: "padding-box"
    }));
    const getBarStyle = (version) => ({
      position: "absolute",
      height: height.value.string,
      overflow: "hidden",
      backgroundColor: __props.color,
      backgroundClip: "padding-box",
      display: "block",
      borderRadius: "2px",
      willChange: "left, right",
      animationFillMode: "forwards",
      animation: ` ${version === 1 ? "vue-spinner-long" : "vue-spinner-short"} 2.1s ${version === 2 ? `1.15s` : ``} ${version === 1 ? `cubic-bezier(0.65, 0.815, 0.735, 0.395)` : `cubic-bezier(0.165, 0.84, 0.44, 1)`} infinite`
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle(wrapperStyle.value)
      }, [
        (openBlock(), createElementBlock(Fragment, null, renderList(2, (n) => {
          return createElementVNode("div", {
            key: n,
            style: normalizeStyle(getBarStyle(n))
          }, null, 4);
        }), 64))
      ], 4);
    };
  }
});
var vueSpinnerBar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/leonzalion/projects/vue3-spinners/packages/vue3-spinners/src/spinners/vue-spinner-bar.vue"]]);

export { vueSpinnerBar as default };
