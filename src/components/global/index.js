const context = import.meta.glob("./components/**/importIndex.js", {
	import: "default",
	eager: true,
});
export default {
	install(app) {
		for (const [key, value] of Object.entries(context)) {
			const { name } = value;
			name && app.component(name, value);
		}
	},
};
