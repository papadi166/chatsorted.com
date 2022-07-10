<template lang="pug">
div.welcome(class="bg-green h-screen ")
    div#header(class="h-1/5 flex justify-center text-white" style="background-image: url(https://png.pngtree.com/thumb_back/fh260/background/20210204/pngtree-abstract-background-technology-of-data-applications-image_555017.jpg)")
        p(class="my-auto text-5xl font-medium ") Welcome
         p(class="my-auto text-5xl font-medium ") Back
    div#body(class="h-4/5 flex flex-col items-center")
        button.sign-out(class="w-1/5 h-7 absolute right-0 bg-fuchsia-900 text-white text-base font-medium tracking-tight") Sign Out
        img.logo(class="mt-10 w-16" src="https://cdn2.downdetector.com/static/uploads/logo/fb-messenger.png")

        button(@click="Open() " class="rounded-full bg-fuchsia-900 w-2/5 h-14 mt-12 text-white text-base font-medium tracking-tight") Open Facebook Messenger

</template>

<script setup lang="ts">
function Open() {
  window.open("https://www.messenger.com/", "_blank");
}
</script>

<style lang="sass"></style>
