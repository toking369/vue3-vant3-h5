
export default {
	base: "/",
	themeConfig: {
        siteTitle: 'vue3-vue3-h5',
		nav: [
            { text: '文档', link: '/guide/', activeMatch: '/guide/' },
            { text: '插件', link: '/plugin/', activeMatch: '/plugin/' }
		],

		sidebar: {
			'/guide/': [
                {
                    text: '演示地址',
                    collapsible: true,
                    collapsed: false,
                    items: []
                },
                {
                    text: '项目环境',
                    collapsible: true,
                    collapsed: false,
                    items: []
                },
                {
                    text: '项目重点',
                    collapsible: true,
                    collapsed: false,
                    items: []
                },
                {
                    text: '项目运行',
                    collapsible: true,
                    collapsed: false,
                    items: []
                },
                {
                    text: '项目结构',
                    collapsible: true,
                    collapsed: false,
                    items: []
                },
                {
                    text: '全局导入',
                    collapsible: true,
                    collapsed: false,
                    items: []
                },
                {
                    text: '项目路由',
                    collapsible: true,
                    collapsed: false,
                    items: []
                },
                {
                    text: '项目国际化',
                    collapsible: true,
                    collapsed: false,
                    items: []
                },
                {
                    text: '状态管理',
                    collapsible: true,
                    collapsed: false,
                    items: []
                }
            ],
			'/plugin/': [
                {
                    text: '插件配置',
                    collapsible: true,
                    collapsed: false,
                    items: []
                },
                {
                    text: 'vite-plugin-legacy',
                    collapsible: true,
                    collapsed: false,
                    items: []
                },
                {
                    text: 'unplugin-auto-import',
                    collapsible: true,
                    collapsed: false,
                    items: []
                },
                {
                    text: 'unplugin-vue-components',
                    collapsible: true,
                    collapsed: false,
                    items: []
                }
            ],
		},

		socialLinks: [
			{ icon: "github", link: "https://gitee.com/674074365/vue3-vant3-h5" },
		],

		footer: {
			message: "Released under the MIT License.",
			copyright: "Copyright © 2023-present lan",
		},
	},
};

