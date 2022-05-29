import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import 'tw-elements';
import { initializeApp } from "firebase/app";

import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "web-aslab.firebaseapp.com",
  projectId: "web-aslab",
  storageBucket: "web-aslab.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID
};

const app = createApp(App)
const firebaseApp = initializeApp(firebaseConfig);

app.use(createPinia())
app.use(router)

app.mount('#app')
