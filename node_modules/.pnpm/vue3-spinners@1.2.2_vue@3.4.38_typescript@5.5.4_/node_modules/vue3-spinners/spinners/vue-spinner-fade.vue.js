import { defineComponent, openBlock, createElementBlock, Fragment, renderList, normalizeStyle } from 'vue';
import { useSpinnerProps } from '../utils/props.js';
import { useSize } from '../utils/size.js';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n@keyframes vue-spinner-fade {\n50% {\n\t\topacity: 0.3;\n}\n100% {\n\t\topacity: 1;\n}\n}\n";
n(css,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const __default__ = { name: "VueSpinnerFade" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: useSpinnerProps({
    color: "#000000",
    height: "15px",
    width: "5px",
    margin: "2px",
    radius: "2px"
  }),
  setup(__props) {
    const height = useSize(() => __props.height);
    const width = useSize(() => __props.width);
    const margin = useSize(() => __props.margin);
    const radius = useSize(() => __props.radius);
    const rad = 20;
    const quarter = rad / 2 + rad / 5.5;
    const wrapperStyle = {
      top: `${rad}px`,
      left: `${rad}px`,
      width: `${rad * 3}px`,
      height: `${rad * 3}px`,
      position: "relative",
      fontSize: 0
    };
    const styles = {
      a: {
        top: `${rad}px`,
        left: 0
      },
      b: {
        top: `${quarter}px`,
        left: `${quarter}px`,
        transform: "rotate(-45deg)"
      },
      c: {
        top: 0,
        left: `${rad}px`,
        transform: "rotate(90deg)"
      },
      d: {
        top: `${-quarter}px`,
        left: `${quarter}px`,
        transform: "rotate(45deg)"
      },
      e: {
        top: `${-rad}px`,
        left: 0
      },
      f: {
        top: `${-quarter}px`,
        left: `${-quarter}px`,
        transform: "rotate(-45deg)"
      },
      g: {
        top: 0,
        left: `${-rad}px`,
        transform: "rotate(90deg)"
      },
      h: {
        top: `${quarter}px`,
        left: `${-quarter}px`,
        transform: "rotate(45deg)"
      }
    };
    const getBarStyle = (variation, version) => ({
      position: "absolute",
      width: width.value.string,
      height: height.value.string,
      margin: margin.value.string,
      backgroundColor: __props.color,
      borderRadius: radius.value.string,
      transition: "2s",
      animationFillMode: "both",
      animation: `vue-spinner-fade 1.2s ${version * 0.12}s infinite ease-in-out`,
      ...styles[variation]
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", { style: wrapperStyle }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(Object.keys(styles), (letter, i) => {
          return openBlock(), createElementBlock("div", {
            key: i,
            style: normalizeStyle(getBarStyle(letter, i))
          }, null, 4);
        }), 128))
      ]);
    };
  }
});
var vueSpinnerFade = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/leonzalion/projects/vue3-spinners/packages/vue3-spinners/src/spinners/vue-spinner-fade.vue"]]);

export { vueSpinnerFade as default };
