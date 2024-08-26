import XEUtils from 'xe-utils';
export function getOnName(type) {
    return 'on' + type.substring(0, 1).toLocaleUpperCase() + type.substring(1);
}
export function getSlotVNs(vns) {
    if (XEUtils.isArray(vns)) {
        return vns;
    }
    return [vns];
}
