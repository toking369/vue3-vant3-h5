import { createRouter, createWebHashHistory } from "vue-router";
import generatedRoutes from "virtual:generated-pages"; // 通过插件获取目录下文件生成路由

const { keepPageName = [], loopKeepPageName = [] } = global_routerModules(); // 获取配置缓存页面路由名称

const viewsRoutes = generatedRoutes.map((item) => {
	return {
		...item,
		meta: {
			isKeepAlive:
				keepPageName.includes(item.name) ||
				loopKeepPageName.includes(item.name),
			isRouterKeepAlive: loopKeepPageName.includes(item.name),
			subMsgKey: `app_keep_alive_bus_${item.name}`,
		},
	};
});

let routes = [
	{
		path: "/",
		redirect: "/home",
		name: "App",
	},

	...viewsRoutes,

	{
		path: "/:pathMatch(.*)*",
		name: "404",
		component: () => import("@/views/404"),
	},
];

//routes = global_routerModules(routes); // 加载模块路由

const global_router = createRouter({
	history: createWebHashHistory(),
	routes,
});
global_expandRouter(global_router, routes); // 添加路由扩展

export { global_router };
