import { createStore } from "vuex";
import { getLang, getGoodsNum, getGoodsdetal } from "@/api/common";
import { getRequestUrl, request } from "@/request/request";

let storeMap = {};
const modulesStore = import.meta.glob("./modules/**/*.js", {
	import: "default",
	eager: true,
});
for (const [key, value] of Object.entries(modulesStore)) {
	const moduleName = key.replace(/^\.\/(.*)\.\w+$/, "$1");
	const name = moduleName.split("/")[1];
	name && (storeMap[name] = value);
}
export default createStore({
	namespaced: true,
	state: {
		subMsgKey: "", // 定义通知(由于路由不再支持parmas传参丢失)
		projectPageInitData: {}, // 用于存储缓存页面初始化的数据，便于再次进入页面用于初始化
		goods_card_num: 0,
		is_reload_card: false,
	},
	mutations: {
		SET_SUB_MSG_KEY(state, data) {
			state.subMsgKey = data;
		},
		SET_ALL_KEEP_PAGE_INIT_DATA(state, data) {
			const { dataKey, initData } = data;
			state.projectPageInitData[dataKey] = initData;
		},
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
