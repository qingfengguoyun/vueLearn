import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { vue_testgame } from 'vue_testgame'
import MyTest from 'vue-test-publish-btn-1'
import TestPlaneGame from 'vue_testplanegame'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(MyTest)
app.use(TestPlaneGame)
// app.use(PlaneGame)

app.mount('#app')
