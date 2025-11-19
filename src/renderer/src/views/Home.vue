<template>
  <div>
    home首页

    <button @click="btn">按钮</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from '@store'

let store = useStore()

console.log(store.num)

let router = useRouter()
const btn = () => {
  router.push('/list')
}

</script>