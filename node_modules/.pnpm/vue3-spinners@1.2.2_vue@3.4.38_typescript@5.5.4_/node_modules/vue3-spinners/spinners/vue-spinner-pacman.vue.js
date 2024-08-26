import { defineComponent, useCssVars, computed, openBlock, createElementBlock, normalizeStyle, createElementVNode, Fragment, renderList, unref } from 'vue';
import range from 'just-range';
import { useSpinnerProps } from '../utils/props.js';
import { useSize } from '../utils/size.js';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n@keyframes vue-spinner-pacman0 {\n0% {\n\t\ttransform: rotate(0deg);\n}\n50% {\n\t\ttransform: rotate(-44deg);\n}\n}\n@keyframes vue-spinner-pacman1 {\n0% {\n\t\ttransform: rotate(0deg);\n}\n50% {\n\t\ttransform: rotate(44deg);\n}\n}\n@keyframes vue-spinner-pacman-ball-animation {\n75% {\n\t\topacity: 0.7;\n}\n100% {\n\t\ttransform: translate(\n\t\t\tvar(--6ccace4f-___-4___size_value___size_unit__),\n\t\t\tvar(--6ccace4f-___-size_value___4___size_unit__)\n\t\t);\n}\n}\n";
n(css,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const __default__ = { name: "VueSpinnerPacman" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: useSpinnerProps({ size: "25px", margin: "2px" }),
  setup(__props) {
    useCssVars((_ctx) => ({
      "6ccace4f-___-4___size_value___size_unit__": `${-4 * size.value.value}${size.value.unit}`,
      "6ccace4f-___-size_value___4___size_unit__": `${-size.value.value / 4}${size.value.unit}`
    }));
    const size = useSize(() => __props.size);
    const margin = useSize(() => __props.margin);
    const s1 = (sizeString) => `${sizeString} solid transparent`;
    const s2 = (sizeString, color) => `${sizeString} solid ${color}`;
    const getPacmanStyle = (version) => ({
      position: "absolute",
      width: 0,
      height: 0,
      borderTop: version === 0 ? s1(size.value.string) : s2(size.value.string, __props.color),
      borderLeft: s2(size.value.string, __props.color),
      borderBottom: version === 0 ? s2(size.value.string, __props.color) : s1(size.value.string),
      borderRight: s1(size.value.string),
      borderRadius: size.value.string,
      animation: `vue-spinner-pacman${version} ease-in-out 0.8s infinite normal both running`
    });
    const getBallStyle = (version) => ({
      position: "absolute",
      top: size.value.string,
      left: `${size.value.value * 4}${size.value.unit}`,
      width: `${size.value.value / 2.5}${size.value.unit}`,
      height: `${size.value.value / 2.5}${size.value.unit}`,
      margin: margin.value.string,
      borderRadius: "100%",
      backgroundColor: __props.color,
      transform: `translate(0, ${-size.value.value / 4}${size.value.unit})`,
      animation: `vue-spinner-pacman-ball-animation 1s linear ${version * 0.25}s infinite normal both running`
    });
    const wrapperStyle = computed(() => ({
      position: "relative",
      width: size.value.string,
      height: size.value.string,
      fontSize: 0
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle(wrapperStyle.value)
      }, [
        createElementVNode("div", {
          style: normalizeStyle(getPacmanStyle(0))
        }, null, 4),
        createElementVNode("div", {
          style: normalizeStyle(getPacmanStyle(1))
        }, null, 4),
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(range)(2, 7), (n) => {
          return openBlock(), createElementBlock("div", {
            key: n,
            style: normalizeStyle(getBallStyle(n))
          }, null, 4);
        }), 128))
      ], 4);
    };
  }
});
var vueSpinnerPacman = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/leonzalion/projects/vue3-spinners/packages/vue3-spinners/src/spinners/vue-spinner-pacman.vue"]]);

export { vueSpinnerPacman as default };
