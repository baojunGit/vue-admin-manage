import { defineComponent, h, onUnmounted, provide, inject, ref, onMounted } from 'vue';
import { columnProps } from './column';
import { watchColumn, assemColumn, destroyColumn } from '../../table/src/util';
import Cell from '../../table/src/cell';
export default defineComponent({
    name: 'VxeColgroup',
    props: columnProps,
    setup(props, { slots }) {
        const refElem = ref();
        const $xetable = inject('$xetable', {});
        const colgroup = inject('xecolgroup', null);
        const column = Cell.createColumn($xetable, props);
        const columnSlots = {};
        if (slots.header) {
            columnSlots.header = slots.header;
        }
        const xecolumn = { column };
        column.slots = columnSlots;
        column.children = [];
        provide('xecolgroup', xecolumn);
        provide('$xegrid', null);
        watchColumn($xetable, props, column);
        onMounted(() => {
            assemColumn($xetable, refElem.value, column, colgroup);
        });
        onUnmounted(() => {
            destroyColumn($xetable, column);
        });
        const renderVN = () => {
            return h('div', {
                ref: refElem
            }, slots.default ? slots.default() : []);
        };
        return renderVN;
    }
});
