import pages from "vite-plugin-pages"; // 自动导入页面作为路由配置插件

const Pages = (viteEnv = {}) => {
	return pages({
        // 配置文件路径，默认为 'src/pages'
        pagesDir: "src/views",
        // 需要转换的文件后缀
        extensions: ["vue"],
        // 不需要转换的文件路径
        exclude: [],
        // 配置是否自动导入路由，默认为 true
        importMode: "async",
        extendRoute(route) {
            // 将路径中的 '/' 替换为 '_'
            const strPath = route.path.replace(/\//g, "_");
            route.path = strPath.replace(strPath.charAt(0), "/");
            return route;
        },
    });
};

export { Pages };
