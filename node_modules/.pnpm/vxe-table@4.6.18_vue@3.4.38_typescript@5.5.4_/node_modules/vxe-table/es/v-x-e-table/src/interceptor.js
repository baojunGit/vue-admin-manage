import XEUtils from 'xe-utils';
import { warnLog } from '../../tools/log';
const storeMap = {};
export const interceptor = {
    mixin(options) {
        XEUtils.each(options, (callback, type) => interceptor.add(type, callback));
        return interceptor;
    },
    get(type) {
        return storeMap[type] || [];
    },
    add(type, callback) {
        // 检测类型
        if (process.env.NODE_ENV === 'development') {
            const eventTypes = ['created', 'mounted', 'activated', 'beforeUnmount', 'unmounted', 'event.clearEdit', 'event.clearActived', 'event.clearFilter', 'event.clearAreas', 'event.showMenu', 'event.keydown', 'event.export', 'event.import'];
            if (eventTypes.indexOf(type) === -1) {
                warnLog('vxe.error.errProp', [`Interceptor.${type}`, eventTypes.join('|')]);
            }
        }
        if (callback) {
            let eList = storeMap[type];
            if (!eList) {
                eList = storeMap[type] = [];
            }
            // 检测重复
            if (process.env.NODE_ENV === 'development') {
                if (eList.indexOf(callback) > -1) {
                    warnLog('vxe.error.coverProp', ['Interceptor', type]);
                }
            }
            eList.push(callback);
        }
        return interceptor;
    },
    delete(type, callback) {
        const eList = storeMap[type];
        if (eList) {
            if (callback) {
                XEUtils.remove(eList, fn => fn === callback);
            }
            else {
                delete storeMap[type];
            }
        }
    }
};
