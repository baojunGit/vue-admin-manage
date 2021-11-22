<template>
  <div class="app-tabs">
    <el-tabs
      v-model="tabActive"
      type="card"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="item in visitedRoutes"
        :key="item.path"
        :closable="!isNoClosable(item)"
        :name="item.path"
      >
        <template #label>
          <span
            style="display: inline-block"
            @contextmenu.prevent="openMenu($event, item)"
          >
            <span>
              {{ translateTitle(item.meta.title) }}
            </span>
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped></style>
