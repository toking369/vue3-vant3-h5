import { isObject } from "@/util/util";

// 加载模块配置的路由缓存配置
const global_routerModules = function () {
	let keepPageName = [];
	let loopKeepPageName = [];
	const modulesRouter = import.meta.glob("./modules/*.js", { eager: true });
	for (const [, item] of Object.entries(modulesRouter)) {
		keepPageName = [...keepPageName, ...item.keepPageName];
		loopKeepPageName = [...loopKeepPageName, ...item.loopKeepPageName];
	}
	return {
		keepPageName: Array.from(new Set(keepPageName)),
		loopKeepPageName: Array.from(new Set(loopKeepPageName)),
	};
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
	const busKey = isKeepAlive ? resMsgKey : "";
	global_store.useCommon.SET_SUB_MSG_KEY(busKey);
	return busKey;
};

// 添加扩展方法
const global_expandRouter = function (router, routes) {
	// 扩展push方法
	const routerPush = router.push;
	router.push = function (location) {
		const { name = "", path = "" } = location;
		const subMsgKey = getBusKey(name, path, routes);
		return routerPush.call(this, location).then(() => {
			subMsgKey && global_eventBus.emit(subMsgKey);
		});
	};

	// 扩展replace方法
	const routerReplace = router.replace;
	router.replace = function (location) {
		const { name = "", path = "" } = location;
		const subMsgKey = getBusKey(name, path, routes);
		return routerReplace.call(this, location).then(() => {
			subMsgKey && global_eventBus.emit(subMsgKey);
		});
	};
};

export { global_routerModules, global_expandRouter };
