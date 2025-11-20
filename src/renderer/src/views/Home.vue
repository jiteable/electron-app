<template>
  <div>
    home首页

    <button @click="wss">消息提醒</button>
    <button @click="down">下载任务</button>
  </div>
</template>

<script setup>
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

const wss = () => {
  window.electron.ipcRenderer.invoke('ws', {
    name: 'web'
  })
}

const down = () => {
  window.electron.ipcRenderer.invoke('ws', {
    name: 'down'
  })
}
</script>