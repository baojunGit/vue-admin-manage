import VxeGridComponent from './src/grid';
import { dynamicApp } from '../dynamics';
export const VxeGrid = Object.assign(VxeGridComponent, {
    install(app) {
        app.component(VxeGridComponent.name, VxeGridComponent);
    }
});
export const Grid = VxeGrid;
dynamicApp.component(VxeGridComponent.name, VxeGridComponent);
export default VxeGrid;
