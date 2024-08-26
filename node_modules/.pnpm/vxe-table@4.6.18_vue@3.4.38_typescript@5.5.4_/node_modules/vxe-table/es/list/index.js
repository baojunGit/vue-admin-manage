import VxeListComponent from './src/list';
import { dynamicApp } from '../dynamics';
export const VxeList = Object.assign(VxeListComponent, {
    install(app) {
        app.component(VxeListComponent.name, VxeListComponent);
    }
});
export const List = VxeList;
dynamicApp.component(VxeListComponent.name, VxeListComponent);
export default VxeList;
