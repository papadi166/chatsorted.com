import { createApp } from 'vue'
import pinia from "../store/store";
import { useStore } from "../store/store";
import router from '../router/router'
import App from './App.vue'
import './index.css'

const store = useStore();

const app = createApp(App)



app.use(pinia)
app.use(router)
app.mount('#app')

