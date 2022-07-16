<template lang="pug">
div#tags
    div#header(class="flex row justify-between items-center mt-5 px-3")
        p(class=" text-base font-medium tracking-wide") Your Tags
        button(class=" flex w-7 h-6 bg-fuchsia-900 rounded-md items-center justify-center" @click="add_tags_clicked = true")
            PlusIcon(class="text-white w-4 h-4" @click="addTag('test', 'blue', [{realname: 'example example'},])")


    
    #add-tags(v-if="add_tags_clicked || store.tags[0] " class="flex-column px-2 ")
        #add-tags-options(class="flex justify-around mt-6 h-7")
            div(class="flex flex-row w-5/6 rounded-3xl bg-gray-100 border-opacity-50 border-solid outline outline-gray-400  outline-1 rounded-lg border-2")
                div.placeholder(class="w-1/4 flex justify-center items-center")
                    SearchIcon
                input#search-tags(class="w-3/4 bg-gray-100 focus:outline-0 focus:bg-white indent-1  " v-model="searching_for" placeholder="SearchTags")
            div(class="flex flex-row w-3/6 rounded-3xl ml-3 bg-gray-100 border-opacity-50 border-solid outline outline-gray-400  outline-1 rounded-lg border-2")
                div.placeholder(class="w-1/4 flex justify-center items-center")
                    SelectArrowsIcon
                select#sort-tags(class="w-3/4 bg-gray-100 focus:outline-0  " )
                    <option value="" disabled selected>Sort</option>
                    <option value="ss">ss</option>
        div.tag-cards(class="h-96 mt-5 w-full rounded-2xl"  ) 
            div.tag-card(v-for="card in store.tags" :key="card.id" @click="store.setFocused(card)" class="flex-column  min-h-min mt-3  w-full rounded-2xl" :style="`background-color: ${card.color}`"  )
                div.tag-card-header(class="flex w-full h-12 justify-around px-4 py-2 items-center" )
                    
                    input.tag-card-input(class="w-full h-2/5 focus:outline-0  indent-1 mb-2 text-white" :value="card.tag_name" :style="`background-color: ${card.color}`" v-show="card.editing" @change="updateTag($event, card)")
                    p(class="text-white w-full text-left" v-show="!card.editing")  {{card.tag_name}}
                    button#folder(class="ml-2" @click="card.folded = !card.folded; card.editing = false")
                        ChevronDownIcon(class=" text-white" )

                hr(class="text-black" v-show="!card.folded")
                .tag-card-footer(class="flex h-10 px-2 " v-show="!card.folded")
                    
                    button(@click="deleteTag(card)")
                        TrashIcon(class="text-white w-5 h-5")
                    button(@click="card.editing = !card.editing")
                        EditIcon(class="text-white w-5 h-5")
                    button
                        PaintRollerIcon(class="text-white w-5 h-5")


    img#no-tags-yet(v-else src="../assets/search_tags.png" class="w-full")
</template>

<script setup lang="ts">
import { ref } from "vue";
import PlusIcon from "~icons/fa-solid/plus";
import SelectArrowsIcon from "~icons/entypo/select-arrows";
import ChevronDownIcon from "~icons/akar-icons/chevron-down";
import EditIcon from "~icons/bx/edit";
import TrashIcon from "~icons/bi/trash";
import PaintRollerIcon from "~icons/clarity/paint-roller-solid";
import SearchIcon from "~icons/bi/search";

import { useStore } from "../../store/store";
const store = useStore();

const addTag = (tag_name: string, color: string, people: Array<any>) => {
  store.addTag(tag_name, color, people);
};

const updateTag = (event, tag) => {
  console.log((tag.tag_name = event.target.value));
  //card.tag_name=this.value
};

const deleteTag = (card) => {
  store.deleteTag(card);
  //card.tag_name=this.value
};

let add_tags_clicked = ref(false);
add_tags_clicked.value = false;
let searching_for = "";
</script>

<style lang="sass">
.tag-cards
    display: flex
    flex-direction: column

.tag-card
    #folder
        opacity: 0

.tag-card:hover
    cursor: pointer
    #folder
        opacity: 100
</style>
