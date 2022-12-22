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
    meta: {
      isKeepAlive: true,
    },
  },
  {
    path: "/classify",
    name: "Classify",
    component: () => import("@/views/Classify.vue"),
    meta: {
      isKeepAlive: true,
    },
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("@/views/Shop.vue"),
    meta: {
      isKeepAlive: true,
    },
  },
  {
    path: "/my",
    name: "My",
    component: () => import("@/views/My.vue"),
    meta: {
      isKeepAlive: true,
    },
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import("@/views/common/setting.vue"),
    meta: {
      isKeepAlive: true,
    },
  },
  {
    path: "/addressList",
    name: "AddressList",
    component: () => import("@/views/common/addressList.vue"),
    meta: {
      isKeepAlive: true,
    },
  },
  {
    path: "/addressEdit",
    name: "AddressEdit",
    component: () => import("@/views/common/addressEdit.vue"),
    meta: {
      isKeepAlive: false,
    },
  },
  {
    path: "/goodsDetail",
    name: "goodsDetail",
    component: () => import("@/views/common/goodsDetail.vue"),
    meta: {
      isKeepAlive: true,
      isRouterKeepAlive: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
