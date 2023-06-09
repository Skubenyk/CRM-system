import firebase from "firebase/compat/app";
import "firebase/compat/database";

export default {
  actions: {
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch("getUid");
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories/`)
          .push({ title, limit });
        console.log("createCategory");
        return { title, limit, id: category.key };
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
  },
};
