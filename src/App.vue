<script setup lang="ts">
import { reactive, watch, ref, onMounted } from "vue";
import Navbar from "./components/Navbar.vue";
import { useStore } from "../store/store";
import { Sync } from "./functions/Sync";

let store = useStore();
let chrome = window.chrome;

const downloadFriends = () => {
  chrome.storage.local.get("friends", function (data: Object) {
    //may be a list
    console.log(data);
  });
};

//import IconTrash from "~icons/bx/trash";

//Sync();
downloadFriends();
console.log("test");
onMounted(() => {
  console.log("tags: ");
  console.log(JSON.parse(JSON.stringify(store.tags)));

  chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs: any) {
      chrome.tabs.sendMessage(tabs[0].id, { type: "giveMeTags" });
    }
  );

  //console.log(JSON.parse(store.tags));
});

chrome.runtime.onMessage.addListener(function (
  request: any,
  sender: any,
  sendResponse: any
) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  console.log(request.type);
  //if (request.type === "addTag") {
  //  store.addTag(request.tag_name, request.color, request.people);
  //}
  if (request.type === "saveTags") {
    //console.log(typeof JSON.parse(JSON.stringify(request.tags)));
    if (request.tags === null) {
      console.log("app hasn`t lived before so I start fetching data base");
    } else {
      store.saveTags(JSON.parse(request.tags));
      console.log("vue response: ");
      console.log(JSON.parse(request.tags));
      console.log("tags saved as: ");
      console.log(JSON.parse(JSON.stringify(store.tags)));
    }
  }
  //if (request.type === "updateFriend") {
  //  console.log("updating tags");
  //  store.updateFriend(request.friend_name, request.tags);
  //}
  //if (request.type === "addFriend") {
  //  store.addFriend(request.tag_name, request.friend_name);
  //}
  //if (request.type === "removeFriend") {
  //  store.removeFriend(request.tag_name, request.friend_name);
  //}
  //if (request.type === "changeTagName") {
  //  store.changeTagName(request.tag_name, request.new_tag_name);
  //}
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
