import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import router from './router';

const app = createApp(App);
app.use(router);  // 👈 Use the router
app.mount('#app');

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/registerSW.js').then(registration => {
//             console.log("Service Worker registered: ", registration);
//         }).catch(error => {
//             console.log("Service Worker registration failed: ", error);
//         });
//     });
// }
