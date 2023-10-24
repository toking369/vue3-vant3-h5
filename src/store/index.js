const global_store = {};
const storeModule = {};
const uniName = [];
const modulesStore = import.meta.glob("./modules/**/*.js", {
	import: "default",
	eager: true,
});

for (const [, value] of Object.entries(modulesStore)) {
	const storeId = value.$id;
	if (storeId) {
		storeModule[storeId] = value;
		uniName.includes(storeId)
			? console.error(`Store的唯一ID${storeId},存在重复`)
			: uniName.push(storeId);
	}
}

const global_registerStore = {
	install() {
		Object.entries(storeModule).forEach((item) => {
			global_store[item[0]] = item[1]();
		});
	},
};

export { 
	global_store,
	global_registerStore
 };
