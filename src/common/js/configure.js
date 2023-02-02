import { useRouter } from "vue-router";
import eventBus from "@/common/js/eventBus";
const configureInit = function (callback) {
  const router = useRouter();
  const { meta } = router.currentRoute.value;
  const { subMsgKey } = meta;
  if (subMsgKey) {
    eventBus.on(subMsgKey, ($event) => {
      if (
        callback &&
        Object.prototype.toString.call(callback) === "[object Function]"
      ) {
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

export default configureInit;
