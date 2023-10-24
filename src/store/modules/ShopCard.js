import { getCard, changeGoods, delGoods } from "@/api/ShopCard";

export default defineStore("useShopCard", {
	state: () => ({}),
	getters: {},
	actions: {
		async getCard(params) {
			let url = global_requestUrl({
				url: getCard,
			});

			try {
				const rep = await global_request(url, params, { method: "GET" });
				return rep;
			} catch (error) {
				return error;
			}
		},

		async delGoods(params) {
			let url = global_requestUrl({
				url: delGoods,
			});

			try {
				const rep = await global_request(url, params, { method: "POST" });
				return rep;
			} catch (error) {
				return error;
			}
		},

		async changeGoods(params) {
			let url = global_requestUrl({
				url: changeGoods,
			});

			try {
				const rep = await global_request(url, params, { method: "POST" });
				return rep;
			} catch (error) {
				return error;
			}
		},
	},
});
