const context = require.context("./components", true, /importIndex.js$/);
export default {
  install(app) {
    context.keys().forEach((item) => {
      const component = context(item).default;
      app.component(component.name, component);
    });
  },
};
