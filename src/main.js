// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import vuetify from './vuetify' // import the plugin

createApp(App).use(vuetify).mount('#app')
