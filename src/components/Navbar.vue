<template lang="pug" id="navbar">
    #logo
        .img
    #navigation
        ul
            li#manual-sync //manualSync
                IconSync
            li#targeted-friends +
                UserFriends
            li#friend-request-feature
                icon
            li#reminder
                icon
            li#upgrade
                icon
            li#account
                icon
</template>

<script setup lang="ts">
import { reactive, watch, ref } from "vue";
import uniqid from "uniqid";
import IconSync from "~icons/bx/sync";
import UserFriends from "~icons/fa-solid/user-friends";
import PlusOutlinedIcon from "~icons/ant-design/plus-outlined";
</script>

<style></style>
