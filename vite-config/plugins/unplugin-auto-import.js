import autoImport from "unplugin-auto-import/vite"; // 全局自动导入插件
const AutoImport = (viteEnv = {}) => {
	return autoImport({
		imports: [
			"vue", // 全局自动导入vue
			"vue-router", // 全局自动导入路由插件
			"vue-i18n", // 全局自动导入国际化插件
			"pinia", // 全局自动导入pinia
			{
				"@/store/index": ["$globalStore", "$globalRegisterStore"], // 全局自动导入pinia处理函数
				"@/initialize": ["$globalReady"], // 全局自动导入初始化方法
				"@/common/js/eventBus": ["$globalEventBus"], // 全局自动导入中央事件总线
				"@/locales/index": ["$globalLang"], // 全局自动导入国际化方法
				"@/common/js/configure": ["$globalConfigure"], // 全局自动导入页面缓存初始化函数
				"@/request/http": ["$globalHttp"], // 全局自动导入请求拦截方法
				"@/request/request": ["$globalRequestUrl", "$globalRequest"], // 全局自动导入请求处理函数
				"@/constant/index": ["$globalConstant"], // 全局自动导入常量
				"@/router/index": ["$globalRouter"], // 全局自动导入路由配置
				"@/common/js/expandRouter": [
					"$globalRouterModules",
					"$globalExpandRouter",
				], // 全局自动导入路由处理方法
			},
		],
	});
};

export { AutoImport };
