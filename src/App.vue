<script setup lang="ts">
import { reactive, watch, ref } from "vue";
import Navbar from "./components/Navbar.vue";
import { useStore } from "../store/store";

let store = useStore();

localStorage.setItem("store", store.friendsData[0].name);
//import IconTrash from "~icons/bx/trash";
</script>

<template>
  <Navbar
    v-if="
      store.validated === true &&
      store.actualUrl.startsWith('https://www.messenger.com/')
    "
  />
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}
</style>
