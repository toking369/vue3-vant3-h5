import eventBus from "@/common/js/eventBus";
import { isObject } from "@/util/util";
import store from "@/store"; // vuex

// 加载模块路由
const loadRouterModules = function (routes) {
	let routesArr = [...routes];
	const modulesRouter = require.context("./modules", true, /\.js$/);
	modulesRouter.keys().forEach((modules) => {
		const modulesArr = modulesRouter(modules).routes;
		modulesArr.forEach((item) => {
			routesArr.forEach((it) => {
				const { meta: preMeta, name: preName } = it;
				const { meta: nextMeta, name: nextName } = item;
				const preBusName = isObject(preMeta) ? preMeta.subMsgKey : "";
				const nextBusName = isObject(nextMeta) ? nextMeta.subMsgKey : "";
				const isRepeatBus =
					preBusName && nextBusName && preBusName === nextBusName;
				if (preName === nextName || isRepeatBus) {
					const errMsg =
						preName === nextName
							? `有路由名称重复${preName}`
							: `有bus消息名称重复${preName}`;
					console.error(errMsg);
				}
			});
		});
		routesArr = [...routesArr, ...modulesArr];
	}, {});
	return routesArr;
};

// 获取发消息的key
const getBusKey = function (name, path, data) {
	const [res] = data.filter((item) => {
		return name ? [name].includes(item.name) : [path].includes(item.path);
	});
	const { meta = {} } = res || {};
	const {
		isKeepAlive = false,
		isRouterKeepAlive = false,
		subMsgKey = "",
	} = meta;
	const uniId = new Date().getTime();
	const resMsgKey = isRouterKeepAlive ? `${subMsgKey}_${uniId}` : subMsgKey;
	return isKeepAlive ? resMsgKey : "";
};

// 添加扩展方法
const expandRouter = function (router, routes) {
	// 扩展push方法
	const routerPush = router.push;
	router.push = function (location) {
		const { name = "", path = "" } = location;
		const subMsgKey = getBusKey(name, path, routes);
		store.commit("SET_SUB_MSG_KEY", subMsgKey);
		return routerPush.call(this, location).then(() => {
			if (subMsgKey) {
				eventBus.emit(subMsgKey);
			}
		});
	};

	// 扩展replace方法
	const routerReplace = router.replace;
	router.replace = function (location) {
		const { name = "", path = "" } = location;
		const subMsgKey = getBusKey(name, path, routes);
		store.commit("SET_SUB_MSG_KEY", subMsgKey);
		return routerReplace.call(this, location).then(() => {
			if (subMsgKey) {
				eventBus.emit(subMsgKey);
			}
		});
	};
};

export { loadRouterModules, expandRouter };
