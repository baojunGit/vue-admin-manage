# vue3-spinners

[![npm version](https://img.shields.io/npm/v/vue3-spinners)](https://npmjs.com/package/vue3-spinners)

Spinner components for Vue 3.

These components were exported from Quasar's spinner components (<https://quasar.dev/vue-components/spinners>) and from [vue-spinners](https://github.com/Saeris/vue-spinners) (which itself was a port of [react-spinners](https://github.com/davidhu2000/react-spinners)) so the authors of these libraries deserve all of the credit for these amazing spinner animations!

## Online Demo

To see all the spinners in action, press visit the following online demo: <https://leonzalion.github.io/vue3-spinners>

<p align="center">
  <img src="https://raw.githubusercontent.com/leonzalion/vue3-spinners/main/packages/assets/images/spinners.gif" />
</p>

## Installation

```shell
npm install vue3-spinners
```

## Usage

To use the spinners, import the ones you want to use in your Vue component:

```vue
<script>
import {
  VueSpinner,
  // ...
} from 'vue3-spinners';

export default {
  components: {
    VueSpinner,
    // ...
  },
};
</script>

<template>
  <VueSpinner size="20" color="red" />
  <!-- ... -->
</template>
```

Using `<script setup>` (recommended):

```vue
<script setup>
import {
  VueSpinner,
  // ...
} from 'vue3-spinners';
</script>

<template>
  <VueSpinner size="20" color="red" />
  <!-- ... -->
</template>
```

If you want the spinners to be available globally without needing to import them manually, add the following to your app's entrypoint:

```typescript
import { createApp } from 'vue';
import App from './app.vue';
import { VueSpinnersPlugin } from 'vue3-spinners';

const app = createApp(App);
app.use(VueSpinnersPlugin);
// ...
```

## Universal Props (accepted by each spinner)

### color

Type: `string`\
Default: `#000000`\
Supported Spinners: _all_

All spinners accept a color property that sets the color of the spinner.

## Spinner-dependent Props

Each spinner takes different properties whose effect depends on the spinner being used; please refer to the file for each spinner to find out which properties it accepts (which is indicated by the destructuring of the `defineProps` function): <https://github.com/leonzalion/vue3-spinners/tree/main/packages/vue3-spinners/src/spinners>

Example:

```typescript
// vue-spinner-scale.vue
const {
  color,
  height: heightProp,
  width: widthProp,
  radius: radiusProp,
  margin: marginProp,
} = defineProps();
// ...
```

This `defineProps` destructuring indicates that `<VueSpinnerScale>` accepts the following props: `color`, `height`, `width`, `radius`, `margin`

### size

Type: [`CSS <length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length)

The size of the spinner.

### height

Type: [`CSS <length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length)

The height of the spinner.

### width

Type: [`CSS <length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length)

The width of the spinner.

### radius

Type: [`CSS <length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length)

The radius of the spinner.

### margin

Type: [`CSS <length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length)

The margin of the spinner.
