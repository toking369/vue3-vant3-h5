import { createI18n } from "vue-i18n";

const DEFAULT_LANG = "zh";
const modelMap = process.env.VUE_APP_LOCALMODELJSON
  ? JSON.parse(process.env.VUE_APP_LOCALMODELJSON)
  : {};

const importFn = function (data) {
  let lang = {};
  data.keys().forEach((item) => {
    lang[item.replace(/^\.\/(.*)\.\w+$/, "$1")] = data(item);
  });
  return lang;
};

let locales = importFn(require.context("./zh-us", false, /\.json$/));
const modulesFiles = require.context("./modules", false, /\.json$/);

modulesFiles.keys().forEach((modules) => {
  const moduleName = modules.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modules);
  let moduleKeyMap = {
    zh: [],
    en: [],
  };
  Object.keys(value).forEach((k) => {
    if (["zh"].includes(k)) {
      locales[k][moduleName] = value[k];
      moduleKeyMap[k] = Object.keys(value[k]);

      if (modelMap[moduleName]) {
        locales[k][moduleName] = Object.assign(
          {},
          modelMap[moduleName][k],
          locales[k][moduleName]
        );
      }
    }
    if (["en"].includes(k)) {
      locales[k][moduleName] = value[k];
      moduleKeyMap[k] = Object.keys(value[k]);
      if (modelMap[moduleName]) {
        locales[k][moduleName] = {
          ...modelMap[moduleName][k],
          ...locales[k][moduleName],
        };
      }
    }
  });

  if (modelMap[moduleName]) {
    const zhKey = Object.keys(modelMap[moduleName]["zh"]);
    const enKey = Object.keys(modelMap[moduleName]["en"]);
    zhKey.forEach((item) => {
      if (moduleKeyMap["zh"].includes(item)) {
        console.error(`国际化的模块${moduleName}存在${item}重复`);
      }
    });

    enKey.forEach((item) => {
      if (moduleKeyMap["en"].includes(item)) {
        console.error(`国际化的模块${moduleName}存在${item}重复`);
      }
    });
  }
});

const i18n = createI18n({
  locale: DEFAULT_LANG,
  messages: locales,
});

export default i18n;
