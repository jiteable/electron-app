<template>
  <div class="list-container" @mousedown="mousedown" @mouseenter="showControls" @mouseleave="hideControls">
    <div class="list-content">
      <div class="header">
        <span>list</span>
        <div class="controls">
          <el-button :icon="Close" v-show="controlsVisible" class="close-btn" @click="closeWindow" text />
          <el-button v-show="isLocked || controlsVisible" class="lock-btn" @click="toggleLock" text>
            <el-icon :size="14">
              <Lock v-if="!isLocked" />
              <Unlock v-else />
            </el-icon>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Close, Lock, Unlock } from '@element-plus/icons-vue'
import { ElButton, ElIcon } from 'element-plus'

const isKeyDown = ref(false)
const dinatesX = ref(0)
const dinatesY = ref(0)
const isLocked = ref(false)
const controlsVisible = ref(false)

const showControls = () => {
  controlsVisible.value = true
}

const hideControls = () => {
  // 鼠标离开时总是隐藏控件
  controlsVisible.value = false
}

const mousedown = (e) => {
  // 如果窗口被锁定，则不允许拖动
  if (isLocked.value) {
    return
  }

  // 只有在标题栏区域按下鼠标才允许拖动
  if (!e.target.classList.contains('list-container') &&
    !e.target.classList.contains('list-content') &&
    !e.target.classList.contains('header')) {
    return
  }

  e.preventDefault()
  e.stopPropagation()

  isKeyDown.value = true
  dinatesX.value = e.clientX
  dinatesY.value = e.clientY

  const startX = e.screenX
  const startY = e.screenY

  // 获取当前窗口位置
  const initialX = window.screenLeft || window.screenX
  const initialY = window.screenTop || window.screenY

  const mousemoveHandler = (ev) => {
    if (isKeyDown.value) {
      // 计算窗口应该移动到的新位置
      const deltaX = ev.screenX - startX
      const deltaY = ev.screenY - startY

      const newX = initialX + deltaX
      const newY = initialY + deltaY

      let data = {
        appX: newX,
        appY: newY
      }

      window.electron.ipcRenderer.invoke('custom-adsorption', data)
    }
  }

  const mouseupHandler = (ev) => {
    isKeyDown.value = false
    document.removeEventListener('mousemove', mousemoveHandler)
    document.removeEventListener('mouseup', mouseupHandler)
  }

  document.addEventListener('mousemove', mousemoveHandler)
  document.addEventListener('mouseup', mouseupHandler)

  // 防止文本选择
  return false
}

const toggleLock = () => {
  isLocked.value = !isLocked.value
}

const closeWindow = () => {
  window.electron.ipcRenderer.invoke('new-list')
}
</script>

<style scoped>
.list-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: default;
}

.list-container:hover {
  background-color: rgba(0, 0, 0, .5);
}

.list-content {
  padding: 20px;
  cursor: default;
  color: white;
  height: 100%;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.controls {
  display: flex;
  gap: 10px;
}

.lock-btn,
.close-btn {
  color: white;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background-color: transparent;
}

.lock-btn:hover,
.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 覆盖Element Plus按钮的默认悬停样式 */
:deep(.lock-btn:hover),
:deep(.close-btn:hover) {
  color: #409eff;
  /* Element Plus 默认蓝色 */
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-color: transparent !important;
}

:deep(.lock-btn:focus),
:deep(.close-btn:focus) {
  background-color: transparent !important;
  border-color: transparent !important;
}
</style>