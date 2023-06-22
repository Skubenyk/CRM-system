import { createStore } from "vuex";
import auth from "./auth";
import info from "./info";
import category from "./category";

export default createStore({
  state: {
    error: null,
  },
  getters: {
    error: (s) => s.error,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      //! Problem with API key
      // const key = process.env.VUE_APP_OPENEXCANGERATES;
      const res = await fetch(
        `https://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,UAH`
        //! Problem with API key
        // `https://openexchangerates.org/api/latest.json?app_id=${key}&base=EUR&symbols=USD,EUR,UAH`
      );
      return await res.json();
    },
  },
  modules: {
    auth,
    info,
    category,
  },
});
