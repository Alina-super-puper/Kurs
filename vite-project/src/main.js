import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // подключаем роутер


const app = createApp(App)

app.use(router) // используем роутер
app.mount('#app')