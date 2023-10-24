import { createStyleImportPlugin, VantResolve } from "vite-plugin-style-import";

const StyleImportPlugin = (viteEnv = {}) => {
	return createStyleImportPlugin({
		resolves: [VantResolve()],
	});
};

export { StyleImportPlugin };
