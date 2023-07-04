import { createI18n } from "vue-i18n";
const DEFAULT_LANG = "zh";

const importFn = function (data) {
	let lang = {};
	for (const [key, value] of Object.entries(data)) {
		const moduleName = key.replace(/^\.\/(.*)\.\w+$/, "$1");
		const name = moduleName.split("/")[1];
		name && (lang[name] = value);
	}
	return lang;
};

let locales = {
	...importFn(
		import.meta.glob("./US-EN/*.json", { import: "default", eager: true })
	),
	...importFn(
		import.meta.glob("./ZH-CN/*.json", { import: "default", eager: true })
	),
};

const modulesFiles = import.meta.glob("./modules/*.json", {
	import: "default",
	eager: true,
});
for (const [key, value] of Object.entries(modulesFiles)) {
	const replaceName = key.replace(/^\.\/(.*)\.\w+$/, "$1");
	const moduleName = replaceName.split("/")[1];
	if (moduleName) {
		Object.keys(value).forEach((k) => {
			if (["zh"].includes(k)) {
				locales[k][moduleName] = value[k];
			}
			if (["en"].includes(k)) {
				locales[k][moduleName] = value[k];
			}
		});
	}
}
const i18n = createI18n({
	locale: DEFAULT_LANG,
	messages: locales,
});

export default i18n;
