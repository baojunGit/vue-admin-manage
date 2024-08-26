import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle, createElementVNode } from 'vue';
import { useSpinnerProps } from '../utils/props.js';
import { useSize } from '../utils/size.js';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n@keyframes vue-spinner-climbing-box {\n0% {\n\t\ttransform: translate(0, -1em) rotate(-45deg);\n}\n5% {\n\t\ttransform: translate(0, -1em) rotate(-50deg);\n}\n20% {\n\t\ttransform: translate(1em, -2em) rotate(47deg);\n}\n25% {\n\t\ttransform: translate(1em, -2em) rotate(45deg);\n}\n30% {\n\t\ttransform: translate(1em, -2em) rotate(40deg);\n}\n45% {\n\t\ttransform: translate(2em, -3em) rotate(137deg);\n}\n50% {\n\t\ttransform: translate(2em, -3em) rotate(135deg);\n}\n55% {\n\t\ttransform: translate(2em, -3em) rotate(130deg);\n}\n70% {\n\t\ttransform: translate(3em, -4em) rotate(217deg);\n}\n75% {\n\t\ttransform: translate(3em, -4em) rotate(220deg);\n}\n100% {\n\t\ttransform: translate(0, -1em) rotate(-225deg);\n}\n}\n";
n(css,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const __default__ = { name: "VueSpinnerClimbingBox" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: useSpinnerProps({ size: 15 }),
  setup(__props) {
    const size = useSize(() => __props.size);
    const containerStyle = computed(() => ({
      position: "relative",
      width: "7.1em",
      height: "7.1em"
    }));
    const wrapperStyle = computed(() => ({
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: "-2.7em",
      marginLeft: "-2.7em",
      width: "5.4em",
      height: "5.4em",
      fontSize: size.value.string
    }));
    const boxStyle = computed(() => ({
      position: "absolute",
      left: "0",
      bottom: "-0.1em",
      height: "1em",
      width: "1em",
      backgroundColor: "transparent",
      borderRadius: "15%",
      border: `0.25em solid ${__props.color}`,
      transform: "translate(0, -1em) rotate(-45deg)",
      animationFillMode: "both",
      animation: "vue-spinner-climbing-box 2.5s infinite cubic-bezier(0.79, 0, 0.47, 0.97)"
    }));
    const hillStyle = computed(() => ({
      position: "absolute",
      width: "7.1em",
      height: "7.1em",
      top: "1.7em",
      left: "1.7em",
      borderLeft: `0.25em solid ${__props.color}`,
      transform: "rotate(45deg)"
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle(containerStyle.value)
      }, [
        createElementVNode("div", {
          style: normalizeStyle(wrapperStyle.value)
        }, [
          createElementVNode("div", {
            style: normalizeStyle(boxStyle.value)
          }, null, 4),
          createElementVNode("div", {
            style: normalizeStyle(hillStyle.value)
          }, null, 4)
        ], 4)
      ], 4);
    };
  }
});
var vueSpinnerClimbingBox = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/leonzalion/projects/vue3-spinners/packages/vue3-spinners/src/spinners/vue-spinner-climbing-box.vue"]]);

export { vueSpinnerClimbingBox as default };
