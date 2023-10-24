import { cloneDeep } from "lodash";

const global_configure = function (callback, data) {
	const { subMsgKey = "" } = global_store.useCommon;
	if (subMsgKey) {
		if (data) {
			global_store.useCommon.SET_ALL_KEEP_PAGE_INIT_DATA({
				dataKey: subMsgKey,
				initData: cloneDeep(data),
			});
		}
		global_eventBus.on(subMsgKey, ($event) => {
			if (
				callback &&
				Object.prototype.toString.call(callback) === "[object Function]"
			) {
				const copyData =
					global_store.useCommon.projectPageInitData[subMsgKey] || "";
				copyData && data && Object.assign(data, toRaw(cloneDeep(copyData)));
				callback({
					subMsgKey,
					event: $event,
				});
			}
		});
	} else {
		callback &&
			Object.prototype.toString.call(callback) === "[object Function]" &&
			callback({});
	}
};

export { global_configure };
