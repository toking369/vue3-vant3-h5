import { getCard, changeGoods, delGoods } from "@/api/ShopCard";
import { getRequestUrl, request } from "@/request/request";
const ShopCard = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getCard(state, params) {
      let url = getRequestUrl({
        url: getCard,
      });

      try {
        const rep = await request(url, params, { method: "GET" });
        return rep;
      } catch (error) {
        return error;
      }
    },

    async delGoods(state, params) {
      let url = getRequestUrl({
        url: delGoods,
      });

      try {
        const rep = await request(url, params, { method: "POST" });
        return rep;
      } catch (error) {
        return error;
      }
    },

    async changeGoods(state, params) {
      let url = getRequestUrl({
        url: changeGoods,
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

export default ShopCard;
