import VxeTableComponent from './src/table';
import { dynamicApp } from '../dynamics';
export const VxeTable = Object.assign(VxeTableComponent, {
    install: function (app) {
        app.component(VxeTableComponent.name, VxeTableComponent);
    }
});
export const Table = VxeTable;
dynamicApp.component(VxeTableComponent.name, VxeTableComponent);
export default VxeTable;
