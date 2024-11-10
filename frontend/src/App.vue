<!-- src/App.vue -->
<script setup>
import Home from './components/Home.vue'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- Menampilkan Home ketika aplikasi dibuka -->
  <router-view></router-view>

  <!-- Menampilkan HelloWorld dengan pesan -->
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
