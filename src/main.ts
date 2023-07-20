import { createApp } from "vue";
import "@/styles/index.css";
import App from "./App.vue";
import router from "./router/router";
import { createPinia } from "pinia";
import { useRegisterSW } from "virtual:pwa-register/vue";

useRegisterSW();

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.mount("#app");
