// import firebase from "firebase/compat/app";
// import "firebase/compat/database";
// import "firebase/compat/auth";

// export default {
//   actions: {
//     async login({ commit }, { email, password }) {
//       try {
//         await firebase.auth().signInWithEmailAndPassword(email, password);
//       } catch (error) {
//         commit("setError", error);
//         throw error;
//       }
//     },
//     async register({ dispatch, commit }, { email, password, name }) {
//       try {
//         await firebase.auth().createUserWithEmailAndPassword(email, password);
//         const uid = await dispatch("getUid");
//         console.log("1");
//         await firebase.database().ref(`/users/${uid}/info`).set({
//           bill: 10000,
//           name: name,
//         });
//         console.log("2");
//       } catch (error) {
//         commit("setError", error);
//         throw error;
//       }
//     },
//     getUid() {
//       const user = firebase.auth().currentUser;
//       return user ? user.uid : null;
//     },
//     async logout() {
//       await firebase.auth().signOut();
//     },
//   },
// };
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!Old version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
