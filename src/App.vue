<script setup lang="ts">
import { reactive, watch, ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import uniqid from "uniqid";
import { h } from "vue";
//import IconTrash from "~icons/bx/trash";

let tags = [
  { id: uniqid(), tag_name: "example group" },
  { id: uniqid(), tag_name: "example group2" },
];

let friendsData = [
  {
    name: "Example Example",
    tags: [
      { id: uniqid(), tag_name: "example example" },
      { id: uniqid(), tag_name: "example example2" },
    ],
  },
];

h("div", { class: "bar", innerHTML: "hello" });
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
