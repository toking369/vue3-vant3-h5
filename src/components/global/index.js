
const context = require.context('./components', true, /\.vue$/);
const global = (Vue) => {
  context.keys().forEach((key) => {
    const component = context(key).default;
    Vue.component(component.name, component);
  });
};

export default global
