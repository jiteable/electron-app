<template>
  <div class="list-container">
    <WindowTitleBar>
      <template #title>列表窗口</template>
    </WindowTitleBar>
    <div class="list-content">
      list
    </div>
  </div>
</template>

<script setup>
import WindowTitleBar from '@renderer/components/WindowTitleBar.vue'
</script>

<style scoped>
.list-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.list-content {
  padding: 20px;
  -webkit-app-region: no-drag;
}
</style>