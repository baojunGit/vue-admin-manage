import VxeCheckboxComponent from './src/checkbox';
import { dynamicApp } from '../dynamics';
export const VxeCheckbox = Object.assign(VxeCheckboxComponent, {
    install(app) {
        app.component(VxeCheckboxComponent.name, VxeCheckboxComponent);
    }
});
export const Checkbox = VxeCheckbox;
dynamicApp.component(VxeCheckboxComponent.name, VxeCheckboxComponent);
export default VxeCheckbox;
