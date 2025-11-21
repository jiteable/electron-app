<template>
  <div class="list-container" @mousedown="mousedown">
    <div class="list-content">
      list
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isKeyDown = ref(false)
const dinatesX = ref(0)
const dinatesY = ref(0)

const mousedown = (e) => {
  // 只有在标题栏区域按下鼠标才允许拖动
  if (!e.target.classList.contains('title-bar') && !e.target.classList.contains('list-container')) {
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
}
</style>