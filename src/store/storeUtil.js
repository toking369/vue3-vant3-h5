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

// 模块处理
export const handleModule = (parmas) => {
	const storeKey = Object.keys(parmas)[0];
	const { moduleValue, mapValue } = parmas;
	const isModule = typeof moduleValue === "string" && moduleValue.length;

	const middleState = isModule
		? createNamespacedHelpers(moduleValue)[storeKey]
		: parmas[storeKey];
	const middleValue = isModule ? mapValue : moduleValue;
	return { middleValue, middleState };
};

// 使用vuex辅助函数，states处理
export const storeState = (moduleValue, mapValue) => {
	const { middleValue, middleState } = handleModule({
		mapState,
		moduleValue,
		mapValue,
	});
	return userMapper(middleValue, middleState);
};

// 使用vuex辅助函数，Getter处理
export const storeGetter = (moduleValue, mapValue) => {
	const { middleValue, middleState } = handleModule({
		mapGetters,
		moduleValue,
		mapValue,
	});
	return userMapper(middleValue, middleState);
};

// 使用vuex辅助函数，Mutations处理
export const storeMutation = (moduleValue, mapValue) => {
	const { middleValue, middleState } = handleModule({
		mapMutations,
		moduleValue,
		mapValue,
	});
	return userMapper(middleValue, middleState, true);
};

// 使用vuex辅助函数，Action处理
export const storeAction = (moduleValue, mapValue) => {
	const { middleValue, middleState } = handleModule({
		mapActions,
		moduleValue,
		mapValue,
	});
	return userMapper(middleValue, middleState, true);
};
