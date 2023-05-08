import { classifyGoods, getClassify } from "@/api/Classify";
import { getRequestUrl, request } from "@/request/request";
const Classify = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async classifyGoods(state, params) {
      let url = getRequestUrl({
        url: classifyGoods,
      });

      try {
        const rep = await request(url, params, { method: "POST" });
        return rep;
      } catch (error) {
        return error;
      }
    },
    async getClassify(state, params) {
      let url = getRequestUrl({
        url: getClassify,
      });

      try {
        const rep = await request(url, params, { method: "GET" });
        return rep;
      } catch (error) {
        return error;
      }
    },
  },
};

export default Classify;
