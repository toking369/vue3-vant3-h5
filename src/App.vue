<template>
	<router-view v-slot="{ Component, route }">
		<!-- 路由缓存 -->
		<keep-alive>
			<component
				:is="Component"
				v-if="route?.meta?.isKeepAlive || route?.meta?.isRouterKeepAlive"
				:key="route?.meta?.isRouterKeepAlive ? route?.fullPath : route?.name"
			/>
		</keep-alive>

		<!-- 不缓存 -->
		<component
			:is="Component"
			v-if="(!route?.meta?.isKeepAlive) && (!route?.meta?.isRouterKeepAlive)"
			:key="route.name"
		/>
	</router-view>
</template>

<script setup name="App">

const {
	appContext: {
		config: { globalProperties: proxy },
	},
} = getCurrentInstance();
onMounted(async () => {
	await proxy.getGoodsnum();
	await proxy.getLang();
});
</script>
