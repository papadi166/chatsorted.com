<script setup lang="ts">
import { useStore } from "../store/store";

import TagPanel from "../src/components/TagPanel.vue";
import FriendsListPanel from "../src/components/FriendsListPanel.vue";
import TemplatesPanel from "../src/components/TemplatesPanel/TemplatesPanel.vue";
let store = useStore();
</script>

<template lang="pug">
div#home(class="flex")
    <TagPanel class="w-3/5 bg-white h-full"/>
    <FriendsListPanel class="w-4/6 bg-gray-50 h-full "/>
    <TemplatesPanel class="w-full bg-white h-full"/>
    
</template>

<style lang="sass">
#home
    height: 88vh
</style>
