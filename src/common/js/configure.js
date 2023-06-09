import { toRaw } from "vue";
import { useRouter } from "vue-router";
import eventBus from "@/common/js/eventBus";
import store from "@/store"; // vuex
import { cloneDeep } from "lodash";

const configureInit = function (callback, data) {
  const router = useRouter();
  const { meta } = router.currentRoute.value;
  const { subMsgKey = "" } = meta;

  if (subMsgKey) {
    store.commit("SET_ALL_KEEP_PAGE_INIT_DATA", {
      dataKey: subMsgKey,
      initData: cloneDeep(data),
    });

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
