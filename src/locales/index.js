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
	en: importFn(
		import.meta.glob("./US-EN/*.json", { import: "default", eager: true })
	),
	zh: importFn(
		import.meta.glob("./ZH-CN/*.json", { import: "default", eager: true })
	),
};

const global_i18n = createI18n({
	locale: DEFAULT_LANG,
	messages: locales,
});

export {
	global_i18n
};
