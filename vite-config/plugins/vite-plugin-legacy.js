import legacy from "@vitejs/plugin-legacy"; // 打包显示进度条插件
const legacyPlugin = (viteEnv = {}) => {
	return legacy();
};

export { legacyPlugin };
