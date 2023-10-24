
import { getAddersslist, getAddressedit } from "@/api/My";

export default defineStore('useMy', {
	state: () => ({}),
	getters: {},
	actions: {
		async getAddersslist(params) {
			let url = global_requestUrl({
				url: getAddersslist,
			});

			try {
				const rep = await global_request(url, params, { method: "GET" });
				return rep;
			} catch (error) {
				return error;
			}
		},
		async getAddressedit(params) {
			let url = global_requestUrl({
				url: getAddressedit,
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
