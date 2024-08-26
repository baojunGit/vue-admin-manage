import XEUtils from 'xe-utils';
import { warnLog } from '../../tools/log';
class VXEFormatsStore {
    constructor() {
        Object.defineProperty(this, "store", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
    }
    mixin(options) {
        XEUtils.each(options, (item, key) => {
            this.add(key, item);
        });
        return this;
    }
    has(name) {
        return !!this.get(name);
    }
    get(name) {
        return this.store[name];
    }
    add(name, render) {
        const conf = this.store[name];
        // 兼容
        if (XEUtils.isFunction(render)) {
            if (process.env.NODE_ENV === 'development') {
                warnLog('vxe.error.delProp', ['formats -> callback', 'cellFormatMethod']);
            }
            render = {
                cellFormatMethod: render
            };
        }
        // 检测是否覆盖
        if (process.env.NODE_ENV === 'development') {
            const confKeys = XEUtils.keys(conf);
            XEUtils.each(render, (item, key) => {
                if (confKeys.includes(key)) {
                    warnLog('vxe.error.coverProp', [name, key]);
                }
            });
        }
        this.store[name] = conf ? XEUtils.merge(conf, render) : render;
        return this;
    }
    delete(name) {
        delete this.store[name];
    }
    forEach(callback) {
        XEUtils.objectEach(this.store, callback);
    }
}
export const formats = new VXEFormatsStore();
if (process.env.NODE_ENV === 'development') {
    Object.assign(formats, { _name: 'Formats' });
}
