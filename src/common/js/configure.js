import { cloneDeep } from "lodash";

const $globalConfigure = function (callback, data) {
	const { subMsgKey = "" } = $globalStore.useCommon;
	if (subMsgKey) {
		if (data) {
			$globalStore.useCommon.SET_ALL_KEEP_PAGE_INIT_DATA({
				dataKey: subMsgKey,
				initData: cloneDeep(data),
			});
		}
		$globalEventBus.on(subMsgKey, ($event) => {
			if (
				callback &&
				Object.prototype.toString.call(callback) === "[object Function]"
			) {
				const copyData =
					$globalStore.useCommon.projectPageInitData[subMsgKey] || "";
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

export { $globalConfigure };
