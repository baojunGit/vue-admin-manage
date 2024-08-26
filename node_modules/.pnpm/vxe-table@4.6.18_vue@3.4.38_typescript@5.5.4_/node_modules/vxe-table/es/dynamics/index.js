import { defineComponent, h, createApp, resolveComponent, reactive, createCommentVNode } from 'vue';
let dynamicContainerElem;
export const dynamicStore = reactive({
    modals: [],
    drawers: []
});
/**
 * 动态组件
 */
const VxeDynamics = defineComponent({
    setup() {
        return () => {
            const { modals, drawers } = dynamicStore;
            return [
                modals.length
                    ? h('div', {
                        class: 'vxe-dynamics--modal'
                    }, modals.map((item) => h(resolveComponent('vxe-modal'), item)))
                    : createCommentVNode(),
                drawers.length
                    ? h('div', {
                        class: 'vxe-dynamics--drawer'
                    }, drawers.map((item) => h(resolveComponent('vxe-drawer'), item)))
                    : createCommentVNode()
            ];
        };
    }
});
export const dynamicApp = createApp(VxeDynamics);
export function checkDynamic() {
    if (!dynamicContainerElem) {
        dynamicContainerElem = document.createElement('div');
        dynamicContainerElem.className = 'vxe-dynamics';
        document.body.appendChild(dynamicContainerElem);
        dynamicApp.mount(dynamicContainerElem);
    }
}
