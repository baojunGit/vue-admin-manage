import VxeButtonComponent from './src/button';
import { dynamicApp } from '../dynamics';
export const VxeButton = Object.assign(VxeButtonComponent, {
    install(app) {
        app.component(VxeButtonComponent.name, VxeButtonComponent);
    }
});
export const Button = VxeButton;
dynamicApp.component(VxeButtonComponent.name, VxeButtonComponent);
export default VxeButton;
