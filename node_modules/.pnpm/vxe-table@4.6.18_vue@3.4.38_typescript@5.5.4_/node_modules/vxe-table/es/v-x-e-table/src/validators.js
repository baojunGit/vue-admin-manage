import VXEStore from './store';
export const validators = new VXEStore();
if (process.env.NODE_ENV === 'development') {
    Object.assign(validators, { _name: 'Validators' });
}
