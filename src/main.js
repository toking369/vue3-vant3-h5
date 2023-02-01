import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import "vant/lib/index.css";
import "@/request/http";
import global from "@/components/global";
import i18n from "@/locales";
import mitt from "mitt";
const mittBus = new mitt();
const app = createApp(App)
  .use(store)
  .use(router)
  .use(Vant)
  .use(global)
  .use(i18n);

app.config.globalProperties.mittBus = mittBus;
router.beforeEach((to, from, next) => {
  const { meta } = to;
  if (meta) {
    const { subMsgKey } = meta;
    if (subMsgKey) {
      mittBus.emit(subMsgKey);
      next();
    } else {
      next();
    }
  } else {
    next();
  }
});
app.mount("#app");
