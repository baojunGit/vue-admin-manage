import { defineComponent, h } from 'vue';
import useSpinner, { spinnerProps } from '../utils/use-spinner.js';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n.vue-spinner-mat {\n\tanimation: vue-spinner-spin 2s linear infinite;\n\ttransform-origin: center center;\n}\n.vue-spinner-mat .path {\n\tstroke-dasharray: 1, 200;\n\tstroke-dashoffset: 0;\n\tanimation: vue-spinner-mat-dash 1.5s ease-in-out infinite;\n}\n@keyframes vue-spinner-spin {\n0% {\n\t\ttransform: rotate3d(0, 0, 1, 0deg);\n}\n25% {\n\t\ttransform: rotate3d(0, 0, 1, 90deg);\n}\n50% {\n\t\ttransform: rotate3d(0, 0, 1, 180deg);\n}\n75% {\n\t\ttransform: rotate3d(0, 0, 1, 270deg);\n}\n100% {\n\t\ttransform: rotate3d(0, 0, 1, 359deg);\n}\n}\n@keyframes vue-spinner-mat-dash {\n0% {\n\t\tstroke-dasharray: 1, 200;\n\t\tstroke-dashoffset: 0;\n}\n50% {\n\t\tstroke-dasharray: 89, 200;\n\t\tstroke-dashoffset: -35px;\n}\n100% {\n\t\tstroke-dasharray: 89, 200;\n\t\tstroke-dashoffset: -124px;\n}\n}\n";
n(css,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = defineComponent({
  name: "VueSpinner",
  props: {
    ...spinnerProps,
    thickness: {
      type: Number,
      default: 5
    }
  },
  setup(props) {
    const { cSize, classes, style } = useSpinner(props);
    return () => h("svg", {
      style: style.value,
      class: classes.value + " vue-spinner-mat",
      width: cSize.value,
      height: cSize.value,
      viewBox: "25 25 50 50"
    }, [
      h("circle", {
        class: "path",
        cx: "50",
        cy: "50",
        r: "20",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": props.thickness,
        "stroke-miterlimit": "10"
      })
    ]);
  }
});
var vueSpinner = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/leonzalion/projects/vue3-spinners/packages/vue3-spinners/src/spinners/vue-spinner.vue"]]);

export { vueSpinner as default };
