import { defineComponent, h, onUnmounted, inject, ref, reactive, onMounted, provide } from 'vue';
import { createItem, watchItem, destroyItem, assemItem } from './util';
import { formItemProps } from './form-item';
import XEUtils from 'xe-utils';
export default defineComponent({
    name: 'VxeFormGather',
    props: formItemProps,
    setup(props, { slots }) {
        const refElem = ref();
        const $xeform = inject('$xeform', {});
        const formGather = inject('$xeformgather', null);
        const formItem = reactive(createItem($xeform, props));
        const xeformitem = { formItem };
        const xeformiteminfo = { itemConfig: formItem };
        formItem.children = [];
        provide('$xeformiteminfo', xeformiteminfo);
        provide('$xeformgather', xeformitem);
        provide('$xeformitem', null);
        watchItem(props, formItem);
        onMounted(() => {
            assemItem($xeform, refElem.value, formItem, formGather);
        });
        onUnmounted(() => {
            destroyItem($xeform, formItem);
        });
        const renderVN = () => {
            const { className, field } = props;
            const span = props.span || ($xeform ? $xeform.props.span : null);
            const defaultSlot = slots.default;
            return h('div', {
                ref: refElem,
                class: ['vxe-form--gather vxe-form--item-row', formItem.id, span ? `vxe-form--item-col_${span} is--span` : '', className ? (XEUtils.isFunction(className) ? className({ $form: $xeform, data: $xeform ? $xeform.props.data : {}, item: formItem, field: field, property: field }) : className) : '']
            }, defaultSlot ? defaultSlot() : []);
        };
        const $xeformgather = {
            renderVN
        };
        return $xeformgather;
    },
    render() {
        return this.renderVN();
    }
});
