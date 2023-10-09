import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus'
import { resolve } from "path";

export default ({ mode }) => {
	const { VITE_BASE_URL } = loadEnv(mode, process.cwd());
	return defineConfig({
		// base: "/",
		resolve: {
			alias: {
				"@": resolve("./src")
			},
			extensions: [".js", ".vue", ".json", ".less", ".css"],
		},
		// server config
		server: {
			host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
			port: 3301,
			open: false,
			cors: true,
			// https: false,
			// 代理跨域
			proxy: {
				"/app": {
					target: VITE_BASE_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/app/, ""),
				},
			},
		},
		// plugins
		plugins: [vue(), vueSetupExtend()],
		// build configure
		build: {
			outDir: "dist",
			// esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
			minify: "terser",
		},
	});
};
