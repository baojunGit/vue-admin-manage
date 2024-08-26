import XEUtils from 'xe-utils';
import VxeModalComponent, { allActiveModals } from './src/modal';
import { VXETable } from '../v-x-e-table';
import { dynamicApp, dynamicStore, checkDynamic } from '../dynamics';
function openModal(options) {
    // 使用动态组件渲染动态弹框
    checkDynamic();
    return new Promise(resolve => {
        if (options && options.id && allActiveModals.some(comp => comp.props.id === options.id)) {
            resolve('exist');
        }
        else {
            const _onHide = options.onHide;
            const modalOpts = Object.assign(options, {
                key: XEUtils.uniqueId(),
                modelValue: true,
                onHide(params) {
                    const modalList = dynamicStore.modals;
                    if (_onHide) {
                        _onHide(params);
                    }
                    dynamicStore.modals = modalList.filter(item => item.key !== modalOpts.key);
                    resolve(params.type);
                }
            });
            dynamicStore.modals.push(modalOpts);
        }
    });
}
function getModal(id) {
    return XEUtils.find(allActiveModals, $modal => $modal.props.id === id);
}
/**
 * 全局关闭动态的活动窗口（只能用于关闭动态的创建的活动窗口）
 * 如果传 id 则关闭指定的窗口
 * 如果不传则关闭所有窗口
 */
function closeModal(id) {
    const modals = id ? [getModal(id)] : allActiveModals;
    const restPromises = [];
    modals.forEach($modal => {
        if ($modal) {
            restPromises.push($modal.close());
        }
    });
    return Promise.all(restPromises);
}
function handleOpen(defOpts, content, title, options) {
    let opts;
    if (XEUtils.isObject(content)) {
        opts = content;
    }
    else {
        opts = { content: XEUtils.toValueString(content), title };
    }
    return openModal(Object.assign(Object.assign(Object.assign({}, defOpts), options), opts));
}
function openAlert(content, title, options) {
    return handleOpen({
        type: 'alert',
        showFooter: true
    }, content, title, options);
}
function openConfirm(content, title, options) {
    return handleOpen({
        type: 'confirm',
        status: 'question',
        showFooter: true
    }, content, title, options);
}
function openMessage(content, options) {
    return handleOpen({
        type: 'message',
        mask: false,
        lockView: false,
        showHeader: false
    }, content, '', options);
}
const ModalController = {
    get: getModal,
    close: closeModal,
    open: openModal,
    alert: openAlert,
    confirm: openConfirm,
    message: openMessage
};
export const modal = ModalController;
export const VxeModal = Object.assign(VxeModalComponent, {
    install: function (app) {
        app.component(VxeModalComponent.name, VxeModalComponent);
        VXETable.modal = ModalController;
    }
});
export const Modal = VxeModal;
dynamicApp.component(VxeModalComponent.name, VxeModalComponent);
export default VxeModal;
