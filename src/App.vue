<script setup lang="ts">
import { reactive, watch, ref, onMounted } from "vue";
import Navbar from "./components/Navbar.vue";
import { useStore } from "../store/store";
import Sync from "./functions/Sync";

let store = useStore();
let chrome = window.chrome;

const downloadFriends = () => {
  chrome.storage.local.get("friends", function (data) {
    console.log(data);
  });
};

//import IconTrash from "~icons/bx/trash";

Sync();
downloadFriends();
console.log("test");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  console.log(request.type);
  if (request.type === "addTag") {
    store.addTag(request.tag_name, request.color, request.people);
  }
  if (request.type === "saveTags") {
    store.saveTags(request.tags);
  }
  if (request.type === "addFriend") {
    store.addFriend(request.tag_name, request.friend_name);
  }
  if (request.type === "removeFriend") {
    store.removeFriend(request.tag_name, request.friend_name);
  }
  if (request.type === "changeTagName") {
    store.changeTagName(request.tag_name, request.new_tag_name);
  }
});
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
