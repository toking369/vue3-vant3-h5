import App from "@/App"; // 挂载文件

createApp(App)
	.use($globalHttp())
	.use(createPinia())
	.use($globalRegisterStore)
	.use($globalRouter)
	.use($globalLang)
	.use($globalReady)
	.mount("#app");
