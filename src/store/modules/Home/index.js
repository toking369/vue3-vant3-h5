import API from "@/api/Home.js";
import REQ from "@/request/request.js";
const Home = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getCarousel(state, params) {
      let url = REQ.getRequestUrl({
        url: API.getCarousel,
      });

      try {
        const rep = await REQ.request(url, params, { method: "GET" });
        return rep;
      } catch (error) {
        return error;
      }
    },
    async boutiqueGoods(state, params) {
      let url = REQ.getRequestUrl({
        url: API.boutiqueGoods,
      });

      try {
        const rep = await REQ.request(url, params, { method: "GET" });
        return rep;
      } catch (error) {
        return error;
      }
    },
    async recommendGoods(state, params) {
      let url = REQ.getRequestUrl({
        url: API.recommendGoods,
      });

      try {
        const rep = await REQ.request(url, params, { method: "GET" });
        return rep;
      } catch (error) {
        return error;
      }
    },
  },
};

export default Home;
