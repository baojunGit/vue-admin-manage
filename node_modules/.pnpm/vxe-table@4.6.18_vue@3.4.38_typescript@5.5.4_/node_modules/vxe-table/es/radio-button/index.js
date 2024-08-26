import VxeRadioButtonComponent from '../radio/src/button';
import { dynamicApp } from '../dynamics';
export const VxeRadioButton = Object.assign(VxeRadioButtonComponent, {
    install: function (app) {
        app.component(VxeRadioButtonComponent.name, VxeRadioButtonComponent);
    }
});
export const RadioButton = VxeRadioButton;
dynamicApp.component(VxeRadioButtonComponent.name, VxeRadioButtonComponent);
export default VxeRadioButton;
