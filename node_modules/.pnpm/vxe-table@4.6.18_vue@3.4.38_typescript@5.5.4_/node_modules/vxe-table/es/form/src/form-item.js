import { defineComponent, h, onUnmounted, inject, ref, provide, onMounted, createCommentVNode, reactive } from 'vue';
import XEUtils from 'xe-utils';
import GlobalConfig from '../../v-x-e-table/src/conf';
import { VXETable } from '../../v-x-e-table';
import { getFuncText, isEnableConf } from '../../tools/utils';
import { getSlotVNs } from '../../tools/vn';
import { createItem, watchItem, destroyItem, assemItem, isActivetem } from './util';
import { renderTitle } from './render';
export const formItemProps = {
    title: String,
    field: String,
    span: [String, Number],
    align: String,
    titleAlign: {
        type: String,
        default: null
    },
    titleWidth: {
        type: [String, Number],
        default: null
    },
    titleColon: {
        type: Boolean,
        default: null
    },
    titleAsterisk: {
        type: Boolean,
        default: null
    },
    showTitle: {
        type: Boolean,
        default: true
    },
    vertical: {
        type: Boolean,
        default: null
    },
    className: [String, Function],
    contentClassName: [String, Function],
    contentStyle: [Object, Function],
    titleClassName: [String, Function],
    titleStyle: [Object, Function],
    titleOverflow: {
        type: [Boolean, String],
        default: null
    },
    titlePrefix: Object,
    titleSuffix: Object,
    resetValue: { default: null },
    visibleMethod: Function,
    visible: { type: Boolean, default: null },
    folding: Boolean,
    collapseNode: Boolean,
    itemRender: Object,
    rules: Array
};
export default defineComponent({
    name: 'VxeFormItem',
    props: formItemProps,
    setup(props, { slots }) {
        const refElem = ref();
        const $xeform = inject('$xeform', {});
        const formGather = inject('$xeformgather', null);
        const formItem = reactive(createItem($xeform, props));
        const xeformitem = { formItem };
        const xeformiteminfo = { itemConfig: formItem };
        formItem.slots = slots;
        provide('$xeformiteminfo', xeformiteminfo);
        provide('$xeformitem', xeformitem);
        provide('$xeformgather', null);
        watchItem(props, formItem);
        onMounted(() => {
            assemItem($xeform, refElem.value, formItem, formGather);
        });
        onUnmounted(() => {
            destroyItem($xeform, formItem);
        });
        const renderItem = ($xeform, item) => {
            const { props, reactData } = $xeform;
            const { data, rules, titleAlign: allTitleAlign, titleWidth: allTitleWidth, titleColon: allTitleColon, titleAsterisk: allTitleAsterisk, titleOverflow: allTitleOverflow, vertical: allVertical } = props;
            const { collapseAll } = reactData;
            const { computeValidOpts } = $xeform.getComputeMaps();
            const validOpts = computeValidOpts.value;
            const { slots, title, visible, folding, field, collapseNode, itemRender, showError, errRule, className, titleOverflow, vertical, showTitle, contentClassName, contentStyle, titleClassName, titleStyle } = item;
            const compConf = isEnableConf(itemRender) ? VXETable.renderer.get(itemRender.name) : null;
            const itemClassName = compConf ? compConf.itemClassName : '';
            const itemStyle = compConf ? compConf.itemStyle : null;
            const itemContentClassName = compConf ? compConf.itemContentClassName : '';
            const itemContentStyle = compConf ? compConf.itemContentStyle : null;
            const itemTitleClassName = compConf ? compConf.itemTitleClassName : '';
            const itemTitleStyle = compConf ? compConf.itemTitleStyle : null;
            const defaultSlot = slots ? slots.default : null;
            const titleSlot = slots ? slots.title : null;
            const span = item.span || props.span;
            const align = item.align || props.align;
            const titleAlign = XEUtils.eqNull(item.titleAlign) ? allTitleAlign : item.titleAlign;
            const titleWidth = XEUtils.eqNull(item.titleWidth) ? allTitleWidth : item.titleWidth;
            const titleColon = XEUtils.eqNull(item.titleColon) ? allTitleColon : item.titleColon;
            const titleAsterisk = XEUtils.eqNull(item.titleAsterisk) ? allTitleAsterisk : item.titleAsterisk;
            const itemOverflow = (XEUtils.isUndefined(titleOverflow) || XEUtils.isNull(titleOverflow)) ? allTitleOverflow : titleOverflow;
            const itemVertical = (XEUtils.isUndefined(vertical) || XEUtils.isNull(vertical)) ? allVertical : vertical;
            const ovEllipsis = itemOverflow === 'ellipsis';
            const ovTitle = itemOverflow === 'title';
            const ovTooltip = itemOverflow === true || itemOverflow === 'tooltip';
            const hasEllipsis = ovTitle || ovTooltip || ovEllipsis;
            const params = { data, field, property: field, item, $form: $xeform, $grid: $xeform.xegrid };
            let isRequired = false;
            if (visible === false) {
                return createCommentVNode();
            }
            if (rules) {
                const itemRules = rules[field];
                if (itemRules) {
                    isRequired = itemRules.some((rule) => rule.required);
                }
            }
            let contentVNs = [];
            if (defaultSlot) {
                contentVNs = $xeform.callSlot(defaultSlot, params);
            }
            else if (compConf && compConf.renderItemContent) {
                contentVNs = getSlotVNs(compConf.renderItemContent(itemRender, params));
            }
            else if (field) {
                contentVNs = [`${XEUtils.get(data, field)}`];
            }
            if (collapseNode) {
                contentVNs.push(h('div', {
                    class: 'vxe-form--item-trigger-node',
                    onClick: $xeform.toggleCollapseEvent
                }, [
                    h('span', {
                        class: 'vxe-form--item-trigger-text'
                    }, collapseAll ? GlobalConfig.i18n('vxe.form.unfolding') : GlobalConfig.i18n('vxe.form.folding')),
                    h('i', {
                        class: ['vxe-form--item-trigger-icon', collapseAll ? GlobalConfig.icon.FORM_FOLDING : GlobalConfig.icon.FORM_UNFOLDING]
                    })
                ]));
            }
            if (errRule && validOpts.showMessage) {
                contentVNs.push(h('div', {
                    class: 'vxe-form--item-valid',
                    style: errRule.maxWidth ? {
                        width: `${errRule.maxWidth}px`
                    } : null
                }, errRule.message));
            }
            const ons = ovTooltip ? {
                onMouseenter(evnt) {
                    $xeform.triggerTitleTipEvent(evnt, params);
                },
                onMouseleave: $xeform.handleTitleTipLeaveEvent
            } : {};
            return h('div', {
                ref: refElem,
                class: [
                    'vxe-form--item',
                    item.id,
                    span ? `vxe-form--item-col--${span} is--span` : '',
                    className ? (XEUtils.isFunction(className) ? className(params) : className) : '',
                    itemClassName ? (XEUtils.isFunction(itemClassName) ? itemClassName(params) : itemClassName) : '',
                    {
                        'is--title': title,
                        'is--colon': titleColon,
                        'is--vertical': itemVertical,
                        'is--asterisk': titleAsterisk,
                        'is--required': isRequired,
                        'is--hidden': folding && collapseAll,
                        'is--active': isActivetem($xeform, item),
                        'is--error': showError
                    }
                ],
                style: XEUtils.isFunction(itemStyle) ? itemStyle(params) : itemStyle
            }, [
                h('div', {
                    class: 'vxe-form--item-inner'
                }, [
                    (showTitle !== false) && (title || titleSlot) ? h('div', Object.assign({ class: [
                            'vxe-form--item-title',
                            titleAlign ? `align--${titleAlign}` : '',
                            hasEllipsis ? 'is--ellipsis' : '',
                            itemTitleClassName ? (XEUtils.isFunction(itemTitleClassName) ? itemTitleClassName(params) : itemTitleClassName) : '',
                            titleClassName ? (XEUtils.isFunction(titleClassName) ? titleClassName(params) : titleClassName) : ''
                        ], style: Object.assign({}, XEUtils.isFunction(itemTitleStyle) ? itemTitleStyle(params) : itemTitleStyle, XEUtils.isFunction(titleStyle) ? titleStyle(params) : titleStyle, titleWidth ? {
                            width: isNaN(titleWidth) ? titleWidth : `${titleWidth}px`
                        } : null), title: ovTitle ? getFuncText(title) : null }, ons), renderTitle($xeform, item)) : null,
                    h('div', {
                        class: [
                            'vxe-form--item-content',
                            align ? `align--${align}` : '',
                            itemContentClassName ? (XEUtils.isFunction(itemContentClassName) ? itemContentClassName(params) : itemContentClassName) : '',
                            contentClassName ? (XEUtils.isFunction(contentClassName) ? contentClassName(params) : contentClassName) : ''
                        ],
                        style: Object.assign({}, XEUtils.isFunction(itemContentStyle) ? itemContentStyle(params) : itemContentStyle, XEUtils.isFunction(contentStyle) ? contentStyle(params) : contentStyle)
                    }, contentVNs)
                ])
            ]);
        };
        const renderVN = () => {
            const formProps = $xeform ? $xeform.props : null;
            return formProps && formProps.customLayout ? renderItem($xeform, formItem) : h('div', {
                ref: refElem
            });
        };
        const $xeformitem = {
            renderVN
        };
        return $xeformitem;
    },
    render() {
        return this.renderVN();
    }
});
