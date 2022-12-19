import { createI18n } from "vue-i18n";
const DEFAULT_LANG = "zh";
let locales = {
  zh: {},
  en: {},
};
const modulesFiles = require.context("./modules", true, /\.json$/);
modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);

  if (["zh"].includes(moduleName)) {
    locales["zh"] = {
      ...locales["zh"],
      ...value,
    };
  } else if (["en"].includes(moduleName)) {
    locales["en"] = {
      ...locales["en"],
      ...value,
    };
  } else {
    Object.keys(value).forEach((k) => {
      if (["zh"].includes(k)) {
        locales[k][moduleName] = value[k];
      }
      if (["en"].includes(k)) {
        locales[k][moduleName] = value[k];
      }
    });
  }
}, {});
const i18n = createI18n({
  locale: DEFAULT_LANG,
  messages: locales,
});

export default i18n;
