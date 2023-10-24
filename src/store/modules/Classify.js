import { classifyGoods, getClassify } from "@/api/Classify";

export default defineStore("useClassify", {
	state: () => ({}),
	getters: {},
	actions: {
		async classifyGoods(params) {
			let url = global_requestUrl({
				url: classifyGoods,
			});

			try {
				const rep = await global_request(url, params, { method: "POST" });
				return rep;
			} catch (error) {
				return error;
			}
		},
		async getClassify(params) {
			let url = global_requestUrl({
				url: getClassify,
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
