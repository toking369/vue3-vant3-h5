import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";
import { loadRouterModules, expandRouter } from "@/router/expandRouter";

let routes = [
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
      subMsgKey: "APP_HOME_PAGE",
    },
  },
  {
    path: "/classify",
    name: "Classify",
    component: () => import("@/views/Classify.vue"),
    meta: {
      isKeepAlive: true,
      subMsgKey: "APP_CLASSIFY_PAGE",
    },
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("@/views/Shop.vue"),
    meta: {
      isKeepAlive: true,
      subMsgKey: "APP_SHOP_PAGE",
    },
  },
  {
    path: "/my",
    name: "My",
    component: () => import("@/views/My.vue"),
    meta: {
      isKeepAlive: true,
      subMsgKey: "APP_MY_PAGE",
    },
  },
  {
    path: "/setting",
    name: "setting",
    component: () => import("@/views/common/setting.vue"),
    meta: {},
  },
  {
    path: "/addressList",
    name: "AddressList",
    component: () => import("@/views/common/addressList.vue"),
    meta: {
      isKeepAlive: true,
      subMsgKey: "APP_ADDRESS_LIST_PAGE",
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
      subMsgKey: "APP_GOODS_DETAIL_PAGE",
      isRouterKeepAlive: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
];

routes = loadRouterModules(routes); // 加载模块路由

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

expandRouter(router, routes); // 添加路由扩展

export default router;
