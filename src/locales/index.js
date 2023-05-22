import { createI18n } from "vue-i18n";
const DEFAULT_LANG = "zh";
let locales = {
  zh: {},
  en: {},
};
const modulesFiles = require.context("./modules", false, /\.json$/);

const modelMap = process.env.VUE_APP_LOCALMODELJSON
  ? JSON.parse(process.env.VUE_APP_LOCALMODELJSON)
  : {};
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
  }
}, {});
const i18n = createI18n({
  locale: DEFAULT_LANG,
  messages: locales,
});

export default i18n;
