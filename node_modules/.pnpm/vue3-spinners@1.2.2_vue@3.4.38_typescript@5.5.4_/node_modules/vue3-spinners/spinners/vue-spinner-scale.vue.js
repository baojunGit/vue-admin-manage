import { defineComponent, openBlock, createElementBlock, Fragment, renderList, createElementVNode, normalizeStyle } from 'vue';
import { useSpinnerProps } from '../utils/props.js';
import { useSize } from '../utils/size.js';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n@keyframes vue-spinner-scale {\n0% {\n\t\ttransform: scaleY(1);\n}\n50% {\n\t\ttransform: scaleY(0.4);\n}\n100% {\n\t\ttransform: scaleY(1);\n}\n}\n";
n(css,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const __default__ = { name: "VueSpinnerScale" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: useSpinnerProps({
    height: "35px",
    width: "4px",
    radius: "2px",
    margin: "2px"
  }),
  setup(__props) {
    const width = useSize(() => __props.width);
    const height = useSize(() => __props.height);
    const radius = useSize(() => __props.radius);
    const margin = useSize(() => __props.margin);
    const getBarStyle = (version) => ({
      display: "inline-block",
      width: width.value.string,
      height: height.value.string,
      margin: margin.value.string,
      borderRadius: radius.value.string,
      backgroundColor: __props.color,
      animation: `vue-spinner-scale 1s cubic-bezier(0.2, 0.68, 0.18, 1.08) ${version * 0.1}s infinite normal both running`
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        (openBlock(), createElementBlock(Fragment, null, renderList(5, (n) => {
          return createElementVNode("div", {
            key: n,
            style: normalizeStyle(getBarStyle(n + 1))
          }, null, 4);
        }), 64))
      ]);
    };
  }
});
var vueSpinnerScale = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/leonzalion/projects/vue3-spinners/packages/vue3-spinners/src/spinners/vue-spinner-scale.vue"]]);

export { vueSpinnerScale as default };
