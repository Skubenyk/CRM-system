import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import messagePlugin from "@/utils/message.plugin";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

//*Import Firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyC8bZICZSjB3uVqmwQA6_tWt7Zcg6WGoXI",
  authDomain: "crm-system-vue3-88765.firebaseapp.com",
  projectId: "crm-system-vue3-88765",
  storageBucket: "crm-system-vue3-88765.appspot.com",
  messagingSenderId: "75937146795",
  appId: "1:75937146795:web:9b1afdd692ab29f1cc54ee",
  measurementId: "G-5D3BTH9WFM",
};

firebase.initializeApp(firebaseConfig);

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(store).use(router).use(messagePlugin);
    app.config.globalProperties.$filters = {
      date: dateFilter,
    };
    app.mount("#app");
  }
});
