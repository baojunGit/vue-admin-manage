import VxeSwitchComponent from './src/switch';
import { dynamicApp } from '../dynamics';
export const VxeSwitch = Object.assign(VxeSwitchComponent, {
    install: function (app) {
        app.component(VxeSwitchComponent.name, VxeSwitchComponent);
    }
});
export const Switch = VxeSwitch;
dynamicApp.component(VxeSwitchComponent.name, VxeSwitchComponent);
export default VxeSwitch;
