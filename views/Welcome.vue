<template lang="pug">
div.welcome(class="bg-green h-screen ")
    div#header(class="h-1/5 flex justify-center text-white" style="background-image: url(https://png.pngtree.com/thumb_back/fh260/background/20210204/pngtree-abstract-background-technology-of-data-applications-image_555017.jpg)")
        p(class="my-auto text-5xl font-medium ") Welcome
    div#body(class="h-4/5 flex flex-col items-center")
        img.logo(class="mt-10 w-16" src="https://cdn2.downdetector.com/static/uploads/logo/fb-messenger.png")
        p.login(class="text-base mt-2") Log in to chatsorted

        div.login(class="my-7 flex flex-col items-center w-full")
            p(class="text-base") Enter License Key to Start.
            input#license-key(type="text" v-model="licenseKey" placeholder="Enter License Key" class=" mt-1 border-solid outline outline-gray-400  outline-1 rounded-lg border-2 h-10 w-2/5 px-2 text-base bg-zinc-100  focus:border-opacity-50 focus:outline-gray-400 " autocomplete="off")
            p(class="text-base text-red-600" v-show="!licenseKey && userClickedButton") License Key cannot be empty.
            button(@click="validateKey" class="rounded-2xl bg-fuchsia-900 w-1/5 h-8 mt-5 text-white text-base font-medium tracking-tight") Login
            .options(class="flex flex-row space-x-1 mt-7 text-base")
                p Forgot your License key ? | 
                p Get License Key |
                p Support
</template>

<script setup lang="ts">
import { reactive, watch, ref } from "vue";
import router from "../router/router";

let licenseKey = ref();
let userClickedButton = ref(false);

function validateKey() {
  if (!licenseKey.value) {
    console.log("License Key cannot be empty."),
      console.log(localStorage.getItem("friendsData")),
      (userClickedButton.value = true);
    let actualUrl = localStorage.getItem("actualUrl");
    console.log(actualUrl);
  } else {
    router.push({ name: "WelcomeBack" });
  }
}
</script>

<style lang="sass"></style>
