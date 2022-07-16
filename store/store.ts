import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import uniqid from "uniqid";
import { useStorage } from '@vueuse/core'


const pinia = createPinia()
pinia.use(piniaPersist)

const Sync = (th) => {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {
        message: JSON.stringify(th.tags),
      });
    });

}




export type state = () => {
};

export const useStore = defineStore('chatsorted', {
    state: () => {
        return {
          // all these properties will have their type inferred automatically
          friendsData: useStorage('friendsData', [
            {
              name: "Example Example",
              tags: [
                { id: uniqid(), tag_name: "example example" },
                { id: uniqid(), tag_name: "example example2" },
              ],
            },
          ]),
          tags: useStorage('tags', [
            { id: uniqid(), tag_name: "konstruktorzy", color: 'red', folded: true, editing: true, people: [
              {realname: 'Dawid Kudrel'},
              {realname: 'example example'}
            ] },
            { id: uniqid(), tag_name: "example group2", color: 'green', folded: true, editing: false, people: [
              {realname: 'example example2'}
            ] },
            { id: uniqid(), tag_name: "example group3", color: 'blue', folded: true, editing: false, people: [
              {realname: 'example example'}
            ] },
          ]),

          validated: true,
          actualUrl: '',
          focused: null
        }
      },
      actions: {
        //setToken (value: string) {
        //  this.accessToken = value
        //}
        addTag(tag_name: string, color: string, people: Array<any> ) {
          if (!this.tags.some(e => e.tag_name === tag_name)) {
            this.tags.push({
              id: uniqid(), tag_name: tag_name, color: color, folded: false, editing: true, people: people })
          } else {
            console.log('this tag already exists')
          }
          Sync(this)
        },
        saveTags(tags: Object) {
          this.tags = tags
        },
        addFriend(tag_name: string, friend_name: string) {
          let focusingTag = this.tags.find((tag) => tag.tag_name === tag_name)
          if (focusingTag.people.some(e => e.realname === friend_name)) {
            console.log('this tag already has this friend')
          } else {
            focusingTag.people.push({realname: friend_name})
          }
          Sync(this)
        },
        removeFriend(tag_name: string, friend_name: string) {
          let focusingTag = this.tags.find((tag) => tag.tag_name === tag_name)
          focusingTag.people = focusingTag.people.filter(person => person.realname != friend_name)
          Sync(this)
        },
        changeTagName(tag_name: string, new_tag_name: string) {

        },
        deleteTag(card) {
          this.tags = this.tags.filter(tag => {
            return tag.id != card.id;
          });
          Sync(this)
        },
        setFocused(value: Object) {
          this.focused = value
        },
        setActualUrl (value: string) {
          this.actualUrl = value
        }
      },
      persist: {
        enabled: true,
        strategies: [
          { key: 'friendsData', storage: localStorage, paths: ['friendsData'] },
        ], // <- HERE
      }
      
    // other options...
  })

  

export default pinia;

