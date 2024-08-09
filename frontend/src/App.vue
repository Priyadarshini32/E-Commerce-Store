<template>
  <v-app class="app">
    <NavBar />
    <router-view />
  </v-app>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>

<style scoped>
/* Remove or customize background for v-app */
.v-application {
  background-color: transparent; /* or any color you prefer */
}
</style>