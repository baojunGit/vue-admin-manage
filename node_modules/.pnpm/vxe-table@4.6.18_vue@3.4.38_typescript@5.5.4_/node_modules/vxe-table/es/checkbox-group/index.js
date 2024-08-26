import VxeCheckboxGroupComponent from '../checkbox/src/group';
import { dynamicApp } from '../dynamics';
export const VxeCheckboxGroup = Object.assign(VxeCheckboxGroupComponent, {
    install(app) {
        app.component(VxeCheckboxGroupComponent.name, VxeCheckboxGroupComponent);
    }
});
export const CheckboxGroup = VxeCheckboxGroup;
dynamicApp.component(VxeCheckboxGroupComponent.name, VxeCheckboxGroupComponent);
export default VxeCheckboxGroup;
