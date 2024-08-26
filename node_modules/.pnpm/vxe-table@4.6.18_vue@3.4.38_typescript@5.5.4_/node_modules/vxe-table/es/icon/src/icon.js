import { defineComponent, h } from 'vue';
export default defineComponent({
    name: 'VxeIcon',
    props: {
        name: String,
        roll: Boolean,
        status: String
    },
    emits: [
        'click'
    ],
    setup(props, { emit }) {
        const clickEvent = (evnt) => {
            emit('click', { $event: evnt });
        };
        return () => {
            const { name, roll, status } = props;
            return h('i', {
                class: [`vxe-icon-${name}`, roll ? 'roll' : '', status ? [`theme--${status}`] : ''],
                onClick: clickEvent
            });
        };
    }
});
