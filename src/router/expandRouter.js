import eventBus from "@/common/js/eventBus";
import { isObject } from "@/util/util";

// 加载模块路由
const loadRouterModules = function (routes) {
  let routesArr = [...routes];
  const modulesRouter = require.context("./modules", true, /\.js$/);
  modulesRouter.keys().forEach((modules) => {
    const modulesArr = modulesRouter(modules).routes;
    modulesArr.forEach((item) => {
      routesArr.forEach((it) => {
        const { meta: preMeta, name: preName } = it;
        const { meta: nextMeta, name: nextName } = item;
        const preBusName = isObject(preMeta) ? preMeta.subMsgKey : "";
        const nextBusName = isObject(nextMeta) ? nextMeta.subMsgKey : "";
        const isRepeatBus =
          preBusName && nextBusName && preBusName === nextBusName;
        if (preName === nextName || isRepeatBus) {
          const errMsg =
            preName === nextName
              ? `有路由名称重复${preName}`
              : `有bus消息名称重复${preName}`;
          console.error(errMsg);
        }
      });
    });
    routesArr = [...routesArr, ...modulesArr];
  }, {});
  return routesArr;
};

// 添加通知事件
const expandFn = function (location, routes) {
  let busName = "";
  const { isSendBusMsg } = location;
  if (isSendBusMsg) {
    routes.forEach((e) => {
      const { meta } = e;
      if (e.name === location.name && isObject(meta)) {
        const { subMsgKey } = meta;
        busName = subMsgKey;
      }
    });
  }
  return busName;
};

// 添加扩展方法
const expandRouter = function (router, routes) {
  // 扩展push方法
  const routerPush = router.push;
  router.push = function (location) {
    let busName = expandFn(location, routes);
    return routerPush.call(this, location).then(() => {
      const { isSendBusMsg } = location;
      if (busName && isSendBusMsg) {
        eventBus.emit(busName);
      }
    });
  };

  // 扩展replace方法
  const routerReplace = router.replace;
  router.replace = function (location) {
    let busName = expandFn(location, routes);
    return routerReplace.call(this, location).then(() => {
      const { isSendBusMsg } = location;
      if (busName && isSendBusMsg) {
        eventBus.emit(busName);
      }
    });
  };
};

export { loadRouterModules, expandRouter };
