import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import loader from "vue-ui-preloader";
import moshaToast from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

createApp(App).use(store).use(router).use(loader).use(moshaToast).mount('#app')