<script setup lang="ts">
import { ref, provide, useSlots, watch } from 'vue';

interface Props {
  modelValue: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
});

// Traversing slots to identify the MyTabPane components
const slots = useSlots();

const activeValue = ref(props.modelValue);
const tabs = ref<any[]>([]);

// Identify and collect tab pane instances
const getTabPaneOptions = (arr: any[]) => {
  for (const item of arr) {
    if (item?.type?.name && item?.type?.name === 'MyTabPane') {
      tabs.value.push(item?.props);
    } else if (Array.isArray(item.children)) {
      getTabPaneOptions(item.children);
    }
  }
};

// Provide activeValue to child components
provide('activeValue', activeValue);

// Watch for changes in slots and update tabs accordingly
watch(
  () => slots.default(),
  () => {
    tabs.value = [];
    getTabPaneOptions(slots.default?.() || []);
  },
  {
    deep: true,
    immediate: true
  }
);

interface Emits {
  (e: 'tab-click', tab:any, event:Event): void;
}
const emit = defineEmits<Emits>()

const onTabClick = (tab: any, event: Event) => {
  activeValue.value = tab.name;
  emit('tab-click', tab, event);
};
</script>

<template>
  <div class="app-tabs">
    <!-- Tab content -->
    <div class="tabs-container">
      <!-- prepend slot -->
      <div v-if="$slots.prepend">
        <slot name="prepend" />
      </div>
      <div
        v-for="(item, index) in tabs"
        :key="index"
        :class="['tabs-wrap', { active: activeValue === item.name }]"
        @click="onTabClick(item, $event)"
      >
        <span class="tab-title">{{ item.label }}</span>
        <span v-if="$slots.suffix"> <slot name="suffix" :item="item" /></span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append">
        <slot name="append" />
      </div>
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.app-tabs {
  position: relative;
  margin-bottom: $base-margin;
  .tabs-container {
    display: flex;
    align-items: center;
    border: none;
    border-bottom: 2px solid $base-color-blue;
    .tabs-wrap {
      position: relative;
      bottom: -2px;
      display: flex;
      align-items: center;
      padding: 6px;
      margin-right: 8px;
      font-size: 16px;
      border: 2px solid $base-color-gray;
      border-bottom: none;
      border-radius: 5px 5px 0 0;
      transition: all 0.5s ease 0s;
      .tab-title {
        cursor: pointer;
      }
      &::before {
        position: absolute;
        bottom: -2px;
        left: 0;
        display: block;
        height: 4px;
        content: '';
        background-color: #ffffff;
        transition: all 0.5s ease-in-out 0s;
        transform: scaleX(0);
      }
      &.active {
        color: $base-color-blue;
        background-color: #ffffff;
        border: 2px solid $base-color-blue;
        border-bottom: none;
        &::before {
          transform: scaleX(1);
        }
      }
    }
  }
}
</style>
