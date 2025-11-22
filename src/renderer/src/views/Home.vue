<template>
  <div class="home-container">
    <!-- <WindowTitleBar /> -->

    <!-- <div class="home-content">
      home首页

      <button @click="newList">歌词</button>
      <button @click="down">下载任务</button>
    </div> -->
    <input v-model="userName" />
    <input v-model="password" />
    <button @click="login">登录</button>

  </div>
</template>

<script setup>
import WindowTitleBar from '@renderer/components/WindowTitleBar.vue'
import { useRouter } from 'vue-router';
import { useStore } from '@store'
import { loginByJson } from '@api/login';

let store = useStore()

const login = async () => {
  const res = await loginByJson({
    "password": "1899ddee9d860a0c452dd91844cb7a1c",//密码（需要使用AES加密）
    "username": "6a89e60b1231d61d4bf89a08e4fc6229",//用户名（需要使用AES加密）
    "key": "",//图形验证码中随机UUID
    "captcha": "2f3j"
  })

  console.log(res)
}

console.log(store.num)

let router = useRouter()

const newList = async () => {
  try {
    const result = await window.electron.ipcRenderer.invoke('new-list')
    console.log('Result:', result)
  } catch (error) {
    console.error('Error creating new list window:', error)
  }
}

const down = () => {
  window.electron.ipcRenderer.invoke('ws', {
    name: 'down'
  })
}
</script>

<style scoped>
.home-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
}

.home-content {
  position: relative;
  z-index: 999;
  background: red;
  -webkit-app-region: no-drag;
  padding: 20px;
}
</style>