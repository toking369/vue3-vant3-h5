import { getCarousel, boutiqueGoods, recommendGoods } from "@/api/Home";
import { getRequestUrl, request } from "@/request/request";
const Home = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getCarousel(state, params) {
      let url = getRequestUrl({
        url: getCarousel,
      });

      try {
        const rep = await request(url, params, { method: "GET" });
        return rep;
      } catch (error) {
        return error;
      }
    },
    async boutiqueGoods(state, params) {
      let url = getRequestUrl({
        url: boutiqueGoods,
      });

      try {
        const rep = await request(url, params, { method: "GET" });
        return rep;
      } catch (error) {
        return error;
      }
    },
    async recommendGoods(state, params) {
      let url = getRequestUrl({
        url: recommendGoods,
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

export default Home;
