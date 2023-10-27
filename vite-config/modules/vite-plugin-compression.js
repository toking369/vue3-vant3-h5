import compression from "vite-plugin-compression";
const viteCompression = (viteEnv = {}) => {
	return compression({
		threshold: 10240,
		deleteOriginFile: true,
	});
};

export { viteCompression };
