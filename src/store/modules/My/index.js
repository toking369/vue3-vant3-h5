import { getAddersslist, getAddressedit } from "@/api/My";
import { getRequestUrl, request } from "@/request/request";
const Classify = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getAddersslist(state, params) {
      let url = getRequestUrl({
        url: getAddersslist,
      });

      try {
        const rep = await request(url, params, { method: "GET" });
        return rep;
      } catch (error) {
        return error;
      }
    },
    async getAddressedit(state, params) {
      let url = getRequestUrl({
        url: getAddressedit,
      });

      try {
        const rep = await request(url, params, { method: "POST" });
        return rep;
      } catch (error) {
        return error;
      }
    },
  },
};

export default Classify;
