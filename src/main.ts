import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "./style.css";
import VIcon from "@/components/VIcon.vue";
import App from './App.vue'
import router from './router'
import store from "@/stores/store"

const app = createApp(App)
app.use(store); // Utilisez le store Vue

app.use(createPinia())


// ----------- Global Component ------------
app.component("VIcon", VIcon);

app.use(router)

app.mount('#app')
 
 
 