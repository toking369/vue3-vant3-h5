import { createStyleImportPlugin, VantResolve } from "vite-plugin-style-import";

const StyleImportPlugin = (viteEnv = {}) => {
	return createStyleImportPlugin({
		resolves: [VantResolve()],
		libs: [
			{
				libraryName: "vant",
				esModule: true,
				resolveStyle: (name) => {
					return `vant/es/${name}/style/index`;
				},
			},
		],
	});
};

export { StyleImportPlugin };
