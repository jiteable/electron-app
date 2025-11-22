<template>
  <router-view></router-view>
</template>

<style lang="scss">
// 使用 @use 替代 @import
@use './assets/css/style.scss';
</style>
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
let dark = ref<string | null>(localStorage.getItem('dark'))
onBeforeMount(() => {
  const element = document.querySelector('html') as HTMLElement | null;
  if (element) {
    if (dark.value) {
      element.className = 'dark'
    } else {
      element.className = ''
    }
  }
})
</script>
