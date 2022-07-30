import { createApp } from 'vue'
import App from './App.vue'
import components from '@/Components/UI'
import "bootstrap/dist/css/bootstrap.min.css"
import router from './Router/router'

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app
    .use(router)
    .mount('#app')
