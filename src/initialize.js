import i18n from "@/locales"; // 导出国际化
import { setGoodsNum, isObject } from "@/util/util"; // 导出工具类
import store from "@/store";

// 进入应用查询购物车数量
const getGoodsnum = () => {
  store
    .dispatch("getGoodsNum")
    .then((res) => {
      if (res?.code === 20000) {
        setGoodsNum(store, res?.data || 0);
      }
    })
    .catch(() => {});
};

// 远程国际化-会和本地国际化合并
const getLang = () => {
  store
    .dispatch("getLang")
    .then((res) => {
      if (res?.code === 20000) {
        if (isObject(res) && isObject(res?.data)) {
          Object.keys(res?.data).forEach((key) => {
            i18n.global.mergeLocaleMessage(key, res?.data[key]);
          });
        }
      }
    })
    .catch(() => {});
};
export { getGoodsnum, getLang };
