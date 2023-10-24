const modulesConstant = import.meta.glob("./modules/**/*.js", {
	import: "default",
	eager: true,
});
console.log(4444, modulesConstant);
const constantArr = [];
const global_constant = {};

for (const [key, value] of Object.entries(modulesConstant)) {
	for (const [childKey, childValue] of Object.entries(value)) {
		if (constantArr.includes(childValue)) {
			console.error(`文件${key}中常量${childValue}存在重复`);
		} else {
			constantArr.push(childValue);
			global_constant[childKey] = childValue;
		}
	}
}

export { global_constant };
