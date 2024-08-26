import type { spinnerProps } from './utils/use-spinner.js';
declare module '@vue/runtime-core' {
    interface GlobalComponents {
        VueSpinner: DefineComponent<typeof spinnerProps>;
        VueSpinnerAudio: DefineComponent<typeof spinnerProps>;
        VueSpinnerBall: DefineComponent<typeof spinnerProps>;
        VueSpinnerBar: typeof import('./spinners/vue-spinner-bar.vue.js');
        VueSpinnerBars: DefineComponent<typeof spinnerProps>;
        VueSpinnerBeat: typeof import('./spinners/vue-spinner-beat.vue.js');
        VueSpinnerBox: DefineComponent<typeof spinnerProps>;
        VueSpinnerCircle: typeof import('./spinners/vue-spinner-circle.vue.js');
        VueSpinnerClimbingBox: typeof import('./spinners/vue-spinner-climbing-box.vue.js');
        VueSpinnerClip: typeof import('./spinners/vue-spinner-clip.vue.js');
        VueSpinnerClock: DefineComponent<typeof spinnerProps>;
        VueSpinnerComment: DefineComponent<typeof spinnerProps>;
        VueSpinnerCore: DefineComponent<typeof spinnerProps>;
        VueSpinnerDot: typeof import('./spinners/vue-spinner-dot.vue.js');
        VueSpinnerDots: DefineComponent<typeof spinnerProps>;
        VueSpinnerFade: typeof import('./spinners/vue-spinner-fade.vue.js');
        VueSpinnerFacebook: DefineComponent<typeof spinnerProps>;
        VueSpinnerGears: DefineComponent<typeof spinnerProps>;
        VueSpinnerGrid: DefineComponent<typeof spinnerProps>;
        VueSpinnerGridPop: typeof import('./spinners/vue-spinner-grid-pop.vue.js');
        VueSpinnerHearts: DefineComponent<typeof spinnerProps>;
        VueSpinnerHourglass: DefineComponent<typeof spinnerProps>;
        VueSpinnerInfinity: DefineComponent<typeof spinnerProps>;
        VueSpinnerIos: DefineComponent<typeof spinnerProps>;
        VueSpinnerMoon: typeof import('./spinners/vue-spinner-moon.vue.js');
        VueSpinnerOrbit: DefineComponent<typeof spinnerProps>;
        VueSpinnerOval: DefineComponent<typeof spinnerProps>;
        VueSpinnerPacman: typeof import('./spinners/vue-spinner-pacman.vue.js');
        VueSpinnerPie: DefineComponent<typeof spinnerProps>;
        VueSpinnerPropagate: typeof import('./spinners/vue-spinner-propagate.vue.js');
        VueSpinnerPuff: DefineComponent<typeof spinnerProps>;
        VueSpinnerPulse: typeof import('./spinners/vue-spinner-pulse.vue.js');
        VueSpinnerRadio: DefineComponent<typeof spinnerProps>;
        VueSpinnerRing: typeof import('./spinners/vue-spinner-ring.vue.js');
        VueSpinnerRings: DefineComponent<typeof spinnerProps>;
        VueSpinnerRise: typeof import('./spinners/vue-spinner-rise.vue.js');
        VueSpinnerRotate: typeof import('./spinners/vue-spinner-rotate.vue.js');
        VueSpinnerScale: typeof import('./spinners/vue-spinner-scale.vue.js');
        VueSpinnerSkew: typeof import('./spinners/vue-spinner-skew.vue.js');
        VueSpinnerSquare: typeof import('./spinners/vue-spinner-square.vue.js');
        VueSpinnerSync: typeof import('./spinners/vue-spinner-sync.vue.js');
        VueSpinnerTail: DefineComponent<typeof spinnerProps>;
    }
}
