import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/styles/main.scss'
import { Quasar, Notify } from 'quasar'

const app = createApp(App).use(Quasar, {
  plugins: {
    Notify
  }
})

app.use(createPinia())
app.use(router)

app.mount('#app')
