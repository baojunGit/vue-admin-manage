import editHook from './src/hook';
import { VXETable } from '../v-x-e-table';
export const VxeTableEditModule = {
    install() {
        VXETable.hooks.add('$tableEdit', editHook);
    }
};
export const Edit = VxeTableEditModule;
export default VxeTableEditModule;
