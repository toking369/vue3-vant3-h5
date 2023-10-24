
import { getCarousel, boutiqueGoods, recommendGoods } from "@/api/Home";

export default defineStore('useHome', {
	state: () => ({}),
	getters: {},
	actions: {
		async getCarousel(params) {
			let url = global_requestUrl({
				url: getCarousel,
			});

			try {
				const rep = await global_request(url, params, { method: "GET" });
				return rep;
			} catch (error) {
				return error;
			}
		},
		async boutiqueGoods(params) {
			let url = global_requestUrl({
				url: boutiqueGoods,
			});

			try {
				const rep = await global_request(url, params, { method: "GET" });
				return rep;
			} catch (error) {
				return error;
			}
		},
		async recommendGoods(params) {
			let url = global_requestUrl({
				url: recommendGoods,
			});

			try {
				const rep = await global_request(url, params, { method: "GET" });
				return rep;
			} catch (error) {
				return error;
			}
		},
	},
});
