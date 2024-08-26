import { watch } from 'vue';
import { VXETable } from '../../v-x-e-table';
import XEUtils from 'xe-utils';
import { ItemInfo } from './itemInfo';
import { isEnableConf } from '../../tools/utils';
export function isFormItem(item) {
    return item instanceof ItemInfo;
}
export function createItem($xeform, _vm) {
    return isFormItem(_vm) ? _vm : new ItemInfo($xeform, _vm);
}
export function handleFieldOrItem($xeform, fieldOrItem) {
    if (fieldOrItem) {
        return XEUtils.isString(fieldOrItem) ? $xeform.getItemByField(fieldOrItem) : fieldOrItem;
    }
    return null;
}
export function isHiddenItem($xeform, formItem) {
    const { reactData } = $xeform;
    const { collapseAll } = reactData;
    const { folding, visible } = formItem;
    return visible === false || (folding && collapseAll);
}
export function isActivetem($xeform, formItem) {
    let { visibleMethod, itemRender, visible, field } = formItem;
    if (visible === false) {
        return visible;
    }
    const compConf = isEnableConf(itemRender) ? VXETable.renderer.get(itemRender.name) : null;
    if (!visibleMethod && compConf && compConf.itemVisibleMethod) {
        visibleMethod = compConf.itemVisibleMethod;
    }
    if (!visibleMethod) {
        return true;
    }
    const { data } = $xeform.props;
    return visibleMethod({ data, field, property: field, item: formItem, $form: $xeform, $grid: $xeform.xegrid });
}
export function watchItem(props, formItem) {
    Object.keys(props).forEach(name => {
        watch(() => props[name], (value) => {
            formItem.update(name, value);
        });
    });
}
export function assemItem($xeform, el, formItem, formGather) {
    const { reactData } = $xeform;
    const { staticItems } = reactData;
    const parentElem = el.parentNode;
    const parentItem = formGather ? formGather.formItem : null;
    const parentItems = parentItem ? parentItem.children : staticItems;
    if (parentElem) {
        parentItems.splice(XEUtils.arrayIndexOf(parentElem.children, el), 0, formItem);
        reactData.staticItems = staticItems.slice(0);
    }
}
export function destroyItem($xeform, formItem) {
    const { reactData } = $xeform;
    const { staticItems } = reactData;
    const index = XEUtils.findIndexOf(staticItems, item => item.id === formItem.id);
    if (index > -1) {
        staticItems.splice(index, 1);
    }
    reactData.staticItems = staticItems.slice(0);
}
