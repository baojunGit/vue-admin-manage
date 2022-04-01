<template>
  <div class="my-tab-pane" v-show="name === activeValue">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs, inject, computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: () => ''
  },
  label: {
    type: String,
    default: () => ''
  }
})

const { name } = toRefs(props)

// const activeValue = ref('')

const privodeValue = inject('activeValue') as any

const activeValue = computed(() => privodeValue.value)
</script>
