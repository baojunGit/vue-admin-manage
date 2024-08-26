import VxeFormComponent from './src/form';
import { dynamicApp } from '../dynamics';
export const VxeForm = Object.assign(VxeFormComponent, {
    install(app) {
        app.component(VxeFormComponent.name, VxeFormComponent);
    }
});
export const Form = VxeForm;
dynamicApp.component(VxeFormComponent.name, VxeFormComponent);
export default VxeForm;
