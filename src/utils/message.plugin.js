import M from "materialize-css/dist/js/materialize.min.js";

export default {
  install(app) {
    app.config.globalProperties.$message = function (html) {
      M.toast({ html });
    };
    app.config.globalProperties.$error = function (html) {
      M.toast({ html: `Помилка: ${html}` });
    };
  },
};
