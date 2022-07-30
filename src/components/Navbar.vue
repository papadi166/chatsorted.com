<template lang="pug">
#navbar(class="flex relative bg-white shadow-lg px-2 sm:px-4 py-2.5 dark:bg-gray-800 justify-around")
    #logo(class="flex w-2/6 items-center")
        img.logo(class="w-1/5 h-full" src="https://cdn2.downdetector.com/static/uploads/logo/fb-messenger.png")
        p(class="ml-2 text-cyan-500 font-bold text-base") Chat
        p(class=" text-green-500 font-bold text-base") Sorted
    ul#navigation(class="flex justify-around w-3/6 items-center  ")
        li#manual-sync(@click="SyncApi()")
            IconSync(class="w-6 h-6"  alt="sync with content scripts")
        li#targeted-friends(@click="Sync()")
            PlusIcon(class="w-5 h-5" alt="sync with content scripts")  
        li#friend-request-feature
            UserPlus(class="w-7 h-7")
        li#reminder
            NotificationSolidIcon(class="w-5 h-5")
        li#upgrade(class="rounded-xl content-center")
            button#upgrade_button(class="rounded-xl bg-gradient-to-r from-lime-500 to-lime-700 w-28 h-8 text-white font-medium shadow-lg  tracking-wide text-base") Upgrade
        li#account
            UserAvatarSolidIcon(class="w-7 h-7")
</template>

<script setup lang="ts">
import { reactive, watch, ref } from "vue";
import uniqid from "uniqid";
import IconSync from "~icons/bx/sync";
import UserPlus from "~icons/bxs/user-plus";
import PlusIcon from "~icons/fa-solid/plus";
import NotificationSolidIcon from "~icons/clarity/notification-solid";
import UserAvatarSolidIcon from "~icons/carbon/user-avatar-filled-alt";
import { Sync, SyncApi } from "../functions/Sync";

import { useStore } from "../../store/store";

let store = useStore();
let chrome = window.chrome;
</script>

<style lang="sass">

#navbar
    width: 100%
    height: 4.5rem
</style>
