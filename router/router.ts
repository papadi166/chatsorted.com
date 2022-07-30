
import { createRouter, createWebHashHistory, RouteRecordRaw }from 'vue-router'
import Home from '../views/Home.vue'
import pinia from '../store/store'
import { useStore } from "../store/store";

const store = useStore(pinia);

const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'Home', component: Home,

     beforeEnter: (to, from, next) => {
      let chrome = window.chrome;
      chrome.storage.local.get("actualUrl", function (data: any) {
        store.setActualUrl(data.actualUrl)
        if(store.validated === true && data.actualUrl.startsWith('https://www.messenger.com/')) next()
        else next({name: 'Welcome'})
      });
    } },

    { path: '/Welcome', name: 'Welcome', component: () => import('../views/Welcome.vue'),  },
    { path: '/welcomeback', name: 'WelcomeBack', component: () => import('../views/WelcomeBack.vue'),  }
  ];

  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

export default router
