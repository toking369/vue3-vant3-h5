import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
    name: "App",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/classify",
    name: "Classify",
    component: () => import("@/views/Classify.vue"),
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("@/views/Shop.vue"),
  },
  {
    path: "/my",
    name: "My",
    component: () => import("@/views/My.vue"),
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import("@/views/common/setting.vue"),
  },
  {
    path: "/addressList",
    name: "AddressList",
    component: () => import("@/views/common/addressList.vue"),
  },
  {
    path: "/addressEdit",
    name: "AddressEdit",
    component: () => import("@/views/common/addressEdit.vue"),
  },
  {
    path: "/goodsDetail",
    name: "goodsDetail",
    component: () => import("@/views/common/goodsDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
