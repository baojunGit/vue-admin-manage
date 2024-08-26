import VxeSelectComponent from './src/select';
import { dynamicApp } from '../dynamics';
export const VxeSelect = Object.assign(VxeSelectComponent, {
    install: function (app) {
        app.component(VxeSelectComponent.name, VxeSelectComponent);
    }
});
export const Select = VxeSelect;
dynamicApp.component(VxeSelectComponent.name, VxeSelectComponent);
export default VxeSelect;
