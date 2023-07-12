import { computed } from "vue";
import { useStore, mapState, mapGetters, createNamespacedHelpers } from "vuex";

export const userMapper = (middleValue, middleState) => {
	const store = useStore();
	const stateFn = middleState(middleValue);
	const stateMaps = {};
	Object.keys(stateFn).forEach((key) => {
		stateMaps[key] = computed(stateFn[key].bind({ $store: store }));
	});
	return stateMaps;
};

// 使用vuex辅助函数，states处理
export const storeState = (moduleValue, mapValue) => {
	const isModule = typeof moduleValue === "string" && moduleValue.length;
	const middleState = isModule
		? createNamespacedHelpers(moduleValue).mapState
		: mapState;
	const middleValue = isModule ? mapValue : moduleValue;
	return userMapper(middleValue, middleState);
};

// 使用vuex辅助函数，Getter处理
export const storeGetter = (moduleValue, mapValue) => {
	const isModule = typeof moduleValue === "string" && moduleValue.length;
	const middleGetter = isModule
		? createNamespacedHelpers(moduleValue).mapGetters
		: mapGetters;
	const middleValue = isModule ? mapValue : moduleValue;
	return userMapper(middleValue, middleGetter);
};
