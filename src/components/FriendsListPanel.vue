<template lang="pug">
div#friendsList(v-if="store.focused")
    div#title(class="flex-column mt-3 text-base font-normal tracking-wide font-sans text-left px-2")
        p You have {{store.focused.people.length}} contacts in {{store.focused.tag_name}}
        div#search-people(class="flex flex-row w-full mt-2 h-7 rounded-3xl bg-gray-100 border-opacity-50 border-solid outline outline-gray-400  outline-1 rounded-lg border-2")
            div.placeholder(class="w-1/5 flex justify-center items-center")
                SearchIcon(class="w-4 h-4")
            input#search-people-input(class="w-full bg-gray-100 focus:outline-0 focus:bg-white  " placeholder="Search Contacts")
        button#export-contacts(class="bg-fuchsia-900 w-full h-8 text-center  mt-4 text-white text-base")
            p Export contacts
        button#send-message(class="bg-fuchsia-900 w-full h-8 text-center  mt-2 text-white text-base mb-2")
            p Send Message
        div.contact(v-for="contact in store.focused.people" :key="contact.id" class="flex-column h-12  w-full")
            div.info( class="flex justify-between items-center h-full")
                input(type="checkbox" class="1/6")
                div(class="border-1 border-fuchsia-900 rounded-2xl h-7 w-1/6 2-4")
                    UserAvatarSolidIcon(class="w-8 h-8")
                p.contact-name(class="w-2/6 text-sm basis-2/4") {{contact.realname}}
                button
                    MarkIcon(class="h-4 w-4 ")
                button
                    MooreIcon(class="h-4 w-4 ")
            hr(class="self-end")
div#title-none-focused(v-else class="font-normal text-base font-sans text-left px-2") 
    p(class="mt-4") Click on any tag to see details
</template>

<script setup lang="ts">
import SearchIcon from "~icons/bi/search";
import UserAvatarSolidIcon from "~icons/carbon/user-avatar-filled-alt";
import MarkIcon from "~icons/subway/mark";
import MooreIcon from "~icons/akar-icons/more-vertical-fill";
import { useStore } from "../../store/store";
const store = useStore();
</script>

<style lang="sass"></style>
