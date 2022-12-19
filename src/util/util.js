// 设置购物车数量
const setGoodsNum = function (store, data) {
  store.commit("SET_GOODS_NUM", data);
};
// 判断是否还是一个对象
const isObject = function (obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
};

export {
  setGoodsNum,
  isObject,
};
