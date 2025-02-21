import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import router from './router';

const app = createApp(App);
app.use(router);  // 👈 Use the router
app.mount('#app');
