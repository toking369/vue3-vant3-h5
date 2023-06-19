import { toRaw } from "vue";
import { useRouter } from "vue-router";
import eventBus from "@/common/js/eventBus";
import store from "@/store"; // vuex
import { cloneDeep } from "lodash";

const configureInit = function (callback, data) {
  const router = useRouter();
  const { subMsgKey = "" } = store.state;
  if (subMsgKey) {
    if (data) {
      store.commit("SET_ALL_KEEP_PAGE_INIT_DATA", {
        dataKey: subMsgKey,
        initData: cloneDeep(data),
      });
    }
    console.log(`output->43333333333`,subMsgKey)
    eventBus.on(subMsgKey, ($event) => {
      console.log(`output->444444444`,444444444)
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
