import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import "vant/lib/index.css";
import "@/request/http";
import global from "@/components/global";
import i18n from "@/locales";
createApp(App)
  .use(store)
  .use(router)
  .use(Vant)
  .use(global)
  .use(i18n)
  .mount("#app");
