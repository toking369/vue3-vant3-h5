import { computed } from "vue";
import {
	useStore,
	mapState,
	mapGetters,
	mapMutations,
	mapActions,
	createNamespacedHelpers,
} from "vuex";

export const userMapper = (middleValue, middleState, isComputed = false) => {
	const store = useStore();
	const stateFn = middleState(middleValue);
	const stateMaps = {};
	Object.keys(stateFn).forEach((key) => {
		stateMaps[key] = isComputed
			? stateFn[key].bind({ $store: store })
			: computed(stateFn[key].bind({ $store: store }));
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

// 使用vuex辅助函数，Mutations处理
export const storeMutation = (moduleValue, mapValue) => {
	const isModule = typeof moduleValue === "string" && moduleValue.length;
	const middleMutation = isModule
		? createNamespacedHelpers(moduleValue).mapMutations
		: mapMutations;
	const middleValue = isModule ? mapValue : moduleValue;
	return userMapper(middleValue, middleMutation, true);
};

// 使用vuex辅助函数，Action处理
export const storeAction = (moduleValue, mapValue) => {
	const isModule = typeof moduleValue === "string" && moduleValue.length;
	const middleAction = isModule
		? createNamespacedHelpers(moduleValue).mapActions
		: mapActions;
	const middleValue = isModule ? mapValue : moduleValue;
	return userMapper(middleValue, middleAction, true);
};
