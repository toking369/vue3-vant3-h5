import App from "@/App"; // 挂载文件

createApp(App)
	.use(global_http())
	.use(createPinia())
	.use(global_registerStore)
	.use(global_router)
	.use(global_i18n)
	.use(global_initialize)
	.mount("#app");
