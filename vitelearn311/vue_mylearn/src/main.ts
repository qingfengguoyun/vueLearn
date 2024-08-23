import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
// import MyVueGame from 'vue_testgame'

let app=createApp(App)
app.use(router)
// app.use(MyVueGame)
app.mount('#app')


