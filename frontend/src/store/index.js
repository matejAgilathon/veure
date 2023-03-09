import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      username: "",
      userPhotoUrl: "",
    },
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    logout(state, vi) {
      (async function () {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/logout",
            {
              token: state.token,
            }
          );
          console.log("Logout response", response);
          if (response.status === 204) {
            state.token = "";
            state.user.username = "";
            state.user.userPhotoUrl = "";
            vi.$router.push("/");
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
