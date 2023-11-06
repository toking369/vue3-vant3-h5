import Home from "@/views/Home.vue";
const routes = [
	{
		path: "/home",
		name: "Home",
		component: Home,
		meta: {
			isKeepAlive: true,
		},
	},
	{
		path: "/goodsDetail",
		name: "goodsDetail",
		component: () => import("@/views/common/goodsDetail.vue"),
		meta: {
			isRouterKeepAlive: true,
		},
	},
];

export { routes };
