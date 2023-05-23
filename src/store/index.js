import { createStore } from "vuex";
import {getLang, getGoodsNum, getGoodsdetal} from "@/api/common";
import { getRequestUrl, request } from "@/request/request";

let storeMap = {};
const modulesStore = require.context("./modules", true, /\.js$/);
modulesStore.keys().forEach((modules) => {
  const modulesArr = modulesStore(modules);
  const moduleName = modules.replace(/^\.\/(.*)\.\w+$/, "$1");
  const reg = new RegExp(/\//);
  const moduleKey = reg.test(moduleName)
    ? moduleName.substring(0, moduleName.indexOf("/"))
    : moduleName;
  storeMap[moduleKey] = modulesArr["default"];
}, {});
export default createStore({
  namespaced: true,
  state: {
    goods_card_num: 0,
    is_reload_card: false,
  },
  mutations: {
    SET_GOODS_NUM(state, data) {
      state.goods_card_num = data;
    },
    SET_RELAOD_SHOP(state, data) {
      state.is_reload_card = data;
    },
  },
  actions: {
    async getLang(state, params) {
      let url = getRequestUrl({
        url: getLang,
      });

      try {
        const rep = await request(url, params, { method: "GET" });
        return rep;
      } catch (error) {
        return error;
      }
    },
    async getGoodsNum(state, params) {
      let url = getRequestUrl({
        url: getGoodsNum,
      });

      try {
       
        const rep = await request(url, params, { method: "GET" });
        return rep;
      } catch (error) {
        return error;
      }
    },
    async getGoodsdetal(state, params) {
      let url = getRequestUrl({
        url: getGoodsdetal,
      });

      try {
        const rep = await request(url, params, { method: "POST" });
        return rep;
      } catch (error) {
        return error;
      }
    },
  },
  modules: storeMap,
});
