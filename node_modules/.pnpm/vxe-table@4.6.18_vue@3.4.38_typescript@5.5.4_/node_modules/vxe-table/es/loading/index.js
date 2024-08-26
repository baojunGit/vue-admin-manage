import VxeLoadingComponent from './src/loading';
export const VxeLoading = Object.assign(VxeLoadingComponent, {
    install(app) {
        app.component(VxeLoadingComponent.name, VxeLoadingComponent);
    }
});
export const Loading = VxeLoading;
export default VxeLoading;
