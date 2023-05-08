import { createApp } from "vue"; // vue
import App from "./App.vue"; // 入口vue文件
import router from "./router"; // 路由
import store from "./store"; // vuex
import Vant from "vant"; // vant 框架
import "vant/lib/index.css"; // vant样式
import "@/request/http"; // 请求
import global from "@/components/global"; // 加载全局组件
import i18n from "@/locales"; // 国际化
createApp(App)
  .use(store)
  .use(router)
  .use(Vant)
  .use(global)
  .use(i18n)
  .mount("#app");
