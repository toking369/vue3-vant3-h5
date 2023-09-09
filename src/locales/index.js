import { createI18n } from "vue-i18n";

const DEFAULT_LANG = "zh";

const importFn = function (data) {
	let lang = {};
	data.keys().forEach((item) => {
		lang[item.replace(/^\.\/(.*)\.\w+$/, "$1")] = data(item);
	});
	return lang;
};

let locales = {
	en: importFn(require.context("./US-EN", false, /\.json$/)),
	zh: importFn(require.context("./ZH-CN", false, /\.json$/)),
};

const i18n = createI18n({
	locale: DEFAULT_LANG,
	messages: locales,
});

export default i18n;
