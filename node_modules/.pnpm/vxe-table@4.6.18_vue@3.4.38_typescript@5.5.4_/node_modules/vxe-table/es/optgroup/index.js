import VxeOptgroupComponent from '../select/src/optgroup';
import { dynamicApp } from '../dynamics';
export const VxeOptgroup = Object.assign(VxeOptgroupComponent, {
    install: function (app) {
        app.component(VxeOptgroupComponent.name, VxeOptgroupComponent);
    }
});
export const Optgroup = VxeOptgroup;
dynamicApp.component(VxeOptgroupComponent.name, VxeOptgroupComponent);
export default VxeOptgroup;
