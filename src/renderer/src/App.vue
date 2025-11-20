<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isMaximized = ref(false)

// 最小化窗口
const minimizeWindow = () => {
  window.electron.ipcRenderer.send('window-minimize')
}

// 切换最大化/还原窗口
const toggleMaximizeWindow = () => {
  window.electron.ipcRenderer.send('window-toggle-maximize')
}

// 关闭窗口
const closeWindow = () => {
  window.electron.ipcRenderer.send('window-close')
}

// 监听窗口最大化状态变化
const handleWindowMaximized = () => {
  isMaximized.value = true
}

// 监听窗口还原状态变化
const handleWindowUnmaximized = () => {
  isMaximized.value = false
}

onMounted(() => {
  // 添加事件监听器
  window.electron.ipcRenderer.on('window-maximized', handleWindowMaximized)
  window.electron.ipcRenderer.on('window-unmaximized', handleWindowUnmaximized)
})

onUnmounted(() => {
  // 移除事件监听器，防止内存泄漏
  window.electron.ipcRenderer.removeListener('window-maximized', handleWindowMaximized)
  window.electron.ipcRenderer.removeListener('window-unmaximized', handleWindowUnmaximized)
})
</script>

<template>
  <div class="app">
    <div class="title-bar">
      <div class="title-bar-drag-area">
        客户关系后台管理系统
      </div>
      <div class="window-controls">
        <button class="minimize-btn" @click="minimizeWindow">─</button>
        <button class="maximize-btn" @click="toggleMaximizeWindow">{{ isMaximized ? '❐' : '□' }}</button>
        <button class="close-btn" @click="closeWindow">×</button>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  background: #333;
  color: white;
  position: relative;
  z-index: 1000;
}

.title-bar-drag-area {
  flex-grow: 1;
  padding-top: 8px;
  -webkit-app-region: drag;
  height: 100%;
}

.window-controls {
  display: flex;
  height: 100%;
}

.window-controls button {
  background: transparent;
  border: none;
  color: white;
  width: 40px;
  height: 100%;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.window-controls button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.close-btn:hover {
  background: #ff5555 !important;
}

.window-controls button:focus {
  outline: none;
}
</style>
