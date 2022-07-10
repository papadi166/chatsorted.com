import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import uniqid from "uniqid";

const pinia = createPinia()
pinia.use(piniaPersist)



export type state = () => {
};

export const useStore = defineStore('chatsorted', {
    state: () => {
        return {
          // all these properties will have their type inferred automatically
          friendsData: [
            {
              name: "Example Example",
              tags: [
                { id: uniqid(), tag_name: "example example" },
                { id: uniqid(), tag_name: "example example2" },
              ],
            },
          ],
          tags: [
            { id: uniqid(), tag_name: "example group", color: 'red', folded: true, editing: true },
            { id: uniqid(), tag_name: "example group2", color: 'green', folded: true, editing: false },
            { id: uniqid(), tag_name: "example group3", color: 'blue', folded: true, editing: false },
          ],

          validated: true,
          actualUrl: ''
        }
      },
      actions: {
        //setToken (value: string) {
        //  this.accessToken = value
        //}
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