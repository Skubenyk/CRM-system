// user.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async register({ commit }, { email, password, name }) {
      try {
        const { user } = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        const uid = user.uid;
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name: name,
        });
        commit("setUser", user);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async login({ commit }, { email, password }) {
      try {
        const { user } = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        commit("setUser", user);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    autoLogin({ commit }, payload) {
      commit("setUser", payload);
    },
    async logout({ commit }) {
      await firebase.auth().signOut();
      commit("setUser", null);
      commit("clearInfo");
    },
    getUid({ state }) {
      return state.user ? state.user.uid : null;
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    isUserLoggedIn(state) {
      return !!state.user;
    },
  },
};
