import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      userId: "",
      username: "",
      userPhotoUrl: "",
    },
  },
  getters: {},
  mutations: {
    setToken(state, payload) {
      localStorage.setItem("userId", payload.userId);
    },
    direct(state, vi) {
      (async function () {
        try {
          const response = await axios.post(
            `${process.env.VUE_APP_SERVER_ENDPOINT}/api/session/validation`,
            {
              userId: state.user.userId || localStorage.getItem("userId"),
            },
            { withCredentials: true }
          );
          console.log("Test connection response", response);
          if (response.status === 200) {
            state.user.userPhotoUrl = response.data.userPhotoUrl;
            state.user.username = response.data.username;
            state.user.userId = response.data.userId;
            vi.$router.push("/dashboard");
          }
        } catch (error) {
          console.log("Test connection failed", error);
          vi.$router.push("/login");
        }
      })();
    },
    logout(state, vi) {
      (async function () {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/logout",
            {
              userId: state.user.userId || localStorage.getItem("userId"),
            },
            {
              withCredentials: true,
            }
          );
          console.log("Logout response", response);
          if (response.status === 204) {
            state.token = "";
            state.user.username = "";
            state.user.userPhotoUrl = "";
            state.user.userId = "";
            localStorage.clear();
            vi.$router.push("/login");
          }
        } catch (error) {
          console.log("Logout failed", error);
          throw error;
        }
      })();
    },
  },
  actions: {},
  modules: {},
});
