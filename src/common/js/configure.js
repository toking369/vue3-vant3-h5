import { toRaw } from "vue";
import eventBus from "@/common/js/eventBus";
import store from "@/store"; // vuex
import { cloneDeep } from "lodash";

const configureInit = function (callback, data) {
  const { subMsgKey = "" } = store.state;
  if (subMsgKey) {
    if (data) {
      store.commit("SET_ALL_KEEP_PAGE_INIT_DATA", {
        dataKey: subMsgKey,
        initData: cloneDeep(data),
      });
    }
    eventBus.on(subMsgKey, ($event) => {
      if (
        callback &&
        Object.prototype.toString.call(callback) === "[object Function]"
      ) {
        const copyData = store.state.projectPageInitData[subMsgKey] || "";
        if (copyData && data) {
          Object.assign(data, toRaw(cloneDeep(copyData)));
        }
        callback({
          subMsgKey,
          event: $event,
        });
      }
    });
  } else {
    if (
      callback &&
      Object.prototype.toString.call(callback) === "[object Function]"
    ) {
      callback({});
    }
  }
};

export { configureInit };
